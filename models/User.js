const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
    googleID: {
        type:String,
        required: true // required=true when google is only authentication process
    },
    email: {type: String, required: true },
    firstName: {type: String},
    lastName: {type: String},
    image: {type: String},
    houseNumber: {type: String},
    address: {type: String},
    pin: {type: Number},

});

//creating collection and add schema
mongoose.model('users', UserSchema);
