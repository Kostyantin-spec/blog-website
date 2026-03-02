import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ---------------------------
// РЕЄСТРАЦІЯ АДМІНА
// ---------------------------
export const registerAdmin = async (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Заповніть всі поля" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Адмін вже існує" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: "Адмін створений" });
  } catch (error) {
    console.error("RegisterAdmin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const loginAdmin = async (req, res) => {
  try {
    console.log("📡 Спроба входу:", req.body.email);
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("❌ Адміна не знайдено");
      return res.status(401).json({ message: "Невірний email або пароль" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("❌ Пароль не підійшов");
      return res.status(401).json({ message: "Невірний email або пароль" });
    }

    // Використовуємо fallback, якщо секрет не знайдено
    const secret = process.env.JWT_SECRET || "super_secret_key_123";
    
    const token = jwt.sign(
      { id: admin._id, name: admin.name, email: admin.email },
      secret,
      { expiresIn: "7d" }
    );

    console.log("✅ Токен створено, відправляю відповідь");
    
    // ВАЖЛИВО: використовуємо return, щоб гарантувати завершення запиту
    return res.status(200).json({
      message: "Успішний вхід",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("🔥 Помилка в loginAdmin:", error);
    return res.status(500).json({ message: "Помилка сервера" });
  }
};