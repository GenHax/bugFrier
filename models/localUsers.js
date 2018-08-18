var mongoose = require('mongoose');

//class schema

var LocalUsersSchema = mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    address:[{
        house_number: {type: String},
        street_address: {type:String},
        city: {type: String},
        state: {type: String},
        zip: {type: String},
    }],
    username: {
        type: String
    },
    email: {
        type: String
    },
    // classes they are registered to
    classes:[{
        class_id: {type: [mongoose.Schema.Types.ObjectId]},
        class_title: {type: String}
    }]
});

//make available outside
var LocalUsers = module.exports = mongoose.model('LocalUsers', LocalUsersSchema);

module.exports.LocalUsersByUsername = (username, callback)=>{
    var query = {username: username};
    LocalUsers.findOne(query, callback);
}