import express from 'express';
import cors from 'cors';
import connectToDatabase from './mongodb.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectToDatabase()
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Use auth routes
app.use('/auth', authRoutes);

// Use contact routes as middleware
app.use(contactRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});