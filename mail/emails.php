

<?php

$fileWrite = '';    
$myFile = "emails.txt";
if(isset($_POST['fileWrite']) && !empty($_POST['fileWrite'])) {
$fileWrite = $_POST['fileWrite'].PHP_EOL;
}
if($fileWrite) {
$fh = fopen($myFile, 'a') or die("can't open file"); //Make sure you have permission
fwrite($fh, $fileWrite);
fclose($fh);
}
?>

</head>

<body>
<form id="some" name="someName" method="post">
<input type="text" id="some1" class="someClass" value="" name="fileWrite"/>
<input type="submit" value="submit" class="submitClass"/>
</form>
</body>
</html>