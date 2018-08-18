const express = require('express');
const path = require('path');

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//load models
require('./models/User');
require('./models/Garbage');

//passport config
require('./config/passport')(passport);

//load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const garbages = require('./routes/garbages');

//load keys file
const keys = require('./config/keys');

//handlebars helper
const{
    truncate,
    stripTags,
    formatDate,
    select,
    editIcon
} = require('./helpers/hbs');

//map global promises
mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(keys.mongoURI, {
    useMongoClient: true
}) .then(()=>console.log('mongodb connected'))
   .catch(err=>console.log(err));

const app = express();
const port = process.env.PORT || 3000;

//body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//method override middleware
app.use(methodOverride('_method'));

//handlebars
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        select: select,
        editIcon: editIcon
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// 
app.use(cookieParser());
//
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global vars
app.use((req, res, next)=>{
    res.locals.user = req.user || null;
    next();
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


//
app.use('/', index);
app.use('/auth', auth);
app.use('/garbages', garbages);



app.listen(port, ()=>{
    console.log(`server started on ${port}`);
});