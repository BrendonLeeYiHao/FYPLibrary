<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $id = $request->updatedRefreshment->id;
        $name = $request->updatedRefreshment->name;
        $price = $request->updatedRefreshment->price;
        $stock = $request->updatedRefreshment->stock;
    }

    $sql = "UPDATE refreshment SET RefreshmentPrice = '$price', RefreshmentStock = '$stock' where RefreshmentID = '$id'";
    $result = mysqli_query($con, $sql);

    echo json_encode("Refreshment of ID " .$id. " is updated successfully!");
?>