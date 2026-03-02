import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js"; 

export const adminProtect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 1. Спочатку шукаємо в Admin (бо ти логінишся як адмін)
      let account = await Admin.findById(decoded.id).select("-password");

      // 2. Якщо в Admin не знайшли, шукаємо в User
      if (!account) {
        account = await User.findById(decoded.id).select("-password");
      }

      if (!account) {
        console.log("❌ Користувача або Адміна з таким ID в базі НЕМАЄ");
        return res.status(401).json({ message: "Користувача не знайдено" });
      }

      req.user = account; // Записуємо знайдені дані в запит
      next();
    } catch (error) {
      console.error("Помилка токена:", error);
      res.status(401).json({ message: "Не авторизований, токен недійсний" });
    }
  } else {
    res.status(401).json({ message: "Не авторизований, немає токена" });
  }
};