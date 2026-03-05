
import express from 'express';


const router = express.Router();

// 1. Імпорт контролерів (всі в одних дужках!)
import { 
  createBlog, 
  updateBlog, 
  deleteBlog, 
  getBlogs, 
  getBlogBySlug, 
  searchBlogs,
  getRelatedBlogs,
  rateBlog,
  likeBlog,
  getGoldPageStats,
  
  
} from '../controllers/blogController.js';

import { adminProtect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

import { handleUniversalForm } from '../controllers/integrationController.js';
import { reshareCount } from '../controllers/reshareCount.js';

router.get('/search', searchBlogs);
router.get('/related', getRelatedBlogs);
router.get('/gold-stats', adminProtect, getGoldPageStats)


router.post('/:slug/reshare', reshareCount.handleReshare);
router.post('/send-to-make',handleUniversalForm);
router.post('/upload-image', upload.single('blog_image'), (req, res) => {
   if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
   console.log("Успішно завантажено на Cloudinary:", req.file.path);
   res.json({ url: req.file.path }); 
});

router.post("/:id/like", likeBlog);
router.post("/:id/rate", rateBlog);

// --- МАРШРУТИ ---

// Отримати всі блоги (публічно)
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

// Створити блог (Тільки адмін + завантаження фото)
router.post('/', adminProtect, upload.single('blog_image'), createBlog);

// router.put('/:slug', adminProtect, upload.single('blog_image'), updateBlog);
router.put('/:slug', adminProtect, upload.single('blog_image'), updateBlog);
router.delete('/:slug', adminProtect, deleteBlog);

export default router;