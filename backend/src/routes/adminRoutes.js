import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/authController.js";
import { adminProtect } from "../middleware/adminProtect.js";
import { getAllUsers } from "../controllers/userController.js";
import { createBlog, updateBlog } from '../controllers/blogController.js'; 
import { upload } from '../middleware/uploadMiddleware.js';
import Settings from '../models/Settings.js';

import Comment from '../models/Comment.js';
import * as commentController from '../controllers/commentController.js';
import axios from 'axios';
const router = express.Router();


// Лог для перевірки в терміналі, що файл завантажився
console.log("🚀 Admin Routes: Initialized");

// --- АВТОРИЗАЦІЯ ТА КОРИСТУВАЧІ ---
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/users", adminProtect, getAllUsers);
router.get("/dashboard", adminProtect, (req, res) => {
  res.json({ message: `Привіт, ${req.admin.name}! Це захищений маршрут.` });
});

// --- БЛОГИ ---
router.post('/', adminProtect, upload.single('blog_image'), createBlog);
router.put('/:slug', adminProtect, upload.single('blog_image'), updateBlog);

// 1. СПОЧАТКУ конкретний маршрут (Pending)
router.get("/comments/pending", adminProtect, async (req, res) => {
  try {
    const comments = await Comment.find({ isApproved: false }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Помилка завантаження коментарів" });
  }
});

// 2. ПОТІМ динамічний маршрут (:slug)
router.get('/comments/:slug', commentController.getApprovedComments);

// 3. Схвалити коментар
router.patch("/comments/approve/:id", adminProtect, async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ message: "Коментар схвалено!" });
  } catch (error) {
    res.status(500).json({ error: "Не вдалося схвалити коментар" });
  }
});

// 4. Видалити коментар
router.delete("/comments/:id", adminProtect, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Коментар видалено" });
  } catch (error) {
    res.status(500).json({ error: "Помилка при видаленні" });
  }
});


// 2. Схвалити коментар
router.patch("/comments/approve/:id", adminProtect, async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ message: "Коментар схвалено!" });
  } catch (error) {
    res.status(500).json({ error: "Не вдалося схвалити коментар" });
  }
});

// 1. Отримання налаштувань
router.get("/settings", async (req, res) => {
  try {
    console.log("==> Спроба отримати налаштування з БД...");
    let settings = await Settings.findOne({ key: 'global_config' });
    
    if (!settings) {
      settings = await Settings.create({ key: 'global_config', makeWebhookUrl: '' });
    }
    
    res.json(settings);
  } catch (error) {
    console.error("ДЕТАЛЬНА ПОМИЛКА НА СЕРВЕРІ:", error);
    res.status(500).json({ error: "Помилка завантаження", details: error.message });
  }
});

// 2. Збереження налаштувань
router.post("/settings", async (req, res) => {
  try {
    const updatedSettings = await Settings.findOneAndUpdate(
      { key: 'global_config' },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json({ message: "Налаштування збережено!", settings: updatedSettings });
  } catch (error) {
    res.status(500).json({ error: "Не вдалося зберегти" });
  }
});

// 3. ТЕСТ ВЕБХУКА (ВИПРАВЛЕНО)
router.post("/settings/test-webhook", async (req, res) => {
  try {
    // Беремо або url, або webhookUrl (дивлячись що прислав фронтенд)
    const url = req.body.url || req.body.webhookUrl;

    if (!url || !url.startsWith('http')) {
      return res.status(400).json({ error: "URL не надано або невірний формат" });
    }

    console.log(`==> Тестування Webhook: ${url}`);

    // Тестовий запит на Make.com
    await axios.post(url, { 
      message: "Тестовий сигнал з адмін-панелі BlogWise",
      timestamp: new Date() 
    }, { timeout: 5000 });

    res.status(200).json({ message: "Тест успішний! Make.com отримав дані." });

  } catch (error) {
    console.error("==> Помилка при тестуванні вебхука:", error.message);

    // Навіть якщо Make повернув 400, для нас це "успіх", бо зв'язок є
    if (error.response) {
       return res.status(200).json({ message: "Зв'язок є, але Make повернув статус " + error.response.status });
    }

    res.status(500).json({ error: "Помилка з'єднання", details: error.message });
  }
});



export default router;