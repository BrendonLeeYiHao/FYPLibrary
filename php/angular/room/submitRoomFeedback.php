<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        // $name = mysqli_real_escape_string($con, $request->name);
            $bookingId = $request->roomFeedback->bookingId;
            $roomNo = $request->roomFeedback->roomName;
            $roomCozyness = $request->roomFeedback->roomCozyness;
            $roomQuietness = $request->roomFeedback->roomQuietness;
            $roomComfortness = $request->roomFeedback->roomComfortness;

            $sql = "SELECT * from room where RoomNo = '$roomNo'";
            $result = mysqli_query($con, $sql);
            $row = mysqli_fetch_assoc($result);
            $originalFeedbackCount = $row['NoOfFeedback'];
            $originalRoomCozyness = $row['RoomCozyness'];
            $originalRoomQuietness = $row['RoomQuietness'];
            $originalRoomComfortness = $row['RoomComfortness'];

            $updatedFeedbackCount = $originalFeedbackCount + 1;
            $updatedRoomCozyness = $originalRoomCozyness + $roomCozyness;
            $updatedRoomQuietness = $originalRoomQuietness + $roomQuietness;
            $updatedRoomComfortness = $originalRoomComfortness + $roomComfortness;

            $sql2 = "UPDATE room SET NoOfFeedback = '$updatedFeedbackCount', RoomCozyness = '$updatedRoomCozyness', RoomQuietness = '$updatedRoomQuietness', RoomComfortness = '$updatedRoomComfortness' WHERE RoomNo = '$roomNo'";
            $result2 = mysqli_query($con, $sql2);

            $sql3 = "UPDATE booking SET Feedback = 'Yes' where BookingID = '$bookingId'";
            $result3 = mysqli_query($con, $sql3);
    }   
?>