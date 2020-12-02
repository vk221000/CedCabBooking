<?php
    class tblUser{
        public $conn;
        public function __construct(){
            include_once 'config.php';
            $db=new dbconnect();
            $this->conn=$db->createConnection();
        }
        public function login($username,$password){
            $sql="SELECT * FROM `tbl_user` WHERE `user_name`='$username' and `password`='$password'";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function updateuser($userid, $name, $mobile){
            $sql="UPDATE `tbl_user` SET `name`='$name', `mobile`='$mobile' WHERE `user_id`='$userid'";
            if ($this->conn->query($sql)) {
                return true;
            }
            return false;
        }
        public function getUser($userid){
            $sql="SELECT * FROM `tbl_user` WHERE `user_id`='$userid'";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;

        }
        public function getUsers(){
            $sql="SELECT * FROM `tbl_user`";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
        }
        public function checkUserDuplicate($username){
            $sql="SELECT * FROM `tbl_user` WHERE `user_name` LIKE '$username'";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return true;
            }
            return false;
        }
        public function insertUser($username,$name,$mobile,$password){
            $sql="INSERT INTO `tbl_user`(`user_name`, `name`, `dateofsignup`, `mobile`, `isblock`, `password`, `is_admin`)
            VALUES ('$username', '$name', NOW(), '$mobile', '0', '$password', '0')";
            if ($this->conn->query($sql)) {
                return true;
            }
            return false;
        }
        public function passwordReset($username,$password, $oldpassword){
            $sql="SELECT * FROM `tbl_user` WHERE `password`='$oldpassword'";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0){
                $sql="UPDATE `tbl_user` SET `password`='$password' WHERE `user_name`='$username'";
                $this->conn->query($sql);
                return true;
            }
            else{
                return false;
            }
            
        }
        public function userRequests($sort){
            if ($sort=="asc"){
                $sql="SELECT * FROM `tbl_user` WHERE `isblock`='0' ORDER BY `dateofsignup` ASC";
            }
            else if ($sort=='desc'){
                $sql="SELECT * FROM `tbl_user` WHERE `isblock`='0' ORDER BY `dateofsignup` DESC";
            }
            else {
                $sql="SELECT * FROM `tbl_user` WHERE `isblock`='0'";
            }
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function acceptUser($userid){
            $sql="UPDATE `tbl_user` SET `isblock`='1' WHERE `user_id`='$userid'";
            $this->conn->query($sql);
            if ($this->conn->query($sql)) {
                return true;
            }
            return false;

        }
        public function approvedUserRequests($sort){
            if ($sort=="asc"){
                $sql="SELECT * FROM `tbl_user` WHERE `isblock`='1' ORDER BY `name` ASC";
            }
            else if ($sort=="desc"){
                $sql="SELECT * FROM `tbl_user` WHERE `isblock`='1' ORDER BY `name` DESC";
            }else {
                $sql="SELECT * FROM `tbl_user` WHERE `isblock`='1'";
            }
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function allUsers(){
            $sql="SELECT * FROM `tbl_user`";
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function deleteUser($userid){
            $sql="DELETE FROM `tbl_ride` WHERE `user_id`='$userid'";
            $this->conn->query($sql);
            $sql="DELETE FROM `tbl_user` WHERE `user_id`='$userid'";
            $data=$this->conn->query($sql);
            if ($data===true) {
                return true;
            }
            return false;
        }
        public function sortUsersByName($sort){
            if ($sort=="asc"){
                $sql="SELECT * FROM `tbl_user` ORDER BY `name` ASC";
            }
            else{
                $sql="SELECT * FROM `tbl_user` ORDER BY `name` DESC";
            }
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
        public function sortUsersByDate($sort){
            if ($sort=="asc"){
                $sql="SELECT * FROM `tbl_user` ORDER BY `dateofsignup` ASC";
            }
            else{
                $sql="SELECT * FROM `tbl_user` ORDER BY `dateofsignup` DESC";
            }
            $data=$this->conn->query($sql);
            if ($data->num_rows>0) {
                return $data;
            }
            return false;
        }
    }
    
?>