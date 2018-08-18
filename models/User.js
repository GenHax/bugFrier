var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var async = require('async');

//class schema

var UserSchema = mongoose.Schema({
    username: {
        type: String
    },
    email:{
        type: String
    },
    password: {
        type: String,
        bcrypt: true
    },
    type:{
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

//get user by id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//get user by username
module.exports.getUserByUsername = function(username, callback){
var query = {username: username}
    User.findOne(query, callback);
}

//compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    });
}
// Create newUser User
module.exports.saveUser = function(newUser, newUser, callback){
	bcrypt.hash(newUser.password, 10, function(err, hash){
		if(err) throw errl
		// Set hash
		newUser.password = hash;
		console.log('newUser is being saved');
		async.parallel(newUser.save, callback);
	});
}
