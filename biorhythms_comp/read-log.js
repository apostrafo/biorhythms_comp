import { readFile } from 'fs/promises';

async function readNpmLog() {
  try {
    const content = await readFile('/home/.npm/_logs/2025-02-20T06_58_53_634Z-debug-0.log', 'utf8');
    console.log(content);
  } catch (error) {
    console.error('Error reading log file:', error.message);
  }
}

readNpmLog();