import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from './routes/blogRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import integrationRoutes from './routes/integrationRoutes.js';
import './models/Settings.js'; 
import path from 'path';


const __dirname = path.resolve();

dotenv.config();

const app = express();

// 🔥 ВАЖЛИВО
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

connectDB();
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/blogs', blogRoutes);



app.use('/api', integrationRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

app.post("/api/test", (req, res) => {
  console.log("TEST REQ BODY:", req.body);
  res.json({ received: req.body });
});




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Щось пішло не так на сервері!' });
});

