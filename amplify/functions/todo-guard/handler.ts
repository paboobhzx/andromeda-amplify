import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async (event: any) => {
    // 1. Discovery: Find the table that Amplify created
    const tablesResponse = await ddbClient.send(new ListTablesCommand({}));
    const tables = tablesResponse.TableNames || [];

    // Amplify Gen 2 tables follow a predictable pattern: Todo-<apiId>-<env>
    // We just find the one that starts with "Todo"
    const REAL_TABLE_NAME = tables.find(name => name.startsWith('Todo'));

    if (!REAL_TABLE_NAME) {
        throw new Error("Could not find a table starting with 'Todo'. Tables found: " + tables.join(', '));
    }

    const { arguments: args, identity } = event;
    const newTodo = {
        __typename: "Todo",
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        content: args.content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        owner: identity?.sub || identity?.username
    };

    // 2. Write to the discovered table
    await docClient.send(new PutCommand({
        TableName: REAL_TABLE_NAME,
        Item: newTodo
    }));

    return newTodo;
};