import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    tags: [String],
    cpaLink: { type: String, default: "" },
    cpaTitle: { type: String, default: "" },
    cpaText: { type: String, default: "" },
    code_snippet: { 
    type: String, 
    default: "" ,
  },
    blog_image: String,
    // Переносимо основні дані сюди:
    description: String, 
    content: String, 
    author_name: String,
    author_image: String,
    likes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] },
     faqs: [
      {
        question: { type: String },
        answer: { type: String }
      }
    ],
    blogDetail: {
      views: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },

       // 👇 ВСТАВИТИ СЮДИ
  isPublished: {
    type: Boolean,
    default: true
  },
      rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
        totalSum: { type: Number, default: 0 },
      }
    },
    reshareCount: {
     type: Number,
      default: 0
    },
    seo: {
      meta_title: String,
      meta_description: String,
      keywords: [String],
      canonical: String,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Blog", blogSchema);
