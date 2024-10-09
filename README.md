# Glossary App

## Project Overview

The Glossary App allows users to register and log in to their accounts. Users can create, edit, and delete terms, enabling them to manage their content effectively. Additionally, an admin user has the ability to oversee all terms, including the authority to edit or delete any term within the application.

## Features

- **Authentication:**
  - Utilizes JSON Web Tokens (JWT) for secure authentication.
  - JWT is stored in localstorage and sent with requests where necessary, ensuring   robust protection for user accounts.
  
- **User Management:**

  - Registration: Users can create accounts, with confirmation emails sent via Mailgun.
  - Login: Users can sign in to their accounts.
  - Logout: Users can sign out of their accounts.

- **Term Management:**

  - Create Terms: Users can create posts with text, images, or a combination of both.
  - Edit/Delete Terms: Users can modify or remove their own terms.
  - Admin:Admin can modify or remove any term.

## Technologies Used

- JavaScript
- React.js
- Node.js
- Express.js
- MongoDB
- CSS

## Prerequisites / Dependencies

- Node v20.11.1
- npm 10.2.0
- MongoDB: You need a running instance of MongoDB.

## Installation and Setup

- git clone <https://github.com/CvejovicZ95/Glossary-app.git>
- Install dependencies for both client and server:
- cd server && npm install
- cd client && npm install

## Environment Variables (Server Folder)

- Make sure to create a .env file with the following variables:

- `DATABASE_URL`: MongoDB connection string  
- `PORT`: Port (e.g., 4500)
- `MAILGUN_API_KEY`: Mailgun API key
- `MAILGUN_DOMAIN`: Mailgun domain
- `MAILGUN_FROM`: Mailgun from address
- `MAILGUN_HOST`: Mailgun host

## Environment Variables (Client Folder)

- `REACT_APP_API_BASE_URL`: Base URL for API requests
- .env.dev:For development environment.
- .env.prod:For production environment.
- .env.local:For local testing.

- **Server**:
  - `nodemon server`
- **Client:**
  - `npm run build:dev`
  - `npm start`
