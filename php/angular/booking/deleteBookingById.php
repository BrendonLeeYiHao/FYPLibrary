<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");
    
    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

            $bookingId = $request->bookingId;
            $sql = "SELECT * from booking_equipment where BookingID = '$bookingId'";
            $result = mysqli_query($con, $sql);

            if(mysqli_num_rows($result) > 0){
                while($row = mysqli_fetch_assoc($result)){
                    $equipmentID = $row['EquipmentID'];
                    $quantity = $row['Quantity'];

                    $sql2 = "SELECT * from equipment where EquipmentID = '$equipmentID'";
                    $result2 = mysqli_query($con, $sql2);

                    if(mysqli_num_rows($result2) > 0){
                        $row2 = mysqli_fetch_assoc($result2);
                        $originalStock = $row2['EquipmentStock'];

                        $updatedStock = $originalStock + $quantity;

                        $sql3 = "UPDATE equipment SET EquipmentStock = '$updatedStock' where EquipmentID = '$equipmentID'";
                        $result3 = mysqli_query($con, $sql3);
                    }
                }
            }

            $sql4 = "SELECT * from booking_refreshment where BookingID = '$bookingId'";
            $result4 = mysqli_query($con, $sql4);

            if(mysqli_num_rows($result4) > 0){
                while($row4 = mysqli_fetch_assoc($result4)){
                    $refreshmentID = $row4['RefreshmentID'];
                    $quantity = $row4['Quantity'];

                    $sql5 = "SELECT * from refreshment where RefreshmentID = '$refreshmentID'";
                    $result5 = mysqli_query($con, $sql5);

                    if(mysqli_num_rows($result5) > 0){
                        $row5 = mysqli_fetch_assoc($result5);
                        $originalStock = $row5['RefreshmentStock'];

                        $updatedStock = $originalStock + $quantity;

                        $sql6 = "UPDATE refreshment SET RefreshmentStock = '$updatedStock' where RefreshmentID = '$refreshmentID'";
                        $result6 = mysqli_query($con, $sql6);
                    }
                }
            }

            $sql7 = "DELETE from booking where BookingID = '$bookingId'";
            $result7 = mysqli_query($con, $sql7);
            echo json_encode("Booking of ID '$bookingId' is deleted successfully!");
    }
?>