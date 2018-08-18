const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const keys = require('./keys');

//load user model
const User = mongoose.model('users');

module.exports = function(passport){
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            //when deploying on heroku, heroku will try to load https and 
            //proxy: true => throw error and will not work on remote server
            proxy: true
        }, (accessToken, refreshToken, profile, done)=>{
            // console.log(accessToken);
            // console.log(profile);
            const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
            // console.log(image);
            const  newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: image
            };
            //check for existing user
            User.findOne({
                googleID: profile.id
            }).then(user=>{
                if(user){
                    //return user
                    done(null, user);
                } else{
                    //create user
                    new User(newUser)
                        .save()
                        .then(user=>done(null, user));
                }
            });

        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

}