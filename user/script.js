
//-----------------------Landing Page jQueries For User Booking For Rides----------------------------------------
$('#inputGroupSelect03').click(function(){
    var value=$(this).val();
    if (value=='CedMicro') {
        $('#luggage').prop('disabled',true);
        $('#luggage').val('');
        $('#luggage').attr('placeholder','carriage is not available for CEDMicro');
    }
    else{
        $('#luggage').prop('disabled',false);
        $('#luggage').attr('placeholder','Enter Weight in KG');
    }
});
$('#inputGroupSelect01,#inputGroupSelect02,#inputGroupSelect03,#luggage').focus(function(){
    $('#submit').text('Calculate Fare');
    $(this).css('box-shadow','none');
});
$('#luggage').on('input',function(){
    var value=$(this).val();
    if (isNaN(value)) {
        $(this).val('');
        alert('Please enter valid numbers only!');
    }
});
$('#submit').click(function(){
    var pickup=$('#inputGroupSelect01').val();
    var drop=$('#inputGroupSelect02').val();
    var cabtype=$('#inputGroupSelect03').val();
    var luggage=$('#luggage').val();
    if ((pickup==drop)) {
        $('#book-cab').hide();
        $('#message-show').text("please choose different pickup and drop locations");

    }
    else {
        $.ajax({
            url: 'ajax.php',
            method: 'post',
            data: {
                pickup: pickup,
                drop: drop,
                cabtype: cabtype,
                luggage: luggage,
                submit: true
            },
            dataType: 'json',
            success: function(msg){
                if (msg=="please fill pickup, drop and cab type"){
                    $('#book-cab').hide();
                    $('#message-show').text(msg);
                }
                else{
                    $('#book-cab').show();
                    var html="<div class='text-justify'><div><span class='bold-show-details'>FROM: </span>"+msg[0]+"</div><div><span class='bold-show-details'>To: </span>"+msg[1]+"</div><div><span class='bold-show-details'>CabType: </span>"+msg[2]+"</div><div><span class='bold-show-details'>Luggage(KG): </span>"+msg[3]+"</div><div><span class='bold-show-details'>TotalDistance(KM): </span>"+msg[4]+"</div><div><span class='bold-show-details'>Total Fare(₹): </span>"+msg[5]+"</div></div>";
                    $('#message-show').html(html);
                }
            },
            error: function(){
                alert(error);
            }
        });
    }
});
$('#book-cab').click(function(){
    var pickup=$('#inputGroupSelect01').val();
    var drop=$('#inputGroupSelect02').val();
    var cabtype=$('#inputGroupSelect03').val();
    var luggage=$('#luggage').val();
    $.ajax({
        url: 'ajax.php',
        method: 'post',
        data: {
            pickup: pickup,
            drop: drop,
            cabtype: cabtype,
            luggage: luggage,
            bookcab: true
        },
        success: function(msg){
            $('#submit').text(msg);
            setTimeout(function(){$(location).attr('href','index.php');}, 3000);
        },
        error: function(){
            alert(error);
        }
    });
});
//-------------------Landing Page for booking rides for user-------------------------------------










