# Roast
Restaurant Menu CRUD App (TypeScript, NextJS, Tailwind, Shadcn/UI, and Firebase)

## Description
This project showcases a simple CRUD (Create, Read, Update, Delete) restaurant menu application built
using TypeScript, Next.js, Tailwind CSS, shadcn/ui components library, and Firebase for authentication
and data storage. The app enables users to create, read, update, and delete menu items from a real-time
database.

## Prerequisites
To run this project locally, you'll need:

1. Node.js (https://nodejs.org/) installed on your system
2. Basic understanding of TypeScript, Next.js, Tailwind CSS, shadcn/ui components library, and Firebase

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/anjerodesu/Roast.git
   cd Roast
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your Firebase project:
    - Sign in to the [Firebase
      Console](https://console.firebase.google.com/) and create a new project.
    - Enable the Authentication and Realtime Database services for your
      project.
    - Create an application for web and note down the configuration details.

4. Configure Firebase in your Next.js project:
    - In the root folder of the project, create a `.env.local` file. Initialise Firebase with the provided
      configuration:
      ```typescript
      NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
      NEXT_PUBLIC_FIREBASE_DATABASE_URL=your-database-url
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
      NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
      ```

5. Start the development server:
   ```
   npm run dev
   ```

## Usage
Navigate to `http://localhost:3000` in your web browser, and you should see Roast's homepage, the
restaurant menu CRUD app, in action! Authenticated users can create, read, update, and delete menu items from the
Firebase database. The application utilizes Firebase authentication for secure access control.

## License
This project is licensed under the MIT License - see the
[LICENSE](https://github.com/anjerodesu/Roast/blob/main/LICENSE) file for details.
