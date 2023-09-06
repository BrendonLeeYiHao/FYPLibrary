<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    // $postdata = file_get_contents("php://input");





            //ACTUAL ONE
            $sql = "SELECT MONTH(booking.BookingDate) as monthNo, DATE_FORMAT(booking.BookingDate, '%b') as monthName, SUM(booking_equipment.Quantity) as occurrences from booking 
                    INNER JOIN booking_equipment ON booking.BookingID = booking_equipment.BookingID
                    INNER JOIN equipment ON equipment.EquipmentID = booking_equipment.EquipmentID
                    where booking.BookingDate like '2023%'
                    GROUP BY MONTH(booking.BookingDate)
                    ORDER BY MONTH(booking.BookingDate)";
            $result = mysqli_query($con, $sql);
            $allRecords = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($allRecords); 

            // $record = mysqli_fetch_object($result);
         // echo json_encode($record);
    

    // $sql = "SELECT * FROM user where sName = '$name'";
    // $result = mysqli_query($con, $sql);
    // $row = mysqli_fetch_assoc($result);
    // $record = mysqli_fetch_object($result);
    // echo json_encode($record);
    

    
?>