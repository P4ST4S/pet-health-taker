# Pet Health Tracker API Documentation

## Base URL

All API endpoints are prefixed with `/api`.

```
http://localhost:3000/api
```

## Authentication

The API uses JWT (JSON Web Token) for authentication.

### Register a new user

```
POST /auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "id": "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2023-05-29T10:00:00.000Z",
  "updatedAt": "2023-05-29T10:00:00.000Z"
}
```

### Login

```
POST /auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

## User Endpoints

### Get current user profile

```
GET /users/me
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "id": "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2023-05-29T10:00:00.000Z",
  "updatedAt": "2023-05-29T10:00:00.000Z"
}
```

### Update current user profile

```
PATCH /users/me
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**

```json
{
  "firstName": "Johnny",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "id": "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890",
  "email": "user@example.com",
  "firstName": "Johnny",
  "lastName": "Doe",
  "createdAt": "2023-05-29T10:00:00.000Z",
  "updatedAt": "2023-05-29T10:30:00.000Z"
}
```

## Pet Endpoints

### Get all pets

```
GET /pets
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
[
  {
    "id": "b1c2d3e4-f5g6-7890-b1c2-d3e4f5g67890",
    "name": "Rex",
    "species": "Dog",
    "breed": "German Shepherd",
    "birthDate": "2020-01-15",
    "color": "Black and Tan",
    "weight": 35.5,
    "microchipNumber": "900182000123456",
    "photo": "https://example.com/pet-photos/rex.jpg",
    "notes": "Very friendly and good with children",
    "createdAt": "2023-05-29T11:00:00.000Z",
    "updatedAt": "2023-05-29T11:00:00.000Z"
  }
]
```

### Create a new pet

```
POST /pets
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**

```json
{
  "name": "Whiskers",
  "species": "Cat",
  "breed": "Siamese",
  "birthDate": "2021-03-10",
  "color": "Cream",
  "weight": 4.2,
  "microchipNumber": "900182000654321",
  "notes": "Playful and loves treats"
}
```

**Response:**

```json
{
  "id": "c1d2e3f4-g5h6-7890-c1d2-e3f4g5h67890",
  "name": "Whiskers",
  "species": "Cat",
  "breed": "Siamese",
  "birthDate": "2021-03-10",
  "color": "Cream",
  "weight": 4.2,
  "microchipNumber": "900182000654321",
  "notes": "Playful and loves treats",
  "createdAt": "2023-05-29T12:00:00.000Z",
  "updatedAt": "2023-05-29T12:00:00.000Z"
}
```

### Get a specific pet

```
GET /pets/:id
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
{
  "id": "c1d2e3f4-g5h6-7890-c1d2-e3f4g5h67890",
  "name": "Whiskers",
  "species": "Cat",
  "breed": "Siamese",
  "birthDate": "2021-03-10",
  "color": "Cream",
  "weight": 4.2,
  "microchipNumber": "900182000654321",
  "notes": "Playful and loves treats",
  "createdAt": "2023-05-29T12:00:00.000Z",
  "updatedAt": "2023-05-29T12:00:00.000Z"
}
```

### Update a pet

```
PATCH /pets/:id
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**

```json
{
  "weight": 4.5,
  "notes": "Playful, loves treats, and enjoys window watching"
}
```

**Response:**

```json
{
  "id": "c1d2e3f4-g5h6-7890-c1d2-e3f4g5h67890",
  "name": "Whiskers",
  "species": "Cat",
  "breed": "Siamese",
  "birthDate": "2021-03-10",
  "color": "Cream",
  "weight": 4.5,
  "microchipNumber": "900182000654321",
  "notes": "Playful, loves treats, and enjoys window watching",
  "createdAt": "2023-05-29T12:00:00.000Z",
  "updatedAt": "2023-05-29T12:30:00.000Z"
}
```

### Delete a pet

```
DELETE /pets/:id
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```
Status: 204 No Content
```

## Health Records Endpoints

### Get all health records for a pet

```
GET /pets/:petId/health-records
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
[
  {
    "id": "d1e2f3g4-h5i6-7890-d1e2-f3g4h5i67890",
    "type": "vaccination",
    "title": "Rabies Vaccine",
    "date": "2023-04-15",
    "description": "3-year rabies vaccination",
    "veterinarian": "Dr. Smith",
    "clinic": "Pet Care Clinic",
    "cost": 45.0,
    "notes": "Next due in 2026",
    "createdAt": "2023-04-15T14:00:00.000Z",
    "updatedAt": "2023-04-15T14:00:00.000Z"
  }
]
```

### Create a new health record

```
POST /pets/:petId/health-records
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**

```json
{
  "type": "vet_visit",
  "title": "Annual Checkup",
  "date": "2023-05-20",
  "description": "Routine annual health examination",
  "veterinarian": "Dr. Johnson",
  "clinic": "Animal Hospital",
  "cost": 85.0,
  "notes": "Overall health is excellent"
}
```

**Response:**

```json
{
  "id": "e1f2g3h4-i5j6-7890-e1f2-g3h4i5j67890",
  "type": "vet_visit",
  "title": "Annual Checkup",
  "date": "2023-05-20",
  "description": "Routine annual health examination",
  "veterinarian": "Dr. Johnson",
  "clinic": "Animal Hospital",
  "cost": 85.0,
  "notes": "Overall health is excellent",
  "petId": "c1d2e3f4-g5h6-7890-c1d2-e3f4g5h67890",
  "createdAt": "2023-05-29T13:00:00.000Z",
  "updatedAt": "2023-05-29T13:00:00.000Z"
}
```

## Care Tasks Endpoints

### Get all care tasks for a pet

```
GET /pets/:petId/care-tasks
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
[
  {
    "id": "f1g2h3i4-j5k6-7890-f1g2-h3i4j5k67890",
    "title": "Grooming Appointment",
    "description": "Full grooming service including bath, trim, and nail clipping",
    "dueDate": "2023-06-15",
    "status": "pending",
    "isRecurring": true,
    "recurringIntervalDays": 60,
    "createdAt": "2023-05-29T14:00:00.000Z",
    "updatedAt": "2023-05-29T14:00:00.000Z"
  }
]
```

## Reminders Endpoints

### Get all reminders for a pet

```
GET /pets/:petId/reminders
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**

```json
[
  {
    "id": "g1h2i3j4-k5l6-7890-g1h2-i3j4k5l67890",
    "title": "Medication Reminder",
    "description": "Time for heartworm medication",
    "reminderDate": "2023-06-01T09:00:00.000Z",
    "status": "pending",
    "isRecurring": true,
    "recurringIntervalDays": 30,
    "createdAt": "2023-05-29T15:00:00.000Z",
    "updatedAt": "2023-05-29T15:00:00.000Z"
  }
]
```

## Error Responses

### Validation Error

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be at least 8 characters"
  ],
  "error": "Bad Request"
}
```

### Authentication Error

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### Not Found Error

```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```
