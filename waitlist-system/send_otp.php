<?php
require 'db.php';
require 'vendor/autoload.php'; // PHPMailer (install via Composer)

use PHPMailer\PHPMailer\PHPMailer;

$email = $_POST['email'];
$otp = rand(100000, 999999);

// Save to DB or update
$conn->query("INSERT INTO users (email, otp) VALUES ('$email', '$otp')
    ON DUPLICATE KEY UPDATE otp='$otp', is_verified=0");

// Send email
$mail = new PHPMailer();
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com'; // or IONOS SMTP
$mail->SMTPAuth = true;
$mail->Username = 'your@gmail.com';
$mail->Password = 'your-app-password';
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->setFrom('your@gmail.com');
$mail->addAddress($email);
$mail->Subject = 'Your OTP';
$mail->Body = "Your OTP is: $otp";

if ($mail->send()) {
    echo "OTP sent. <a href='verify.php?email=$email'>Click here to verify</a>";
} else {
    echo "Failed: " . $mail->ErrorInfo;
}
?>