// jQuery for user dashboard ajax requests
//---------------------Completed Rides User---------------------------------
function completeRidesFilterUser(){
    var html="<span class='table-type'>Completed Rides</span><span id='select-fields' class='form-group'><select name='cars' id='comp-cars-user'>\
                <option>All</option>\
                <option value='CedMicro'>CedMicro</option>\
                <option value='CedMini'>CedMini</option>\
                <option value='CedRoyal'>CedRoyal</option>\
                <option value='CedSUV'>CedSUV</option>\
            </select>\
            <select name='datesort' id='comp-datesort-user'>\
                <option>All</option>\
                </th><th></th><th></th><th></th><th></th></tr>\
                <option value='LastWeek'>LastWeek</option>\
                <option value='LastMonth'>LastMonth</option>\
            </select></span>";
    return html;
}
$('.page-content').on('click','#comp-datesort-user',function(){
    var datetype=$(this).val();
    if (datetype!='All'){
        $.ajax({
            url: 'user.php',
            method: 'post',
            data: {
                datetype: datetype,
                filterbycompdateuser: true
            },
            dataType: 'json',
            success: function(row){
                html+="<table id='customers'><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-completed-user-asc'>&#8657;</a><a href='javascript:void(0)' id='rides-completed-user-desc'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-user-asc'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-user-desc'>&#8659;</a></th></tr>";
                if (row!=false) {
                    for (var i=0;i<row.length;i++){
                        html+="<tr><td>"+row[i]['from']+"</td><td>"+row[i]['to']+"</td><td>"+row[i]['cab_type']+"</td><td>"+row[i]['ride_date']+"</td><td>"+row[i]['total_distance']+"</td><td>"+row[i]['luggage']+"</td><td>"+row[i]['total_fare']+"</td></tr>";
                    }
                }
                $('#customers').html(html);
            },
            error: function(){
                alert("error");
            }
        });
    }
});
$('.page-content').on('click','#comp-cars-user',function(){
    var cabtype=$(this).val();
    if (cabtype!='All'){
        $.ajax({
            url: 'user.php',
            method: 'post',
            data: {
                cabtype: cabtype,
                filterbycompcabtypeuser: true
            },
            dataType: 'json',
            success: function(row){
                html+="<table id='customers'><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-completed-user-asc'>&#8657;</a><a href='javascript:void(0)' id='rides-completed-user-desc'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-user-asc'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-user-desc'>&#8659;</a></th></tr>";
                if (row!=false) {
                    for (var i=0;i<row.length;i++){
                        html+="<tr><td>"+row[i]['from']+"</td><td>"+row[i]['to']+"</td><td>"+row[i]['cab_type']+"</td><td>"+row[i]['ride_date']+"</td><td>"+row[i]['total_distance']+"</td><td>"+row[i]['luggage']+"</td><td>"+row[i]['total_fare']+"</td></tr>";
                    }
                }
                html+="</table>";
                $('#customers').html(html);
            },
            error: function(){
                alert("error");
            }
        });
    }
});
//---------------Completed Rides User------------------------------------










//-----------------------------------All Rides Users-----------------------------------------
function allRidesFilter(){
    var html="<span class='table-type'>All Rides</span><span id='select-fields' class='form-group'><select name='cars' id='cars'>\
                <option>All</option>\
                <option value='CedMicro'>CedMicro</option>\
                <option value='CedMini'>CedMini</option>\
                <option value='CedRoyal'>CedRoyal</option>\
                <option value='CedSUV'>CedSUV</option>\
            </select>\
            <select name='datesort' id='datesort'>\
                <option>All</option>\
                </th><th></th><th></th><th></th><th></th></tr>\
                <option value='LastWeek'>LastWeek</option>\
                <option value='LastMonth'>LastMonth</option>\
            </select></span>";
    return html;
}
$('.page-content').on('click','#datesort',function(){
    var datetype=$(this).val();
    if (datetype!='All'){
        $.ajax({
            url: 'user.php',
            method: 'post',
            data: {
                datetype: datetype,
                filterbydateuser: true
            },
            dataType: 'json',
            success: function(data){
                var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-all-user-asc'>&#8657;</a><a href='javascript:void(0)' id='rides-all-user-asc'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-all-user-asc'>&#8657;</a><a href='javascript:void(0)' id='fare-all-user-desc'>&#8659;</a></th></tr>";
                if (data!=false) {
                    for (var i=0;i<data.length;i++) {
                        html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td></tr>";
                    }
                }
                $('#customers').html(html);
            },
            error: function(){
                alert("error");
            }
        });
    }
});
$('.page-content').on('click','#cars',function(){
    var cabtype=$(this).val();
    if (cabtype!='All'){
        $.ajax({
            url: 'user.php',
            method: 'post',
            data: {
                cabtype: cabtype,
                filterbycabtypeuser: true
            },
            dataType: 'json',
            success: function(data){
                var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-all-user-desc'>&#8657;</a><a href='javascript:void(0)' id='rides-all-user-desc'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-all-user-asc'>&#8657;</a><a href='javascript:void(0)' id='fare-all-user-asc'>&#8659;</a></th></tr>";
                if (data!=false) {
                    for (var i=0;i<data.length;i++) {
                        html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td></tr>";
                    }
                }
                html+="</table>";
                $('#customers').html(html);
            },
            error: function(){
                alert("error");
            }
        });
    }
});
$('#previousrides').click(function(){
    previousRides(0);
});
$('.page-content').on('click','#previousrides',function(){
    previousRides(0);
});
$('.page-content').on('click','#rides-all-user-asc',function(){
    var sort="asc";
    previousRides(sort);
});
$('.page-content').on('click','#rides-all-user-desc',function(){
    var sort="desc";
    previousRides(sort);
});
function previousRides(sort){
    $.ajax({
        url: 'user.php',
        method: 'post',
        data: {
            sort:sort,
            previousrides: true
        },
        dataType: 'json',
        success: function(row){
            var html=allRidesFilter();
            html+="<table id='customers'><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-all-user-asc'>&#8657;</a><a href='javascript:void(0)' id='rides-all-user-desc'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-all-user-asc'>&#8657;</a><a href='javascript:void(0)' id='fare-all-user-desc'>&#8659;</a></th></tr>";
            for (var i=0;i<row.length;i++){
                html+="<tr><td>"+row[i]['from']+"</td><td>"+row[i]['to']+"</td><td>"+row[i]['cab_type']+"</td><td>"+row[i]['ride_date']+"</td><td>"+row[i]['total_distance']+"</td><td>"+row[i]['luggage']+"</td><td>"+row[i]['total_fare']+"</td></tr>";
            }
            html+="</table>";
            $('.page-content').html(html);
        },
        error: function(){
            alert("error");
        }
    });
}
$('.page-content').on('click','#fare-all-user-asc',function(){
    var sort="asc";
    previousRidesSortedByFareUser(sort);
});
$('.page-content').on('click','#fare-all-user-desc',function(){
    var sort="desc";
    previousRidesSortedByFareUser(sort);
});
function previousRidesSortedByFareUser(sort){
    $.ajax({
        url: 'user.php',
        method: 'post',
        data: {
            sort:sort,
            previousridessortedbyfareuser: true
        },
        dataType: 'json',
        success: function(row){
            var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-all-user-asc'>&#8657;</a><a href='javascript:void(0)' id='rides-all-user-desc'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-all-user-asc'>&#8657;</a><a href='javascript:void(0)' id='fare-all-user-desc'>&#8659;</a></th></tr>";
            for (var i=0;i<row.length;i++){
                html+="<tr><td>"+row[i]['from']+"</td><td>"+row[i]['to']+"</td><td>"+row[i]['cab_type']+"</td><td>"+row[i]['ride_date']+"</td><td>"+row[i]['total_distance']+"</td><td>"+row[i]['luggage']+"</td><td>"+row[i]['total_fare']+"</td></tr>";
            }
            html+="</table>";
            $('#customers').html(html);
        },
        error: function(){
            alert(error);
        }
    });
}
//-------------------------All Rides User-----------------------------------










