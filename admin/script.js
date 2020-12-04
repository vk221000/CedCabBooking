
//-------------------------Ride Requests For Admin---------------------------------
$('#riderequest').click(function(){
    rideRequests(0);
});
$('.page-content').on('click','#riderequest',function(){
    rideRequests(0);
});
$('.page-content').on('click','#rides-req-sort-asc-admin',function(){
    var sort="asc";
    rideRequests(sort);
});
$('.page-content').on('click','#rides-req-sort-desc-admin',function(){
    var sort="desc";
    rideRequests(sort);
});
$('.page-content').on('click','#rides-req-sort-asc-admin-fare',function(){
    var sort="asc";
    rideRequestsFareSort(sort);
});
$('.page-content').on('click','#rides-req-sort-desc-admin-fare',function(){
    var sort="desc";
    rideRequestsFareSort(sort);
});
function requestedRidesFilter(){
    var html="<span class='table-type'>Ride Requests</span><span id='select-fields'><select name='cars' id='req-cars'>\
                <option>All</option>\
                <option value='CedMicro'>CedMicro</option>\
                <option value='CedMini'>CedMini</option>\
                <option value='CedRoyal'>CedRoyal</option>\
                <option value='CedSUV'>CedSUV</option>\
            </select>\
            </th><th>\
            <select name='datesort' id='req-datesort'>\
                <option>All</option>\
                </th><th></th><th></th><th></th><th></th></tr>\
                <option value='LastWeek'>LastWeek</option>\
                <option value='LastMonth'>LastMonth</option>\
            </select></span>";
    return html;
}
$('.page-content').on('click','#req-datesort',function(){
    var datetype=$(this).val();
    if (datetype!='All'){
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                datetype: datetype,
                reqdatesort: true
            },
            dataType: 'json',
            success: function(data){
                var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-req-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-req-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='rides-req-sort-asc-admin-fare'>&#8657;</a><a href='javascript:void(0)' id='rides-req-sort-desc-admin-fare'>&#8659;</a></th><th>Action</th></tr>";
                if (data!=false) {
                    for (var i=0;i<data.length;i++) {
                        html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' id='ride-accept' data-id="+data[i]['ride_id']+" class='btn btn-outline-success'>accept</a><a href='javascript:void(0)' id='ride-reject' data-id="+data[i]['ride_id']+" class='btn btn-outline-danger'>reject</a></td></tr>";
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
$('.page-content').on('click','#req-cars',function(){
    var cabtype=$(this).val();
    if (cabtype!='All'){
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                cabtype: cabtype,
                reqcarssort: true
            },
            dataType: 'json',
            success: function(data){
                var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-req-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-req-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='rides-req-sort-asc-admin-fare'>&#8657;</a><a href='javascript:void(0)' id='rides-req-sort-desc-admin-fare'>&#8659;</a></th><th>Action</th></tr>";
                if (data!=false) {
                    for (var i=0;i<data.length;i++) {
                        html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' id='ride-accept' data-id="+data[i]['ride_id']+" class='btn btn-outline-success'>accept</a><a href='javascript:void(0)' id='ride-reject' data-id="+data[i]['ride_id']+" class='btn btn-outline-danger'>reject</a></td></tr>";
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
function rideRequestsFareSort(sort){
    var sort=sort;
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort: sort,
            riderequestsfaresort: true
        },
        dataType: 'json',
        success: function(data){
            var html=requestedRidesFilter();
            html+="<table id='customers'><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-req-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-req-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='rides-req-sort-asc-admin-fare'>&#8657;</a><a href='javascript:void(0)' id='rides-req-sort-desc-admin-fare'>&#8659;</a></th><th>Action</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' id='ride-accept' data-id="+data[i]['ride_id']+" class='btn btn-outline-success'>accept</a><a href='javascript:void(0)' id='ride-reject' data-id="+data[i]['ride_id']+" class='btn btn-outline-danger'>reject</a></td></tr>";
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
function rideRequests(sort){
    var sort=sort;
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort: sort,
            riderequests: true
        },
        dataType: 'json',
        success: function(data){
            var html=requestedRidesFilter();
            html+="<table id='customers'><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-req-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-req-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='rides-req-sort-asc-admin-fare'>&#8657;</a><a href='javascript:void(0)' id='rides-req-sort-desc-admin-fare'>&#8659;</a></th><th>Action</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' id='ride-accept' data-id="+data[i]['ride_id']+" class='btn btn-outline-success'>accept</a><a href='javascript:void(0)' id='ride-reject' data-id="+data[i]['ride_id']+" class='btn btn-outline-danger'>reject</a></td></tr>";
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
$('.page-content').on('click','#ride-accept',function(){
    var id=$(this).data('id');
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            id: id,
            rideaccept: true
        },
        success: function(msg){
            rideRequests(0);
        },
        error: function(){
            alert("error");
        }
    });
});
$('.page-content').on('click','#ride-reject',function(){
    var r=confirm('Are you sure you want to reject ride');
    if (r) {
        var id=$(this).data('id');
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                id: id,
                ridereject: true
            },
            success: function(msg){
                rideRequests(0);
            },
            error: function(){
                alert("error");
            }
        });
    }
});
// --------------------------------------------Ride Requests for Admin--------------------------------------












//--------------------------------------------Completed Rides for Admin---------------------------------
$('#completedridesall').click(function(){
    completedRidesAll(0);
});
$('.page-content').on('click','#completedridesall',function(){
    completedRidesAll(0);
});
$('.page-content').on('click','#rides-comp-sort-asc-admin',function(){
    var sort='asc';
    completedRidesAll(sort);
});
$('.page-content').on('click','#rides-comp-sort-desc-admin',function(){
    var sort='desc';
    completedRidesAll(sort);
});
function completedRidesAll(sort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort: sort,
            allcompletedrides: true
        },
        dataType: 'json',
        success: function(data){
            var html=completedRidesFilter();
            html+="<table id='customers'><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-comp-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-comp-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-sort-desc-admin'>&#8659;</a></th><th>Action</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' data-id='"+data[i]['ride_id']+"' id='invoice'>invoice</a></td></tr>";
                }
            }
            html+="</table>";
            $('.page-content').html(html);
        },
        error: function(){
            alert(error);
        }
    });
}
function completedRidesFilter(){
    var html="<span class='table-type'>Completed Rides</span><span id='select-fields'><select name='cars' id='comp-cars'>\
                <option>All</option>\
                <option value='CedMicro'>CedMicro</option>\
                <option value='CedMini'>CedMini</option>\
                <option value='CedRoyal'>CedRoyal</option>\
                <option value='CedSUV'>CedSUV</option>\
            </select>\
            </th><th>\
            <select name='datesort' id='comp-datesort'>\
                <option>All</option>\
                </th><th></th><th></th><th></th><th></th></tr>\
                <option value='LastWeek'>LastWeek</option>\
                <option value='LastMonth'>LastMonth</option>\
            </select></span>";
    return html;
}
$('.page-content').on('click','#comp-datesort',function(){
    var datetype=$(this).val();
    if (datetype!='All'){
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                datetype: datetype,
                compfilterbydateadmin: true
            },
            dataType: 'json',
            success: function(data){
                var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-sort-desc-admin'>&#8659;</a></th><th>Action</th></tr>";
                if (data!=false) {
                    for (var i=0;i<data.length;i++) {
                        html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' data-id='"+data[i]['ride_id']+"' id='invoice'>invoice</a></td></tr>";
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
$('.page-content').on('click','#comp-cars',function(){
    var cabtype=$(this).val();
    if (cabtype!='All'){
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                cabtype: cabtype,
                compfilterbycabtype: true
            },
            dataType: 'json',
            success: function(data){
                var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-sort-desc-admin'>&#8659;</a></th><th>Action</th></tr>";
                if (data!=false) {
                    for (var i=0;i<data.length;i++) {
                        html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' data-id='"+data[i]['ride_id']+"' id='invoice'>invoice</a></td></tr>";
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
// ----------------------------------------------------Completed Rides Admin-------------------------------------


















//-----------------------------------------All Rides Admin--------------------------------
$('#allridesadmin').click(function(){
    allRidesAdmin(0);
});
$('.page-content').on('click','#allridesadmin',function(){
    allRidesAdmin(0);
});
$('.page-content').on('click','#rides-sort-asc-admin',function(){
    var sort="asc";
    allRidesAdminSortByDate(sort)
});
$('.page-content').on('click','#rides-sort-desc-admin',function(){
    var sort="desc";
    allRidesAdminSortByDate(sort)
});
$('.page-content').on('click','#invoice',function(){
    var rideid=$(this).data('id');
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            rideid: rideid,
            invoice: true
        },
        dataType: 'json',
        success: function(msg){
            var html="<div id='receipt-form'><span class='bold-span'>User id: </span><span>"+msg['user_id']+"</span><br/>";
            html+="<span class='bold-span'>User Name: </span><span>"+msg['user_name']+"</span><br/>";
            html+="<span class='bold-span'>Ride id: </span><span>"+msg['ride_id']+"</span><br/>";
            html+="<span class='bold-span'>Ride Date: </span><span>"+msg['ride_date']+"</span><br/>";
            html+="<span class='bold-span'>From: </span><span>"+msg['from']+"</span><br/>";
            html+="<span class='bold-span'>To: </span><span>"+msg['to']+"</span><br/>";
            html+="<span class='bold-span'>cab Type: </span><span>"+msg['cab_type']+"</span><br/>";
            html+="<span class='bold-span'>Total Distance(KM): </span><span>"+msg['total_distance']+"</span><br/>";
            html+="<span class='bold-span'>Luggage(KG): </span><span>"+msg['luggage']+"</span><br/>";
            html+="<span class='bold-span'>Total Fare(₹): </span><span>"+msg['total_fare']+"</span><br/>";
            if (msg['status']==2){
                var status="completed";
            }
            else if(msg['status']==0) {
                status="canceled";
            }
            else if(msg['status']==1) {
                status="pending";
            }
            html+="<span class='bold-span'>Ride Status: </span><span>"+status+"</span><br/><button onclick='window.print()' class='btn btn-success'>Print invoice</button></div><br/>";
            $('.page-content').html(html);
        },
        error: function(){
            alert("error");
        }
    });
});
function allRidesAdmin(sort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort:sort,
            allridesadmin: true
        },
        dataType: 'json',
        success: function(data){
            var html=allRidesFilter();
            html+="<table id='customers'><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-sort-desc-admin'>&#8659;</a></th><th>Action</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' id='invoice' data-id='"+data[i]['ride_id']+"'>invoice</a></td></tr>";
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
function allRidesAdminSortByDate(sort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort:sort,
            allridesadmin: true
        },
        dataType: 'json',
        success: function(data){
            var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-sort-desc-admin'>&#8659;</a></th><th>Action</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' id='invoice' data-id='"+data[i]['total_fare']+"'>invoice</a></td></tr>";
                }
            }
            $('#customers').html(html);
        },
        error: function(){
            alert("error");
        }
    });
}
function allRidesFilter(){
    var html="<span class='table-type'>All Rides</span><span id='select-fields'><select name='cars' id='cars'>\
                <option>All</option>\
                <option value='CedMicro'>CedMicro</option>\
                <option value='CedMini'>CedMini</option>\
                <option value='CedRoyal'>CedRoyal</option>\
                <option value='CedSUV'>CedSUV</option>\
            </select>\
            </th><th>\
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
            url: '../user/user.php',
            method: 'post',
            data: {
                datetype: datetype,
                filterbydateadmin: true
            },
            dataType: 'json',
            success: function(data){
                var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-sort-desc-admin'>&#8659;</a></th><th>Action</th></tr>";
                if (data!=false) {
                    for (var i=0;i<data.length;i++) {
                        html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' id='invoice' data-id='"+data[i]['ride_id']+"'>invoice</a></td></tr>";
                    }
                }
                $('#customers').html(html);
            },
            error: function(){
                alert("error");
            }
        });
    }else{
        allRidesAdmin(0);
    }
});
$('.page-content').on('click','#fare-comp-sort-asc-admin',function(){
    var sort="asc";
    allRidesAdminSortByFare(sort)
});
$('.page-content').on('click','#fare-comp-sort-desc-admin',function(){
    var sort="desc";
    allRidesAdminSortByFare(sort)
});
function allRidesAdminSortByFare(sort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort:sort,
            allridesadminsortbyfare: true
        },
        dataType: 'json',
        success: function(data){
            var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-sort-desc-admin'>&#8659;</a></th><th>Action</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' id='invoice' data-id='"+data[i]['total_fare']+"'>invoice</a></td></tr>";
                }
            }
            $('#customers').html(html);
        },
        error: function(){
            alert("error");
        }
    });
}
function sortByDistanceAdmin(distsort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            distsort:distsort,
            sortbydistanceadmin: true
        },
        dataType: 'json',
        success: function(data){
            var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-sort-desc-admin'>&#8659;</a></th></tr>";
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
$('.page-content').on('click','#cars',function(){
    var cabtype=$(this).val();
    if (cabtype!='All'){
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                cabtype: cabtype,
                filterbycabtype: true
            },
            dataType: 'json',
            success: function(data){
                var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='fare-comp-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='fare-comp-sort-desc-admin'>&#8659;</a></th><th>Action</th></tr>";
                if (data!=false) {
                    for (var i=0;i<data.length;i++) {
                        html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td><td><a href='javascript:void(0)' id='invoice' data-id='"+data[i]['ride_id']+"'>invoice</a></td></tr>";
                    }
                }
                html+="</table>";
                $('#customers').html(html);
            },
            error: function(){
                alert("error");
            }
        });
    }else{
        allRidesAdmin(0);
    }
});

