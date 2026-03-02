import Blog from '../models/Blog.js';
import Settings from '../models/Settings.js';
import axios from 'axios';
import { createUnifiedPayload } from "../../utils/createUnifiedPayload.js";

export const handleReshare = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Статтю не знайдено"
      });
    }

    const settings = await Settings.findOne({ key: "global_config" });

    if (settings?.makeWebhookUrl) {

      const payload = createUnifiedPayload(
        "reshare",
        blog,
        settings
      );

      // ❗ Без await — щоб не ламало адмінку
      axios.post(settings.makeWebhookUrl, payload)
        .then(() => console.log("📨 Reshare webhook sent"))
        .catch(err => console.log("Make webhook error:", err.message));
    }

    blog.reshareCount = (blog.reshareCount || 0) + 1;
    await blog.save();

    return res.json({
      success: true,
      newCount: blog.reshareCount
    });

  } catch (error) {
    console.error("Reshare error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Помилка при репості"
    });
  }
};


 export const reshareCount = { handleReshare };