# Linkup Social Media Project

Linkup is a social media platform that allows users to connect and share their experiences with others. This repository contains the source code for both the frontend and backend components of the Linkup project.

Design for the project: [Link to Figma Design](https://www.figma.com/file/p0H3Oj2V6JOiFssjnJuw27/LinkUp?type=design&node-id=0-1&mode=design)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Setting up the Backend](#setting-up-the-backend)
- [Setting up the Frontend](#setting-up-the-frontend)
- [Running Tests](#running-tests)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

Linkup is a social media platform that enables users to connect, share posts, and interact with others. This README provides an overview of the project, how to set it up, and how to get started.

## Features

- User registration and authentication with JWT (JSON Web Tokens).
- Password encryption using bcrypt for security.
- User profile management and customization.
- Image uploads and conversion to Cloudinary links.
- Post creation, editing, and deletion.
- Commenting on posts.
- Resetting forgotten passwords via email.
- Unit tests with Jest and end-to-end tests with Cypress.

## Technologies Used

- Frontend:
  - Angular Framework
  - API services to communicate with the backend
  - Cloudinary for image hosting and conversion

- Backend:
  - Express.js (Node.js)
  - Microsoft SQL Server (MSSQL) for database
  - bcrypt for password hashing
  - Joi for input validation
  - JSON Web Tokens (JWT) for authentication
  - Node Mailer for email services
  - Jest for unit testing

## Getting Started

To get started with the Linkup project, follow these steps:

### Folder Structure

- `frontend`: Contains the Angular frontend code.
- `backend`: Contains the Express.js backend code.
- `e2e_tests`: Contains end-to-end tests written with Cypress.

### Setting up the Backend

1. Clone this repository to your local machine.

2. Navigate to the `backend` folder:

   ```bash
   cd backend
3. Install the required dependencies:
   ```bash
   npm install
4. Create a .env file in the backend folder and configure your environment variables (database connection, JWT secret, mailer settings, etc.) as indicated in the .env copy file, filling in the blank space.

5. Run the backend server:
   ```bash
   npm start

### Setting up the Frontend
1. Navigate to the frontend folder:

   ```bash
   cd frontend

2. Install the required dependencies:

   ```bash
   npm install
3. Configure the API service to connect to your backend server by updating the API endpoint.

4. Start the frontend development server:

   ```bash
   ng serve
5. Access the Linkup frontend at http://localhost:4200.

### Running Tests
1. Run unit tests for the backend (from the backend folder):

   ```bash
   npm test
2. Run end-to-end tests using Cypress (from the e2e_tests folder):

   ```bash
   npx cypress open
## Usage
Once the frontend is served to the browser, the login page, click the 