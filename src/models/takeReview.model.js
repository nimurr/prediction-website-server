const mongoose = require('mongoose');

const TakeReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // optional reference to your Users collection
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post', // optional reference to Posts collection
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('TakeReview', TakeReviewSchema);
