/**
 * Environment configuration for the application
 * Loads environment variables from .env file
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the .env file
const envPath = resolve(__dirname, '..', '.env');

// Simple function to load environment variables from .env file
function loadEnv() {
  try {
    if (fs.existsSync(envPath)) {
      // Read the file with explicit UTF-8 encoding and handle BOM if present
      let envContent = fs.readFileSync(envPath, { encoding: 'utf8' });
      
      // Remove BOM if present (common issue with Windows text files)
      if (envContent.charCodeAt(0) === 0xFEFF) {
        envContent = envContent.slice(1);
      }
      
      const envLines = envContent.split('\n');
      
      for (const line of envLines) {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          const value = valueParts.join('=');
          
          if (key && value) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            process.env[trimmedKey] = trimmedValue;
            
            // Log that we've set the environment variable (but don't log API keys)
            if (trimmedKey.includes('API_KEY')) {
              console.log(`Set environment variable: ${trimmedKey} (value hidden)`);
            } else {
              console.log(`Set environment variable: ${trimmedKey}=${trimmedValue}`);
            }
          }
        }
      }
      
      console.log('Environment variables loaded from .env file');
    } else {
      console.warn('.env file not found. Using existing environment variables.');
    }
  } catch (error) {
    console.error('Error loading .env file:', error);
  }
}

// Export the function to be used in other modules
export { loadEnv };