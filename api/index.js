const express = require('express'); 
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
// const bycrypt = require('bcrypt');
const argon2 = require('argon2');
const app = express();
// const saltRounds = 10;
// const salt = bycrypt.genSaltSync(saltRounds);
// const secret = 'deeewrldfwbblogspotcom';
const jwt = require('jsonwebtoken');
const secret = 'deeewrldfwbblogspotcom';
const cookieParser = require('cookie-parser');
// const multer = require('multer');
// const uploadMiddleware = multer({ dest: 'uploads/' })
const fileUpload = require('express-fileupload');
const fs = require('fs');
require('dotenv').config();

app.use(cors({
    credentials: true, 
    origin: ['https://dee-blog-app.vercel.app', 'http://localhost:3000'],
    // origin:"*",
    methods: ["POST", "GET"]
}));

app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());

async function connectToDatabase() {
    try {
        const mongooseResponse = await mongoose.connect(
            "mongodb+srv://gargdisha1420:4B6DKBZ58NWSUBvI@cluster0.rh8joey.mongodb.net/?retryWrites=true&w=majority", 
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log('MongoDB connected!!!');
        return mongooseResponse;
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

connectToDatabase();


// $2b$10$71u3.hJckqaZ4TzJGu/LxuaL0Qun21wLxqB0TbfY37zG7Gj1c5.2m

// // 4B6DKBZ58NWSUBvI
// // mongodb+srv://gargdisha1420:4B6DKBZ58NWSUBvI@cluster0.rh8joey.mongodb.net/?retryWrites=true&w=majority


const port = process.env.PORT || 4000;

// mongoose.connect(
//     "mongodb+srv://gargdisha1420:4B6DKBZ58NWSUBvI@cluster0.rh8joey.mongodb.net/?retryWrites=true&w=majority", 
//     { useNewUrlParser: true, useUnifiedTopology: true }
// )
// .then(() => console.log("MongoDB connected!!!"))
// .catch(err => console.error("Failed to connect to MongoDB", err));

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get('/api', async(req, res) => {
    res.json({ message: "Home Page" });
});

app.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if(password === confirmPassword) {
        try {
            const hashedPassword = await argon2.hash(password);
            const user = await User.create({ username, email, password: hashedPassword });
            res.json({ user });
        } catch(error) {
            res.status(400).json(error);
        }
    } else {
        res.status(400).json({ error: "Passwords do not match" });
    }
});

app.post('/login', async (req, res) => {
    const { identifier, password } = req.body;
    try {
        const isEmail = identifier.includes('@');
        const query = isEmail ? { email: identifier } : { username: identifier };
    
        const user = await User.findOne(query);
        if(user) {
            const isMatch = await argon2.verify(user.password, password);
            if(isMatch) {
                jwt.sign({ username: user.username, id: user.id }, secret, {}, (err, token) => {
                    if(err) throw err;
                    res.cookie('token', token).json({
                        id: user._id,
                        username: user.username,
                    });
                });
            } else {
                res.status(400).json({ error: "Invalid Credentials" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch(error) {
        res.status(400).json(error);
    }
});

app.get('/profile', async (req, res) => {
    const token = req.cookies.token;
    if(token) {
        jwt.verify(token, secret, {}, (err, info) => {
            if(err) {
                console.error("Error", err);
                res.status(400).json({ error: "Token verification failed" });
            } else {
                res.json(info);
            }
        });
    } else {
        res.status(204).json({ error: "No token provided" });
    }
});

app.post('/post', async (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // Get the uploaded file
    let uploadedFile = req.files.file;
    const { title, summary, content } = req.body;

    // Get the file extension
    const parts = uploadedFile.name.split(".");
    const ext = parts[parts.length - 1];
    const newPath = './uploads/' + uploadedFile.md5 + "." + ext;
   
    // Move the file to the new path
    uploadedFile.mv(newPath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }
  
      // Create a new post and save to the database
      try {
        // Check if token is present
        const token = req.cookies.token;
        if (token) {
          jwt.verify(token, secret, async (err, info) => {
            if (err) {
              console.error("Token verification error:", err);
              return res.status(400).json({ error: "Token verification failed" });
            } 
  
            try {
              const post = await Post.create({ title, summary, content, cover: newPath, author: info.id });
              // Respond with the details
              res.json({ info, post, title, summary, content, filePath: newPath, author: info.id });
            } catch (err) {
              if (err.name === 'ValidationError') {
                return res.status(400).json({ errors: err.errors });
              }
              console.error("Database error:", err);
              return res.status(500).send("Internal server error");
            }
          });
        } else {
          return res.status(401).json({ error: "No token provided" });
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).send("Internal server error");
      }
    });
  });


app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json("ok");
});
