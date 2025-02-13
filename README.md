# Car & User Management API

## Overview

This is a TypeScript-based API built with Express.js, designed for managing cars with built in auth. The application uses `better-sqlite3` as a database engine and implements authentication with JWT. The API supports validation with `joi` and provides a Swagger documentation for endpoints.

## Features

- **User Authentication:** JWT-based authentication `jsonwebtoken` with `bcryptjs` for password hashing.
- **Database Management:** Uses `better-sqlite3` for storing user and car data.
- **CSV Import:** On startup, the application parses `car_dataset.csv` and populates the `cars` table if it does not exist.
- **Validation:** Request validation with `joi` middleware.
- **API Documentation:** Available at `http://localhost:{port}/api-docs` using Swagger.
- **Testing:** Implemented with `Jest`. WIP
- **Middleware:** Authentication, pagination, and validation middleware.

## Project Structure

```
.
├── Dockerfile
├── README.md
├── data/ (Database and CSV files)
├── dist/ (Compiled TypeScript files)
├── src/
│   ├── cars/ (Car module: controller, repository, routes, service)
│   ├── data/ (Database handling and CSV importing)
│   ├── users/ (User module: controller, repository, routes, service)
│   ├── utils/
│   │   ├── middleware/ (Auth, pagination, sorting, validation)
│   │   ├── swaggerDocs/ (Swagger schemas)
│   ├── server.ts (Main entry point)
├── test/ (Unit tests)
└── tsconfig.json (TypeScript configuration)
```

## Installation

### Prerequisites

- Node.js
- Docker (optional)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create an `.env` file based on `env.example` and configure environment variables.
4. Start the application:
   ```sh
   npm run start
   ```
5. Open Swagger API documentation:
   ```sh
   http://localhost:{port}/api-docs
   ```

## Environment Variables

The application uses an `.env` file for configuration. Example:

```
PORT=3001
CSV_FILE_PATH=./data/car_dataset.csv
SECRET=yoursecretkey
```

## Running Tests

Tests are written using Jest. To run tests:

```sh
npm test
```

## API Endpoints

### Authentication

- `POST /users/register` - Register a new user
- `POST /users/login` - Authenticate a user and return a JWT

### Users

- `GET /users` - Get all users (Requires authentication)
- `GET /users/:id` - Get user details

### Cars

- `GET /cars` - Get all cars
- `GET /cars/:id` - Get a specific car

## Docker Support

To run the application using Docker:

```sh
docker-compose up --build
```

## License

This project is licensed under the MIT License.
