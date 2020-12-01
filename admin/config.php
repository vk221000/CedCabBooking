<?php
class dbconnect{
    public $servername;
    public $username;
    public $password;
    public $dbname;
    public $conn;
    public function __construct(){
        $this->servername='localhost';
        $this->username='root';
        $this->password='';
        $this->dbname='cabbooking';
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