<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location:../login.php');
}
if (isset($_SESSION['booking'])){
    echo "<script>alert('your ride has been booked but approval is needed from admin please wait for the approval');</script>";
    unset($_SESSION['booking']);
}
if (isset($_SESSION['booked'])){
    echo "<script>alert('your ride has been booked but approval is needed from admin please wait for the approval');</script>";
    unset($_SESSION['booked']);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UserDashboard</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky">
        <a class="navbar-brand logo-margin" href="index.php"><h3><span class='logo-color'>Ced</span>Cab</h3></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="javascript:void(0)" id="home-user">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="index.php">Book New Ride</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Rides
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="javascript:void(0)" id="pendingrides">Pending Rides</a>
                        <a class="dropdown-item" href="javascript:void(0)" id="completedrides">Completed Rides</a>
                        <a class="dropdown-item" href="javascript:void(0)" id="previousrides">All Rides</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Account
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="javascript:void(0)" id="editprofile">Update Information</a>
                        <a class="dropdown-item" href="javascript:void(0)" id="resetpassword">Change Password</a>
                    </div>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <div class="greetings"><?php echo "Hi ".$_SESSION['user'][0]; ?></div>
                <a href="../logout.php?logout"class="btn btn-outline-info my-2 my-sm-0" type="submit">Logout</a>
            </form>
        </div>
    </nav>
    <div class="page-content"></div>
    <div class="footer-dashboard">
        <footer class="container-fluid footer-bg-color">
            <div class='row'>
                <div class="col-lg-4 text-center icon-color">
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                    <i class="fa fa-facebook-square" aria-hidden="true"></i>
                    <i class="fa fa-twitter-square" aria-hidden="true"></i>
                    <i class="fa fa-linkedin-square" aria-hidden="true"></i>
                </div>
                <div class="col-lg-4 text-center">
                    <div id="middle-footer">Copyright &#169; <span class='logo-color'>Ced</span>Cab</div> 
                    <div>2016-2020</div>
                </div>
                <div class="col-lg-4 text-center">
                    <a href="javascript:void(0)" class="btn btn-link text-white">Disclaimer</a>
                    <a href="javascript:void(0)" class="btn btn-link text-white">About Us</a>
                    <a href="javascript:void(0)" class="btn btn-link text-white">Contact Us</a>
                </div>
            </div>
        </footer>
    </div>
    <script src="script.js" type="text/javascript"></script>
</body>
</html>