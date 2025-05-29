/**
 * README PDF Generator
 *
 * This script converts the project README.md to a nice-looking PDF
 * document that can be shared with others.
 *
 * Prerequisites:
 * - npm install -g md-to-pdf
 *
 * Usage:
 * - Run: node scripts/generate-pdf.js
 * - Output will be saved to docs/pet-health-tracker.pdf
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure directories exist
const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// Path to the README file
const readmePath = path.join(__dirname, '..', 'README.md');
const outputPath = path.join(docsDir, 'pet-health-tracker.pdf');

console.log('Generating PDF from README.md...');

try {
  // Try to generate the PDF if md-to-pdf is installed
  execSync(
    `md-to-pdf ${readmePath} --output ${outputPath} --stylesheet.body="font-family: 'Arial', sans-serif;" --pdf-options.format=A4 --pdf-options.margin.top=30 --pdf-options.margin.bottom=30 --pdf-options.margin.left=30 --pdf-options.margin.right=30 --pdf-options.printBackground=true`,
  );
  console.log(`PDF successfully generated at: ${outputPath}`);
} catch (error) {
  console.error('Could not generate the PDF automatically.');
  console.log('Please make sure md-to-pdf is installed:');
  console.log('npm install -g md-to-pdf');
  console.log('Then run:');
  console.log(`md-to-pdf ${readmePath} --output ${outputPath}`);
}
