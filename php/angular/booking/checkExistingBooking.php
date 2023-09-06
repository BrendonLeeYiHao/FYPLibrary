<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        // $name = mysqli_real_escape_string($con, $request->name);
            $username = $request->username;
            $sql = "SELECT * FROM booking where Username = '$username' and BookingStatus = 'Ongoing' ORDER BY BookingID DESC LIMIT 1";
            $result = mysqli_query($con, $sql);

            if(mysqli_num_rows($result) > 0){
                echo json_encode(true);
            }
            else{
                echo json_encode(false);
            }
    }
?>