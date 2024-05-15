const express = require('express'); 
const cors = require('cors');
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

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

// mongoose.sync({force:true})
// .then(()=>{
//     console.log("Drop and re-sync db.");
// })

mongoose.connect("mongodb+srv://gargdisha1420:4B6DKBZ58NWSUBvI@cluster0.rh8joey.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log('MongoDB connected!!!'))
.catch(err => console.log(err));


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
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    try{
        if(user){
            const isMatch = await bycrypt.compare(password, user.password);
            if(isMatch){
                // res.json({ user });
                jwt.sign({username, id: user.id}, secret, {}, (err, token) => {
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
            if(err) throw err;
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
    // try{

    // }
    // res.json({files:req.file});
    res.json({title,summary,description});
    res.cookie('token', '').json("ok");
})

app.get('/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
})


app.post('/logout', (req, res) => {
    res.cookie('token', '').json("ok");
})

app.listen(4000, () => console.log('Server running on port 4000'));
// 4B6DKBZ58NWSUBvI
// mongodb+srv://gargdisha1420:4B6DKBZ58NWSUBvI@cluster0.rh8joey.mongodb.net/?retryWrites=true&w=majority