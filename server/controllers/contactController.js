import ContactMessage from '../models/ContactMessage.js';

// Function to receive messages from the contact form
export async function receiveMessage(req, res) {
    try {
        const { firstName, lastName, email, subject, message } = req.body;
        const contactMessage = new ContactMessage({ firstName, lastName, email, subject, message });
        await contactMessage.save();
        res.status(201).json({ message: 'Message received successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to receive message.' });
    }
};
