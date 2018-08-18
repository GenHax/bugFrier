var express = require('express');
var router = express.Router();

var SolidWaste = require('../models/solidWaste');

//SolidWaste Page
router.get('/', function(req, res, next) {
	SolidWaste.getSolidWaste(function(err, solidWaste){
		if(err) throw err;
		res.render('solidWaste/index', { solidWaste: solidWaste });
	},3);
});

// SolidWaste Details
router.get('/:id/details', function(req, res, next) {
	SolidWaste.getSolidWasteById([req.params.id],function(err, solidWaste){
		if(err) throw err;
		res.render('solidWaste/details', { solidWaste: solidWasteName });
	});
});


module.exports = router;
