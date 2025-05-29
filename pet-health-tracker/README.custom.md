# Pet Health Tracker

A CRUD application to manage and track pet health and care routines. Users can create pet profiles, log health records (e.g., vaccinations, illnesses, vet visits), and manage daily care tasks like feeding and grooming. The system also includes reminders for upcoming appointments and health checks.

## Features

- **User Management**: Register, login, and manage user profiles
- **Pet Profiles**: Create and manage detailed pet profiles with important information
- **Health Records**: Track vaccinations, vet visits, medications, and illnesses
- **Care Tasks**: Schedule and manage daily care tasks like feeding and grooming
- **Reminders**: Set up reminders for upcoming appointments and health checks
- **Automated Scheduling**: Recurring tasks and reminders are automatically created

## Technology Stack

- **Backend**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Class Validator
- **Scheduling**: NestJS Scheduler

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL (v12 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pet-health-tracker.git
cd pet-health-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the project root with the following variables:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=pet_health_db
JWT_SECRET=your_jwt_secret_key
PORT=3001
```

4. Create the database:

```bash
# Log in to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE pet_health_db;

# Exit PostgreSQL
\q
```

5. Run the application:

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login

### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Pets

- `POST /api/pets` - Create a new pet
- `GET /api/pets` - Get all pets
- `GET /api/pets/my-pets` - Get current user's pets
- `GET /api/pets/:id` - Get a specific pet
- `PUT /api/pets/:id` - Update a pet
- `DELETE /api/pets/:id` - Delete a pet

### Health Records

- `POST /api/health-records` - Create a new health record
- `GET /api/health-records` - Get all health records
- `GET /api/health-records/pet/:petId` - Get health records for a specific pet
- `GET /api/health-records/:id` - Get a specific health record
- `PUT /api/health-records/:id` - Update a health record
- `DELETE /api/health-records/:id` - Delete a health record

### Care Tasks

- `POST /api/care-tasks` - Create a new care task
- `GET /api/care-tasks` - Get all care tasks
- `GET /api/care-tasks/pet/:petId` - Get care tasks for a specific pet
- `GET /api/care-tasks/pending` - Get pending care tasks
- `GET /api/care-tasks/:id` - Get a specific care task
- `PUT /api/care-tasks/:id` - Update a care task
- `PUT /api/care-tasks/:id/complete` - Mark a care task as complete
- `DELETE /api/care-tasks/:id` - Delete a care task

### Reminders

- `POST /api/reminders` - Create a new reminder
- `GET /api/reminders` - Get all reminders
- `GET /api/reminders/pet/:petId` - Get reminders for a specific pet
- `GET /api/reminders/pending` - Get pending reminders
- `GET /api/reminders/:id` - Get a specific reminder
- `PUT /api/reminders/:id` - Update a reminder
- `PUT /api/reminders/:id/sent` - Mark a reminder as sent
- `PUT /api/reminders/:id/dismiss` - Dismiss a reminder
- `DELETE /api/reminders/:id` - Delete a reminder

## License

This project is licensed under the MIT License.