//---------------------Pending Rides User---------------------------------
$('#pendingrides').click(function(){
    pendingRides();
});
$('.page-content').on('click','#pendingrides',function(){
    pendingRides();
});
function pendingRides(){
    $.ajax({
        url: 'user.php',
        method: 'post',
        data: {
            pendingrides: true
        },
        dataType: 'json',
        success: function(row){
            var html="<span class='table-type'>Pending Rides</span><table id='customers'><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)</th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)</th><th>Action</th></tr>";
            for (var i=0;i<row.length;i++){
                html+="<tr><td>"+row[i]['from']+"</td><td>"+row[i]['to']+"</td><td>"+row[i]['cab_type']+"</td><td>"+row[i]['ride_date']+"</td><td>"+row[i]['total_distance']+"</td><td>"+row[i]['luggage']+"</td><td>"+row[i]['total_fare']+"</td><td><a href='javascript:void(0)' id='ridecancelbyuser' class='btn btn-outline-danger' data-id='"+row[i]['ride_id']+"'>cancel</a></td></tr>";
            }
            html+="</table>";
            $('.page-content').html(html);
        },
        error: function(){
            alert("error");
        }
    });
}
$('.page-content').on('click','#ridecancelbyuser',function(){
    var id=$(this).data('id');
    var r = confirm("Are you sure you want to cancel the ride!");
    if (r == true) {
        $.ajax({
            url:'user.php',
            method: 'post',
            data: {
                id:id,
                ridecanceledbyuser: true
            },
            success: function(msg){
                pendingRides();
            },
            error:function(){
                alert('error');
            }
        });
    }
});
//--------------------Pending Rides User---------------------------------




















