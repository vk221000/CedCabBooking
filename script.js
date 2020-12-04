
//---------------jQuery for landing page for booking a ride----------------------
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
            if (msg=="refer to login page") {
                $(location).attr('href', 'login.php');
            }
            else{
                $('#submit').text(msg);
            }
        },
        error: function(){
            alert(error);
        }
    });
});
