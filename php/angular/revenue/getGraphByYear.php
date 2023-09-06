<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    // $postdata = file_get_contents("php://input");





            //ACTUAL ONE
            $sql = "SELECT MONTH(BookingDate) as monthNo, DATE_FORMAT(BookingDate, '%b') as monthName, SUM(TotalPayment) as occurrences from booking where BookingDate like '2023%'
                    GROUP BY MONTH(BookingDate)
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