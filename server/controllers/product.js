const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const uniqid = require('uniqid');
// Tạo mới sản phẩm
const createProduct = asyncHandler(async (req, res) => {
  const { title, description, brand, price, quantity } = req.body;
  if (Object.keys(req.body).length === 0 && !title)
    throw new Error("Missing inputs");
  const slug = slugify(title, { locale: "vi", lower: true });
  const thumb = req.files.thumb[0].path; // Lấy đường dẫn của ảnh thumb
  if (!thumb) throw new Error("Missing thumb image");
  const images = req.files?.images?.map(file => file.path) || []; // Lấy đường dẫn của các ảnh khác, nếu không có thì để mảng rỗng
  if (thumb) {
    req.body.thumb = thumb; // Gán đường dẫn ảnh thumb vào req.body
  }
  if (images.length > 0) {
    req.body.images = images; // Gán mảng ảnh vào req.body
  }
  req.body.slug = slug; // Gán slug vào req.body
  const response = await Product.create(req.body);
  return res
    .status(response ? StatusCodes.CREATED : StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: response ? true : false,
      response: response ? response : null,
      message : response ? 'Create product successfully' : 'Create product failed'
    });
});

// Nấy 1 sản phẩm (getOneProduct)
const getOneProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById({ _id: productId }).populate({
    path : 'ratings',
    populate : {
      path : 'postedBy',
      select : 'firstname lastname'
    }
  });
  return res
    .status(product ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: product ? true : false,
      message: product ? "getOneProduct successfully" : "getOneProduct failed",
      response: product ? product : null,
    });
});
const getOneProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findOne({slug});
  return res.status(product ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: product ? true : false,
    message: product ? "getOneProduct successfully" : "getOneProduct failed",
    response: product ? product : null,
  });
})
// Nấy tất cả sản phẩm trong db
const getAllProduct = asyncHandler(async (req, res) => {
  const productAll = await Product.find();
  return res
    .status(productAll ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: productAll ? true : false,
      message: productAll
        ? "getAllProduct successfully"
        : "getAllProduct failed",
      count: productAll ? Object.keys(productAll).length : 0,
      response: productAll ? productAll : null,
    });
});

// Cập nhật một sản phẩm (product) trong db
const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (Object.keys(req.body).length === 0 || !productId)
    throw new Error("Missing inputs");
  let thumb
  let images
  // Nếu gửi images hoặc thumb bằng file thì nấy giá thị path nếu không thì giữ nguyên giá trị
  
  if (req.files?.images) { 
    req.body.images = req.files.images?.map(imge => imge.path);
  }
  if (req.files?.thumb) {
    req.body.thumb = req.files.thumb[0].path;
  }
  // Nếu title được cập nhật thì slug cũng được cập nhật theo title
  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { locale: "vi" });
  }
  if (req.body.thumb) {
    req.body.thumb = typeof req.body.thumb === 'array' ? req.body.thumb[0] : req.body.thumb
  }
  // Tìm product và update
  const response = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    { new: true }
  );
  return res
    .status(response ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: response ? true : false,
      message: response
        ? "Product has been updated successfully!"
        : "Update failed!",
      response: response ? response : null,
    });
});

// Xóa một sản phẩm (product) trong db
const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) throw new Error("Missing inputs");
  // Tìm product và xóa
  const response = await Product.findByIdAndDelete({ _id: productId });
  return res
    .status(response ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: response ? true : false,
      message: response
        ? "Product has been deleted successfully!"
        : "Delete failed!",
      response: response ? response : null,
    });
});

