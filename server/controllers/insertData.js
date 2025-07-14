const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const dataProduct = require("../data/ecommerce.json");
const dataProductCategory = require("../data/cate_brand");
const getNumberFromString = require("../ultils/getNumber");
const slugify = require("slugify");

const createProduct = async (data) => {
  // console.log(slugify(data?.name, { locale: "vi", lower: true }));
  console.log(data);
  await Product.create({
    title: data?.name,
    description: data?.description,
    slug:
      slugify(data?.name, { locale: "vi", lower: true }) +
      "-" +
      Math.round(Math.random() * 1000),
    brand: data?.brand,
    thumb: data?.thumb,
    price: Math.round(getNumberFromString(data.price) / 100),
    category: data?.category[1],
    quantity: data?.quantity,
    totalRatings : 0,
    sold: data?.sold,
    images: data?.images,
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: data?.images,
    color:
      data?.variants?.find((item) => item.label === "Color")?.variants[0] ||
      "red",
  });
};
const createProductCategory = async (data) => {
  await ProductCategory.create({
    title: data?.cate,
    brand: data?.brand,
    image: data?.image,
  });
};
const insertProductCategory = asyncHandler(async (req, res) => {
  const promiseProductCategory = [];
  for (let product of dataProductCategory) {
    promiseProductCategory.push(createProductCategory(product));
  }

  await Promise.all(promiseProductCategory);
  return res.json("done");
});
const insertProducts = asyncHandler(async (req, res) => {
  const promiseProduct = [];
  for (let product of dataProduct) {
    promiseProduct.push(createProduct(product));
  }

  await Promise.all(promiseProduct);
  return res.json("done");
});

module.exports = { insertProducts, insertProductCategory };
