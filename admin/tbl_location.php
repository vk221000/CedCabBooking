<?php
    class tblLocation{
        public $conn;
        public function __construct(){
            include_once 'config.php';
            $db=new dbconnect();
            $this->conn=$db->createConnection();
        }
        
        public function getLocation(){
            $sql="SELECT * FROM `tbl_location`";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function insertLocation($location, $distance){
            $sql="INSERT INTO `tbl_location` (`name`, `distance`, `is_available`)
            VALUES ('$location', '$distance', '1')";
            if ($this->conn->query($sql)===true) {
                return true;
            }
            return false;
        }
        public function updateLocation($id, $location, $distance, $isavailable){
            $sql="UPDATE `tbl_location` SET `name`='$location', `distance`='$distance', `is_available`='$isavailable'
            WHERE `id`='$id'";
            if ($this->conn->query($sql)===true) {
                return true;
            }
            return false;
        }
        public function getLocationofID($id){
            $sql="SELECT * FROM `tbl_location` WHERE `id`='$id'";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function deleteLocation($id){
            $sql="DELETE FROM `tbl_location` WHERE `id`='$id'";
            $data=$this->conn->query($sql);
            if ($data===true) {
                return true;
            }
            return false;
        }
    }
    
?>