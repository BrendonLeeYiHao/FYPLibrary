<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $id = $request->id;
        $sql = "UPDATE account SET Status = 'Approved' where ID = '$id'";
        $result = mysqli_query($con, $sql);

        if($result){
            echo json_encode("Account is approved!");
        }else{
            echo json_encode("Error " . mysqli_error($con));
        }   
    }
?>