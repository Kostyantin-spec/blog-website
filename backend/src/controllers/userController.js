import User from "../models/User.js";
import jwt from "jsonwebtoken";


//---------------------------
// Повертає всіх користувачів
// ---------------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // не повертаємо пароль
    res.status(200).json(users);
  } catch (error) {
    console.error("GetAllUsers Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Генерація JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Реєстрація
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "Користувач вже існує" });

  const user = await User.create({ name, email, password });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};




export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        token: generateToken(user._id),
        role: user.role
      });
    } else {
      return res.status(401).json({ message: "Невірний email або пароль" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Помилка сервера" });
  }
};