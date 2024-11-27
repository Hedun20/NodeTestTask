const UserProfile = require("../models/UserProfile");

// Получение данных профиля
const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
  console.log("Found profile: ", profile);
};

const updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.avatarUrl;

    const profile = await UserProfile.findOneAndUpdate({}, updates, {
      new: true,
      runValidators: true,
    });

    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Загрузка аватара
const uploadAvatar = async (req, res) => {
  try {
    // Проверка наличия файла
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Ищем профиль пользователя по userId
    const profile = await UserProfile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // Обновляем URL аватара
    profile.avatarUrl = `/uploads/avatars/${file.filename}`;
    await profile.save();
    console.log("Updating avatarUrl to: ", `/uploads/avatars/${file.filename}`);

    // Возвращаем URL аватара
    res.json({ avatarUrl: profile.avatarUrl });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProfile, updateProfile, uploadAvatar };
