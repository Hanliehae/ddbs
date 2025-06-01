<?php
$conn = new mysqli("localhost", "root", "", "db_master");
$data = $conn->query("SELECT * FROM log_input ORDER BY waktu DESC");

echo "<h2>Log Aktivitas Sistem</h2>";
echo "<table border='1' cellpadding='10'>
<tr>
  <th>ID</th>
  <th>Waktu</th>
  <th>Aksi</th>
  <th>Detail</th>
</tr>";

while ($row = $data->fetch_assoc()) {
    echo "<tr>
      <td>{$row['id_log']}</td>
      <td>{$row['waktu']}</td>
      <td>{$row['aksi']}</td>
      <td>{$row['detail']}</td>
    </tr>";
}

echo "</table>";
?>