import express from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import appRoutes from './routes/index';

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

// Define the Sequelize connection
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST || 'localhost', 
  dialect: 'postgres',
  port: parseInt(process.env.DB_PORT || '5432', 10),  // Default PostgreSQL port
});

// Middleware to parse JSON bodies
app.use(express.json());

// Test route to check if the server is running
app.get('/api/test', (req, res) => {
  res.json({ message: "Server is running!" });
});

// API routes
app.use('/api', appRoutes()); 

// Sync Sequelize models and start the server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}).catch((error: any) => {
  console.error('Unable to connect to the database:', error);
});

