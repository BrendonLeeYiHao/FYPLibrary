<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $id = $request->newRefreshment->id;
        $name = $request->newRefreshment->name;
        $price = $request->newRefreshment->price;
        $stock = $request->newRefreshment->stock;
    }

    $sql = "INSERT INTO refreshment (RefreshmentID, RefreshmentName, RefreshmentPrice, RefreshmentStock) VALUES ('$id', '$name', '$price', '$stock')";
    $result = mysqli_query($con, $sql);

    echo json_encode("New Refreshment created successfully!");
?>