
import upload from '../utils/createUnifiedPayload'; 

// === НОВИЙ РОУТ ДЛЯ ЗАВАНТАЖЕННЯ КАРТИНОК З РЕДАКТОРА ===
router.post('/upload-image', (req, res) => {
  upload.single('blog_image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Помилка самого Multer (наприклад, завеликий файл)
      console.error("Multer Error:", err);
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Інша помилка (наприклад, Cloudinary)
      console.error("General Error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Файл не отримано" });
    }

    console.log("Успішно завантажено:", req.file.path);
    res.json({ url: req.file.path });
  });
});

export default router;