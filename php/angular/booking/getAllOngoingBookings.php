<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        // $name = mysqli_real_escape_string($con, $request->name);
            $bookingStatus = $request->bookingStatus;
            $sql = "SELECT * FROM booking where BookingStatus = '$bookingStatus'";
            $result = mysqli_query($con, $sql);
            $allRecords = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($allRecords);

            // $record = mysqli_fetch_object($result);
            // echo json_encode($record);
    }

    // $sql = "SELECT * FROM user where sName = '$name'";
    // $result = mysqli_query($con, $sql);
    // $row = mysqli_fetch_assoc($result);
    // $record = mysqli_fetch_object($result);
    // echo json_encode($record);
    
?>