<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $sql = "SELECT Count(*) as UnreadFeedback FROM feedback where MarkAsRead = 0;";
    $result = mysqli_query($con, $sql);
    $count = mysqli_fetch_object($result);
    echo json_encode($count);
?>