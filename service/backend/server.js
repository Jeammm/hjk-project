const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

const app = require('./index');


const port = process.env.PORT || 8000;
const server = app.listen(port);
console.log(`🟢 App is listening on port ${port}...`);

process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message, '💥');
  console.error('Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error(err.name, err.message, '💥');
  console.error('Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});