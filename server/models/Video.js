import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: String, required: true },
    size: { type: String, required: true },
    status: { type: String, required: true },
    thumbnail: { type: String, required: true }
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
