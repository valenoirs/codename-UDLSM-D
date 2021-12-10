const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const cleanBody = require('../utils/cleanBody');

// Calling Models
const Pengunjung = require('../models/pengunjung.model');
const UKM = require('../models/ukm.model');
const Anggota = require('../models/anggota.model');
const Pertanyaan = require('../models/pertanyaan.model');
const Informasi = require('../models/informasi.model');

// HTTP Method
router.post('/login', cleanBody, AdminController.Login);

router.get('/balasan/:id', (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/create/balasan', {title: 'Admin - Balasan', layout: 'layouts/admin_layout', emailUser: req.params.id});
    }
})

router.get('/login', (req, res, next) => {
    if(!req.session.adminId){
        res.render('admin/login', {title: 'Admin - Login', layout: 'layouts/admin_layout'});
    }
    else{
        res.redirect('/admin/pengunjung')
    }
});

router.get('/logout', AdminController.Logout);

// Create
// START
router.get('/pengunjung/add', (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/create/pengunjung', {title: 'Admin - Data Pengunjung', layout: 'layouts/admin_layout'});
    }
});

router.get('/ukm/add', (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/create/ukm', {title: 'Admin - Data UKM', layout: 'layouts/admin_layout'});
    }
});

router.get('/anggota/add', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        const data = await UKM.find();
        res.render('admin/create/anggota', {title: 'Admin - Data Anggota', layout: 'layouts/admin_layout', data});
    }
});

router.get('/pertanyaan/add', (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/create/pertanyaan', {title: 'Admin - Data Pertanyaan', layout: 'layouts/admin_layout'});
    }
})

router.get('/informasi/add', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        const data = await UKM.find();
        res.render('admin/create/informasi', {title: 'Admin - Data Informasi', layout: 'layouts/admin_layout', data});
    }
})
// END

// Edit
// START
router.get('/pengunjung/edit', (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/edit/pengunjung', {title: 'Admin - Data Pengunjung', layout: 'layouts/admin_layout'});
    }
})

router.get('/ukm/edit', (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/edit/ukm', {title: 'Admin - Data UKM', layout: 'layouts/admin_layout'});
    }
})

router.get('/anggota/edit', (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/edit/anggota', {title: 'Admin - Data Anggota', layout: 'layouts/admin_layout'});
    }
})

router.get('/pertanyaan/edit', (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/edit/pertanyaan', {title: 'Admin - Data Pertanyaan', layout: 'layouts/admin_layout'});
    }
})

router.get('/informasi/edit', (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/edit/informasi', {title: 'Admin - Data Informasi', layout: 'layouts/admin_layout'});
    }
})
// END

// Read
// START
router.get('/pengunjung', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        const data = await Pengunjung.find();
        res.render('admin/read/pengunjung', {title: 'Admin - Data Pengunjung', layout: 'layouts/admin_layout', data});
    }
});

router.get('/ukm', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        const dataUKM = await UKM.find();
        res.render('admin/read/ukm', {title: 'Admin - Data UKM', layout: 'layouts/admin_layout', dataUKM});
    }
});

router.get('/anggota', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        const dataAnggota = await Anggota.find();
        res.render('admin/read/anggota', {title: 'Admin - Data Anggota', layout: 'layouts/admin_layout', dataAnggota});
    }
});

router.get('/pertanyaan', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        const dataPertanyaan = await Pertanyaan.find();
        res.render('admin/read/pertanyaan', {title: 'Admin - Pertanyaan', layout: 'layouts/admin_layout', dataPertanyaan});
    }
});

router.get('/informasi', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        const dataInformasi = await Informasi.find();
        res.render('admin/read/informasi', {title: 'Admin - Informasi', layout: 'layouts/admin_layout', dataInformasi});
    }
});

// Detail Anggota
router.get('/ukm/anggota/:ukm', async (req, res, next) => {
    if(!req.session.adminId){
        res.redirect('/admin/login');
    }
    else{
        const dataAnggotaUKM = await Anggota.find({ukm: req.params.ukm});
        res.render('admin/read/anggotaUKM', {title: `Admin - Data Anggota ${req.params.ukm}`, layout: 'layouts/admin_layout', dataAnggotaUKM, nama_ukm : req.params.ukm});
    }
})
// END

module.exports = router;