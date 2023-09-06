<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $name = $request->newFeedback->name;
        $email = $request->newFeedback->email;
        $comment = $request->newFeedback->comment;
        $date = $request->newFeedback->date;
        $read = $request->newFeedback->read;
        if($read == false){
            $markAsRead = 0;
        }

        $sql = "INSERT INTO feedback (Name, Email, Comment, Date, MarkAsRead) VALUES ('$name','$email','$comment','$date','$markAsRead')";
        $result = mysqli_query($con, $sql);
        echo json_encode("Feedback provided successfully!");
    }
?>