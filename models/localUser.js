var mongoose = require('mongoose');

// LocalUser Schema
var LocalUserSchema = mongoose.Schema({
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	address: [{
		street_address:{type: String},
		city:{type: String},
		state:{type: String},
		zip:{type: String}
	}],
	username: {
		type: String
	},
	email: {
		type: String
	},
	solidWaste:[{
		solidWaste_id:{type: [mongoose.Schema.Types.ObjectId]},
		solidWaste_title: {type:String}
	}]
	
});

var LocalUser = module.exports = mongoose.model('LocalUser', LocalUserSchema);

module.exports.getLocalUserByUsername = function(username, callback){
	var query = {username: username};
	LocalUser.findOne(query, callback);
}

