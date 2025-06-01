const { masterPool } = require('../config/database');

class LogModel {
    static async getAllLogs() {
        try {
            const result = await masterPool.query(`
                SELECT * FROM log_input 
                ORDER BY waktu DESC
            `);
            return result.rows;
        } catch (err) {
            throw err;
        }
    }

    static async createLog(aksi, detail) {
        try {
            const result = await masterPool.query(
                'INSERT INTO log_input (aksi, detail) VALUES ($1, $2) RETURNING *',
                [aksi, detail]
            );
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
}

module.exports = LogModel; 