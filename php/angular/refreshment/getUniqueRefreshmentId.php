<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    // $postdata = file_get_contents("php://input");

    $sql = "SELECT RefreshmentID FROM refreshment ORDER BY RefreshmentID DESC LIMIT 1";
    $result = mysqli_query($con, $sql);
    $record = mysqli_fetch_object($result);
    echo json_encode($record);
        
        

    

    // $sql = "SELECT * FROM user where sName = '$name'";
    // $result = mysqli_query($con, $sql);
    // $row = mysqli_fetch_assoc($result);
    // $record = mysqli_fetch_object($result);
    // echo json_encode($record);
    
?>