//--------------------------------Completed Rides User----------------------------------------
$('#completedrides').click(function(){
    completedRides(0);
});
$('.page-content').on('click','#completedrides',function(){
    completedRides(0);
});
$('.page-content').on('click','#rides-completed-user-asc',function(){
    var sort="asc";
    completedRides(sort);
});
$('.page-content').on('click','#rides-completed-user-desc',function(){
    var sort="desc";
    completedRides(sort);
});
$('.page-content').on('click','#fare-comp-user-asc',function(){
    var sort="asc";
    farecompletedRidesSort(sort);
});
$('.page-content').on('click','#fare-comp-user-desc',function(){
    var sort="desc";
    farecompletedRidesSort(sort);
});
function completedRides(sort){
    $.ajax({
        url: 'user.php',
        method: 'post',
        data: {
            sort: sort,
            completedrides: true
        },
        dataType: 'json',
        success: function(row){
            var html=completeRidesFilterUser();
            html+="<table id='customers'><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-completed-user-asc'>&#8657;</a><a href='javascript:void(0)' id='rides-completed-user-desc'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-user-asc'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-user-desc'>&#8659;</a></th></tr>";
            if (row!=false) {
                for (var i=0;i<row.length;i++){
                    html+="<tr><td>"+row[i]['from']+"</td><td>"+row[i]['to']+"</td><td>"+row[i]['cab_type']+"</td><td>"+row[i]['ride_date']+"</td><td>"+row[i]['total_distance']+"</td><td>"+row[i]['luggage']+"</td><td>"+row[i]['total_fare']+"</td></tr>";
                }
            }
            html+="</table>";
            $('.page-content').html(html);
        },
        error: function(){
            alert("error");
        }
    });
}
function farecompletedRidesSort(sort){
    $.ajax({
        url: 'user.php',
        method: 'post',
        data: {
            sort:sort,
            farecompletedridessort: true
        },
        dataType: 'json',
        success: function(row){
            var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-completed-user-asc'>&#8657;</a><a href='javascript:void(0)' id='rides-completed-user-desc'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-user-asc'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-user-desc'>&#8659;</a></th></tr>";
            for (var i=0;i<row.length;i++){
                html+="<tr><td>"+row[i]['from']+"</td><td>"+row[i]['to']+"</td><td>"+row[i]['cab_type']+"</td><td>"+row[i]['ride_date']+"</td><td>"+row[i]['total_distance']+"</td><td>"+row[i]['luggage']+"</td><td>"+row[i]['total_fare']+"</td></tr>";
            }
            html+="</table>";
            $('#customers').html(html);
        },
        error: function(){
            alert(error);
        }
    });
}
//---------------------Completed Rides User----------------------------------------------








//------------Profile Management User----------------------------------
$('#editprofile').click(function(){
    profileEditUser();
});
function profileEditUser(){
    $.ajax({
        url: 'user.php',
        method: 'post',
        data: {
            editprofile: true
        },
        dataType: 'json',
        success: function(row){
            var username=row['user_name'];
            var name=row['name'];
            var mobile=row['mobile'];
            var html=' <div class="signup-form">\
                            <label for="username">Username</label>\
                            <div>\
                                <input type="text" name="username" id="username" value="'+username+'" placeholder="username.." disabled required>\
                            </div>\
                                <label for="name">Name</label>\
                            <div>\
                                <input type="text" name="name" id="name" value="'+name+'" placeholder="name.." required>\
                            </div>\
                                <label for="mobile">Mobile</label>\
                            <div>\
                                <input type="number" name="mobile" id="mobile" value="'+mobile+'" placeholder="mobile.." required>\
                            </div>\
                            <div>\
                                <input type="submit" value="UPDATE" name="submit" id="updateprofile">\
                            </div>\
                    </div>';
            $('.page-content').html(html);
        },
        error: function(){
            alert("error");
        }
    });
}
$('.page-content').on('click','#updateprofile',function(){
    var name=$('#name').val();
    name=name.trim();
    var mobile=$('#mobile').val();
    mobile=mobile.trim();
    if (name=='' || mobile=='' || name.length<3 || isNaN(mobile)) {
        alert('please insert name and mobile number');
        profileEditUser();
    }
    else {
        $.ajax({
            url: 'user.php',
            method: 'post',
            data: {
                name: name,
                mobile: mobile,
                updateprofile: true
            },
            success: function(msg){
                $('.page-content').html("<div class='success text-center'>"+msg+"</div>");
            },
            error: function(){
                alert(error);
            }
        });
    }
});
$('#resetpassword').click(function(){
    $.ajax({
        url: 'user.php',
        method: 'post',
        data: {
            passwordreset: true
        },
        dataType: 'json',
        success: function(row){
            var username=row['user_name'];
            var html='<div class="signup-form">\
                            <label for="username">Username</label>\
                            <div>\
                                <input type="text" name="username" id="username" value="'+username+'" placeholder="username.." disabled required>\
                            </div>\
                            <label for="oldpassword">Old Password</label>\
                            <div>\
                                <input type="password" name="oldpassword" id="oldpassword" placeholder="old password.." required>\
                            </div>\
                                <label for="password">New Password</label>\
                            <div>\
                                <input type="password" name="password" id="password" placeholder="password.." required>\
                            </div>\
                            <div>\
                                <input type="submit" value="UPDATE" name="submit" id="updatepassword">\
                            </div>\
                    </div>';
            $('.page-content').html(html);
        },
        error: function(){
            alert(error);
        }
    });
});
$('.page-content').on('click','#updatepassword',function(){
    var username=$('#username').val();
    var oldpassword=$('#oldpassword').val();
    var password=$('#password').val();
    password=password.trim();
    if (password=='' || password.length<3) {
        alert('please enter new password');
    }
    else {
        $.ajax({
            url: 'user.php',
            method: 'post',
            data: {
                username: username,
                oldpassword: oldpassword,
                password: password,
                passwordset: true
            },
            success: function(msg){
                if (msg=="true") {
                    $('.page-content').html("<div class='success text-center'>password successfully updated</div>");
                    setTimeout(function(){$(location).attr('href','../logout.php?logout');}, 3000);
                }
                else {
                    $('.page-content').html("<div class='error text-center'>old password does not match</div>");
                }
            },
            error: function(){
                alert(error);
            }
        });
    }  
});
//----------------------------Profile Management User----------------------------------------













