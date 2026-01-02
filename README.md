# AWS Amplify Gen 2 Todo Application

A full-stack serverless todo application built with Angular and AWS Amplify Gen 2, demonstrating modern cloud-native development practices.

## 🚀 Features

- **User Authentication** - Secure sign-up/sign-in with AWS Cognito
- **Real-time CRUD Operations** - Create, read, and delete todos
- **Owner-based Authorization** - Users can only see and manage their own todos
- **Serverless Architecture** - Fully managed backend with AWS AppSync and DynamoDB
- **Type-safe API** - End-to-end TypeScript with auto-generated types

## 🏗️ Architecture

- **Frontend**: Angular (latest version) with standalone components
- **Backend**: AWS Amplify Gen 2
- **API**: AWS AppSync (GraphQL)
- **Database**: Amazon DynamoDB
- **Authentication**: Amazon Cognito
- **Deployment**: AWS Amplify Hosting

## 📋 Prerequisites

- Node.js 20.x or 22.x
- npm or yarn
- AWS Account
- Angular CLI

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the Amplify sandbox:
```bash
npx ampx sandbox
```

4. In a separate terminal, start the Angular dev server:
```bash
npm start
```

5. Open your browser to `http://localhost:4200`

## 📁 Project Structure

```
├── amplify/
│   ├── auth/           # Cognito authentication config
│   ├── data/           # GraphQL schema and DynamoDB models
│   ├── functions/      # Lambda functions (optional custom logic)
│   └── backend.ts      # Main Amplify backend configuration
├── src/
│   ├── app/
│   │   └── todos/      # Todo component (standalone)
│   └── main.ts         # Amplify configuration
└── README.md
```

## 🔑 Key Technologies

- **AWS Amplify Gen 2** - Modern full-stack development framework
- **AWS AppSync** - Managed GraphQL API service
- **Amazon DynamoDB** - NoSQL database for scalability
- **Amazon Cognito** - User authentication and authorization
- **Angular** - Frontend framework with TypeScript

## 🎯 Learning Objectives

This project demonstrates:

- Setting up AWS Amplify Gen 2 from scratch
- Implementing owner-based authorization patterns
- Building type-safe APIs with GraphQL and TypeScript
- Managing AWS resources with CDK
- Serverless architecture best practices
- Resolving circular dependencies in CloudFormation stacks

## 🐛 Troubleshooting

### Circular Dependency Error
If you encounter a circular dependency between data and function resources, ensure you're not creating bidirectional references in your `backend.ts` file.

### Amplify Not Configured Error
Make sure `generateClient()` is called inside components, not at the module level, to ensure Amplify is configured first.

### Node Version Issues
Use Node.js 20.x or 22.x. Node.js 18 reached end-of-life and is no longer supported.

## 📝 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 👨‍💻 Author

Built as a learning project for cloud engineering and full-stack serverless development.

## 🙏 Acknowledgments

- AWS Amplify documentation
- Angular community
- Stack Overflow community

---

**Note**: This is a development/learning project. For production use, consider adding:
- Error boundaries and better error handling
- Loading states and optimistic updates
- End-to-end testing
- CI/CD pipeline
- Monitoring and logging
- Cost optimization strategies
