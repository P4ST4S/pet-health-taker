# 🐾 Pet Health Tracker

<p align="center">
  <img src="https://imgur.com/a/fcVLnNK" width="400" alt="Pet Health Tracker Logo" />
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-database-schema">Database Schema</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-api-endpoints">API Endpoints</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

## 📋 Description

Pet Health Tracker is a comprehensive backend application built with NestJS that allows pet owners to manage and track their pets' health information. It enables users to record health information, schedule care tasks, set reminders for vet visits or medications, and maintain a complete health history for each pet.

## ✨ Features

- 🐶 **Pet Profiles**: Create and manage profiles for multiple pets with detailed information.
- 📋 **Health Records**: Track vaccinations, vet visits, medications, illnesses, and surgeries.
- 📅 **Care Tasks**: Schedule and manage regular care tasks for your pets.
- 🔔 **Reminders**: Set up automated reminders for upcoming pet care tasks or appointments.
- 👤 **User Authentication**: Secure login and registration with JWT authentication.
- 🔒 **Data Protection**: Ensures that users can only access and modify their own pets' data.
- ⏰ **Scheduled Tasks**: Automated system for sending reminders and notifications.

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language that builds on JavaScript.
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Powerful, open-source object-relational database system.
- **ORM**: [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript.
- **Authentication**: [Passport](http://www.passportjs.org/) & [JWT](https://jwt.io/) - For secure user authentication.
- **Validation**: [class-validator](https://github.com/typestack/class-validator) - Decorator-based property validation.
- **Scheduling**: [@nestjs/schedule](https://docs.nestjs.com/techniques/task-scheduling) - For scheduled tasks and reminders.
- **Environment**: [Docker](https://www.docker.com/) - For containerization and easy deployment.

## 📁 Project Structure

The project is organized with the following structure:

```
project-root/
│
├── docker-compose.yml     # Docker Compose configuration for PostgreSQL
├── README.md              # This file
│
└── server/                # NestJS backend application
    ├── docs/              # Documentation files
    │   ├── api.md         # API documentation
    │   └── architecture.md# Architecture documentation
    │
    ├── scripts/           # Utility scripts
    │   ├── generate-pdf.js     # Script to generate PDF documentation
    │   └── generate-schema.js  # Script to generate database schema diagram
    │
    ├── src/               # Source code
    │   ├── auth/          # Authentication module
    │   ├── care-tasks/    # Care tasks module
    │   ├── health-records/# Health records module
    │   ├── pets/          # Pets module
    │   ├── reminders/     # Reminders module
    │   ├── scheduler/     # Task scheduler module
    │   ├── users/         # Users module
    │   │
    │   ├── app.module.ts  # Main application module
    │   └── main.ts        # Application entry point
    │
    ├── test/              # End-to-end tests
    ├── package.json       # Dependencies and scripts
    └── tsconfig.json      # TypeScript configuration
```

## 🏗️ Architecture

Pet Health Tracker follows a modular architecture pattern using NestJS's powerful module system:

<p align="center">
  <img src="https://i.imgur.com/UJrH5FS.png" width="700" alt="Application Architecture" />
</p>

### Core Modules

- **Users Module**: Handles user registration, profile management.
- **Auth Module**: Manages authentication, JWT tokens, and security.
- **Pets Module**: Manages pet profiles and related operations.
- **Health Records Module**: Tracks pet health history including vaccinations, vet visits, etc.
- **Care Tasks Module**: Manages recurring and one-time care tasks.
- **Reminders Module**: Handles the creation and delivery of reminders.
- **Scheduler Module**: Manages background tasks like sending reminders.

## 📊 Database Schema

<p align="center">
  <img src="https://i.imgur.com/rKOY5nF.png" width="800" alt="Database Schema" />
</p>

### Entity Relationships

- A **User** can have multiple **Pets**
- Each **Pet** can have multiple **Health Records**
- Each **Pet** can have multiple **Care Tasks**
- Each **Pet** can have multiple **Reminders**
- **Health Records**, **Care Tasks**, and **Reminders** all belong to a specific **Pet**

### Schema Generation

You can generate the database schema diagram using the provided script:

```bash
cd server
node scripts/generate-schema.js
```

This will create a visual representation of the database schema in the `server/docs` directory.

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for easy database setup)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/pet-health-tracker.git
   cd pet-health-tracker
   ```

2. **Set up environment variables**

   ```bash
   cp server/.env.sample server/.env
   ```

   Then edit the `.env` file with your configuration:

   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_NAME=pet_health_db
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

3. **Start the PostgreSQL database using Docker**

   ```bash
   # From the root directory
   docker-compose up -d
   ```

4. **Install dependencies**

   ```bash
   cd server
   npm install
   ```

5. **Run the application**

   ```bash
   # development
   npm run start:dev

   # production
   npm run build
   npm run start:prod
   ```

## 🖥️ Usage

Once the application is running, you can interact with it via the REST API endpoints.

### Authentication Flow

1. Register a new user account
2. Login to receive a JWT token
3. Include the JWT token in the Authorization header for all protected routes

```
Authorization: Bearer your_jwt_token
```

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Users

- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me` - Update current user profile

### Pets

- `GET /api/pets` - Get all pets for the current user
- `POST /api/pets` - Create a new pet
- `GET /api/pets/:id` - Get a specific pet
- `PATCH /api/pets/:id` - Update a pet
- `DELETE /api/pets/:id` - Delete a pet

### Health Records

- `GET /api/pets/:petId/health-records` - Get all health records for a pet
- `POST /api/pets/:petId/health-records` - Create a new health record
- `GET /api/health-records/:id` - Get a specific health record
- `PATCH /api/health-records/:id` - Update a health record
- `DELETE /api/health-records/:id` - Delete a health record

### Care Tasks

- `GET /api/pets/:petId/care-tasks` - Get all care tasks for a pet
- `POST /api/pets/:petId/care-tasks` - Create a new care task
- `GET /api/care-tasks/:id` - Get a specific care task
- `PATCH /api/care-tasks/:id` - Update a care task
- `DELETE /api/care-tasks/:id` - Delete a care task

### Reminders

- `GET /api/pets/:petId/reminders` - Get all reminders for a pet
- `POST /api/pets/:petId/reminders` - Create a new reminder
- `GET /api/reminders/:id` - Get a specific reminder
- `PATCH /api/reminders/:id` - Update a reminder
- `DELETE /api/reminders/:id` - Delete a reminder

## 🚢 Deployment

The application can be deployed to various environments:

### Docker Deployment

1. Build the Docker image:

   ```bash
   # From the root directory
   docker build -t pet-health-tracker -f server/Dockerfile server/
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file server/.env pet-health-tracker
   ```

### Cloud Deployment

The application can be deployed to AWS using [NestJS Mau](https://mau.nestjs.com):

```bash
# Navigate to the server directory first
cd server
npm install -g mau
mau deploy
```

For more information on deployment options, check out the [NestJS deployment documentation](https://docs.nestjs.com/deployment).

## 🧪 Testing

```bash
# Navigate to the server directory
cd server

# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## 📚 Documentation

Detailed documentation about the project architecture and API endpoints can be found in the following locations:

- [Architecture Documentation](server/docs/architecture.md)
- [API Documentation](server/docs/api.md)

You can also generate a PDF version of this README for easier sharing:

```bash
cd server
node scripts/generate-pdf.js
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the server/LICENSE file for details.

## 📧 Contact

If you have any questions or suggestions, please reach out to us at [your-email@example.com](mailto:your-email@example.com).

---

<p align="center">
  Made with ❤️ for pet lovers everywhere
</p>
