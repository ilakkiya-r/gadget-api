import express from 'express';
import dotenv from 'dotenv';
import db from './models';

import appRoutes from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//testing
app.get('/api/test', (req, res) => {
    res.json({ message: "Server is running!" });
});


app.use('/api', appRoutes()); 

db.sequelize?.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch((error: any) => {
    console.error('Unable to connect to the database:', error);
});
