import { defineFunction } from '@aws-amplify/backend';

export const todoGuard = defineFunction({
    name: 'todo-guard',
    entry: './handler.ts',
    environment: {
        ENABLE_RATE_LIMITING: 'false',
    }
});