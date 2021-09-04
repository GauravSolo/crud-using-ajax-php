<?php

    include "config.php";

    // stripslashes function can be used to clean up data retreived from a database or from an HTML form.

    //php://input -> This is a read-only stream that allows us to read raw data from the request body. It returns all the raw dta after the HTTP-heeaders of teh request, regardless of teh content type

    // json_decode -> It takes JSON string and converts it into a PHP object or array, if true then associative array
    $data = stripslashes(file_get_contents("php://input"));
    $mydata = json_decode($data,true);

    $id = $mydata['sid'];
    $name = $mydata['name'];
    $email = $mydata['email'];
    $password = $mydata['password'];

    if(!empty($name) && !empty($email) && !empty($password)){

        $sql="INSERT INTO student(ID,NAME,EMAIL,PASSWORD) VALUES('$id','{$name}','{$email}','{$password}') ON DUPLICATE KEY UPDATE NAME = '{$name}',EMAIL='{$email}',PASSWORD='{$password}'";

        if(mysqli_query($conn,$sql))
            echo 'Student data  save';
        else
            echo 'Student data couldnt saved';
    }else{
        echo "0";
    }






?>