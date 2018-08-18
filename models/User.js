const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//reate schema
const UserSchema = new Schema({
    googleID: {
        type:String,
        required: true // required=true when google is only authentication process
    },
    email: {type: String, required: true },
    firstName: {type: String},
    lastName: {type: String},
    image: {type: String}

});

//creating collection and add schema
mongoose.model('users', UserSchema);