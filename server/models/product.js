const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      // unique : true,
      lowercase: true,
    },
    description: {
      type: Array,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
        updatedAt : {
          type : Date,
        }
      },
    ],
    varriants: [
      {
        title : { type : String},
        color : {type : String},
        price : {type : Number},
        quantity : {type : Number},
        thumb : {type : String},
        images : { type : Array},
        sku : {type : String},
      }
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
    aggregateRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
