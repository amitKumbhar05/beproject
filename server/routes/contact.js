import express from 'express';
import { receiveMessage } from '../controllers/contactController.js';

const router = express.Router();

// Route to handle contact form submissions
router.post('/contact', receiveMessage);

export default router;