// ---------------------------------------------All Rides Admin--------------------------------------------------







//---------------------------------------Canceled Rides Admin-----------------------------------------------------
$('#canceledridesall').click(function(){
    canceledRidesAll(0);
});
$('.page-content').on('click','#canceledridesall',function(){
    canceledRidesAll(0);
});
$('.page-content').on('click','#rides-canc-sort-asc-admin',function(){
    var sort="asc";
    canceledRidesAll(sort);
});
$('.page-content').on('click','#rides-canc-sort-desc-admin',function(){
    var sort="desc";
    canceledRidesAll(sort);
});
$('.page-content').on('click','#rides-canc-fare-sort-asc-admin',function(){
    var sort="asc";
    canceledRidesAllFareSort(sort);
});
$('.page-content').on('click','#rides-canc-fare-sort-desc-admin',function(){
    var sort="desc";
    canceledRidesAllFareSort(sort);
});
function canceledRidesFilter(){
    var html="<span class='table-type'>Canceled Rides</span><span id='select-fields'><select name='cars' id='canc-cars'>\
                <option>All</option>\
                <option value='CedMicro'>CedMicro</option>\
                <option value='CedMini'>CedMini</option>\
                <option value='CedRoyal'>CedRoyal</option>\
                <option value='CedSUV'>CedSUV</option>\
            </select>\
            </th><th>\
            <select name='datesort' id='canc-datesort'>\
                <option>All</option>\
                </th><th></th><th></th><th></th><th></th></tr>\
                <option value='LastWeek'>LastWeek</option>\
                <option value='LastMonth'>LastMonth</option>\
            </select></span>";
    return html;
}
$('.page-content').on('click','#canc-datesort',function(){
    var datetype=$(this).val();
    if (datetype!='All'){
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                datetype: datetype,
                canceledridesdatesort: true
            },
            dataType: 'json',
            success: function(data){
                html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-canc-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-canc-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='rides-canc-fare-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-canc-fare-sort-desc-admin'>&#8659;</a></th></tr>";
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
$('.page-content').on('click','#canc-cars',function(){
    var cabtype=$(this).val();
    if (cabtype!='All'){
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                cabtype: cabtype,
                canceledridescarssort: true
            },
            dataType: 'json',
            success: function(data){
                var html="<tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-canc-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-canc-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='rides-canc-fare-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-canc-fare-sort-desc-admin'>&#8659;</a></th></tr>";
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
function canceledRidesAll(sort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort: sort,
            canceledridesall: true
        },
        dataType: 'json',
        success: function(data){
            var html=canceledRidesFilter();
            html+="<table id='customers'><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-canc-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-canc-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='rides-canc-fare-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-canc-fare-sort-desc-admin'>&#8659;</a></th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td></tr>";
                }
            }
            html+="</table>";
            $('.page-content').html(html);
        },
        error: function(){
            alert(error);
        }
    });
}
function canceledRidesAllFareSort(sort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort: sort,
            canceledridesallfaresort: true
        },
        dataType: 'json',
        success: function(data){
            var html=canceledRidesFilter();
            html+="<table id='customers'><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)<a href='javascript:void(0)' id='rides-canc-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-canc-sort-desc-admin'>&#8659;</a></th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)<a href='javascript:void(0)' id='rides-canc-fare-sort-asc-admin'>&#8657;</a><a href='javascript:void(0)' id='rides-canc-fare-sort-desc-admin'>&#8659;</a></th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['from']+"</td><td>"+data[i]['to']+"</td><td>"+data[i]['cab_type']+"</td><td>"+data[i]['ride_date']+"</td><td>"+data[i]['total_distance']+"</td><td>"+data[i]['luggage']+"</td><td>"+data[i]['total_fare']+"</td></tr>";
                }
            }
            html+="</table>";
            $('.page-content').html(html);
        },
        error: function(){
            alert(error);
        }
    });
}
// --------------------------------------------Cancelled Rides Admin----------------------------------------------







