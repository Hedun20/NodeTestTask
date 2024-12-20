const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const profileRoutes = require("./routes/profile");

dotenv.config();

const app = express();

// Подключение к базе данных
connectDB();

// Миддлвары
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

// Маршруты
app.use("/api", profileRoutes);

// Обработка неизвестных маршрутов
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
