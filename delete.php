<?php

    include "config.php";

    $data = stripslashes(file_get_contents("php://input"));
    $mydata = json_decode($data,true);

    $id = $mydata['sid'];

    $sql = "DELETE FROM student WHERE ID = {$id}";
    if(mysqli_query($conn,$sql))
    {
        echo "1";
    }
    else{
        echo "0";
    }
    // mysqli_close($conn);
?>