<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        // $name = mysqli_real_escape_string($con, $request->name);
        $monthNo = $request->monthNo;

        $sql = "SELECT Count(booking.BookingID) as occurrences from booking where BookingDate like '2023-$monthNo%'";
        $result = mysqli_query($con, $sql);
        $record = mysqli_fetch_object($result);
        echo json_encode($record); 
    }  
?>