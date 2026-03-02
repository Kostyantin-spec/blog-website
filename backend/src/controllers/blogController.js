import Blog from "../models/Blog.js";
import axios from 'axios';
import Settings from "../models/Settings.js"; 
import mongoose from "mongoose";
import { createUnifiedPayload } from "../../../backend/utils/createUnifiedPayload.js";
import Lead from '../models/Lead.js';

/**
 * Отримати всі блоги
 * GET /api/blogs
 */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Помилка при отриманні списку статей", error: error.message });
  }
};

/**
 * Отримати одну статтю за Slug та збільшити лічильник переглядів
 * GET /api/blogs/:slug
 */
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Шукаємо статтю і збільшуємо views всередині blogDetail на 1
    const blog = await Blog.findOneAndUpdate(
      { slug: slug },
      { $inc: { "blogDetail.views": 1 } }, // Оператор $inc збільшує значення поля
      { new: true } // Параметр new: true повертає вже оновлений документ
    );

    console.log(`Статтю ${slug} переглянуто. Нова кількість переглядів:`, blog?.blogDetail?.views);

    if (!blog) {
      return res.status(404).json({ message: "Статтю не знайдено" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ 
      message: "Помилка при отриманні статті", 
      error: error.message 
    });
  }
};


export const createBlog = async (req, res) => {
  try {
    // 1. Отримуємо текстові поля з тіла запиту
    const { 
      title, slug, category, description, content, 
      code_snippet, author_name, tags, 
      cpaTitle, cpaText, cpaLink, author_image 
    } = req.body;

    // 2. ГЕНЕРАЦІЯ SLUG (якщо порожній)
    let generatedSlug = slug;
    if (!generatedSlug || generatedSlug.trim() === "") {
      generatedSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9а-яіїєґ\s-]/g, "") 
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    // 3. РОЗПАКОВКА FAQ (Це виправить твою помилку "Cast to embedded failed")
   let parsedFaqs = [];
console.log("Отримано faqs з запиту (тип):", typeof req.body.faqs);
console.log("Сирі faqs:", req.body.faqs);

if (req.body.faqs) {
    try {
        if (typeof req.body.faqs === 'string') {
            // Якщо це рядок (навіть порожній масив у рядку "[]"), парсимо його
            const parsed = JSON.parse(req.body.faqs);
            parsedFaqs = Array.isArray(parsed) ? parsed : [];
        } else if (Array.isArray(req.body.faqs)) {
            // Якщо Multer вже зробив його масивом
            parsedFaqs = req.body.faqs;
        }
    } catch (e) {
        console.error("❌ Помилка парсингу FAQ:", e.message);
        parsedFaqs = [];
    }
}

parsedFaqs = parsedFaqs
  .filter(f => f && typeof f === 'object' && f.question?.trim())
  .map(f => ({
    question: f.question.trim(),
    answer: f.answer?.trim() || ""
  }));

    // 4. ФОРМУВАННЯ ОБ'ЄКТА ДЛЯ МОНГО
    const blogData = {
  title,
  slug: generatedSlug,
  category,
  tags,
  cpaLink,
  cpaTitle,
  cpaText,
  code_snippet,
  blog_image: req.file?.path || req.body.blog_image || "",
  description,
  content,
  author_name,
  author_image,
  // ЛАЙКИ ТА FAQ ТЕПЕР ТУТ (В КОРЕНІ)
  likes: 0, 
  faqs: parsedFaqs, 
  // ВСЕ ІНШЕ В blogDetail
  blogDetail: {
    views: 0,
    shares: 0,
    comments: 0,
    rating: { average: 0, count: 0, totalSum: 0 }
  },
  createdAt: new Date()
};

    console.log("===> ОБ'ЄКТ ІДЕ В БАЗУ:", JSON.stringify(blogData, null, 2));

    // 5. ЗБЕРЕЖЕННЯ
    const newBlog = new Blog(blogData);
    await newBlog.save();
    console.log("✅ СТАТТЮ ЗБЕРЕЖЕНО В БД");

 


    // 6. ВІДПРАВКА НА MAKE.COM (ЧЕРЕЗ НАЛАШТУВАННЯ В БД)
    const settings = await Settings.findOne({ key: "global_config" });

if (settings?.makeWebhookUrl) {

  const payload = createUnifiedPayload(
    "add_post",
    newBlog,
    settings
  );

  axios.post(settings.makeWebhookUrl, payload)
    .then(() => console.log("📨 Make webhook sent"))
    .catch(err => console.error("Make webhook error:", err.message));

}

res.status(201).json(newBlog);

  } catch (error) {
    console.error("❌ КРИТИЧНА ПОМИЛКА ПРИ СТВОРЕННІ:", error.message);
    res.status(400).json({ 
      message: "Помилка валідації або сервера", 
      error: error.message 
    });
  }
};

