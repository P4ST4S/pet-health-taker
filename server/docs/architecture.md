# Pet Health Tracker - Architecture Documentation

## System Overview

The Pet Health Tracker is a comprehensive application that allows pet owners to track and manage their pets' health information. The system is built with a modular architecture using NestJS, a progressive Node.js framework, and PostgreSQL for data storage.

## Architecture Diagram

```
┌────────────────────────────────────────────────────────────┐
│                     Client Application                     │
└───────────────────────────────┬────────────────────────────┘
                               │
                               ▼
┌────────────────────────────────────────────────────────────┐
│                         API Gateway                        │
└───────────────────────────────┬────────────────────────────┘
                               │
                               ▼
┌────────────────────────────────────────────────────────────┐
│                       NestJS Application                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │   Auth   │ │  Users   │ │   Pets   │ │Health Records│   │
│  │  Module  │ │  Module  │ │  Module  │ │    Module    │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
│                                                            │
│  ┌──────────┐ ┌──────────┐ ┌────────────┐                  │
│  │Care Tasks│ │ Reminders│ │ Scheduler  │                  │
│  │  Module  │ │  Module  │ │   Module   │                  │
│  └──────────┘ └──────────┘ └────────────┘                  │
└───────────────────────────────┬────────────────────────────┘
                               │
                               ▼
┌────────────────────────────────────────────────────────────┐
│                     PostgreSQL Database                    │
└────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. API Gateway

The API Gateway serves as the entry point for all client requests. It handles:

- Request routing
- CORS support
- Global prefix (/api)
- API versioning
- Request validation

### 2. NestJS Modules

#### 2.1 Auth Module

Responsible for user authentication and authorization:

- JWT-based authentication
- Password hashing using bcrypt
- Passport integration
- JWT strategy implementation
- Protected route guards

#### 2.2 Users Module

Manages user data and operations:

- User registration
- Profile management
- Data retrieval and updates

#### 2.3 Pets Module

Handles pet-related functionality:

- Pet profile creation and management
- Pet data retrieval and updates
- Relationship with owners (users)

#### 2.4 Health Records Module

Manages pet health history:

- Different types of health records (vaccinations, vet visits, etc.)
- Historical health data tracking
- File attachments for records

#### 2.5 Care Tasks Module

Handles recurring and one-time pet care activities:

- Task creation and scheduling
- Status tracking
- Due date management

#### 2.6 Reminders Module

Manages notification settings for pet care:

- Reminder creation
- Scheduling notifications
- Status tracking (pending, sent, dismissed)

#### 2.7 Scheduler Module

Handles background tasks and scheduling:

- Automated reminder processing
- Recurring task management
- Cron jobs for scheduled operations

### 3. PostgreSQL Database

Stores all application data with the following entity relationships:

- Users have many Pets
- Pets have many Health Records
- Pets have many Care Tasks
- Pets have many Reminders

## Data Flow

1. Client sends an HTTP request to the API Gateway
2. Request is authenticated (if required) by the Auth Module
3. Request is routed to the appropriate module controller
4. Controller delegates to the service layer
5. Service layer interacts with the repository layer
6. Repository layer interacts with the database
7. Response flows back through the layers to the client

## Security Architecture

The application implements several security measures:

- JWT-based authentication
- Password hashing with bcrypt
- Data validation with class-validator
- Route protection with guards
- Database connection security
- Environment variable management

## Scalability Considerations

The application is designed with scalability in mind:

- Modular architecture allows for easy feature extensions
- TypeORM provides efficient database interactions
- NestJS provides performance optimization features
- Docker containerization supports deployment scaling

## Development Environment Setup

The development environment is configured with:

- ESLint for code quality
- Prettier for code formatting
- Jest for testing
- Docker for containerization
- npm scripts for common tasks

## Deployment Architecture

The application can be deployed using:

- Docker containers
- AWS via NestJS Mau
- Traditional server deployment
- CI/CD pipelines for automated deployments