// Filter, sorting, pagination
// Default : get all products
const getProducts = asyncHandler(async (req, res) => {
  // VD :
  /*
    queryObj = { price : { gt : 100000} } 
    queryString = { "price" : { "$gt" : 10000}}
  */
  // 1A, filtering
  const queryObj = { ...req.query }; // copy query

  // Tách các trường đặt biệt ra khỏi query :
  const excludedFields = ["limit", "sort", "page", "fields"];
  excludedFields.forEach((item) => delete queryObj[item]);
  console.log(queryObj);
  // 1B, Advenced filtering
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt|eq)\b/g,
    (machEl) => `$${machEl}`
  );
  let query = JSON.parse(queryString);
  let colorQueryObject = {}
  // 1C, Tìm kiếm theo title sản phẩm (product)
  if (query.title) query.title = { $regex: query.title, $options: "i" };
  if (query.category === 'all') { 
    delete query.category
  }
  if (query.category) query.category = { $regex: query.category, $options: "i" }
  if (query.color) {
    delete query.color;
    const arrayColor = queryObj.color.split(',');
    const objectColor = arrayColor.map(el => ({color : {$regex : el, $options : 'i'}}));
    colorQueryObject = { $or : objectColor };
  }
  const queryEnd = {...query, ...colorQueryObject}
  let products = {}
  // console.log("QUERY eND", queryEnd);
  // Nếu query rỗng thì mặt định nấy tất cả dữ liệu trong db
  products = Product.find(queryEnd);
  // console.log(products.exec());
  // 2, Sorting
  if (req.query.sort) {
    console.log(req.query.sort);
    const sortBy = req.query.sort.split(",").join(" ");
    products = products.sort(sortBy);
  } else {
    products = products.sort("-createdAt");
  }

  //3) Field Limiting
  // fields = ad,da
  // Select pattern  .select("firstParam secondParam"), it will only show the selected field, add minus sign for excluding (include everything except the given params)
  // .select("firstParam secondParam") : nó chỉ hiện thị các trường đã chọn, Thêm dấu trừ để loại trừ (bao gồm mọi thứ ngoại trừ các params đã cho)
  if (req.query.fields) {
    const fieldsBy = req.query.fields.split(",").join(" ");
    products = products.select(fieldsBy);
  }

  // 4) Pagination
  // vd : page=2&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  console.log(limit);
  const page = +req.query.page || 1;
  const skip = (page - 1) * +limit;
  console.log("limit : ", limit);
  products = products.limit(limit).skip(skip);
  //EXECUTE QUERY
  // Sử dụng exec() để thực hiện truy vấn
  // console.log(productsFinal);
  products
    .exec()
    .then(async (data) => {
      const totals = await Product.find().countDocuments();
      const SearchesParamsAll = await Product.find(queryEnd);
      return res.status(StatusCodes.OK).json({
        success: true,
        counts: data.length, // countLimit,
        NumberSearches : SearchesParamsAll.length,
        totalsProducts : totals,
        response: data,
      });
    })
    .catch((err) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    });
});

// Đánh giá sản phẩm
const ratings = asyncHandler(async (req, res) => {
  // _id : là của người muốn đánh giá sản phẩm
  const { _id } = req.user;
  // Dữ liệu người dùng (client) gửi để đánh giá sản phẩm
  const { star, comment, pid, updatedAt } = req.body;
  // pid : là _id của sản phẩm muốn đánh giá
  if (!star || !pid) {
    throw new Error("Missing Inputs");
  }

  //1,  Tìm sản phẩm theo pid, để tạo đánh giá mới hoặc update đánh giá đã tồn tại
  const product = await Product.findById({ _id: pid });
  // Tìm [true | false] để kiểm tra xem người dùng đã đánh giá trước đó chưa, nếu chưa thì add rangting còn rồi thì update
  const alreadyRatings = product?.ratings.find(
    (ranting) => ranting.postedBy.toString() === _id
  ); // .toString()
  if (alreadyRatings) {
    // update : star && comment
    // Tìm sản phẩm có rangtings.posted == _id của người đánh giá và update field
    await Product.findOneAndUpdate(
      { "ratings.postedBy": _id },
      { $set: { "ratings.$.star": star, "ratings.$.comment": comment, "ratings.$.updatedAt" : updatedAt } },
      { new: true }
    );
  } else {
    // add : star new && comment new
    await Product.findByIdAndUpdate(
      { _id: pid },
      {
        $push: { ratings: { star, comment, postedBy: _id, updatedAt } },
        $inc: { aggregateRating: 1 },
      },
      { new: true }
    );
  }

  //2, Tíng trung bình số star đã đánh giá
  // Tìm sản phẩm để tính trung bình
  const productReview = await Product.findById({ _id: pid });
  const ratingsCounts = productReview.ratings.length;
  const totalRatings =
    productReview.ratings.reduce(
      (accumulator, currentValue) => accumulator + +currentValue.star,
      0
    ) / ratingsCounts;
  productReview.totalRatings = Math.round(totalRatings * 10) / 10;
  await productReview.save();
  return res.status(200).json({
    success: true,
    message: "Ratings successfully",
    response: productReview,
  });
});

// Upload Image
const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) throw new Error("Missing inputs");
  if (!req.files) throw new Error("No files uploaded");
  const response = await Product.findByIdAndUpdate(
    { _id: productId },
    { $push: { images: { $each: req.files.map((file) => file.path) } } },
    { new: true }
  );
  // $each : cho phép bạn thêm nhiều phần tử vào mảng trong MongoDB
  return res
    .status(response ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: response ? true : false,
      message: response ? "Upload images successfully" : "Upload images failed",
      response: response ? response : null,
    });
});
// addVarriant
const addVarriantProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { color, price, title } = req.body;
  if (!color && !price) {
    throw new Error('Missing Inputs');
  }
  console.log(req.files);
  const thumb = req.files?.thumb[0]?.path;
  const images = req.files?.images?.map(imge => imge.path);
  const sku = uniqid();
  const response = await Product.findByIdAndUpdate({_id : productId}, { $push : { varriants : { color, price, thumb, sku, title, images }}}, { new : true});
  return res
    .status(response ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: response ? true : false,
      message: response
        ? "Product has been added successfully!"
        : "Added failed!",
      response: response ? response : null,
    });

})
module.exports = {
  createProduct,
  getOneProduct,
  getAllProduct,
  getProducts,
  getOneProductBySlug,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
  addVarriantProduct

};
