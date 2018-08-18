const express = require('express');
const router = express.Router();
const passport = require('passport');

// router.get('/google', (req, res)=>{
//     res.send('auth');
// });

router.get('/google', passport.authenticate('google', 
    {scope: ['profile', 'email'] }//permissions to ask user to share
));

//Authenticate Requests
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/garbageHistory');
  });

router.get('/verify', (req, res)=>{
    if(req.user){
        console.log(req.user);
    } else{
        console.log('not auth');
    }
});

router.get('/logout', (req, res)=>{ //see this
    
    req.logout();
    res.redirect('/');
});

module.exports = router;