const { Pool } = require('pg');
require('dotenv').config();

// Konfigurasi untuk setiap database
const masterConfig = {
    host: process.env.DB_MASTER_HOST,
    port: process.env.DB_MASTER_PORT,
    user: process.env.DB_MASTER_USER,
    password: process.env.DB_MASTER_PASSWORD,
    database: 'db_master'
};

// Konfigurasi untuk slave1 dan slave2 (berada di device yang sama)
const slave1Config = {
    host: process.env.DB_SLAVE1_HOST,
    port: process.env.DB_SLAVE1_PORT,
    user: process.env.DB_SLAVE1_USER,
    password: process.env.DB_SLAVE1_PASSWORD,
    database: 'db_slave1'
};

const slave2Config = {
    host: process.env.DB_SLAVE2_HOST,
    port: process.env.DB_SLAVE2_PORT,
    user: process.env.DB_SLAVE2_USER,
    password: process.env.DB_SLAVE2_PASSWORD,
    database: 'db_slave2'
};

// Buat pool koneksi untuk setiap database
const masterPool = new Pool(masterConfig);
const slave1Pool = new Pool(slave1Config);
const slave2Pool = new Pool(slave2Config);

// Test koneksi
const testConnections = async () => {
    try {
        // Test koneksi ke master (Device 2)
        await masterPool.query('SELECT NOW()');
        console.log('Master database connection successful');
        
        // Test koneksi ke slave1 dan slave2 (Device 1)
        await slave1Pool.query('SELECT NOW()');
        console.log('Slave 1 database connection successful');
        
        await slave2Pool.query('SELECT NOW()');
        console.log('Slave 2 database connection successful');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

module.exports = {
    masterPool,
    slave1Pool,
    slave2Pool,
    testConnections
}; 