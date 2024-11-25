const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  surname: { type: String, required: true, minlength: 2, maxlength: 50 },
  jobTitle: { type: String, maxlength: 100 },
  phone: { type: String, required: true, match: /^\+\d{10,15}$/ },
  address: { type: String, maxlength: 200 },
  interests: { type: [String], validate: (v) => v.length <= 10 },
  isPublic: { type: Boolean, default: false },
  avatarUrl: { type: String },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
