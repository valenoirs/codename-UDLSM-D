const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const MongoStore = require('connect-mongo');

const methodOverride = require('method-override');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Session
app.use(session({
    secret: 'valenoirs',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_STRING,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use((req, res, next) => {
    if(req.session.userId){
        res.locals.userId = req.session.userId;
    }

    next();
});

app.use((req, res, next) => {
    if(req.session.adminId){
        res.locals.adminId = req.session.adminId;
    }

    next();
})

// Templating Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(express.static('public'));

// Connect to database
mongoose.connect(process.env.DB_STRING)
.then(() => console.log(`connected to ${process.env.DB_STRING}`))
.catch((error) => console.log(error));

// Check DB Content
const User = require('./models/user.model');
const UKM = require('./models/ukm.model');
const Informasi = require('./models/informasi.model');

// HTTP Route
app.use('/user', require('./routes/user.routes'));
app.use('/admin', require('./routes/admin.routes'));
app.use('/ukm', require('./routes/ukm.routes'));
app.use('/anggota', require('./routes/anggota.routes'));
app.use('/pertanyaan', require('./routes/pertanyaan.routes'));
app.use('/informasi', require('./routes/informasi.routes'));
app.use('/pengunjung', require('./routes/pengunjung.routes'));



// Render Page
app.get('/', (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login');
    }
    else{
        res.render('user/index', {title: 'Home', layout: 'layouts/main-layout'});
    }
});

app.get('/login', (req, res, next) => {
    if(!req.session.userId){
        res.render('user/login', {title: 'Login', layout: 'layouts/main-layout'});
    }
    else{
        res.redirect('/');
    }
});

app.get('/register', (req, res, next) => {
    if(!req.session.userId){
        res.render('user/register', {title: 'Register', layout: 'layouts/main-layout'});
    }
    else{
        res.redirect('/');
    }
});

app.get('/ukm_non_seni', async (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login');
    }
    else{
        const data = await UKM.find({jenis: "Non-Seni"});
        console.log(data)
        res.render('user/ukm_non_seni', {title: 'UKM - Non Seni', layout: 'layouts/main-layout', data});
    }
});

app.get('/ukm_seni', async (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login');
    }
    else{
        const data = await UKM.find({jenis: "Seni"});
        res.render('user/ukm_seni', {title: 'UKM - Seni', layout: 'layouts/main-layout', data});
    }
});

// Ping Server!
app.get('/ping', (req, res, next) => {
    res.send('<h1>Putang ina mo bobo talaga gago!<h1><br><h1>Sekarang server sementara berjalan!<h1><br><h1>Now the server is running!<h1>');
});

// Continue the route above
app.get('/ukm_detail/:id', async (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login');
    }
    else{
        const dataInformasi = await Informasi.find({nama_ukm: req.params.id});
        const dataUKM = await UKM.findOne({nama: req.params.id});
        console.log(dataInformasi);console.log(dataUKM);
        res.render('user/ukm_detail', {title: 'UKM - Detail', layout: 'layouts/main-layout', dataInformasi, dataUKM});
    }
});

// app.get('/:id', (req, res, next) => {
//     res.render('user/index', {title: 'Home', layout: 'layouts/main-layout', userId: req.params.id});
// });

// Start Server
app.listen(PORT, () => {console.log(`Server Runnning at ${PORT}`)});