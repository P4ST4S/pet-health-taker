#!/bin/bash

echo "Setting up Pet Health Tracker application..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if PostgreSQL is running
echo "Checking if PostgreSQL is running..."
pg_isready -h localhost -p 5432 > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "PostgreSQL is not running. Please start PostgreSQL and try again."
  exit 1
fi

# Create the database if it doesn't exist
echo "Creating database..."
psql -h localhost -p 5432 -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'pet_health_db'" | grep -q 1 || psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE pet_health_db"

# Start the application
echo "Starting the application..."
npm run start:dev

echo "Setup complete! The application should be running at http://localhost:3000/api"
echo "You can now create a user and start using the application."