/**
 * Оновити статтю за Slug
 * PUT /api/blogs/:slug (Захищений)
 */
export const updateBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // 1. Копіюємо дані з тіла запиту
    let updateData = { ...req.body };

    // ОБРОБКА ТЕГІВ: Якщо теги прийшли рядком (наприклад, "React, SEO"), 
    // робимо з них масив, інакше база може видати помилку
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
    }

    // 2. Перевіряємо, чи було завантажено новий файл (картинку)
   if (updateData.faqs) {
      const parsedFaqs = typeof updateData.faqs === 'string' ? JSON.parse(updateData.faqs) : updateData.faqs;
      
      // Створюємо шлях саме до поля faqs, щоб не зачепити views/likes
      updateData["blogDetail.faqs"] = parsedFaqs;
      delete updateData.faqs; // видаляємо тимчасове поле
    }


    // ОБРОБКА TOGGLE (ON/OFF)
if (updateData.isPublished !== undefined) {
  // якщо прийшло як string ("true"/"false") → конвертуємо в boolean
  if (typeof updateData.isPublished === "string") {
    updateData.isPublished = updateData.isPublished === "true";
  }

  // якщо поле знаходиться всередині blogDetail
  updateData["blogDetail.isPublished"] = updateData.isPublished;
  delete updateData.isPublished;
}


    // 3. Обробка картинки
    if (req.file) {
      updateData.blog_image = req.file.path;
    }

    // 4. Оновлення через $set, щоб змінити тільки надіслані поля
    const blog = await Blog.findOneAndUpdate(
      { slug: slug }, 
      { $set: updateData }, 
      { new: true, runValidators: true }
    );

    if (!blog) return res.status(404).json({ message: "Статтю не знайдено" });

    console.log("✅ Статтю успішно оновлено");
    res.status(200).json(blog);
  } catch (error) {
    console.error("❌ Помилка оновлення:", error.message);
    res.status(400).json({ 
      message: "Помилка при оновленні статті", 
      error: error.message 
    });
  }
};

/**
 * Видалити статтю за Slug
 * DELETE /api/blogs/:slug (Захищений)
 */
export const deleteBlog = async (req, res) => {
  
    
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
  

    if (!blog) {
      return res.status(404).json({ message: "Статтю не знайдено" });
    }

    res.status(200).json({ message: "Статтю успішно видалено" });
  } catch (error) {
    res.status(500).json({ message: "Помилка при видаленні статті", error: error.message });
  }
};


// Пошук статей
// Перевірте, чи стоїть слово export перед функцією!
export const searchBlogs = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: "Запит порожній" });
        }
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: q, $options: "i" } },
                { content: { $regex: q, $options: "i" } }
            ]
        });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера при пошуку" });
    }
};


