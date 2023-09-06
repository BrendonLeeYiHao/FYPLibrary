<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("databaseconf.php");
    
    $postdata = file_get_contents("php://input");
    if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $userType = $request->newUser->userType;
        $name = $request->newUser->name;
        $username = $request->newUser->username;
        $tpNoStaffId = $request->newUser->tpNoStaffId;
        $password = $request->newUser->password;
        $hashedPassword = hash("sha256", $password); 
        $email = $request->newUser->email;
        $phoneNumber = $request->newUser->phoneNumber;
        $dob = $request->newUser->dob;
        $gender = $request->newUser->gender;
        $status = $request->newUser->status;
    
        if($tpNoStaffId == null){
            $sql = "INSERT INTO account (UserType, Name, Username, Password, Email, PhoneNumber, Dob, Gender, Status) VALUES 
            ('$userType', '$name', '$username', '$hashedPassword', '$email', '$phoneNumber', '$dob', '$gender', '$status')";
        }else{
            $sql = "INSERT INTO account (UserType, Name, Username, TpNoStaffId, Password, Email, PhoneNumber, Dob, Gender, Status) 
            VALUES ('$userType', '$name', '$username', '$tpNoStaffId', '$hashedPassword', '$email', '$phoneNumber', '$dob', '$gender', '$status')";
        }
        
        $result = mysqli_query($con, $sql);
        $sql2 = "INSERT INTO temp_account (Name, Username, Password) VALUES ('$name', '$username', '$password')";        
        $result2 = mysqli_query($con, $sql2);

        echo json_encode("New Account created successfully!");
    }

?>