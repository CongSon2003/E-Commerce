const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { type } = require("os");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar : {
      type : String
    },
    cart: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        color: String,
        thumb : String,
        price : Number,
        priceChanged : Number
      },
    ],
    address: String,
    wishlist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    passwordChangeAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
    registerToken : {
      type : String
    },
    role: {
      type: Number,
      // 1945 : admin
      // 1975 : user
      enum : [1945, 1975],
      default: 1975,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware để hash password trước khi lưu
userSchema.pre("save", async function (next) {
  // Kiểm tra xem mật khẩu đã được thay đổi hay chưa
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next(error);
  }
});

userSchema.methods = {
  isCorrectPassword: function (password) {
    return bcrypt.compareSync(password, this.password);
  },
  // Hàm này tạo token, khi người dùng muốn đổi password được lưu trong db 'passwordResetToken'
  createTokenPasswordChanged: function () {
    const resetToken = crypto.randomBytes(16).toString("hex"); // Generates 16 random bytes // Tạo Token Ngẫu Nhiên
    // Hashing Token:
    const resetToken_hash = crypto.createHash("sha256").update(resetToken).digest("hex");
    /*
      +, createHash("sha256"): Tạo một hash SHA-256.
      +, update(resetToken): Cập nhật hash với token đã tạo.
      +, digest("hex"): Biến đổi hash thành chuỗi hex.
    */
    this.passwordResetToken = resetToken_hash;
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken; 
  },
};
//Export the model
module.exports = mongoose.model("User", userSchema);
