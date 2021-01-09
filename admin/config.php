<?php
class dbconnect{
    public $servername;
    public $username;
    public $password;
    public $dbname;
    public $conn;
    public function __construct(){
        $this->servername='btqnyngtn1riwmgfbxhw-mysql.services.clever-cloud.com';
        $this->username='uzrdkcha3pcetciw';
        $this->password='r4azbEDvGVTQKSlqZIdd';
        $this->dbname='btqnyngtn1riwmgfbxhw';
    }
    public function createConnection(){
        $this->conn=new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($this->conn->connect_error) {
            echo "error";
        }else{
            return $this->conn;
        }
    }
}
?>
