import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  text: { type: String, required: true },
  articleSlug: { type: String, required: true }, 
  articleTitle: String,
  source: { type: String, default: "Article Comment" },
  isApproved: { type: Boolean, default: false }, 
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);