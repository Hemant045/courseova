<?php
$host = "localhost";
$user = "root";       // use your MySQL username
$pass = "";           // your MySQL password
$db = "waitlist_system";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
