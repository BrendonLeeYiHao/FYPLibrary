<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $sql = "SELECT * FROM feedback";
    $result = mysqli_query($con, $sql);
    $allRecords = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($allRecords);
?>