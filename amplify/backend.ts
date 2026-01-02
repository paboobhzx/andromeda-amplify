import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { todoGuard } from './functions/todo-guard/resource';
import * as iam from 'aws-cdk-lib/aws-iam';

const backend = defineBackend({
  auth,
  data,
  todoGuard,
});

// Grant permissions to list tables and access DynamoDB
backend.todoGuard.resources.lambda.addToRolePolicy(
  new iam.PolicyStatement({
    actions: [
      'dynamodb:ListTables',
      'dynamodb:PutItem',
      'dynamodb:GetItem',
      'dynamodb:UpdateItem',
      'dynamodb:DeleteItem',
      'dynamodb:Query',
      'dynamodb:Scan'
    ],
    resources: ['*'], // Or scope to specific table ARN pattern if you know it
  })
);

// Remove this line - it creates the circular dependency:
// backend.data.resources.tables['Todo'].grantReadWriteData(backend.todoGuard.resources.lambda);