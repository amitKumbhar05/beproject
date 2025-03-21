import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
});

export default mongoose.model('ContactMessage', contactMessageSchema);
