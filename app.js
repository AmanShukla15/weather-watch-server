import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import dotenv from "dotenv";
import weatherRoutes from './routes/weatherRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config({
    path: "./.env",
})

const mongoURI = process.env.MONGO_URI;
// Connect to MongoDB
connectDB(mongoURI);

const app = express();
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.CLIENT_URL
    ],
}))
app.use(bodyParser.json());

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/alert', alertRoutes);

// Error handler middleware
app.use(errorMiddleware);
// const server = http.createServer(app);
// const io = new Server(server);


// Start the server
const port = 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
