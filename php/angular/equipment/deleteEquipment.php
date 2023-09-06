<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include("databaseconf.php");

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);

    $id = $request->equipmentId;
    $originalImage = $request->originalImage;

    $filePath = "C:\Users\Acer\FYPLibrary\src\assets\image" . "\\" . $originalImage;

    unlink($filePath);

    $sql = "DELETE FROM equipment where EquipmentID = '$id'";
    $result = mysqli_query($con, $sql);
    echo json_encode("Deleted Successfully!");
  }
?>