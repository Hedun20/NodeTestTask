const UserProfile = require("../models/UserProfile");

// Получение данных профиля
const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновление данных профиля
const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
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
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const profile = await UserProfile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.avatarUrl = `/uploads/avatars/${file.filename}`;
    await profile.save();

    res.json({ avatarUrl: profile.avatarUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProfile, updateProfile, uploadAvatar };
