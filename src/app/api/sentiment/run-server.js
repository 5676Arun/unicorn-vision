const { spawn } = require('child_process');
const path = require('path');

// Path to the Python script
const pythonScriptPath = path.join(__dirname, 'route.py');

// Start the Python HTTP server
console.log('Starting Python sentiment analysis server...');
console.log(`Script path: ${pythonScriptPath}`);

const pythonProcess = spawn('python', [pythonScriptPath]);

pythonProcess.stdout.on('data', (data) => {
  console.log(`Python server: ${data}`);
});

pythonProcess.stderr.on('data', (data) => {
  console.error(`Python server error: ${data}`);
});

pythonProcess.on('close', (code) => {
  console.log(`Python server process exited with code ${code}`);
});

// Listen for termination signals to cleanly shut down the Python process
process.on('SIGINT', () => {
  console.log('Shutting down Python server...');
  pythonProcess.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Shutting down Python server...');
  pythonProcess.kill();
  process.exit();
}); 