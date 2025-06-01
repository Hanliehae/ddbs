<form method="POST" action="simpan.php">
  <h3>Input Data Pemeriksaan</h3>
  <label>Nama Pasien:</label><br>
  <input type="text" name="nama_pasien" required><br>

  <label>Alamat:</label><br>
  <input type="text" name="alamat" required><br>

  <label>Tanggal Pendaftaran:</label><br>
  <input type="date" name="tanggal" required><br>

  <label>Dokter:</label><br>
  <select name="id_dokter" required>
    <option value="201">Dr. Sari</option>
    <option value="202">Dr. Joko</option>
  </select><br>

  <label>Diagnosa:</label><br>
  <input type="text" name="diagnosa" required><br><br>

  <input type="submit" value="Simpan">
</form>
