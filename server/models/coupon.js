const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true, // Đảm bảo mỗi mã coupon là duy nhất
        uppercase : true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'], // Loại giảm giá: theo phần trăm hoặc số tiền cố định
        required: true
    },
    discountValue: {
        type: Number,
        required: true // Giá trị giảm giá
    },
    usedCount: {
        type: Number,
        default: 0 // Số lần coupon đã được sử dụng
    },
    isActive: {
        type: Boolean,
        default: true // Trạng thái hoạt động của coupon
    },
    expirationDate : {
        type: Date,
        required: true // Ngày hết hạn của coupon
    }
}, {timestamps : true});

//Export the model
module.exports = mongoose.model('Coupon', couponSchema);