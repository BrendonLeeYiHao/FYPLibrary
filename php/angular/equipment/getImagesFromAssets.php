<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    $directory = 'C:\Users\Acer\FYPLibrary\src\assets\image';

    $filenames = scandir($directory);

    // $filenames = array_diff($filenames, array('.', '..'));
    $filenames = array_slice($filenames, 2);

    echo json_encode($filenames);
?>