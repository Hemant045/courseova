<?php
session_start();
if (!isset($_SESSION['admin'])) {
  header("Location: login.php");
  exit;
}
require '../db.php';
$res = $conn->query("SELECT * FROM users WHERE is_verified=1");
?>

<h2>Verified Users</h2>
<table border="1">
  <tr><th>Email</th><th>Joined At</th></tr>
  <?php while($row = $res->fetch_assoc()): ?>
    <tr>
      <td><?= $row['email'] ?></td>
      <td><?= $row['created_at'] ?></td>
    </tr>
  <?php endwhile; ?>
</table>
<a href="logout.php">Logout</a>
