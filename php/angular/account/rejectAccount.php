<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $id = $request->id;
        $sql = "UPDATE account SET Status = 'Rejected' where ID = '$id'";
        $result = mysqli_query($con, $sql);
        // $sql2 = "DELETE FROM account where ID = '$id'";
        // $result2 = mysqli_query($con, $sql2);

        if($result){
            echo json_encode("Account is Rejected!");
        }else{
            echo json_encode("Error " . mysqli_error($con));
        }   
    }
?>