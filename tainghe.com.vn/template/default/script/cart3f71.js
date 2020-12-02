function closeFormCommentInput(){
  $(".form-input").hide();
}

$(".comment-form textarea").focus(function(){
  $(this).parent().find(".form-input").show();
});

function check_user_captcha(captcha,id){
  $.post("/ajax/check_user.php", {action : 'check-captcha', captcha : captcha}, function(data){
    document.getElementById("check_captcha"+id).value = data;
  });
}

function check_field(id){
  var error = "";
  var name = document.getElementById("name"+id).value;
  var email = document.getElementById("email"+id).value;
  var content = document.getElementById("content"+id).value;
  //var captcha = document.getElementById('comment-capcha'+id).value;

  if(name=='') error+= "Bạn chưa nhập tên\n";
  if(email=='') error+= "Bạn chưa nhập email\n";
  if(content=='') error+= "Bạn chưa nhập nội dung\n";
  /*if(captcha=='') error+="Bạn chưa nhập mã kiểm tra"
  else {
    var check_captcha = $("#check_captcha"+id).val();
    if(check_captcha!='') error+=check_captcha;
  }*/

  if(error==''){
    //alert("Đã gửi thành công, bình luận của bạn sẽ được kiểm duyệt trước khi hiển thị");
    return true;
  }
  else {
    alert(error);
    //Glee.FancyAlert('Thông báo!',error,'Xác nhận','');
    return false;
  }
}

function postComment(id,reply) {
  if(check_field(id)==false) return false;
  if (reply == ''){
    var item_type = $(".form-post [name='user_post[item_type]']").val();
    var item_id = $(".form-post [name='user_post[item_id]']").val();
    var item_title = $(".form-post [name='user_post[item_title]']").val();
    var title = $(".form-post [name='user_post[title]']").val();
    var avatar = $(".form-post [name='user_post[user_avatar]']").val();

    var rate = $("#rating-review"+id+" input:checked").val();	console.log(rate);
    var user_name = $("#name"+id).val();
    var user_mail = $("#email"+id).val();
    var content = $("#content"+id).val();	
    $.post("/ajax/post.php", {
      'action': 'comment',
      'type': 'ajax',
      'user_post[item_type]': item_type,
      'user_post[item_id]': item_id,
      'user_post[item_title]': item_title,
      'user_post[rate]': rate,
      'user_post[title]': title,
      'user_post[user_avatar]': avatar,
      'user_post[user_name]': user_name,
      'user_post[user_mail]': user_mail,
      'user_post[content]': content
    }, function(data) {
      console.log(data);
      alert("Bạn đã gửi thành công, bình luận của bạn sẽ được kiểm duyệt trước khi hiển thị");
      //Glee.FancyAlert('Thông báo!','Bạn đã gửi thành công, bình luận của bạn sẽ được kiểm duyệt trước khi hiển thị','Xác nhận','');
      location.reload();
    });
  }
  else{
    var reply_to = id;
    var item_type = $(".form-reply"+id+" [name='user_post[item_type]']").val();
    var item_id = $(".form-reply"+id+" [name='user_post[item_id]']").val();
    var item_title = $(".form-reply"+id+" [name='user_post[item_title]']").val();
    var title = $(".form-reply"+id+" [name='user_post[title]']").val();
    var avatar = $(".form-reply"+id+" [name='user_post[user_avatar]']").val();

    var rate = $("#rating-review"+id+" input:checked").val(); 
    var user_name = $("#name"+id).val();
    var user_mail = $("#email"+id).val();
    var content = $("#content"+id).val();	
    $.post("/ajax/post.php", {
      'action': 'comment',
      'type': 'ajax',
      'user_post[reply_to]': reply_to,
      'user_post[item_type]': item_type,
      'user_post[item_id]': item_id,
      'user_post[item_title]': item_title,
      'user_post[rate]': rate,
      'user_post[title]': title,
      'user_post[user_avatar]': '',
      'user_post[user_name]': user_name,
      'user_post[user_mail]': user_mail,
      'user_post[content]': content
    }, function(data) {
      console.log(data);
      alert("Bạn đã gửi thành công, bình luận của bạn sẽ được kiểm duyệt trước khi hiển thị");
      //Glee.FancyAlert('Thông báo!','Bạn đã gửi thành công, bình luận của bạn sẽ được kiểm duyệt trước khi hiển thị','Xác nhận','');
      location.reload();
    });
  }
}

function showShippingFee(cod, totalPrice, ship_fee, cod_fee){

  var total = parseInt(totalPrice);
  var totalValue = 0;

  if(cod == 1){
    document.getElementById("fee-shipping").innerHTML = Glee.formatCurrency(ship_fee) + "đ";
    document.getElementById("fee-keep").innerHTML = Glee.formatCurrency(cod_fee) + "đ";
    totalValue += parseInt(ship_fee) + parseInt(cod_fee);

  } else {
    document.getElementById("fee-shipping").innerHTML = Glee.formatCurrency(ship_fee) + "đ";
    document.getElementById("fee-keep").innerHTML = "0đ";
    totalValue += parseInt(ship_fee);
  }

  document.getElementById("cod_fee").value = parseInt(cod_fee);	
  document.getElementById("shipping_fee").value = parseInt(ship_fee);
  //document.getElementById("totalValue").innerHTML = Glee.formatCurrency(totalValue) + "đ";
  var html ='Vận chuyển đến <span class="text-700 text-sea">' + $("#ship_to_district option:selected").text()
  + ' - ' + $("#ship_to_province option:selected").text()
  + '</span> Chi phí: ' + Glee.formatCurrency(totalValue)+ 'đ';

  $('#getFeeShip').html(html);
  $('.fancybox-close-small').click();
}

function checkTotalShippingFee(totalPrice){

  var pay_cod = document.getElementById('pay_method_cod');
  var cod = (pay_cod.checked) ? 1 : 0;                                   
  console.log('cod: ' + cod);

  $.post("/ajax/post.php", {
    action : "shipping", 
    action_type: "get-shipping-and-cod",
    order_value : totalPrice, 
    province : $("#ship_to_province").val(), 
    district : $("#ship_to_district").val(), 
    cod : 1
  }, function(data){
    var fee = JSON.parse(data);
    showShippingFee(cod, totalPrice, fee.ship, fee.cod);
    //$("#hiddenTotalFee").val(data);
    console.log('checkTotalShippingFee: ' + data);

  });

}
