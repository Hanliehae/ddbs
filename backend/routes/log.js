const express = require('express');
const router = express.Router();
const LogModel = require('../models/log');

// GET /api/log
router.get('/', async (req, res) => {
    try {
        const logs = await LogModel.getAllLogs();
        res.json(logs);
    } catch (err) {
        res.status(500).json({
            error: 'Gagal mengambil data log',
            details: err.message
        });
    }
});

module.exports = router; 