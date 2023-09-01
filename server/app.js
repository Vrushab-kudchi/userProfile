//Import Statement
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import connectDB from './Database/conn.js';
import dotenv from 'dotenv';
dotenv.config();


//Routes
import userRoutes from './Routes/userroutes.js'

const app = express();

//Port
const PORT = 3001;


//MiddleWare;
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(morgan('tiny'))
app.disable('x-powered-by');

//Routes
app.use('/api', userRoutes);


//Server Started;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch(error => {
    console.error("Error connecting to the database:", error);
    console.error("Server cannot start due to database connection issue.");
});
