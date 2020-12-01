<?php
session_start();
include_once 'admin/tbl_location.php';
$distancechart=array();
$tbllocation=new tblLocation();
$data=$tbllocation->getLocation();
if ($data!=false) {
    while ($row=$data->fetch_assoc()) {
        $distancechart[$row['name']]=$row['distance'];
    }
}
if (isset($_POST['submit']) || isset($_POST['bookcab'])) {
    $fare=0;
    if (($_POST['pickup']!="Current location") && ($_POST['drop']!="Enter drop for ride estimate") && ($_POST['cabtype']!="Dropdown to select CAB type")) {
        $pickup=$_POST['pickup'];
        $drop=$_POST['drop'];
        $cabtype=$_POST['cabtype'];
        $luggage=$_POST['luggage'];
        $totaldistance=abs($distancechart[$pickup]-$distancechart[$drop]);
        if ($cabtype=='CedMicro') {
            $fixrate=50;
            if ($totaldistance>0 && $totaldistance<=10){
                $fare=$fixrate+$totaldistance*13.50;
            }
            elseif($totaldistance>10 && $totaldistance<=60) {
                $fare=$fixrate+10*13.50+($totaldistance-10)*12;
            }
            elseif($totaldistance>60 && $totaldistance<=160) {
                $fare=$fixrate+10*13.50+50*12+($totaldistance-60)*10.20;
            }
            elseif($totaldistance>160) {
                $fare=$fixrate+10*13.50+50*12+100*10.20+($totaldistance-160)*8.50;
            }
            
        }
        elseif ($cabtype=='CedMini') {
            $fixrate=150;
            $fare=0;
            if ($totaldistance>0 && $totaldistance<=10){
                $fare=$fixrate+$totaldistance*14.50;
            }
            elseif($totaldistance>10 && $totaldistance<=60) {
                $fare=$fixrate+10*14.50+($totaldistance-10)*13;
            }
            elseif($totaldistance>60 && $totaldistance<=160) {
                $fare=$fixrate+10*14.50+50*13+($totaldistance-60)*11.20;
            }
            elseif($totaldistance>160) {
                $fare=$fixrate+10*14.50+50*13+100*11.20+($totaldistance-160)*9.50;
            }
            $luggagecharge=luggageCharge($luggage,$cabtype);
            $fare+=$luggagecharge;
    
        }
        elseif ($cabtype=='CedRoyal') {
            $fixrate=200;
            $fare=0;
            if ($totaldistance>0 && $totaldistance<=10){
                $fare=$fixrate+$totaldistance*15.50;
            }
            elseif($totaldistance>10 && $totaldistance<=60) {
                $fare=$fixrate+10*15.50+($totaldistance-10)*14;
            }
            elseif($totaldistance>60 && $totaldistance<=160) {
                $fare=$fixrate+10*15.50+50*14+($totaldistance-60)*12.20;
            }
            elseif($totaldistance>160) {
                $fare=$fixrate+10*15.50+50*14+100*12.20+($totaldistance-160)*10.50;
            }
            $luggagecharge=luggageCharge($luggage,$cabtype);
            $fare+=$luggagecharge;
    
        }
        elseif ($cabtype=='CedSUV') {
            $fixrate=250;
            $fare=0;
            if ($totaldistance>0 && $totaldistance<=10){
                $fare=$fixrate+$totaldistance*16.50;
            }
            elseif($totaldistance>10 && $totaldistance<=60) {
                $fare=$fixrate+10*16.50+($totaldistance-10)*15;
            }
            elseif($totaldistance>60 && $totaldistance<=160) {
                $fare=$fixrate+10*16.50+50*15+($totaldistance-60)*13.20;
            }
            elseif($totaldistance>160) {
                $fare=$fixrate+10*16.50+50*15+100*13.20+($totaldistance-160)*11.50;
            }
            $luggagecharge=luggageCharge($luggage,$cabtype);
            $fare+=$luggagecharge;
            
        }
        if (isset($_POST['submit'])) {
            echo $fare;
        }
        elseif (isset($_POST['bookcab'])) {
            if (isset($_SESSION['user'])) {
                include 'admin/tbl_ride.php';
                $userid=$_SESSION['user'][1];
                $tblride=new tblRide();
                if ($tblride->insertData($pickup,$drop,$cabtype,$totaldistance,$luggage,$fare,$userid)===true) {
                    echo "please wait for the confirmation";
                } else {
                    echo "error";
                } 
            }
            else {
                $_SESSION['booking']=array($pickup,$drop,$cabtype,$totaldistance,$luggage,$fare);
                echo "refer to login page";
            }
        }
    }
    else{
        echo "please fill pickup, drop and cab type";
    }
}

function luggageCharge($weight,$cabtype) {
    if ($cabtype=='CedMini' || $cabtype=='CedRoyal') {
        if ($weight>0 && $weight<=10) {
            $luggagecharge=50;
            return $luggagecharge;
        }
        elseif ($weight>10 && $weight<=20){
            $luggagecharge=100;
            return $luggagecharge;
        }
        elseif ($weight>20) {
            $luggagecharge=200;
            return $luggagecharge;
        }
        else{
            return 0;
        }
    }
    elseif ($cabtype=='CedSUV') {
        if ($weight>0 && $weight<=10) {
            $luggagecharge=100;
            return $luggagecharge;
        }
        elseif ($weight>10 && $weight<=20){
            $luggagecharge=200;
            return $luggagecharge;
        }
        elseif ($weight>20) {
            $luggagecharge=400;
            return $luggagecharge;
        }
        else{
            return 0;
        }  
    }
}
?>