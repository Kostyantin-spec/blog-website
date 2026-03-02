import Lead from '../models/Lead.js';
import Comment from '../models/Comment.js';
import Settings from '../models/Settings.js';
import axios from 'axios';

export const handleUniversalForm = async (req, res) => {
  try {
    const { name, email, text, source, articleTitle, articleSlug, contact } = req.body;
    const src = source ? source.toLowerCase() : "";

    // 1. ПЕРЕВІРКА: Коментар чи Лід?
    const isComment = src.includes("comment") && !src.includes("community");

    if (isComment) {
      // Зберігаємо як коментар
      await Comment.create({
        name,
        email: email || contact,
        text,
        articleSlug,
        articleTitle,
        source: "Article Comment",
        isApproved: false
      });
      console.log("💾 Збережено як КОМЕНТАР");
    } else {
      // Все інше — в Ліди (Підписки, контакти і т.д.)
      await Lead.create({
        name: name || "Підписник",
        email: email || contact,
        message: text || (src.includes("community") ? `Підписка: ${articleTitle}` : "Без повідомлення"),
        source: source || "Lead",
        articleTitle: articleTitle || "Системне сповіщення"
      });
      console.log(`💾 [${source}] збережено як ЛІД`);
    }

    

    // 2. ВІДПРАВКА В MAKE.COM (БЕЗ ЖОРСТКИХ ПЕРЕВІРОК)
    // Просто беремо URL і відправляємо, як було раніше
    const settings = await Settings.findOne({ key: 'global_config' });
    const makeUrl = settings?.makeWebhookUrl;

    if (makeUrl && makeUrl.startsWith('http')) {
  try {
    // Визначаємо actionType
    let determinedActionType = "lead"; 
    if (source?.toLowerCase().includes("comment")) determinedActionType = "comment";
    if (source?.toLowerCase().includes("add post")) determinedActionType = "add_post";
    if (source?.toLowerCase().includes("edit post")) determinedActionType = "edit_post";
    if (source?.toLowerCase().includes("reshare")) determinedActionType = "reshare";

    // Визначаємо extraData безпечним способом
    let determinedExtraData = {};  // якщо undefined, буде пустий об’єкт

    await axios.post(makeUrl, {
      name: name || "Адмін",
      email: email || contact || "",       
      text: text || "",
      source: source || "Lead",           
      articleTitle: articleTitle || "n/a",
      articleSlug: articleSlug || "n/a",     
      actionType: determinedActionType,
      extraData: determinedExtraData,
      site: "MARKETINGKIT",
      sentAt: new Date().toISOString()
    });

    console.log("✅ Відправлено в Make.com з actionType:", determinedActionType);
  } catch (err) {
    console.error("⚠️ Make.com error:", err.message);
  }
}



    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Помилка:", error);
    return res.status(500).json({ error: "Помилка сервера" });
  }
};

export const testMakeWebhook = async (req, res) => {
  try {
    const { webhookUrl } = req.body;
    
    if (!webhookUrl || !webhookUrl.startsWith('http')) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    console.log("==> Тестування Webhook:", webhookUrl);

    await axios.post(webhookUrl, {
      message: "Test connection from Admin",
      site: "BlogWise"
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("==> Помилка при тестуванні вебхука:", error.message);
    return res.status(400).json({ error: error.message });
  }
};