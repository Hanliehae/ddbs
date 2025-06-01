<?php
// Koneksi ke semua database
$master = new mysqli("localhost", "root", "", "db_master");
$slave1 = new mysqli("localhost", "root", "", "db_slave1");
$slave2 = new mysqli("localhost", "root", "", "db_slave2");

// Ambil data dari pasien di slave1
$result_pasien = $slave1->query("SELECT * FROM pasien");

// Ambil data dokter di slave2
$result_dokter = $slave2->query("SELECT * FROM dokter");

// Gabungkan hasil (contoh output)
echo "<h2>Data Pasien</h2>";
while ($row = $result_pasien->fetch_assoc()) {
    echo "Nama: " . $row['nama'] . " | Alamat: " . $row['alamat'] . "<br>";
}

echo "<h2>Data Dokter</h2>";
while ($row = $result_dokter->fetch_assoc()) {
    echo "Nama: " . $row['nama'] . " | Spesialis: " . $row['spesialis'] . "<br>";
}
?>
