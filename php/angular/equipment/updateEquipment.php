<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include("databaseconf.php");

$updatedEquipment = json_decode($_POST['updatedEquipment'], true);
$id = $updatedEquipment['id'];
$description = $updatedEquipment['description'];
$price = $updatedEquipment['price'];
$stock = $updatedEquipment['stock'];
$image = $updatedEquipment['image'];

if(isset($_FILES['file'])) {
  
  //Remove the file from assets folder
  $oldFilePath = "C:\Users\Acer\FYPLibrary\src\assets\image" . "\\" . $image;
  unlink($oldFilePath);

  //Upload the file to the assets folder
  $fileName = $_FILES['file']['name'];
  $tmpName = $_FILES['file']['tmp_name'];

  // Upload the file to the assets folder
  $newFilePath = "C:\Users\Acer\FYPLibrary\src\assets\image" . "\\" . $fileName;
  
  move_uploaded_file($tmpName, $newFilePath);
  // echo json_encode($filePath);
  
  // Insert the image into the database
  $sql = "UPDATE equipment SET EquipmentDescription = '$description', EquipmentPrice = '$price', EquipmentStock = '$stock', EquipmentImage = '$fileName' where EquipmentID = '$id'";
  $result = mysqli_query($con, $sql);
  echo json_encode("Updated Successfully!");
}
else{
  $sql = "UPDATE equipment SET EquipmentDescription = '$description', EquipmentPrice = '$price', EquipmentStock = '$stock' where EquipmentID = '$id'";
  $result = mysqli_query($con, $sql);
  echo json_encode("Updated Successfully!");
}



?>