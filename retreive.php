<?php

    include "config.php";

    $sql = "SELECT * FROM student";
    $result = mysqli_query($conn,$sql);
    if($result)
    {
        if(mysqli_num_rows($result) > 0)
        {
            $data = array();
            while($rows = mysqli_fetch_assoc($result))
            {
                $data[] = $rows;
            }
            echo json_encode($data);
        }
    }else{
        echo 'couldnt run  query';
    }


?>