<?php
session_start();
include 'admin/tbl_location.php';
$tbl=new tblLocation();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CedCab</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="user/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand logo-margin" href="javascript:void(0)"><h3><span class='logo-color'>Ced</span> Cab</h3></a>
            <?php
            if (isset($_SESSION['user'])) {
                $html='<ul class="navbar-nav"><li class="nav-item"><a class="nav-link" href="user/user_dashboard.php">Dashboard</a></li></ul>';    
                echo $html;
            }
            ?>
            <button class="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navb" >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navb">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link active" href="javascript:void(0)">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="javascript:void(0)">About Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="javascript:void(0)">Contact Us</a>
                </li>
                <?php
                if (isset($_SESSION['user'])) {
                    $html='<li class="nav-item"><a class="nav-link" href="logout.php?logout">Logout</a></li>';
                    echo $html;
                } else {
                    $html='<li class="nav-item"><a class="nav-link" href="login.php">Login</a></li>';
                    echo $html;
                }
                ?>
              </ul>
              
            </div>
          </nav>
    </header>
    <div class="container-fluid backgroundimg">
        <section>
            <h3>Book a <span class='logo-color'>Ced</span>Cab to your destination in town</h3>
            <div class='row clearfix'>
                <div class="col-lg-4">
                    <div class="form">
                        <h5><span class="logo">Ced Cab</span></h5>
                        <div class="message-logo">
                            <div class="font-weight-bold">Your everyday travel partner</div>
                            <p class="light-text">AC cabs for point to point travel</p>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">PICKUP</label>
                            </div>
                            <select class="custom-select" id="inputGroupSelect01">
                                <?php
                                    $html='<option selected>Current location</option>';
                                    $data=$tbl->getLocation();
                                    while($row=$data->fetch_assoc()){
                                        $html.='<option value="'.$row['name'].'">'.$row['name'].'</option>';
                                    }
                                    echo $html;
                                ?>
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect02">DROP</label>
                            </div>
                            <select class="custom-select" id="inputGroupSelect02">
                                <?php
                                    $html='<option selected>Enter drop for ride estimate</option>';
                                    $data=$tbl->getLocation();
                                    while($row=$data->fetch_assoc()){
                                        $html.='<option value="'.$row['name'].'">'.$row['name'].'</option>';
                                    }
                                    echo $html;
                                ?>
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect03">CAR TYPE</label>
                            </div>
                            <select class="custom-select" id="inputGroupSelect03">
                                <option selected>Dropdown to select CAB type</option>
                                <option value="CedMicro">CedMicro</option>
                                <option value="CedMini">CedMini</option>
                                <option value="CedRoyal">CedRoyal</option>
                                <option value="CedSUV">CedSUV</option>
                            </select>
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" id="validationTooltipluggagePrepend">Luggage</label>
                            </div>
                            <input type="text" class="form-control"  name="luggage" id="luggage" aria-describedby="validationTooltipluggagePrepend" placeholder="Enter Weight in KG" required>
                        </div>
                        <button type="submit" class="btn btn-primary form-control form-btn" id="submit" data-toggle="modal" data-target="#myModal">Calculate Fare</button>     
                        <div class="modal" id="myModal">
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body" id="message-show">
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-dismiss="modal" id="book-cab">BookCab</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
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
    <script src="script.js"></script>
</body>
</html>





