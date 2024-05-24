const express = require('express'); 
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const bycrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const salt = bycrypt.genSaltSync(saltRounds);
const secret = 'deeewrldfwbblogspotcom';
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');

app.use(cors({
    credentials: true, 
    // origin: ['https://dee-blog-app.vercel.app'],
    // origin: 'http://localhost:3000',
    origin:"*",
    methods: ["POST", "GET", "PUT", "DELETE"]
}));

// app.use(express.json());
// app.use(cookieParser());

// const port = process.env.PORT || 4000;

// mongoose.sync({force:true})
// .then(()=>{
//     console.log("Drop and re-sync db.");
// })
app.listen(4000, () => console.log('Server running on port 4000'));

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

// app.get('/', async (req, res)=>{
//     try {
//         const response = await axios.get('https://dee-blog-app-api.vercel.app/');
//         res.send(`Response from external API: ${JSON.stringify(response.data)}`);
//     } catch (error) {
//         res.status(500).send(`Error fetching data from external API: ${error}`);
//     }
// });
app.get('/api', async(req, res) => {
    res.json({message: "Home Page"});
});

app.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if(password === confirmPassword){
        const hashedPassword = await bycrypt.hash(password, salt);
        try{
                const user = await User.create({ username, email, password: hashedPassword});
                res.json({ user });
        }
        catch(error){
            res.status(400).json(error);
        }
    }
});

app.post('/login', async (req, res) => {
    const { identifier, password } = req.body;
    try{
        const isEmail = identifier.includes('@');
        const query = isEmail ? { email: identifier } : { username: identifier };
    
        const user = await User.findOne(query);
        console.log(user);
        if(user){
            const isMatch = await bycrypt.compare(password, user.password);
            if(isMatch){
                // res.json({ user });
                jwt.sign({username: user.username, id: user.id}, secret, {}, (err, token) => {
                    if(err) throw err;
                    res.cookie('token', token).json({
                        id: user._id,
                        username: user.username,
                    });
                }
                );
            }
            else{
                res.status(400).json({ error: "Invalid Credentials1!!!" });
            }
        }
        else{
            res.status(400).json({ error: "Invalid Credentials2!!!" });
        }
    }
    catch(error){
        res.status(400).json(error);
    }
});

app.get('/profile', async (req, res) => {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, secret,{}, async (err, info) => {
            // if(err) throw err;
            if(err){
                console.log("Error",err);
            }
            res.json(info);
        });
    }
})

app.post('/post', uploadMiddleware.single('file'),(req,res)=>{
    // console.log(req.body);
    const {originalname,path} = req.file;
    const {title,summary,description} = req.body;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    // console.log(newPath);
    // try{

    // }
    res.json({title,summary,description});
    
    res.cookie('token', '').json("ok");
    alert("Post Created Successfully!!");
})

app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
})


app.post('/logout', (req, res) => {
    res.cookie('token', '').json("ok");
})


// // 4B6DKBZ58NWSUBvI
// // mongodb+srv://gargdisha1420:4B6DKBZ58NWSUBvI@cluster0.rh8joey.mongodb.net/?retryWrites=true&w=majority
