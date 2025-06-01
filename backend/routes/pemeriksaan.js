const express = require('express');
const router = express.Router();
const PemeriksaanModel = require('../models/pemeriksaan');

// Middleware untuk validasi input
const validatePemeriksaanInput = (req, res, next) => {
    const { nama_pasien, alamat, tanggal, id_dokter, diagnosa } = req.body;
    
    if (!nama_pasien || !alamat || !tanggal || !id_dokter || !diagnosa) {
        return res.status(400).json({
            error: 'Semua field harus diisi'
        });
    }

    next();
};

// POST /api/pemeriksaan
router.post('/', validatePemeriksaanInput, async (req, res) => {
    try {
        const result = await PemeriksaanModel.createPemeriksaan(req.body);
        res.json({
            message: 'Data pemeriksaan berhasil disimpan',
            data: result
        });
    } catch (err) {
        res.status(500).json({
            error: 'Gagal menyimpan data pemeriksaan',
            details: err.message
        });
    }
});

// GET /api/pemeriksaan
router.get('/', async (req, res) => {
    try {
        const data = await PemeriksaanModel.getAllPemeriksaan();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: 'Gagal mengambil data pemeriksaan',
            details: err.message
        });
    }
});

module.exports = router; 