const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ username: String, comment: String }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
