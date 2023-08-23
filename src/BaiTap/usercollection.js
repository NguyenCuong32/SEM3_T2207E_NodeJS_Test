var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
const uniqueValidator = require('mongoose-unique-validator');
const path = require('path');

dotenv.config({ path: "./config.env"});

var app = express();

mongoose.connect(process.env.DATABASE_LOCAL)
                .then(() => {
                    console.log("Connect successfull");
                })
                .catch((err) => console.error("Connect failed:",err))
                .finally(() => {
                    console.log("Finally...");
})


var userSchema = mongoose.Schema({
                    userid: { type: Number, unique: true },
                    username: String,
                    fullname: String,
                    address: String,
});

userSchema.plugin(uniqueValidator, { message: '{VALUE} already exists.' });
                
const User = mongoose.model("User", userSchema);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false  }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Error fetching users' });
    }
  });

app.post('/add-user', async (req, res) => {
  const { username, fullname, address } = req.body;

  try {

    const randomUserid = Math.floor(Math.random() * 100000);
    const newUser = new User({
      userid: randomUserid,
      username,
      fullname,
      address
    });

    await newUser.save();
    console.log('User inserted:', newUser);
    res.json({ message: 'User inserted successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error('Validation Error:', err.errors);
      res.status(400).json({ error: 'Validation error', details: err.errors });
    } else {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Error inserting user' });
    }
  }
});

app.delete('/remove-user/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
      await User.findByIdAndRemove(userId);
      res.json({ message: 'User removed successfully' });
    } catch (err) {
      console.error('Error removing user:', err);
      res.status(500).json({ error: 'Error removing user' });
    }
});


app.listen(3000,"127.0.0.1",()=>{
    console.log("Listening to request on port 3000");
});