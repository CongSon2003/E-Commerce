const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema({
  title:{
    type:String, // Đảm bảo tên thương hiệu là duy nhất
    required:true,
    unique:true,
  },
  logo:{
    type:String,
    required:false, // Đường dẫn tới logo (hoặc có thể là một URL)
  },
  description: {
    type: String,
    required: false // Mô tả bổ sung về thương hiệu
  }
}, {timestamps : true});

//Export the model
module.exports = mongoose.model('Brand', brandSchema);