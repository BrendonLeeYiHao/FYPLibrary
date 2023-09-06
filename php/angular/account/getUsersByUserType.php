<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        if($request->userType == "APU"){
            $sql = "SELECT * FROM account where UserType = 'APU Student/Staff'";
        }
        else{
            $sql = "SELECT * FROM account where UserType = 'Public User' and Status = 'Approved'";
        }
        $result = mysqli_query($con, $sql);
        $allRecords = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($allRecords);
    }
?>