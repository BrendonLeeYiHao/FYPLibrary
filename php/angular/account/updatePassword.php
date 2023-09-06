<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $id = $request->updatedPassword->id;
        $username = $request->updatedPassword->username;
        $password = $request->updatedPassword->password;
        $hashedPassword = hash("sha256", $password);
        $sql = "UPDATE account set Password = '$hashedPassword' where ID = '$id'";
        $result = mysqli_query($con, $sql);
        $sql2 = "UPDATE temp_account set Password = '$password' where Username = '$username'";
        $result2 = mysqli_query($con, $sql2);
        echo json_encode("Password Updated Successfully!");
    }

    // $sql = "SELECT * FROM user where sName = '$name'";
    // $result = mysqli_query($con, $sql);
    // $row = mysqli_fetch_assoc($result);
    // $record = mysqli_fetch_object($result);
    // echo json_encode($record);
    
?>