const { slave1Pool, slave2Pool, masterPool } = require('../config/database');

class PemeriksaanModel {
    static async createPemeriksaan(data) {
        const client1 = await slave1Pool.connect();
        const client2 = await slave2Pool.connect();
        const clientMaster = await masterPool.connect();

        try {
            await client1.query('BEGIN');
            await client2.query('BEGIN');
            await clientMaster.query('BEGIN');

            // Insert pasien
            const pasienResult = await client1.query(
                'INSERT INTO pasien (nama, alamat) VALUES ($1, $2) RETURNING id_pasien',
                [data.nama_pasien, data.alamat]
            );
            const id_pasien = pasienResult.rows[0].id_pasien;

            // Insert pendaftaran
            const pendaftaranResult = await client1.query(
                'INSERT INTO pendaftaran (id_pasien, tanggal) VALUES ($1, $2) RETURNING id_pendaftaran',
                [id_pasien, data.tanggal]
            );
            const id_pendaftaran = pendaftaranResult.rows[0].id_pendaftaran;

            // Insert pemeriksaan
            await client2.query(
                'INSERT INTO pemeriksaan (id_pendaftaran, id_dokter, diagnosa) VALUES ($1, $2, $3)',
                [id_pendaftaran, data.id_dokter, data.diagnosa]
            );

            // Log aktivitas
            await clientMaster.query(
                'INSERT INTO log_input (aksi, detail) VALUES ($1, $2)',
                ['Tambah Pemeriksaan', JSON.stringify(data)]
            );

            await client1.query('COMMIT');
            await client2.query('COMMIT');
            await clientMaster.query('COMMIT');

            return { success: true, id_pasien, id_pendaftaran };
        } catch (err) {
            await client1.query('ROLLBACK');
            await client2.query('ROLLBACK');
            await clientMaster.query('ROLLBACK');
            throw err;
        } finally {
            client1.release();
            client2.release();
            clientMaster.release();
        }
    }

    static async getAllPemeriksaan() {
        try {
            const result = await slave2Pool.query(`
                SELECT 
                    p.id_periksa, p.id_pendaftaran, p.diagnosa,
                    d.nama AS nama_dokter, d.spesialis
                FROM pemeriksaan p
                JOIN dokter d ON p.id_dokter = d.id_dokter
                ORDER BY p.id_periksa DESC
            `);

            const pemeriksaanData = await Promise.all(result.rows.map(async (row) => {
                const pasienData = await slave1Pool.query(`
                    SELECT p.nama, pd.tanggal 
                    FROM pendaftaran pd 
                    JOIN pasien p ON pd.id_pasien = p.id_pasien 
                    WHERE pd.id_pendaftaran = $1
                `, [row.id_pendaftaran]);

                return {
                    ...row,
                    ...pasienData.rows[0]
                };
            }));

            return pemeriksaanData;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = PemeriksaanModel; 