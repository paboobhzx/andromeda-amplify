import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { todoGuard } from '../functions/todo-guard/resource';

const schema = a.schema({
  Todo: a.model({
    content: a.string(),
  }).authorization(allow => [allow.owner()]),

  createTodoGuarded: a.mutation()
    .arguments({ content: a.string() })
    .returns(a.ref('Todo'))
    .handler(a.handler.function(todoGuard))
    .authorization(allow => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
});