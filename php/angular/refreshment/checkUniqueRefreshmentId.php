<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        // $name = mysqli_real_escape_string($con, $request->name);

        if(isset($request->id) && !empty($request->id)){
            $id = $request->id;
            $sql = "SELECT * FROM refreshment where RefreshmentId = '$id'";
            $result = mysqli_query($con, $sql);
            
            if(mysqli_num_rows($result) > 0){
                echo json_encode("true");
            }
            else{
                echo json_encode("false");
            }
        }
    }

    // $sql = "SELECT * FROM user where sName = '$name'";
    // $result = mysqli_query($con, $sql);
    // $row = mysqli_fetch_assoc($result);
    // $record = mysqli_fetch_object($result);
    // echo json_encode($record);
    
?>