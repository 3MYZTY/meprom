<?php
header('Content-Type: application/json');
echo file_get_contents('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1');
?>
