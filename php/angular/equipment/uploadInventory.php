<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include("databaseconf.php");

$name = $_POST['name'];

if(isset($_FILES['file'])) {
  $fileName = $_FILES['file']['name'];
  $fileSize = $_FILES['file']['size'];
  $fileType = $_FILES['file']['type'];
  $tmpName = $_FILES['file']['tmp_name'];
  // echo json_encode($tmpName);
  // Check if the file is an image
  // $validImageTypes = array("image/jpg", "image/jpeg", "image/png");
  // if(!in_array($fileType, $validImageTypes)) {
  //   echo json_encode ("Invalid image type. Please upload a JPEG or PNG file.");
  // }

  // Upload the file to the assets folder
  $filePath = "C:\Users\Acer\FYPLibrary\src\assets\image" . "\\" . $fileName;
  
  move_uploaded_file($tmpName, $filePath);
  // echo json_encode($filePath);
  
  // Insert the image into the database
    $sql = "INSERT INTO inventory (inventory_Name, image_Name) VALUES ('$name', '$fileName')";
    $result = mysqli_query($con, $sql);
    echo json_encode("SUCCESSFUL!");
  //   if ($conn->query($sql) === TRUE) {
  //     echo json_encode("New record created successfully");
  //   } else {
  //     echo json_encode("Error: " . $sql . "<br>" . $conn->error);
  //   }
  // } else {
  //   echo json_encode("No file uploaded");
  // }
  }

?>