//-----------------------------User Requests Admin-------------------------------------------------------
$('#userrequest').click(function(){
    userRequest(0);
});
$('.page-content').on('click','#userrequest',function(){
    userRequest(0);
});
$('.page-content').on('click','#user-req-sort-asc',function(){
    var sort="asc";
    userRequest(sort);
});
$('.page-content').on('click','#user-req-sort-desc',function(){
    var sort="desc";
    userRequest(sort);
});
function userRequest(sort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort: sort,
            userrequests: true
        },
        dataType:'json',
        success: function(data){
            var html="<span class='table-type'>Pending User Requests</span><table id='customers'><tr><th>UserName</th><th>Name</th><th>DateofSignup(YYYY-MM-DD)<a href='javascript:void(0)' id='user-req-sort-asc'>&#8657;</a><a href='javascript:void(0)' id='user-req-sort-desc'>&#8659;</a></th><th>Mobile</th><th>Action</th></tr>";
            if (data!="false") {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['user_name']+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['dateofsignup']+"</td><td>"+data[i]['mobile']+"</td><td><a href='javascript:void(0)' id='allow-user' data-id="+data[i]['user_id']+" class='btn btn-outline-success'>allow</a></td></tr>";
                }
            }
            html+="</table>";
            $('.page-content').html(html);
        },
        error: function(){
            alert(error);
        }
    });
}
$('.page-content').on('click','#allow-user',function(){
    var userid=$(this).data('id');
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            userid: userid,
            allowuser: true
        },
        success: function(msg){
            userRequest(0);
        },
        error: function(){
            alert("error");
        }
    });
});
// --------------------------------------------User Requests Admin-------------------------------------------------