//----------------------------Default Load on user dashboard------------------------------------------
function defaultHtml(){
    $.ajax({
        url: 'user.php',
        method: 'post',
        data: {
            defaultloaduser: true
        },
        dataType: 'json',
        success: function(msg){
            var pendingrides=msg['pendingrides'];
            var completedrides=msg['completedrides'];
            var allrides=msg['allrides'];
            var totalexpanses=msg['totalexpanses'];
            var html='<div class="row">\
                <div class="tiles text-center"><p>Pending Rides</p><p>'+pendingrides+'</p><p id="card-ride-request"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="pendingrides">Pending Rides</a></div>\
                <div class="tiles text-center"><p>Completed Rides</p><p>'+completedrides+'</p><p id="card-completed-rides"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="completedrides">Completed Rides</a></div>\
                <div class="tiles text-center"><p>All Rides</p><p>'+allrides+'</p><p id="card-all-rides"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="previousrides">All Rides</a></div>\
                <div class="tiles text-center"><p>Total Expanses</p><p>₹ '+totalexpanses+'</p><p id="card-total-expanses"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="totalexpanses">Total Expanses</a></div></div>';
                if (msg["lastbooked"]!=0) {
                    html+='<table id="customer-pending-flash"><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)</th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)</th><th>Status</th><th>Action</th></tr>\
                    <tr><td>'+msg["lastbooked"]["from"]+'</td><td>'+msg["lastbooked"]["to"]+'</td><td>'+msg["lastbooked"]["cab_type"]+'</td><td>'+msg["lastbooked"]["ride_date"]+'</td><td>'+msg["lastbooked"]["total_distance"]+'</td><td>'+msg["lastbooked"]["luggage"]+'</td><td>'+msg["lastbooked"]["total_fare"]+'</td><td><div class="blink_me">Pending</div></td><td><a href="javascript:void(0)" id="ridecancelbyuserflash" class="btn btn-outline-danger" data-id="'+msg["lastbooked"]["ride_id"]+'">cancel</a></td></tr></table>';    
                }
                $('.page-content').html(html);
        },
        error: function(){
            alert('error');
        }
    });
}
$('.page-content').on('click','#ridecancelbyuserflash',function(){
    var id=$(this).data('id');
    var r = confirm("Are you sure you want to cancel the ride!");
    if (r == true) {
        $.ajax({
            url:'user.php',
            method: 'post',
            data: {
                id:id,
                ridecanceledbyuser: true
            },
            success: function(msg){
                location.reload();
            },
            error:function(){
                alert('error');
            }
        });
    }
});
$('#home-user').click(function(){
    defaultHtml();
});
$(document).ready(function(){
    defaultHtml();
});
//------------------------------Default Load on User Dashboard----------------------