<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include("databaseconf.php");

$newEquipment = json_decode($_POST['newEquipment'], true);
$id = $newEquipment['id'];
$name = $newEquipment['name'];
$description = $newEquipment['description'];
$price = $newEquipment['price'];
$stock = $newEquipment['stock'];
$image = $newEquipment['image'];

if(isset($_FILES['file'])) {
  // $fileName = $_FILES['file']['name'];
  $tmpName = $_FILES['file']['tmp_name'];

  // Upload the file to the assets folder
  $filePath = "C:\Users\Acer\FYPLibrary\src\assets\image" . "\\" . $image;
  
  move_uploaded_file($tmpName, $filePath);
  // echo json_encode($filePath);
  
  // Insert the image into the database
  $sql = "INSERT INTO equipment (EquipmentID, EquipmentName, EquipmentDescription, EquipmentPrice, EquipmentStock, EquipmentImage) VALUES ('$id', '$name', '$description', '$price', '$stock', '$image')";
  $result = mysqli_query($con, $sql);
  echo json_encode("New Equipment Added Successfully!");
  }

?>