//--------------------------------Approved User Requests-----------------------------------------------
$('#approveduserrequests').click(function(){
    approvedUserRequests(0);
});
$('.page-content').on('click','#approveduserrequests',function(){
    approvedUserRequests(0);
});
$('.page-content').on('click','#user-approved-req-sort-asc',function(){
    var sort="asc";
    approvedUserRequests(sort);
});
$('.page-content').on('click','#user-approved-req-sort-desc',function(){
    var sort="desc";
    approvedUserRequests(sort);
});
$('.page-content').on('click','#user-approved-req-sort-asc-name',function(){
    var sort="asc";
    approvedUserRequestsSortByName(sort);
});
$('.page-content').on('click','#user-approved-req-sort-desc-name',function(){
    var sort="desc";
    approvedUserRequestsSortByName(sort);
});
function approvedUserRequests(sort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort: sort,
            approveduserrequests: true
        },
        dataType:'json',
        success: function(data){
            var html="<span class='table-type'>Approved User Requests</span><table id='customers'><tr><th>UserName</th><th>Name<a href='javascript:void(0)' id='user-approved-req-sort-asc-name'>&#8657;</a><a href='javascript:void(0)' id='user-approved-req-sort-desc-name'>&#8659;</a></th><th>DateofSignup(YYYY-MM-DD)<a href='javascript:void(0)' id='user-approved-req-sort-asc'>&#8657;</a><a href='javascript:void(0)' id='user-approved-req-sort-desc'>&#8659;</a></th><th>Mobile</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['user_name']+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['dateofsignup']+"</td><td>"+data[i]['mobile']+"</td></tr>";
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
function approvedUserRequestsSortByName(sort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort: sort,
            approveduserrequestssortbyname: true
        },
        dataType:'json',
        success: function(data){
            var html="<span class='table-type'>Approved User Requests</span><table id='customers'><tr><th>UserName</th><th>Name<a href='javascript:void(0)' id='user-approved-req-sort-asc-name'>&#8657;</a><a href='javascript:void(0)' id='user-approved-req-sort-desc-name'>&#8659;</a></th><th>DateofSignup(YYYY-MM-DD)<a href='javascript:void(0)' id='user-approved-req-sort-asc'>&#8657;</a><a href='javascript:void(0)' id='user-approved-req-sort-desc'>&#8659;</a></th><th>Mobile</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['user_name']+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['dateofsignup']+"</td><td>"+data[i]['mobile']+"</td></tr>";
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
// ----------------------------------------------------Approved user Requests--------------------------------------














//----------------------------All User Requests--------------------------------
$('#allusers').click(function(){
    allUsers();
});
$('.page-content').on('click','#allusers',function(){
    allUsers();
});
function allUsers(){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            allusers: true
        },
        dataType:'json',
        success: function(data){
            var html="<span class='table-type'>All Users</span><table id='customers'><tr><th>UserName</th><th>Name  <a href='javascript:void(0)' id='name-asc-sort-admin'>&#8657;</a><a href='javascript:void(0)' id='name-desc-sort-admin'>&#8659;</a></th><th>DateofSignup(YYYY-MM-DD)     <a href='javascript:void(0)' id='date-asc-sort-admin' >&#8657;</a><a href='javascript:void(0)'  id='date-desc-sort-admin'>&#8659;</a></th><th>Mobile</th><th>Action</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    if (data[i]['is_admin']==1){
                        html+="<tr><td>"+data[i]['user_name']+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['dateofsignup']+"</td><td>"+data[i]['mobile']+"</td><td>-----------</td></tr>"; 
                    }
                    else {
                        html+="<tr><td>"+data[i]['user_name']+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['dateofsignup']+"</td><td>"+data[i]['mobile']+"</td><td><a href='javascript:void(0)' class='btn btn-outline-danger' data-id="+data[i]['user_id']+" id='admin-delete-user'>delete</a></td></tr>";
                    }
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
$('.page-content').on('click','#name-asc-sort-admin',function(){
    var sort="asc";
    sortUserByName(sort);
});
$('.page-content').on('click','#name-desc-sort-admin',function(){
    var sort="desc";
    sortUserByName(sort);
});
function sortUserByName(sort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort: sort,
            sortuserbyname: true
        },
        dataType:'json',
        success: function(data){
            var html="<span class='table-type'>All Users</span><table id='customers'><tr><th>UserName</th><th>Name  <a href='javascript:void(0)' id='name-asc-sort-admin'>&#8657;</a><a href='javascript:void(0)' id='name-desc-sort-admin'>&#8659;</a></th><th>DateofSignup(YYYY-MM-DD)<a href='javascript:void(0)' id='date-asc-sort-admin'>&#8657;</a><a href='javascript:void(0)'  id='date-desc-sort-admin'>&#8659;</a></th><th>Mobile</th><th>Action</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['user_name']+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['dateofsignup']+"</td><td>"+data[i]['mobile']+"</td><td><a href='javascript:void(0)' class='btn btn-outline-danger' data-id="+data[i]['user_id']+" id='admin-delete-user'>delete</a></td></tr>";
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
$('.page-content').on('click','#date-asc-sort-admin',function(){
    var sort="asc";
    sortUserByDate(sort);
});
$('.page-content').on('click','#date-desc-sort-admin',function(){
    var sort="desc";
    sortUserByDate(sort);
});
function sortUserByDate(sort){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            sort: sort,
            sortuserbydate: true
        },
        dataType:'json',
        success: function(data){
            var html="<span class='table-type'>All Users</span><table id='customers'><tr><th>UserName</th><th>Name  <a href='javascript:void(0)' id='name-asc-sort-admin'>&#8657;</a><a href='javascript:void(0)' id='name-desc-sort-admin'>&#8659;</a></th><th>DateofSignup(YYYY-MM-DD)<a href='javascript:void(0)' id='date-asc-sort-admin'>&#8657;</a><a href='javascript:void(0)'  id='date-desc-sort-admin'>&#8659;</a></th><th>Mobile</th><th>Action</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    html+="<tr><td>"+data[i]['user_name']+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['dateofsignup']+"</td><td>"+data[i]['mobile']+"</td><td><a href='javascript:void(0)' class='btn btn-outline-danger' data-id="+data[i]['user_id']+" id='admin-delete-user'>delete</a></td></tr>";
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
$('.page-content').on('click','#admin-delete-user',function(){
    var r = confirm("Are You Sure You Want to delete");
    if (r == true) {
        var userid=$(this).data('id');
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                userid: userid,
                admindeleteuser: true
            },
            success: function(msg){
                allUsers();
            },
            error: function(){
                alert("error");
            }
        });
    }
    
});
// -----------------------------------------------------------All User Requests---------------------------------------------























//------------------------------Profile Edit Admin----------------------------------
$('#editprofile').click(function(){
   editProfile();
});
function editProfile(){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            editprofile: true
        },
        dataType: 'json',
        success: function(row){
            var username=row['user_name'];
            var name=row['name'];
            var mobile=row['mobile'];
            var html='<div class="signup-form">\
                            <label for="username">Username</label>\
                            <div>\
                                <input type="text" name="username" id="username" value="'+username+'" placeholder="username.." disabled>\
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
    if (name=='' || mobile=='' || name.length<3 || mobile.length<3) {
        alert('please insert name and mobile fields');
        editProfile();
    }
    else {
        $.ajax({
            url: '../user/user.php',
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
    passwordReset();
});
function passwordReset(){
    $.ajax({
        url: '../user/user.php',
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
}
$('.page-content').on('click','#updatepassword',function(){
    var username=$('#username').val();
    var oldpassword=$('#oldpassword').val();
    var password=$('#password').val();
    password=password.trim();
    if (password=='' || password.length<3) {
        alert('please enter new password greater than three characters');
        passwordReset();
    }
    else {
        $.ajax({
            url: '../user/user.php',
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
//------------------Profile Edit Admin----------------------------


















//---------------------------Location Management Admin--------------------------
$('#addlocation').click(function(){
    locationAdd();
});
function locationAdd(){
    var html='<div class="signup-form">\
        <label for="location">Location</label>\
        <div>\
            <input type="text" name="location" id="location" placeholder="location.." required>\
        </div>\
            <label for="distance">Distance(KM)</label>\
        <div>\
            <input type="text" name="distance" id="distance"  placeholder="distance.." required>\
        </div>\
        <div>\
            <input type="submit" value="ADD LOCATION" name="addlocation" id="locationadd">\
        </div>\
    </div>';
    $('.page-content').html(html);
}
$('.page-content').on('click','#locationadd',function(){
    var location=$('#location').val();
    location=location.trim();
    var distance=$('#distance').val();
    distance=distance.trim();
    if (location=='' || distance== '' || distance.length<0) {
        alert('please add distance and locations');
        locationAdd();
    }
    else if (isNaN(distance)) {
        alert('please add distance in numbers only');
        locationAdd();
    }
    else {
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                location: location,
                distance: distance,
                addlocation: true
            },
            success:function(msg){
                manageLocation();
            },
            error: function(){
                alert("error");
            }
        });
    }
});
$('#managelocation').click(function(){
    manageLocation();
});
$('.page-content').on('click','#managelocation',function(){
    manageLocation();
});
function manageLocation(){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            managelocation:true
        },
        dataType: 'json',
        success: function(data){
            var html="<table id='customers'><tr><th>ID</th><th>Name</th><th>Distance</th><th>isavailable</th><th>Action</th></tr>";
            if (data!=false) {
                for (var i=0;i<data.length;i++) {
                    if (data[i]['is_available']==1){
                        var availibility="available";
                    }
                    else {
                        availibility="unavailable";
                    }
                    html+="<tr><td>"+data[i]['id']+"</td><td>"+data[i]['name']+"</td><td>"+data[i]['distance']+"</td><td>"+availibility+"</td><td><a href='javascript:void(0)' class='location-edit btn btn-outline-info' data-id="+data[i]['id']+">edit</a>  <a href='javascript:void(0)' class='location-delete btn btn-outline-danger' data-id="+data[i]['id']+">delete</a></td></tr>";
                }
            }
            html+="</table>";
            $('.page-content').html(html);
        },
        error:function(){
            alert('error');
        }
    });
}
$('.page-content').on('click','.location-edit',function(){
    var id=$(this).data('id');
    locationEdit(id);
});
function locationEdit(id){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data:{
            id: id,
            locationedit: true
        },
        dataType: 'json',
        success: function(row){
            var id=row['id'];
            var name=row['name'];
            var distance=row['distance'];
            var isavailable=row['is_available'];
            var html='<div class="signup-form">\
            <label for="id">ID</label>\
            <div>\
                <input type="text" name="id" id="id" value="'+id+'" disabled>\
            </div>\
            <label for="location">Location</label>\
            <div>\
                <input type="text" name="location" id="location" placeholder="location.." value="'+name+'" required>\
            </div>\
            <label for="distance">Distance</label>\
            <div>\
                <input type="text" name="distance" id="distance"  placeholder="distance.." value="'+distance+'" required>\
            </div>\
            <label for="distance">isavailable</label>\
            <div>\
                <input type="text" name="isavailable" id="isavailable"  placeholder="1 for available 0 for not .." value="'+isavailable+'" required>\
            </div>\
            <div>\
                <input type="submit" value="UPDATE LOCATION" name="location-edit-submit" id="location-edit-submit">\
            </div>\
            </div>';
            $('.page-content').html(html);
        },
        error: function(){
            alert('error');
        }
    });
}
$('.page-content').on('click','#location-edit-submit',function(){
    var id=$('#id').val();
    var location=$('#location').val();
    location=location.trim();
    var distance=$('#distance').val();
    distance=distance.trim();
    var isavailable=$('#isavailable').val();
    isavailable=isavailable.trim();
    if (location=='' || distance=='' || isavailable=='' || isNaN(isavailable) || isNaN(distance) || distance.length<0) {
        alert("please add location and distance, also is available as 0 or 1");
    }
    else {
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                id: id,
                location: location,
                distance: distance,
                isavailable: isavailable,
                editlocationsubmit: true
            },
            success:function(msg){
                manageLocation();
            },
            error: function(){
                alert("error");
            }
        });
    }
    
});

