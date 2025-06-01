<?php
// Koneksi ke slave1 dan slave2
$slave1 = new mysqli("localhost", "root", "", "db_slave1");
$slave2 = new mysqli("localhost", "root", "", "db_slave2");

if ($slave1->connect_error || $slave2->connect_error) {
    die("Koneksi gagal");
}

// Ambil data dari form
$nama_pasien = $_POST['nama_pasien'];
$alamat = $_POST['alamat'];
$tanggal = $_POST['tanggal'];
$id_dokter = $_POST['id_dokter'];
$diagnosa = $_POST['diagnosa'];

// 1. Simpan ke pasien (slave1)
$slave1->query("INSERT INTO pasien (nama, alamat) VALUES ('$nama_pasien', '$alamat')");
$id_pasien = $slave1->insert_id;

// 2. Simpan ke pendaftaran (slave1)
$slave1->query("INSERT INTO pendaftaran (id_pasien, tanggal) VALUES ($id_pasien, '$tanggal')");
$id_pendaftaran = $slave1->insert_id;

// 3. Simpan ke pemeriksaan (slave2)
$slave2->query("INSERT INTO pemeriksaan (id_pendaftaran, id_dokter, diagnosa) VALUES ($id_pendaftaran, $id_dokter, '$diagnosa')");

echo "Data berhasil disimpan!";

// Koneksi ke db_master
$master = new mysqli("localhost", "root", "", "db_master");

$aksi = "Tambah Pemeriksaan";
$detail = "Pasien: $nama_pasien, Alamat: $alamat, Tanggal: $tanggal, Diagnosa: $diagnosa, Dokter ID: $id_dokter";

$master->query("INSERT INTO log_input (aksi, detail) VALUES ('$aksi', '$detail')");

?>
