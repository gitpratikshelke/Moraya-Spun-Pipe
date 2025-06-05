const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  rating: [{
    type: Number,
    required: true,
  }],
  feedback: [{
    type: String,
    required: true,
  }],
  name: [{
    type: String,
    required: true,
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Review", reviewSchema);
