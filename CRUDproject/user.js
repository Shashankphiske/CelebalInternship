const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    age : {
        type : Number,
        required : true
    }
})

const userSchema = mongoose.model('userSchema', user);

module.exports = { userSchema } 