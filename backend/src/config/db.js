// backend/src/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MBlog", // Це 100% змусить дані йти в потрібну базу
    });
    console.log(`✅ База підключена: ${conn.connection.name}`);
  } catch (error) {
    console.error("Помилка:", error.message);
  }
};

export default connectDB;
