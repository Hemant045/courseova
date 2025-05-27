<form method="POST">
  <input type="text" name="username" placeholder="Username" required>
  <input type="password" name="password" placeholder="Password" required>
  <button type="submit">Login</button>
</form>

<?php
session_start();
require '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $user = $_POST['username'];
  $pass = $_POST['password'];
  $res = $conn->query("SELECT * FROM admin WHERE username='$user' AND password=SHA2('$pass', 256)");
  if ($res->num_rows > 0) {
    $_SESSION['admin'] = $user;
    header("Location: view.php");
  } else {
    echo "Invalid login";
  }
}
?>
