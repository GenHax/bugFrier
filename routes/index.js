const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const Garbage = mongoose.model('garbages');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

router.get('/',ensureGuest, (req, res, next)=>{
    res.render('index/welcome');
});

router.get('/about', (req, res, next)=>{
    res.render('index/about');
});

router.get('/garbageHistory',ensureAuthenticated, (req, res, next)=>{
    Garbage.find({user:req.user.id})
    .then(garbages=>{
        res.render('index/garbageHistory', {
            garbages: garbages
        });
    });
    
});



module.exports = router;