$directory = "/sky";
$imgfiles = glob($directory . "*.JPG");

$files = array();

foreach($imgfiles as $imgfile)
{
   $files[] = "<a href=$imgfile>".basename($imgfile)."</a>";
}

echo json_encode($files);