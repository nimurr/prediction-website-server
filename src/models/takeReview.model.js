const mongoose = require('mongoose');

const TakeReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    ref: 'User', // optional reference to your Users collection
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Post ID is required'],
    ref: 'Post', // optional reference to Posts collection
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 0,
    max: 5
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('TakeReview', TakeReviewSchema);
