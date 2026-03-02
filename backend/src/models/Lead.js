import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, default: "Анонім" },
  email: { type: String, required: true },
  message: { type: String },
  source: { type: String, required: true }, // 'comment', 'subscribe', 'popup', 'contact'
  articleTitle: { type: String, default: "General" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Lead', leadSchema);