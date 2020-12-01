<?php
    class tblRide{
        public $conn;
        public function __construct(){
            include_once 'config.php';
            $db=new dbconnect();
            $this->conn=$db->createConnection();
        }
        public function getData($userid,$sort){
            if ($sort=='asc'){
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' ORDER BY `ride_date` ASC";
            }
            elseif ($sort=='desc'){
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' ORDER BY `ride_date` DESC";
            }
            else {
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid'";
            }
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
        }
        public function insertData($pickup,$drop,$cabtype,$distance,$luggage,$fare,$userid){
            $sql="INSERT INTO `tbl_ride` (`ride_date`, `from`, `to`, `cab_type`, `total_distance`, `luggage`, `total_fare`, `status`, `user_id`) 
            VALUES (CURRENT_DATE(), '$pickup', '$drop', '$cabtype', '$distance', '$luggage', '$fare', '1', '$userid')";
            if (($this->conn->query($sql))===true) {
                return true;
            }
            else{
                return false; 
            }  
        }
        public function rideRequests($sort){
            if ($sort=='asc'){
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='1' ORDER BY `ride_date`";
            }
            else if ($sort=='desc'){
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='1' ORDER BY `ride_date`";
            }else {
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='1'";
            }
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        
        public function invoice($rideid){
            $sql="SELECT * FROM `tbl_ride` WHERE `ride_id`='$rideid'";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function pendingRides($userid){
            $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' AND `status`='1'";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function completedRides($userid,$sort){
            if ($sort=='asc') {
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' AND `status`='2' ORDER BY `ride_date` ASC";
            }
            else if ($sort=='desc'){
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' AND `status`='2' ORDER BY `ride_date` DESC";
            }
            else{
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' AND `status`='2'";
            }
            
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function totalExpanses($userid){
            $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' AND `status`='2'";
            $data=$this->conn->query($sql);
            $totalexpanses=0;
            if ($data->num_rows>0) {
                while ($row=$data->fetch_assoc()) {
                    $totalexpanses+=(int)$row['total_fare'];
                }
                return $totalexpanses;
            }
            return false;
        }
        
        public function previousRidesSortedByFareUser($userid,$sort){
            if ($sort=='asc') {
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' ORDER BY `total_fare` ASC";
            }
            else if ($sort=='desc'){
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid'  ORDER BY `total_fare` DESC";
            }
            else{
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid'";
            }
            
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function fareCompletedRideSort($userid,$sort){
            if ($sort=='asc') {
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' AND `status`='2' ORDER BY `total_fare` ASC";
            }
            else if ($sort=='desc'){
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' AND `status`='2' ORDER BY `total_fare` DESC";
            }
            else{
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' AND `status`='2'";
            }
            
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function pendingRequests($userid){
            $sql="SELECT * FROM `tbl_ride` WHERE `status`='1' AND `user_id`='$userid'";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function acceptRide($id){
            $sql="UPDATE `tbl_ride` SET `status`='2' WHERE `ride_id`='$id'";
            if ($this->conn->query($sql)) {
                return true;
            }
            return false;

        }
        public function rejectRide($id){
            $sql="UPDATE `tbl_ride` SET `status`='0' WHERE `ride_id`='$id'";
            if ($this->conn->query($sql)) {
                return true;
            }
            return false;

        }
        public function rideCompletedAll($sort){
            if ($sort=='asc') {
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='2' ORDER BY `ride_date` ASC";
            }
            elseif ($sort=='desc'){
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='2' ORDER BY `ride_date` DESC";
            }else {
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='2'";
            }
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function canceledRidesAll($sort){
            if ($sort=='asc') {
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='0' ORDER BY `ride_date` ASC";
            }
            elseif ($sort=='desc'){
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='0' ORDER BY `ride_date` DESC";
            }else {
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='0'";
            }
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function allRidesAdmin($sort){
            if ($sort=='asc') {
                $sql="SELECT * FROM `tbl_ride` ORDER BY `ride_date` ASC";
            }
            elseif ($sort=='desc'){
                $sql="SELECT * FROM `tbl_ride` ORDER BY `ride_date` DESC";
            }else {
                $sql="SELECT * FROM `tbl_ride`";
            }
            
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function sortByDistanceAdmin($distsort){
            if ($distsort=='asc') {
                $sql="SELECT * FROM `tbl_ride` ORDER BY `total_distance` ASC";
            }
            elseif ($distsort=='desc'){
                $sql="SELECT * FROM `tbl_ride` ORDER BY `total_distance` DESC";
            }else {
                $sql="SELECT * FROM `tbl_ride`";
            }
            
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function filterByCabType($cabtype,$sort){
            if ($sort=='asc') {
                $sql="SELECT * FROM `tbl_ride` WHERE `cab_type`='$cabtype' ORDER BY `ride_date` ASC";
            }
            elseif ($sort=='desc'){
                $sql="SELECT * FROM `tbl_ride` WHERE `cab_type`='$cabtype'  ORDER BY `ride_date` DESC";
            }else {
                $sql="SELECT * FROM `tbl_ride` WHERE `cab_type`='$cabtype'";
            }
            
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function compFilterByCabType($cabtype,$sort){
            if ($sort=='asc') {
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='2' AND `cab_type`='$cabtype' ORDER BY `ride_date` ASC";
            }
            elseif ($sort=='desc'){
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='2' AND `cab_type`='$cabtype'  ORDER BY `ride_date` DESC";
            }else {
                $sql="SELECT * FROM `tbl_ride` WHERE `status`='2' AND `cab_type`='$cabtype'";
            }
            
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function filterByCabTypeUser($cabtype,$userid){
            $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' AND `cab_type`='$cabtype'";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function filterByDateAdmin($datetype){
            if ($datetype=='LastWeek') {
                $sql="SELECT * FROM `tbl_ride` WHERE `ride_date`>DATE_SUB(NOW(), INTERVAL 7 DAY) ORDER BY `ride_date`";
            }
            elseif ($datetype=='LastMonth') {
                $sql="SELECT * FROM `tbl_ride` WHERE `ride_date`>DATE_SUB(NOW(), INTERVAL 30 DAY) ORDER BY `ride_date`";
            }else {
                $sql="SELECT * FROM `tbl_ride`";
            }
            
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function compFilterByDateAdmin($datetype){
            if ($datetype=='LastWeek') {
                $sql="SELECT * FROM `tbl_ride` WHERE  `status`='2' AND `ride_date`>DATE_SUB(NOW(), INTERVAL 7 DAY) ORDER BY `ride_date`";
            }
            elseif ($datetype=='LastMonth') {
                $sql="SELECT * FROM `tbl_ride` WHERE  `status`='2' AND `ride_date`>DATE_SUB(NOW(), INTERVAL 30 DAY) ORDER BY `ride_date`";
            }else {
                $sql="SELECT * FROM `tbl_ride` WHERE  `status`='2'";
            }
            
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function filterByDateUser($datetype,$userid){
            if ($datetype=='LastWeek') {
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' AND `ride_date`>DATE_SUB(NOW(), INTERVAL 7 DAY) ORDER BY `ride_date`";
            }
            elseif ($datetype=='LastMonth') {
                $sql="SELECT * FROM `tbl_ride` WHERE `user_id`='$userid' AND `ride_date`>DATE_SUB(NOW(), INTERVAL 30 DAY) ORDER BY `ride_date`";
            }else {
                $sql="SELECT * FROM `tbl_ride`";
            }
            
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function allRidesAdminSortByFare($sort){
            if ($sort=='asc') {
                $sql="SELECT * FROM `tbl_ride` ORDER BY `total_fare` ASC";
            }
            elseif ($sort=='desc'){
                $sql="SELECT * FROM `tbl_ride` ORDER BY `total_fare` DESC";
            }else {
                $sql="SELECT * FROM `tbl_ride`";
            }
            
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
    } 
?>