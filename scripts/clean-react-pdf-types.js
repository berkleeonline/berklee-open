// scripts/clean-react-pdf-types.js

import fs from 'fs';
import path from 'path';

// Define the path to the index.d.ts file
const filePath = path.join(process.cwd(), 'node_modules/@react-pdf/types/index.d.ts');

// Function to clear the contents of the file
function clearFileContents(file) {
  fs.writeFile(file, '', (err) => {
    if (err) {
      console.error(`Error clearing file contents: ${err}`);
    } else {
      console.log(`Successfully cleared contents of ${file}`);
    }
  });
}

// Execute the function
clearFileContents(filePath);