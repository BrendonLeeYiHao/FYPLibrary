<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");

    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        // $name = mysqli_real_escape_string($con, $request->name);
            $selectedMonth = $request->selectedMonth;

            // $sql = "SELECT DAYOFMONTH(calendar.day) AS day, COUNT(booking.BookingDate) AS occurrences
            //         FROM (
            //             SELECT DATE('2023-05-01') + INTERVAL(n - 1) DAY AS day
            //             FROM (
            //                 SELECT @row := @row + 1 AS n
            //                 FROM booking, (SELECT @row := 0) r
            //                 WHERE @row < DATEDIFF(DATE_ADD(DATE('2023-05-01'), INTERVAL 1 MONTH), DATE('2023-05-01'))
            //             ) numbers
            //         ) calendar
            //         LEFT JOIN booking ON DATE(booking.BookingDate) = calendar.day
            //         GROUP BY calendar.day
            //         ORDER BY calendar.day";

            // $sql = "SELECT * FROM booking where BookingDate = '$bookingDate' and RoomName = '$roomName'";

            // $result = mysqli_query($con, $sql);
            // $allRecords = mysqli_fetch_all($result, MYSQLI_ASSOC);
            // echo json_encode($allRecords);



            //ACTUAL ONE
            $sql = "SELECT booking.BookingDate, Count(booking.BookingDate) as occurrences from booking where BookingDate like '2023-$selectedMonth%'
                    GROUP BY booking.BookingDate
                    ORDER BY booking.BookingDate";
            $result = mysqli_query($con, $sql);
            $allRecords = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($allRecords); 

            // $record = mysqli_fetch_object($result);
            // echo json_encode($record);
    }

    // $sql = "SELECT * FROM user where sName = '$name'";
    // $result = mysqli_query($con, $sql);
    // $row = mysqli_fetch_assoc($result);
    // $record = mysqli_fetch_object($result);
    // echo json_encode($record);
    

    
?>