export const getRelatedBlogs = async (req, res) => {
  const { category, currentId } = req.query;

  if (!category) return res.status(400).json({ message: "Category is required" });

  let query = { category };

  // 1. Перевіряємо чи ID валідний ПЕРЕД тим як його конвертувати
  if (currentId && mongoose.Types.ObjectId.isValid(currentId)) {
    try {
      // ОБОВ'ЯЗКОВО додай "new" перед mongoose.Types.ObjectId
      query._id = { $ne: new mongoose.Types.ObjectId(currentId) };
    } catch (err) {
      console.error("Помилка конвертації ID:", err);
      // Якщо конвертація не вдалася, просто не додаємо виключення, але не падаємо
    }
  }

  try {
    const related = await Blog.find(query)
      .limit(3)
      .sort({ createdAt: -1 })
      .select("title slug blog_image createdAt");

    res.json(related);
  } catch (error) {
    console.error("❌ getRelatedBlogs error:", error);
    res.status(500).json({ message: "Помилка завантаження схожих статей" });
  }
};



export const rateBlog = async (req, res) => {
  try {
    const { rating } = req.body; 
    const { id } = req.params;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Рейтинг має бути від 1 до 5" });
    }

    const Blog = mongoose.model("Blog");
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Статтю не знайдено" });
    }

    // Ініціалізуємо об'єкт, якщо його ще немає (для старих постів)
    if (!blog.blogDetail.rating) {
        blog.blogDetail.rating = { average: 0, count: 0, totalSum: 0 };
    }

    blog.blogDetail.rating.totalSum += Number(rating);
    blog.blogDetail.rating.count += 1;
    blog.blogDetail.rating.average = (
      blog.blogDetail.rating.totalSum / blog.blogDetail.rating.count
    ).toFixed(1);

    await blog.save();

    res.status(200).json({
      average: blog.blogDetail.rating.average,
      count: blog.blogDetail.rating.count
    });
  } catch (error) {
    res.status(500).json({ message: "Помилка сервера", error: error.message });
  }
};




export const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // Отримуємо ID користувача з фронтенду

    if (!userId) {
      return res.status(400).json({ message: "Необхідний ID користувача" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Статтю не знайдено" });
    }

    // Перевіряємо, чи цей користувач вже є у списку тих, хто лайкнув
    // (ВАЖЛИВО: У схемі Blog має бути поле likedBy: [String])
    const isLiked = blog.likedBy && blog.likedBy.includes(userId);

    let updatedBlog;

    if (isLiked) {
      // Якщо вже лайкнув — прибираємо лайк і видаляємо ID зі списку
      updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { 
          $inc: { likes: -1 }, 
          $pull: { likedBy: userId } 
        },
        { new: true }
      );
    } else {
      // Якщо ще не лайкав — додаємо лайк і записуємо ID
      updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { 
          $inc: { likes: 1 }, 
          $addToSet: { likedBy: userId } // addToSet гарантує унікальність
        },
        { new: true }
      );
    }

    res.json({ 
      likes: updatedBlog.likes, 
      isLiked: !isLiked // Віддаємо новий статус
    });

  } catch (error) {
    console.error("Помилка на бекенді:", error);
    res.status(500).json({ message: "Помилка сервера" });
  }
};


export const getGoldPageStats = async (req, res) => {
  try {
    const stats = await Lead.aggregate([
      // 🛡️ ВИПРАВЛЕННЯ: Шукаємо саме те джерело, яке приходить від Make.com
      { 
        $match: { 
          source: { $in: ["Gold Page Modal Open", "Gold Page Click"] } 
        } 
      }, 
      
      // Групуємо по назві інструменту
      { 
        $group: { 
          _id: "$articleTitle", 
          totalClicks: { $sum: 1 },
          lastClick: { $max: "$createdAt" }
        } 
      },
      
      // Сортуємо: найпопулярніші зверху
      { $sort: { totalClicks: -1 } }
    ]);

    // Додамо лог у консоль ВС Коду, щоб ти бачила, чи знайшлися дані
    console.log(`📊 Агрегація завершена. Знайдено інструментів: ${stats.length}`);
    
    res.json(stats);
  } catch (err) {
    console.error("Помилка в getGoldPageStats:", err.message);
    res.status(500).json({ error: err.message });
  }
};