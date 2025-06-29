const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const initRouters = require('./routers')
const dbConnect = require('./config/dbConnect')

const app = express()
const port = process.env.PORT || 5000

// Middleware để xử lý CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin : process.env.CLIENT_URL || 'http://localhost:3000', // Cho phép truy cập từ địa chỉ client
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'], // Các headers được phép
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP được phép
  credentials : true, // Cho phép gửi cookie từ client
}))
// Middleware để phân tích dữ liệu JSON của client gửi đến server
app.use(express.json())
// Middleware để phân tích dữ liệu URL-encoded, các biểu mẫu HTML (HTML FORMS)
app.use(express.urlencoded({ extended : true })) // "extended: true" : Cho phép bạn gửi các đối tượng và mảng phức tạp, Các đối tượng lồng nhau trong dữ liệu.
// Sử dụng cookie-parser middleware
app.use(cookieParser());
// Connent db 
dbConnect()
 
// Use Route 
initRouters(app)

app.listen(port, () => {
  console.log(`Server running on the port : ${port}`);
})