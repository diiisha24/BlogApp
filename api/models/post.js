const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true
        },
    summary: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
        },
    content: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
        },
    cover:{
        type: String,
    }
},{
    timestamps: true
});

const Postmodel = model('Post', postSchema);

module.exports = Postmodel;
    


