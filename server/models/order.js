const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Tham chiếu đến bảng/collection User
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      count: { type: Number },
      color: { type: String },
    },
  ],
  coupon : {
    type : mongoose.Types.ObjectId,
    ref : 'Coupon'
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "canceled"],
    default: "pending", // Trạng thái đơn hàng
  },
  total : {
    type : Number,
    required : true
  },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "paypal", "bank_transfer"],
    required: true,
  },
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
