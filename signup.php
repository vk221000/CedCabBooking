<?php
session_start();
$success="";
$failure="";
if (isset($_SESSION['user'])) {
    header('Location:user/');
}
if (isset($_SESSION['admin'])) {
    header('Location:admin/');
}
if (isset($_POST['submit'])) {
    include 'admin/tbl_user.php';
    $tbluser=new tblUser();
    $username=$_POST['username'];
    $name=$_POST['name'];
    $mobile=$_POST['mobile'];
    $password1=$_POST['password1'];
    $password2=$_POST['password2'];
    if ($password1==$password2) {
        $password=md5($password1);
        if (!$tbluser->checkUserDuplicate($username)) {
            if ($tbluser->insertuser($username,$name,$mobile,$password)) {
                $success="signup completed but approval is needed from admin";
            }
        }
        else {
            $failure="username already exists";
        }
    }
    else {
        $failure="password and repassword are not matching";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <link rel="stylesheet" href="user/style.css">
</head>
<body>
    <header class="signup-header">
        <nav>
            <a href="index.php"><h4><span class='logo-color'>Ced</span>Cab</h4></a>
            <a href="login.php">Sign in</a>
            <a href="index.php">CalculateFare</a>
            <a href="javascript:void(0)" class="signup-right">ContactUs</a>
            <a href="javascript:void(0)" class="signup-right">AboutUs</a>
        </nav>
    </header>
    <div class="signup-form">
        <form action="signup.php" method="post">
            <label for="username">Username</label>
            <div>
                <input type="text" name="username" id="username" placeholder="username.." required>
            </div>
                <label for="name">Name</label>
            <div>
                <input type="text" name="name" id="name" placeholder="name.." required>
            </div>
                <label for="mobile">Mobile</label>
            <div>
                <input type="number" name="mobile" id="mobile" min='1' placeholder="mobile.." required>
            </div>
                <label for="password1">Password</label>
            <div>
                <input type="password" name="password1" id="password1" placeholder="password.." required>
            </div>
                <label for="password2">Re Password</label>  
            <div>
                <input type="password" name="password2" id="password2" placeholder="repassword.." required>
            </div>
            <div>
                <input type="submit" value="SIGN UP" name="submit" id="submit">
            </div>
        </form>
    </div>
    <div class="success warning-message"><?php echo $success; ?></div>
    <div class="error warning-message"><?php echo $failure; ?></div>
    <footer class="footer-dashboard-signup">
        <div>copyrights &copy; <span class='logo-color'>Ced</span>Cab</div>
    </footer>
</body>
</html>