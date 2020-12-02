function formatCurrency(a) {
    var b = parseFloat(a).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.").toString();
    var len = b.length;
    b = b.substring(0, len - 3);
    return b;
}
function splitName() {
  $(".list-comment .avatar").each(function(){
  var name = $(this).html().substring(0, 1);
  $(this).html(name);
    });
}
function showPop(id) {
    var contentcheck = document.getElementById("content"+id).value;
    if(contentcheck==''){
      alert("Bạn chưa nhập nội dung !")
     }else {
    $("#box-send-show"+id).show();
    $(".bg-pop-km").addClass("bg-pop-km1")
      
    }
}
function closePop(id) {
    $("#box-send-show"+id).hide();
    $(".bg-pop-km").removeClass("bg-pop-km1")
}
function showReply(id) {
    $("#show-reply"+id).show();
}
$(".bg-pop-km").click(function(){
    $(".box-send-show").hide();
    $(this).removeClass("bg-pop-km1")
})
function isOnScreen(elem) {
  // if the element doesn't exist, abort
  if( elem.length == 0 ) {
    return;
  }
  var $window = jQuery(window)
  var viewport_top = $window.scrollTop()
  var viewport_height = $window.height()
  var viewport_bottom = viewport_top + viewport_height
  var $elem = jQuery(elem)
  var top = $elem.offset().top
  var height = $elem.height()
  var bottom = top + height

  return (top >= viewport_top && top < viewport_bottom) ||
    (bottom > viewport_top && bottom <= viewport_bottom) ||
    (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
}
function addProductToCart(product_id, variant_id, quantity, buyer_note) {
  var product_prop = {
      quantity: quantity ,
      buyer_note : buyer_note
  };

  return Hura.Cart.Product.add(product_id, variant_id, product_prop);
}

function getProductListCo(url, holder, limit, wrap_container, actionLoad) {
    $.getJSON(url, function(result) {
      var data = "";
      var html = "";
      var allpaging = parseInt(result.total);
      //console.log(allpaging);
      var paging = Math.ceil(allpaging/50);
      $(".total-paging-count-"+holder).attr('value',paging);
      if(paging <= 1){
        $(".load-more").hide();
      }
      if (typeof result.list !== 'undefined') data = result.list;
      else data = result;
      //console.log("data",data);
      Object.keys(data).forEach(function(item,index) {
        if(index > limit - 1) return;
      var masp = data[item].productSKU;
      var id = data[item].productId;
      var name = data[item].productName;
      var image = data[item].productImage.large;
      var brand = data[item].brand.image;
      var brandName = data[item].brand.name;
        var price = data[item].price;
      var url = data[item].productUrl;
      var rating = data[item].rating;
      var quantity = data[item].quantity;
        var priceFormat = formatCurrency(price) + "₫";
        if (price == 0) priceFormat = "Liên hệ";
        var marketPrice = data[item].marketPrice;
        var discount = 0;
        if (parseInt(marketPrice) > parseInt(price)) {
          discount = Math.ceil(100 - price * 100 / marketPrice);
        }
  
        html+='<div class="item">';
            html+='<div class="p-km-contianer">';
                html+='<a href="'+ url +'" class="p-km" target="_blank"><img src="'+ image +'" alt="'+ name +'"></a>';
                html+='<div class="content">';
                    html+='<a href="'+ url +'" class="n-km" target="_blank">'+ name +'</a>';
                    html+='<div class="all-price">';
                        html+='<span class="price">'+ priceFormat +'</span>';
                        if(discount > 0 )html+='<span class="old-price">'+ formatCurrency(marketPrice) +' ₫</span>';
                    html+='</div>';
                    if(discount > 0 )html+='<div class="discount"><span>-'+ discount +'%</span></div>';
        			if(typeof(data[item].specialOffer.gift) != 'undefined' && data[item].specialOffer.gift.length > 0) html+='<div class="is_specialOffer">Quà tặng</div>';
                html+='</div>';
            html+='</div>';
        html+='</div>';
      });
      
      if (typeof wrap_container !== 'undefined') {
        if(html=='') $(wrap_container).remove();
      }
  
      if (typeof actionLoad === 'undefined') {
        actionLoad = 'replace';
      }
      
      if(html=='') return false;
      if (actionLoad == 'replace') $("#"+holder).html(html);
      else $("#"+holder).append(html);
    });
}
function getCo(target){
    if($(target).hasClass('loaded')==false){
      var holderco = $(target).attr("data-holder");
      var limitco = $(target).attr("data-limit");
      var urlco = $(target).attr("data-url");
      var containerco = $(target).attr("data-container");
  
      if(containerco!=undefined) getProductListCO(urlco,holderco,limitco,containerco);
      else getProductListCo(urlco,holderco,limitco);
      $(holderco).addClass('loaded');
   }//if
 }
function show_more_product(holder,cat_id){
  var total_page = $(".total-paging-count-"+holder).val();
  var new_page = $("#view_page-"+holder).val();
  //ajaxGetProduct(id,type,order,limit,page,holder,holderName,template,checkHtml);
  var url = $("#"+holder).attr("data-url");
  if(parseInt(new_page) >= parseInt(total_page)){
     $(".load-more a."+holder).text("Hết sản phẩm");
     $(".load-more a."+holder).css("pointer-events","none");
  }
  ajaxLoadProductKm(url,50,new_page,'#more-products-'+holder,'',0);
  // loadNum();
  $("#view_page-"+holder).val(parseInt(new_page) + 1);
  $("#show-more-product-"+holder).show();
}

function ajaxLoadProductKm(url,limit, page, holder, holderName, checkHtml) {
  //var url = "/ajax/get_json.php?action=collection&action_type=list&id=2&sort=order&show=10&page=" + page;
  //console.log(url);

  var check = '<p class="text-center"><i class="fas fa-spinner fa-pulse"></i></p>';
  var tplProduct = ''; 
	console.log(url);
  $.getJSON(url+"&page="+page, function(result) {
  var data = "";
  var html = "";
        if (typeof result.list !== 'undefined') data = result.list;
        else data = result;
        
        //console.log("data",data);
        Object.keys(data).forEach(function(item,index) {
          if(index > limit - 1) return;
          var masp = data[item].productSKU;
        var id = data[item].productId;
        var name = data[item].productName;
        var image = data[item].productImage.large;
        var brand = data[item].brand.image;
        var brandName = data[item].brand.name;
          var price = data[item].price;
        var url = data[item].productUrl;
        var rating = data[item].rating;
        var quantity = data[item].quantity;
          var priceFormat = formatCurrency(price);
          if (price == 0) priceFormat = "Liên hệ";
          var marketPrice = data[item].marketPrice;
          var discount = 0;
          if (parseInt(marketPrice) > parseInt(price)) {
            discount = Math.ceil(100 - price * 100 / marketPrice);
          }
    
          html+='<div class="item">';
              html+='<div class="p-km-contianer">';
                  html+='<a href="'+ url +'" class="p-km" target="_blank"><img src="'+ image +'" alt="'+ name +'"></a>';
                  html+='<div class="content">';
                      html+='<a href="'+ url +'" class="n-km" target="_blank">'+ name +'</a>';
                      html+='<div class="all-price">';
                          html+='<span class="price">'+ priceFormat +' ₫</span>';
                          if(discount > 0 )html+='<span class="old-price">'+ formatCurrency(marketPrice) +' ₫</span>';
                      html+='</div>';
                      if(discount > 0 )html+='<div class="discount"><span>-'+ discount +'%</span></div>';
                  html+='</div>';
              html+='</div>';
          html+='</div>';
        });

        
        $(holder).append(html);
  });
}
function check_field_km(id){
  var error = "";
  var name = document.getElementById("name"+id).value;
  var email = document.getElementById("email"+id).value;
  var content = document.getElementById("content"+id).value;

  if(name=='') error+= "Bạn chưa nhập tên";
  if(email=='') error+= "Bạn chưa nhập email email\n";
  /*else if(validateEmail(email) == false)
    error+= "Email không hợp lệ\n";
  */  
  if(content=='') error+= "Bạn chưa nhập nội dung\n";

  if(error=='') {
    if(id==0){
    document.getElementById("send-cmt-km").disabled = true;
    document.getElementById("send-cmt-km").value = "Đang xử lý...";
    }else {
      document.getElementById("send_reply_detail").disabled = true;
      document.getElementById("send_reply_detail").value = "Đang xử lý...";
    }
    return true;
  }else {
    alert(error);
    return false;
  }
};
function postCommentkm(type,id,reply) {
  //type: comment, review
  if(check_field_km(id)==false) return false;

  if(type=='review') type = 'review-feature';
  var item_type = 'page';
  var item_id = 13;
  var item_title = 'Bình luận trang khuến mại';
  var title = 'Bình luận trang khuến mại';

  if (reply == ''){
    var rate = 5;
    var avatar = "";
    var note = "";
    var user_name = $("#name"+id).val()+'-'+$("#tel"+id).val();
    var user_email = $("#email"+id).val();   
    var content = $("#content"+id).val(); 

    var payload = {
      item_type   : item_type,
      item_id     : item_id,
      item_title  : item_title,
      user_email  : user_email,
      user_name   : user_name,
      user_avatar : avatar,
      user_note   : note,
      rate        : rate,
      title       : title,
      content     : content,
      files       : ''
    };    
    var ENDPOINT = "/ajax/post.php";

    $.post(ENDPOINT, { action : type, action_type: "send", type : "ajax", user_post : payload }, function (data) {
      console.log(data);
      alert("Bạn đã gửi thành công !");
      location.reload();
    });
  }
  else{
    var reply_to = id;
    var rate = 5;
    var avatar = "";
    var note = "";
    var user_name = $("#name"+id).val();
    var user_email = $("#email"+id).val();
    var content = $("#content"+id).val();

    var payload = {
      item_type   : item_type,
      item_id     : item_id,
      reply_to    : reply_to,
      item_title  : item_title,
      user_email  : user_email,
      user_name   : user_name,
      user_avatar : avatar,
      user_note   : note,
      rate        : rate,
      title       : title,
      content     : content,
      files       : ''
    };    
    var ENDPOINT = "/ajax/post.php";

    $.post(ENDPOINT, { action : type, action_type: "send", type : "ajax", user_post : payload }, function (data) {
      console.log(data);
      alert("Bạn đã gửi thành công !");
      location.reload();
    });
  }
};
function formatDay(timestamp) {
      var date = new Date(timestamp*1000);
      var month = date.getMonth()+1;
      var year = date.getFullYear();
      var day = date.getDate();
      //return 'Ngày '+day +' Tháng '+ month +' Năm '+ year;
      return '<span class="time">' + day + '/' + month +'/'+ year + '</span>';
}
function postCommentkmother(id) {
  postCommentkm('comment',id,'reply');
}
function getComment(holder,limit) {
  var urlcmt = "/ajax/get_json.php?action=comment&action_type=get&item_type=page&item_id=13&order_by=new&numPerPage=20";
  $.getJSON(urlcmt, function(resultcmt) {
  var html = "";
    var totalCmt = resultcmt.length;
      $("#total_cmt").html(totalCmt);
      //console.log(totalCmt);
        //console.log("data",data);
        resultcmt.forEach(function(item,index) {
          var name = item.user_name.split("-");
          var afname = name[0];
          var user_admin = 0;
          if($("#isadmin").attr("data-id") == 1){
            user_admin = 1;
          }
          if(index > limit - 1) return;

          html+='<li class="main-comment">';
              html+='<div class="header">';
                  if(item.is_user_admin == 1){html+='<span class="avatar"><img style="width: 100%;" src="{#IMAGE_PATH#}avatar_admin.png" alt="admin"></span>';
                  html+='<span class="name">'+ afname +'</span>';
                 }else {
                  html+='<span class="avatar">'+ afname +'</span>';
                  html+='<span class="name">'+ afname +'</span>';
                 }
              html+='</div>';
              html+='<div class="content">'+ item.content +'</div>';
              html+='<div class="footer-cmt">';
                  html+='<a href="javascript:void(0)" onclick="showReply('+ item.id +')"><i class="fas fa-comment-dots"></i> Trả lời</a> | '+ formatDay(item.post_time);
              html+='</div>'
              if(item.new_replies !=''){
              html+='<ul class="list-reply-km" id="list-reply-km'+ item.id +'" data-id="'+ item.id +'">';
                  html+='<span class="he"><font class="fa fa-caret-up fa-2x"></font><font class="fa fa-caret-up fa-2x"></font></span>';
              var datarep = item.new_replies;
                  datarep.forEach(function(itemrep,indexrep) {
                  html+='<li>'
                      html+='<div class="header">';
                          if(itemrep.is_user_admin == 1){html+='<span class="avatar-admin"><img style="width: 100%;" src="/template/default/images/avatar_admin.png" alt="admin"></span>';
                          html+='<span class="name">'+ itemrep.user_name +'</span>';
                         }else {
                          html+='<span class="avatar">'+ itemrep.user_name +'</span>';
                          html+='<span class="name">'+ itemrep.user_name +'</span>';
                         }
                          if(itemrep.is_user_admin == 1){html+='<span class="qtv">QTV</span>';}
                      html+='</div>';
                      html+='<div class="content">'+ itemrep.content +'</div>';
                  html+='</li>';
                  });
              html+='</ul>';
                }
              html+='<div class="form-km-cmt show-reply" id="show-reply'+ item.id +'">';
                  html+='<form onsubmit="return check_field_km('+ item.id +')">';
                      html+='<div class="box-cmt">';
                          html+='<textarea name="" id="content'+item.id+'" cols="30" rows="10" placeholder="Xin mời để lại câu hỏi, tainghe.com.vn sẽ trả lời trong 1h từ 8h-22h mỗi ngày!"></textarea>';
                          html+='<div class="box-send-other">';
                              html+='<a href="/">Quy định đăng bình luận</a>';
                              html+='<a href="javascript:void(0);" onclick="showPop('+ item.id +')">GỬI</a>';
                          html+='</div>';
                          html+='<div class="box-send-show box-send-show-'+ item.id +'" id="box-send-show'+ item.id +'">';
                              html+='<div class="header-bss">';
                                  html+='<div class="title-name">Thông tin người gửi</div>';
                                  html+='<span class="close" onclick="closePop('+ item.id +')">x</span>';
                              html+='</div>';
                              html+='<div class="content-bss">';
                      if(user_admin == 1){
                                  html+='<p style="margin-bottom: 20px;">Bạn đang đănh nhập là admin!</p>';
                                  html+='<input type="hidden" id="name'+item.id+'" value="admin">';
                              html+='<input type="hidden" id="tel'+item.id+'" value="admin@gmail.com">';
                              html+='<input type="hidden" id="email'+item.id+'">';
                                }else {
                              html+='<input type="text" id="name'+item.id+'" placeholder="Họ tên (bắt bộc)">';
                              html+='<input type="number" id="tel'+item.id+'" placeholder="Số điện thoại">';
                              html+='<input type="text" id="email'+item.id+'" placeholder="Email (Để nhận phản hồi qua email)">';
                                }
                              html+='<input type="button" id="send_reply_detail" onclick="postCommentkmother('+ item.id +')" value="Gửi bình luận">';
                              html+='</div>';
                          html+='</div>';
                      html+='</div>';
                  html+='</form>';
              html+='</div>';
          html+='</li>';
    });
        $(holder).html(html);
      splitName();
      });
}
setTimeout(function(){ 
  getComment('#holder-cmt',20);
}, 3000);
function demnguoc(endTime,holder){
    var id = $(holder).attr('data-id');
    var days = Math.floor(endTime / ( 60 * 60 * 24)); 
    var hours = Math.floor((endTime%( 60 * 60 * 24))/( 60 * 60)); 
    var minutes = Math.floor((endTime % ( 60 * 60)) / (  60)); 
    var seconds = Math.floor((endTime % (60)) ); 
    $('#day-'+id).html(days);
    $('#hour-'+id).html(hours);
    $('#minute-'+id).html(minutes);
    $('#second-'+id).html(seconds);
    
    setTimeout(function () {
        demnguoc(endTime - 1, holder);
    }, 1000);
}
function getPromotionHot(holder) {
  var urlPromo = "/ajax/get_json.php?action=banner&location=13&show=12";
     $.getJSON(urlPromo, function(resultPromoHot) {   
      var htmlPromo = "";
     //console.log(resultPromoHot);
      var data = resultPromoHot.list;
      data.forEach(function(item,index) {
        htmlPromo+='<div class="item">';
            htmlPromo+='<a href="'+ item.desUrl +'" class="km-img"><img src="'+ item.fileUrl +'" alt="'+ item.name +'"></a>';
            htmlPromo+='<div class="content">';
                htmlPromo+='<a href="'+ item.desUrl +'" class="km-name"><span>'+ item.name +'</span></a>';
                htmlPromo+='<div class="vm">';
              if(item.is_expired == 0){
                    htmlPromo+='<span class="in">Đang diễn ra</span>';
                    }else {
                    htmlPromo+='<span class="out">Đã kết thúc</span>';
                    }
                    htmlPromo+='<a href="'+ item.desUrl +'">Xem chi tiết</a>';
                htmlPromo+='</div>';
            htmlPromo+='</div>';
        htmlPromo+='</div>';
      });
       $(holder).html(htmlPromo);
     });
}
function convertTime(timestamp) {
  var time = timestamp;
    var timestampInMilliSeconds = time*1000;
    var date = new Date(timestampInMilliSeconds);

    var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
    var year = date.getFullYear();

    var hours = ((date.getHours() % 12 || 12) < 10 ? '0' : '') + (date.getHours() % 12 || 12);
    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    var meridiem = (date.getHours() >= 12) ? 'pm' : 'am';

    var formattedDate = day + '/' + month + '/' + year;
    return formattedDate;
}
function getInstallationProgram(holder) {
  var urlInPro = "/ajax/get_json.php?action=banner&location=14&show=12";
     $.getJSON(urlInPro, function(resultInPro) {   
      var htmlInPro = "";
     //console.log(resultInPro);
      var data = resultInPro.list;
      data.forEach(function(item,index) {
        htmlInPro+='<div class="item">';
          var fromTime = convertTime(item.from_time);
          var toTime = convertTime(item.to_time);
            htmlInPro+='<a href="'+ item.desUrl +'" class="km-img"><img src="'+ item.fileUrl +'" alt="'+ item.name +'"></a>';
            htmlInPro+='<div class="content">';
                htmlInPro+='<a href="'+ item.desUrl +'" class="km-name"><span>'+ item.name +'</span></a>';
                htmlInPro+='<div class="vm">';
              htmlInPro+='<div class="other">';
                        htmlInPro+='<p>'+ fromTime +'-'+ toTime +'</p>';
              if(item.is_expired == 0){
                    htmlInPro+='<p class="in">Đang diễn ra</p>';
                    }else {
                    htmlInPro+='<p class="out">Đã kết thúc</p>';
                    }
              htmlInPro+='</div>';
                    htmlInPro+='<a href="'+ item.desUrl +'">Xem chi tiết</a>';
                htmlInPro+='</div>';
            htmlInPro+='</div>';
        htmlInPro+='</div>';
      });
       $(holder).html(htmlInPro);
       $(holder).addClass("loaded");
     });
}
getPromotionHot('#list-promotion');

// $(document).ready(function(){
//   $(".tab-link2").click(function(){
//       getCo();
//   });
//   $(".tab-link3").click(function(){
      // if(isOnScreen($("#installation-program")) && $("#installation-program").hasClass('loaded')==false){
      // getInstallationProgram('#installation-program');
      //   }
//   })
// })




$(document).ready(function(){
  
  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
    if($(this).hasClass('tab-link2')) {
      getCo("#js-list-pro-km");
    }
    if($(this).hasClass('tab-link3')) {
      if($("#installation-program").hasClass('loaded')==false){
        getInstallationProgram('#installation-program');
       }
    }
    if($(this).hasClass('tab-link5')) {
      getCo("#js-list-pro-hotsale");
    }
  })

})