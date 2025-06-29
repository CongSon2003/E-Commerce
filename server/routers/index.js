const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCategory");
const blogRouter = require("./blog");
const brandRouter = require("./brand");
const couponRouter = require("./coupon");
const orderRouter = require('./order');
const insertRouter = require("./insert");
const {
  globalErrorHandler,
  errNotFound,
} = require("../middlewares/errorHandling");
const initRouters = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/productCategory", productCategoryRouter);
  app.use("/api/blogCategory", blogCategoryRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/insert", insertRouter);
  // Use the errNotFound middleware
  app.use(errNotFound);
  app.use(globalErrorHandler);
  return app.use("/", (req, res) => {
    res.send("Server Go On...");
  });
};

module.exports = initRouters;
