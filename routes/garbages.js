const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Garbage = mongoose.model('garbages');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

//garbages index
router.get('/', (req, res)=>{ //not restricting because public garbages should be acessible
    Garbage.find({status: 'public'})
        .populate('user')
        .sort({pin: 'desc'})
        .then(garbages=>{
            res.render('garbages/index', {
                garbages: garbages
            });  
        });
    
});

//show single garbage
router.get('/show/:id', (req, res)=>{
    Garbage.findOne({
        _id: req.params.id
    })
    .populate('user')
    .populate('comment.commentUser')
    .then(garbage=>{
        if(garbage.status == 'public'){
            res.render('garbages/show', {
                garbage: garbage
            });
        } else{
            if(req.user){
                if(req.user.id == garbage.user._id){
                    res.render('garbages/show', {
                        garbage: garbage
                });
            } else{
                res.redirect('/garbages');
            } }else{
                res.redirect('/garbages');
            }
        }
    });
});

//list garbage from a user
router.get('/user/:userId', (req, res)=>{
    Garbage.find({user: req.params.userId, status: 'public'})
    .populate('user')
    .then(garbages=>{
        res.render('garbages/index', {
            garbages: garbages
        });
    });
});

//logged in user's garbages
router.get('/my',ensureAuthenticated, (req, res)=>{
    Garbage.find({user: req.user.id})
    .populate('user')
    .then(garbages=>{
        res.render('garbages/index', {
            garbages: garbages
        });
    });
});

//add garbage
router.get('/add',ensureAuthenticated, (req, res)=>{
    res.render('garbages/add');
});

//edit garbage
router.get('/edit/:id',ensureAuthenticated, (req, res)=>{
    Garbage.findOne({
        _id: req.params.id
    })
  
    .then(garbage=>{
        if(garbage.user != req.user.id) {
            res.redirect('/garbages');
        } else {
            res.render('garbages/edit', {
                garbage: garbage
        
        });
    }
    });
});


//process add garbage
router.post('/', (req, res)=>{
    // res.send('sent');
    let allowComments;
    if(req.body.allowComments){
        allowComments = true;
    } else {
        allowComments = false;
    }

    //build garbage object
    const newGarbage = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    };
    //create garbage
    new Garbage(newGarbage)
        .save()
        .then(garbage=>{
            res.redirect(`/garbages/show/${garbage.id}`)
        });

});

//edit form process
router.put('/:id', (req, res)=>{
    // res.send('put');
    Garbage.findOne({
        _id: req.params.id
    })
  
    .then(garbage=>{
        let allowComments;
        if(req.body.allowComments){
            allowComments = true;
        } else {
            allowComments = false;
        }
        //new values
        garbage.title = req.body.title;
        garbage.body = req.body.body;
        garbage.status = req.body.status;
        garbage.allowComments = allowComments;

        garbage.save()
            .then(garbage=>{
                res.redirect('/garbageHistory');
            });
        });
});

//delete stosy
router.delete('/:id', (req, res)=>{
    Garbage.remove({_id: req.params.id})
        .then(()=>{
            res.redirect('/garbageHistory');
        });
});

//add comment
router.post('/comment/:id', (req, res)=>{
    Garbage.findOne({
        _id: req.params.id
    })
    .then(garbage=>{
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        }
        //pusg to comments array
        garbage.comment.unshift(newComment);
        garbage.save()
            .then(garbage=>{
                res.redirect(`/garbages/show/${garbage.id}`);
            });
    });
})

module.exports = router;