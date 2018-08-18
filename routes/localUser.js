var express = require('express');
var router = express.Router();

SolidWaste = require('../models/solidWaste');
LocalUser = require('../models/localUser');
User = require('../models/user');

router.get('/solidWaste', function(req, res, next){
	LocalUser.getlocalUserByUsername(req.user.username, function(err, localUser){
		if(err) throw err;
		res.render('localUsers/solidWaste', {localUser: localUser});
	});
});

router.post('/solidWaste/register', function(req, res){
	info = [];
	info['localUser_username'] = req.user.username;
	info['solidWaste_id'] = req.body.solidWaste_id;
	info['solidWaste_title'] = req.body.solidWaste_title;

	LocalUser.register(info, function(err, localUser){
		if(err) throw err;
		console.log(localUser);
	});

	req.flash('success_msg', 'You are now registered');
	res.redirect('/localUser/solidWaste');
});


module.exports = router;