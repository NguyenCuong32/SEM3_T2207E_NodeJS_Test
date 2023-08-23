const express = require('express');
const app = express();
const connectToDatabase  = require('./config/database');
const User = require('./models/User');

// Kết nối tới MongoDB
connectToDatabase();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 

// Hiển thị danh sách người dùng
app.get('/', async (req, res) => {
    const users = await User.find();
    res.render('index', { users });
  });
  
  app.get('/create', (req, res) => {
    res.render('create');
  });
  
  // Xử lý thêm người dùng
  app.post('/create', async (req, res) => {
    console.log(req.body);
    try {
      const newUser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        address: req.body.address
      });
      
      await newUser.save();
      console.log('Đã thêm người dùng mới:', newUser);
      res.redirect('/');
    } catch (error) {
      console.error('Lỗi thêm người dùng:', error);
      res.status(500).send('Lỗi thêm người dùng');
    }
  });
  
  // Hiển thị giao diện sửa thông tin người dùng
  app.get('/edit/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('edit', { user });
  });
  
  // Xử lý sửa thông tin người dùng
  app.post('/edit/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
  });
  
  // Xử lý xóa người dùng
  app.get('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');
  });

// Khởi chạy server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server đang lắng nghe tại cổng ${port}`);
});