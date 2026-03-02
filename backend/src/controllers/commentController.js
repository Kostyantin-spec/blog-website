
import Comment from '../models/Comment.js'; 

// 2. Використовуй "export const" замість "exports"
export const getApprovedComments = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Шукаємо схвалені коментарі для цієї статті
    const comments = await Comment.find({ 
      articleSlug: slug, 
      isApproved: true 
    }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error("Помилка отримання коментарів:", err);
    res.status(500).json({ message: "Помилка сервера" });
  }
};



export const getPendingComments = async (req, res) => {
  try {
    // Шукаємо документи, де:
    // 1. isApproved: false
    // 2. source ТІЛЬКИ "Article Comment"
    const comments = await Comment.find({ 
      isApproved: false,
      source: "Article Comment" 
    }).sort({ createdAt: -1 });
    
    console.log(`Знайдено реальних коментарів: ${comments.length}`);
    res.json(comments);
  } catch (err) {
    console.error("Помилка завантаження:", err);
    res.status(500).json({ message: "Помилка завантаження" });
  }
};