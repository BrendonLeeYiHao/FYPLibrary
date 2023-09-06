<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);
        $username = $request->username;

        // $name = mysqli_real_escape_string($con, $request->name);
        $sql = "SELECT booking.*, room.RoomImage, GROUP_CONCAT(DISTINCT CONCAT(booking_equipment.Quantity, ' x ', equipment.EquipmentName)) as equipmentNames, GROUP_CONCAT(DISTINCT CONCAT(booking_refreshment.Quantity, ' x ', refreshment.RefreshmentName)) as refreshmentNames from booking 
        LEFT JOIN booking_equipment on booking.BookingID = booking_equipment.BookingID 
        LEFT JOIN equipment on booking_equipment.EquipmentID = equipment.EquipmentID 
        LEFT JOIN booking_refreshment on booking.BookingID = booking_refreshment.BookingID
        LEFT JOIN refreshment on refreshment.RefreshmentID = booking_refreshment.RefreshmentID
        INNER JOIN room on booking.RoomName = room.RoomNo where booking.Username = '$username' GROUP BY booking.BookingID ORDER BY booking.BookingDate DESC";
        $result = mysqli_query($con, $sql);
        $allRecords = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($allRecords);
    }
?>