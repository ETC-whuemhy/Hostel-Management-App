const fs = require('fs').promises;

async function appendToFile(filePath, content) {
  try {
    await fs.appendFile(filePath, content + '\n', { flag: 'a' });
    console.log(`Content appended to ${filePath}`);
  } catch (error) {
    console.error(`Error appending to file: ${error.message}`);
  }
}
