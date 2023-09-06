<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);
        $roomNo = $request->roomNo;
        $sql = "SELECT * FROM room where RoomNo = '$roomNo'";

        $result = mysqli_query($con, $sql);
        $record = mysqli_fetch_object($result);
        echo json_encode($record);

    }
    
?>