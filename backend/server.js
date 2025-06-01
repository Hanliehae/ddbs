const express = require('express');
const cors = require('cors');
const path = require('path');
const { testConnections } = require('./config/database');

// Import routes
const pemeriksaanRoutes = require('./routes/pemeriksaan');
const logRoutes = require('./routes/log');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/pemeriksaan', pemeriksaanRoutes);
app.use('/api/log', logRoutes);

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/form_input', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/form_input.html'));
});

app.get('/data_pemeriksaan', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/data_pemeriksaan.html'));
});

app.get('/log', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/log.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Terjadi kesalahan pada server',
        details: err.message
    });
});

const PORT = process.env.PORT || 3000;

// Test database connections before starting server
testConnections().then(() => {
    app.listen(PORT, () => {
        console.log(`Server berjalan di port ${PORT}`);
    });
}); 