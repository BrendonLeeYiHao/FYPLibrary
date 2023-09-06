<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        // $name = mysqli_real_escape_string($con, $request->name);
        $id = $request->newBooking->id;
        $username = $request->newBooking->username;
        $roomName = $request->newBooking->roomName;
        $roomType = $request->newBooking->roomType;
        $noOfUsers = $request->newBooking->noOfUsers;
        $bookingDate = $request->newBooking->bookingDate;
        $startTime = $request->newBooking->startTime;
        $endTime = $request->newBooking->endTime;
        $totalPayment = $request->newBooking->totalPayment;
        $bookingStatus = $request->newBooking->bookingStatus;
        $feedback = $request->newBooking->feedback;

        $equipmentList = $request->equipmentList;
        $refreshmentList = $request->refreshmentList;

        $sql = "INSERT INTO booking (BookingID, Username, RoomName, RoomType, NoOfUsers, BookingDate, StartTime, EndTime, TotalPayment, BookingStatus, Feedback) VALUES ('$id', '$username', '$roomName', '$roomType', '$noOfUsers', '$bookingDate', '$startTime', '$endTime', '$totalPayment', '$bookingStatus', '$feedback')";

        $result = mysqli_query($con, $sql);

        if(count($equipmentList) > 0){
            foreach($equipmentList as $equipment){
                $equipmentId = $equipment->EquipmentID;
                $equipmentStock = $equipment->EquipmentStock;
                $equipmentQuantity = $equipment->quantity;

                $sql2 = "INSERT INTO booking_equipment (BookingID, EquipmentID, Quantity) VALUES ('$id', '$equipmentId', '$equipmentQuantity')";

                $result2 = mysqli_query($con, $sql2);

                $sql3 = "UPDATE equipment SET EquipmentStock = $equipmentStock - $equipmentQuantity WHERE EquipmentID = '$equipmentId'";

                $result3 = mysqli_query($con, $sql3);
            }
        }

        if(count($refreshmentList) > 0){
            foreach($refreshmentList as $refreshment){
                $refreshmentId = $refreshment->RefreshmentID;
                $refreshmentStock = $refreshment->RefreshmentStock;
                $refreshmentQuantity = $refreshment->quantity;

                $sql4 = "INSERT INTO booking_refreshment (BookingID, RefreshmentID, Quantity) VALUES ('$id', '$refreshmentId', '$refreshmentQuantity')";
            
                $result4 = mysqli_query($con, $sql4);

                $sql5 = "UPDATE refreshment SET RefreshmentStock = $refreshmentStock - $refreshmentQuantity WHERE RefreshmentID = '$refreshmentId'";
            
                $result5 = mysqli_query($con, $sql5);
            }
        }
        echo json_encode("New Booking Record is created successfully!");
    }
?>