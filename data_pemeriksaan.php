<?php
// Koneksi ke masing-masing database
$slave1 = new mysqli("localhost", "root", "", "db_slave1");
$slave2 = new mysqli("localhost", "root", "", "db_slave2");

// Cek koneksi
if ($slave1->connect_error || $slave2->connect_error) {
    die("Koneksi gagal: " . $slave1->connect_error . " / " . $slave2->connect_error);
}

// Ambil data pemeriksaan dan dokter (dari slave2)
$sql2 = "
SELECT 
    p.id_periksa, p.id_pendaftaran, p.diagnosa,
    d.nama AS nama_dokter, d.spesialis
FROM pemeriksaan p
JOIN dokter d ON p.id_dokter = d.id_dokter
";
$result2 = $slave2->query($sql2);

// Tampilkan data gabungan
echo "<h2>Data Pemeriksaan</h2>";
echo "<table border='1' cellpadding='6'>
<tr>
  <th>ID</th><th>Pasien</th><th>Dokter</th><th>Spesialis</th><th>Diagnosa</th><th>Tanggal</th>
</tr>";

while ($row2 = $result2->fetch_assoc()) {
    // Ambil data pendaftaran dan pasien dari slave1
    $id_pendaftaran = $row2['id_pendaftaran'];
    $sql1 = "
    SELECT p.nama, pd.tanggal 
    FROM pendaftaran pd 
    JOIN pasien p ON pd.id_pasien = p.id_pasien 
    WHERE pd.id_pendaftaran = $id_pendaftaran
    ";
    $result1 = $slave1->query($sql1);
    $row1 = $result1->fetch_assoc();

    echo "<tr>
        <td>{$row2['id_periksa']}</td>
        <td>{$row1['nama']}</td>
        <td>{$row2['nama_dokter']}</td>
        <td>{$row2['spesialis']}</td>
        <td>{$row2['diagnosa']}</td>
        <td>{$row1['tanggal']}</td>
    </tr>";
}

echo "</table>";
?>
