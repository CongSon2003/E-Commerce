const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numberViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://wallpapers.com/images/hd/we-bare-bears-grizz-and-quote-fxibc0y3qiqv19dd.jpg",
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true, // Tự động thêm các trường thời gian cho tài liệu. (vd : createAt, updateAt)
    toJSON: { virtuals: true }, // Bao gồm các thuộc tính ảo khi chuyển đổi thành JSON.
    toObject: { virtuals: true }, // Bao gồm các thuộc tính ảo khi chuyển đổi thành đối tượng JavaScript thông thường.
  }
);

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