$('.page-content').on('click','.location-delete',function(){
    var r = confirm("Are You Sure You Want to delete");
    if (r == true) {
        var id=$(this).data('id');
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                id: id,
                deletelocation: true
            },
            success: function(msg){
                manageLocation();
            },
            error: function(){
                alert("error");
            }
        });
    }
});
//---------------------------------Location Manage Admin------------------------------















//----------------------------------------Default Display on Admin Dashboard Page Load-------------------------
function defaultHtml(){
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            defaultload: true
        },
        dataType: 'json',
        success: function(msg){
            var riderequests=msg['riderequest'];
            var completedrides=msg['completedrides'];
            var canceledrides=msg['canceledrides'];
            var allrides=msg['allrides'];
            var pendinguserrequest=msg['pendinguserrequest'];
            var approveduserrequest=msg['approveduserrequest'];
            var alluser=msg['alluser'];
            var servicablelocation=msg['servicablelocation'];
            var html='<div class="row">\
                <div class="tiles-admin text-center"><p>Ride Requests</p><p>'+riderequests+'</p><p id="card-ride-request"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="riderequest">Ride Requests</a></div>\
                <div class="tiles-admin text-center"><p>Completed Rides</p><p>'+completedrides+'</p><p id="card-completed-rides"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="completedridesall">Completed Rides</a></div>\
                <div class="tiles-admin text-center"><p>Canceled Rides</p><p>'+canceledrides+'</p><p id="card-canceled-rides"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="canceledridesall">Canceled Rides</a></div>\
                <div class="tiles-admin text-center"><p>All Rides</p><p>'+allrides+'</p><p id="card-all-rides"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="allridesadmin">All Rides</a></div>\
                <div class="tiles-admin text-center"><p>Pending Users Requests</p><p>'+pendinguserrequest+'</p><p id="card-pending-user"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="userrequest">Pending User Requests</a></div>\
                <div class="tiles-admin text-center"><p>Approved users Requests</p><p>'+approveduserrequest+'</p><p id="card-approved-user"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="approveduserrequests">Approved User Requests</a></div>\
                <div class="tiles-admin text-center"><p>All Users</p><p>'+alluser+'</p><p id="card-all-users"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="allusers">All Users</a></div>\
                <div class="tiles-admin text-center"><p>Servicable Locations</p><p>'+servicablelocation+'</p><p id="card-servicable-locations"></p><a href="javascript:void(0)" class="btn btn-outline-info" id="managelocation">Servicable Locations</a></div></div>';
                if (msg['riderequestslast']!=0) {
                    html+='<table id="admin-pending-flash"><tr><th>From</th><th>To</th><th>Cab Type</th><th>RideDate(YYYY-MM-DD)</th><th>TotalDistance(KM)</th><th>Luggage(KG)</th><th>TotalFare (₹)</th><th>Status</th><th>Action</th></tr>\
                    <tr><td>'+msg["riderequestslast"]["from"]+'</td><td>'+msg["riderequestslast"]["to"]+'</td><td>'+msg["riderequestslast"]["cab_type"]+'</td><td>'+msg["riderequestslast"]["ride_date"]+'</td><td>'+msg["riderequestslast"]["total_distance"]+'</td><td>'+msg["riderequestslast"]["luggage"]+'</td><td>'+msg["riderequestslast"]["total_fare"]+'</td><td><div class="blink_me">Pending</div></td><td><a href="javascript:void(0)" id="ride-accept-flash" data-id='+msg["riderequestslast"]["ride_id"]+' class="btn btn-outline-success">accept</a><a href="javascript:void(0)" id="ride-reject-flash" data-id='+msg["riderequestslast"]["ride_id"]+' class="btn btn-outline-danger">reject</a></td></tr></table>';
                }
            $('.page-content').html(html);
        },
        error: function(){
            alert('error');
        }
    });
}
$('.page-content').on('click','#ride-accept-flash',function(){
    var id=$(this).data('id');
    $.ajax({
        url: '../user/user.php',
        method: 'post',
        data: {
            id: id,
            rideaccept: true
        },
        success: function(msg){
            location.reload();
        },
        error: function(){
            alert("error");
        }
    });
});
$('.page-content').on('click','#ride-reject-flash',function(){
    var r=confirm('Are you sure you want to cancel request'); 
    if (r)
    {
        var id=$(this).data('id');
        $.ajax({
            url: '../user/user.php',
            method: 'post',
            data: {
                id: id,
                ridereject: true
            },
            success: function(msg){
                location.reload();
            },
            error: function(){
                alert("error");
            }
        });
    }
});
$('#home-admin').click(function(){
    defaultHtml();
});
$(document).ready(function(){
    defaultHtml();
});
//----------------------Default display on Dashboard Admin Page Load-----------------------------------