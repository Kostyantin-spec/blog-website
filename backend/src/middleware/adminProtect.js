import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js"; 


export const adminProtect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      
      if (!token || token === "undefined" || token === "null") {
         return res.status(401).json({ message: "Токен відсутній або некоректний" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
      req.admin = decoded;
      next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      return res.status(401).json({ message: "Неавторизовано, токен пошкоджено" });
    }
  } else {
    return res.status(401).json({ message: "Немає токена" });
  }
};