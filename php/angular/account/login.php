<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $username = $request->loginInfo->username;
        $password = $request->loginInfo->password;
        $hashedPassword = hash("sha256", $password);
        $userType = $request->loginInfo->userType;
        $sql = "SELECT * FROM account where Username = '$username' and Password = '$hashedPassword' and UserType = '$userType'";
        $result = mysqli_query($con, $sql);

        // if(mysqli_num_rows($result) > 0){
        //     echo json_encode(true);
        // }
        // else{
        //     echo json_encode(false);
        // }

        if(mysqli_num_rows($result) > 0){
            while($row = mysqli_fetch_assoc($result)){
                $status = $row["Status"];
                if($status == 'Approved'){
                    echo json_encode("Correct and Approved");
                }
                else if($status == "Pending"){
                    echo json_encode("Pending");
                }
                else{
                    echo json_encode("Rejected");
                }
            }
        }
        else{
            echo json_encode("Incorrect");
        }
    }

    // $sql = "SELECT * FROM user where sName = '$name'";
    // $result = mysqli_query($con, $sql);
    // $row = mysqli_fetch_assoc($result);
    // $record = mysqli_fetch_object($result);
    // echo json_encode($record);
    
?>