<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $id = $request->updatedAccount->id;
        $email = $request->updatedAccount->email;
        $phone = $request->updatedAccount->phoneNumber;
        $sql = "UPDATE account set Email = '$email', PhoneNumber = '$phone' where ID = '$id'";
        $result = mysqli_query($con, $sql);
        echo json_encode("Updated Successfully!");
    }

    // $sql = "SELECT * FROM user where sName = '$name'";
    // $result = mysqli_query($con, $sql);
    // $row = mysqli_fetch_assoc($result);
    // $record = mysqli_fetch_object($result);
    // echo json_encode($record);
    
?>