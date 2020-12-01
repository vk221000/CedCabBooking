<?php
session_start();
if (isset($_POST['previousrides'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $userid=$_SESSION['user'][1];
    $sort=$_POST['sort'];
    $data=$tblride->getData($userid,$sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    } else {
        echo "false";
    }
}
if (isset($_POST['previousridessortedbyfareuser'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $userid=$_SESSION['user'][1];
    $sort=$_POST['sort'];
    $data=$tblride->previousRidesSortedByFareUser($userid,$sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    } else {
        echo "false";
    }
}
if (isset($_POST['farecompletedridessort'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $userid=$_SESSION['user'][1];
    $sort=$_POST['sort'];
    $data=$tblride->fareCompletedRideSort($userid,$sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    } else {
        echo "false";
    }
}
if (isset($_POST['pendingrides'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $userid=$_SESSION['user'][1];
    $data=$tblride->pendingRides($userid);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['completedrides'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $userid=$_SESSION['user'][1];
    $sort= $_POST['sort'];
    $data=$tblride->completedRides($userid,$sort);
    $row=array();
    if ($data!=false) {
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['filterbycabtype'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $cabtype= $_POST['cabtype'];
    $data=$tblride->filterByCabType($cabtype,'asc');
    $row=array();
    if ($data!=false) {
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}
// --------------------------------
if (isset($_POST['compfilterbycabtype'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $cabtype= $_POST['cabtype'];
    $data=$tblride->compFilterByCabType($cabtype,'asc');
    $row=array();
    if ($data!=false) {
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['compfilterbydateadmin'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $datetype= $_POST['datetype'];
    $data=$tblride->compFilterByDateAdmin($datetype);
    $row=array();
    if ($data!=false) {
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}
// ----------------------------------------------
if (isset($_POST['filterbydateuser'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $datetype= $_POST['datetype'];
    $userid=$_SESSION['user'][1];
    $data=$tblride->filterByDateUser($datetype,$userid);
    $row=array();
    if ($data!=false) {
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}

if (isset($_POST['filterbycabtypeuser'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $cabtype= $_POST['cabtype'];
    $userid=$_SESSION['user'][1];
    $data=$tblride->filterByCabTypeUser($cabtype,$userid);
    $row=array();
    if ($data!=false) {
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['editprofile'])) {
    include '../admin/tbl_user.php';
    $tbluser=new tblUser();
    if (isset($_SESSION['user'])) {
        $userid=$_SESSION['user'][1];
    } elseif (isset($_SESSION['admin'])) {
        $userid=$_SESSION['admin'][1];
    }
    $data=$tbluser->getUser($userid);
    $row=$data->fetch_assoc();
    print_r(json_encode($row));
}
if (isset($_POST['updateprofile'])) {
    include '../admin/tbl_user.php';
    $tbluser=new tblUser();
    if (isset($_SESSION['user'])) {
        $userid=$_SESSION['user'][1];
    } elseif (isset($_SESSION['admin'])){
        $userid=$_SESSION['admin'][1];
    }
    $name=$_POST['name'];
    $mobile=$_POST['mobile'];
    if ($tbluser->updateuser($userid, $name, $mobile)) {
        echo "profile successfully updated";
    }
    else {
        echo false;
    }  
}
if (isset($_POST['passwordreset'])) {
    include '../admin/tbl_user.php';
    $tbluser=new tblUser();
    if (isset($_SESSION['user'])) {
        $userid=$_SESSION['user'][1];
    } elseif (isset($_SESSION['admin'])) {
        $userid=$_SESSION['admin'][1];
    }
    $data=$tbluser->getUser($userid);
    $row=$data->fetch_assoc();
    print_r(json_encode($row));
}
if (isset($_POST['passwordset'])) {
    include '../admin/tbl_user.php';
    $tbluser=new tblUser();
    $username=$_POST['username'];
    $oldpassword=$_POST['oldpassword'];
    $password=$_POST['password'];
    $oldpassword=md5($oldpassword);
    $password=md5($password);
    $data=$tbluser->passwordReset($username, $password, $oldpassword);
    if ($data==true) {
        echo "true";
    } else {
        echo "false";
    }
}
if (isset($_POST['riderequests'])) {
    $sort=$_POST['sort'];
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $data=$tblride->rideRequests($sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['invoice'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $rideid=$_POST['rideid'];
    $data=$tblride->invoice($rideid);
    if ($data!=false) {
        $arr=$data->fetch_assoc();
        print_r(json_encode($arr));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['approveduserrequests'])) {
    include '../admin/tbl_user.php';
    $tbluser=new tblUser();
    $sort=$_POST['sort'];
    $data=$tbluser->approvedUserRequests($sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    } else {
        echo "false";
    }
}
if (isset($_POST['allusers'])) {
    include '../admin/tbl_user.php';
    $tbluser=new tblUser();
    $data=$tbluser->allUsers();
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['sortuserbyname'])) {
    $sort=$_POST['sort'];
    include '../admin/tbl_user.php';
    $tbluser=new tblUser();
    $data=$tbluser->sortUsersByName($sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['sortuserbydate'])) {
    $sort=$_POST['sort'];
    include '../admin/tbl_user.php';
    $tbluser=new tblUser();
    $data=$tbluser->sortUsersByDate($sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['allcompletedrides'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $sort=$_POST['sort'];
    $data=$tblride->rideCompletedAll($sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print(json_encode($row));
    } else {
        echo "false";
    }
}
if (isset($_POST['allridesadmin'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $sort=$_POST['sort'];
    $data=$tblride->allRidesAdmin($sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['sortbydistanceadmin'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $distsort=$_POST['distsort'];
    $data=$tblride->sortByDistanceAdmin($distsort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['allridesadminsortbyfare'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $sort=$_POST['sort'];
    $data=$tblride->allRidesAdminSortByFare($sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['sortridesbydateadmin'])) {
    $sort=$_POST['sort'];
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $data=$tblride->allRidesAdmin($sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['filterbydateadmin'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $datetype= $_POST['datetype'];
    $data=$tblride->filterByDateAdmin($datetype);
    $row=array();
    if ($data!=false) {
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print_r(json_encode($row));
    }
    else {
        echo "false";
    }
}

if (isset($_POST['canceledridesall'])) {
    include '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $sort=0;
    $data=$tblride->canceledRidesAll($sort);
    if ($data!=false){
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print(json_encode($row));
    } else {
        echo "false";
    }
}
if (isset($_POST['userrequests'])) {
    include '../admin/tbl_user.php';
    $tbluser=new tblUser();
    $sort=$_POST['sort'];
    $data=$tbluser->userRequests($sort);
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print(json_encode($row));
    } else {
        echo "false";
    }
}
if (isset($_POST['addlocation'])) {
    include_once '../admin/tbl_location.php';
    $location=$_POST['location'];
    $distance=$_POST['distance'];
    $tbllocation= new tblLocation();
    if ($tbllocation->insertLocation($location, $distance)){
        echo "location added successfully";
    }
}
if (isset($_POST['managelocation'])) {
    include_once '../admin/tbl_location.php';
    $tbllocation=new tblLocation();
    $data=$tbllocation->getLocation();
    if ($data!=false) {
        $row=array();
        while ($arr=$data->fetch_assoc()) {
            $row[]=$arr;
        }
        print(json_encode($row));
    }
    else {
        echo "false";
    }
}
if (isset($_POST['locationedit'])) {
    include '../admin/tbl_location.php';
    $tbllocation=new tblLocation();
    $id=$_POST['id'];
    $data=$tbllocation->getLocationofID($id);
    $row=$data->fetch_assoc();
    print_r(json_encode($row));
}
if (isset($_POST['editlocationsubmit'])) {
    include_once '../admin/tbl_location.php';
    $location=$_POST['location'];
    $distance=$_POST['distance'];
    $isavailable=$_POST['isavailable'];
    $id=$_POST['id'];
    $tbllocation= new tblLocation();
    if ($tbllocation->updateLocation($id, $location, $distance, $isavailable)){
        echo "location updated successfully";
    }
}
if (isset($_POST['deletelocation'])) {
    $id=$_POST['id'];
    include_once '../admin/tbl_location.php';
    $tbllocation= new tblLocation();
    if ($tbllocation->deleteLocation($id)){
        echo "location deleted successfully";
    }
}
if (isset($_POST['admindeleteuser'])) {
    $userid=$_POST['userid'];
    include_once '../admin/tbl_user.php';
    $tbluser= new tblUser();
    $data=$tbluser->deleteUser($userid);
    if ($data){
        echo "ID deleted successfully";
    }
    else {
        echo "error in deletion";
    }

}





if (isset($_POST['rideaccept'])) {
    $id=$_POST['id'];
    include_once '../admin/tbl_ride.php';
    $tblride= new tblRide();
    if ($tblride->acceptRide($id)){
        echo "ride accepted successfully";
    }
}






if (isset($_POST['ridereject'])) {
    $id=$_POST['id'];
    include_once '../admin/tbl_ride.php';
    $tblride= new tblRide();
    if ($tblride->rejectRide($id)){
        echo "ride rejected successfully";
    }
}
if (isset($_POST['allowuser'])) {
    $userid=$_POST['userid'];
    include_once '../admin/tbl_user.php';
    $tbluser= new tblUser();
    if ($tbluser->acceptUser($userid)){
        echo "user accepted successfully";
    }
}
if (isset($_POST['defaultload'])) {
    include_once '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $msg=array();
    $sort=0;
    $data=$tblride->rideRequests($sort);
    if ($data!=false) {
        $msg['riderequest']=$data->num_rows;
    }
    else {
        $msg['riderequest']=0;
    }
    $data=$tblride->rideCompletedAll($sort);
    if ($data!=false) {
        $msg['completedrides']=$data->num_rows;
    }
    else {
        $msg['completedrides']=0;
    }
    $data=$tblride->canceledRidesAll($sort);
    if ($data!=false){
        $msg['canceledrides']=$data->num_rows;
    }
    else {
        $msg['canceledrides']=0;
    }
    $data=$tblride->allRidesAdmin($sort);
    if ($data!=false) {
        $msg['allrides']=$data->num_rows;
    }
    else {
        $msg['allrides']=0;
    }
    include_once '../admin/tbl_user.php';
    $tbluser=new tblUser();
    $data=$tbluser->userRequests($sort);
    if ($data!=false) {
        $msg['pendinguserrequest']=$data->num_rows;
    }
    else {
        $msg['pendinguserrequest']=0;
    }
    $data=$tbluser->approvedUserRequests($sort);
    if ($data!=false) {
        $msg['approveduserrequest']=$data->num_rows;
    }
    else {
        $msg['approveduserrequest']=0;
    }
    $data=$tbluser->allUsers($sort);
    if ($data!=false) {
        $msg['alluser']=$data->num_rows;
    }
    else {
        $msg['alluser']=0;
    }
    include_once '../admin/tbl_location.php';
    $tbllocation=new tblLocation();
    $data=$tbllocation->getLocation($sort);
    if ($data!=false) {
        $msg['servicablelocation']=$data->num_rows;
    }
    else {
        $msg['servicablelocation']=0;
    }
    print_r(json_encode($msg));
}







if (isset($_POST['defaultloaduser'])) {
    include_once '../admin/tbl_ride.php';
    $tblride=new tblRide();
    $msg=array();
    $userid=$_SESSION['user'][1];
    $data=$tblride->pendingRides($userid);
    if ($data!=false) {
        $msg['pendingrides']=$data->num_rows;
    }
    else {
        $msg['pendingrides']=0;
    }
    $data=$tblride->completedRides($userid,0);
    if ($data!=false) {
        $msg['completedrides']=$data->num_rows;
    }
    else {
        $msg['completedrides']=0;
    }
    $data=$tblride->getData($userid,0);
    if ($data!=false) {
        $msg['allrides']=$data->num_rows;
    }
    else {
        $msg['allrides']=0;
    }
    $data=$tblride->totalExpanses($userid);
    if ($data!=false) {
        $msg['totalexpanses']=$data;
    }
    else {
        $msg['totalexpanses']=0;
    }
    print_r(json_encode($msg));
}
?>