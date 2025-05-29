/**
 * Database Schema Diagram Generator
 *
 * This script generates a visual representation of the database schema
 * for the Pet Health Tracker application.
 *
 * Prerequisites:
 * - npm install -g mermaid-cli
 *
 * Usage:
 * - Run: node scripts/generate-schema.js
 * - Output will be saved to docs/db-schema.png
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure directories exist
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// Create Mermaid diagram definition
const mermaidDiagram = `
erDiagram
    USER {
        uuid id PK
        string email
        string firstName
        string lastName
        string password
        date createdAt
        date updatedAt
    }
    
    PET {
        uuid id PK
        string name
        string species
        string breed
        date birthDate
        string color
        float weight
        string microchipNumber
        string photo
        text notes
        uuid ownerId FK
        date createdAt
        date updatedAt
    }
    
    HEALTH_RECORD {
        uuid id PK
        enum type
        string title
        date date
        text description
        string veterinarian
        string clinic
        number cost
        text notes
        string attachmentUrl
        uuid petId FK
        date createdAt
        date updatedAt
    }
    
    CARE_TASK {
        uuid id PK
        string title
        text description
        date dueDate
        enum status
        boolean isRecurring
        number recurringIntervalDays
        uuid petId FK
        date createdAt
        date updatedAt
    }
    
    REMINDER {
        uuid id PK
        string title
        text description
        timestamp reminderDate
        enum status
        boolean isRecurring
        number recurringIntervalDays
        uuid petId FK
        date createdAt
        date updatedAt
    }
    
    USER ||--o{ PET : "owns"
    PET ||--o{ HEALTH_RECORD : "has"
    PET ||--o{ CARE_TASK : "has"
    PET ||--o{ REMINDER : "has"
`;

// Save Mermaid diagram definition to a file
const mermaidFilePath = path.join(docsDir, 'db-schema.mmd');
fs.writeFileSync(mermaidFilePath, mermaidDiagram);

console.log('Mermaid diagram definition created at:', mermaidFilePath);
console.log('To generate the diagram image, install mermaid-cli and run:');
console.log('mmdc -i docs/db-schema.mmd -o docs/db-schema.png -t dark');

// Try to generate the diagram if mermaid-cli is installed
try {
  console.log('Attempting to generate diagram image...');
  execSync('mmdc -i docs/db-schema.mmd -o docs/db-schema.png -t dark');
  console.log('Diagram successfully generated at docs/db-schema.png');
} catch (error) {
  console.log(
    'Could not generate the diagram automatically. Please install mermaid-cli:',
  );
  console.log('npm install -g @mermaid-js/mermaid-cli');
}
