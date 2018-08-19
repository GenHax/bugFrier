const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const GarbageSchema = new Schema({
    title: {type:String, required: true },
    body: {type: String},
    status: {type: String, default: 'public'},
    wasteType: {type: String, default: 'plastic'},
    wasteQuantity: {type: String, default: 'one'},
    allowComments: {type: Boolean, default: true},
    comment: [{
        commentBody: {type: String, required: true},
        commentDate: {type: Date, default: Date.now()},
        commentUser: {type: Schema.Types.ObjectId, ref: 'users'}
    }],
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    date: {type: Date, default: Date.now()}
});

//creating collection and add schema
mongoose.model('garbages', GarbageSchema, 'garbages');
