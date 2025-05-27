<form method="POST">
  <input type="hidden" name="email" value="<?= $_GET['email'] ?>">
  <input type="text" name="otp" required placeholder="Enter OTP">
  <button type="submit">Verify</button>
</form>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  require 'db.php';
  $email = $_POST['email'];
  $otp = $_POST['otp'];

  $res = $conn->query("SELECT * FROM users WHERE email='$email' AND otp='$otp'");
  if ($res->num_rows > 0) {
    $conn->query("UPDATE users SET is_verified=1 WHERE email='$email'");
    echo "Verified!";
  } else {
    echo "Invalid OTP";
  }
}
?>
