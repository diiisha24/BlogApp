const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true
        },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
        },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
        }
});

const Usermodel = model('User', userSchema);

module.exports = Usermodel;
    


