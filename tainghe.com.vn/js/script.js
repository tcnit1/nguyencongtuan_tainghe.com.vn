// fb-reset
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.6";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// wrapper

    $(window).scroll(function(){
    if($(window).scrollTop() > 540) $("#nav-hori").addClass("fixed");
    else $("#nav-hori").removeClass("fixed");
});

    function formatCurrency(a) {
    var b = parseFloat(a).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1.").toString();
    var len = b.length;
    b = b.substring(0, len - 3);
    return b;
}
    $(document).ready(function(){
    var curr_text = "";
    var count_select = 0;
    var curr_element="";
    $("#text_search").keyup(function(b) {
    var htmlResult="";
    if (b.keyCode != 38 && b.keyCode != 40) {
    inputString = $(this).val();
    if (inputString.trim() != '') {
    urlSearch = '/ajax/get_json.php?action=search&content=product&q='+ encodeURIComponent(inputString);
    $.getJSON(urlSearch, function(result){
    var data = result;
    Object.keys(data).forEach(function(key, keyIndex) {
    var name = data[keyIndex].productName;
    var url = data[keyIndex].productUrl;
    var image = data[keyIndex].productImage.medium;
    var price = formatCurrency(data[keyIndex].price);
    if(price!=0) price = price+' vnđ';
    else price= "Liên hệ"

    htmlResult+="<div class=\"autocomplete-suggestion\" onclick=\"window.location='"+url+"'\">";
    htmlResult+="<table><tbody><tr>";
    htmlResult+="<td style=\"vertical-align:top\"><a href='"+url+"'><img src='"+image+"' width='50' style='margin-right:10px;'/></a></td>";
    htmlResult+="<td style='vertical-align:top; color:red; line-height:18px;'><a class='suggest_link' href='"+url+"'>"+name+"</a><br/>Giá:"+price+"</td>";
    htmlResult+="</tr></tbody></table></div>";
});
    $(".autocomplete-suggestions").html(htmlResult);
    $(".autocomplete-suggestions").show();
});

} else {
    $(".autocomplete-suggestions").hide();
}
}
});
    $('body').click(function(){
    $(".autocomplete-suggestions").hide();
});
});


    $(function(){
    $("#main-menu").hover(function(){
        $("#main-menu ul li.li-hide").show();
        $(".sub-nav").css("min-height",$("#main-menu .menu").height()+8);
    },function(){
        $("#main-menu ul li.li-hide").hide();
    });
})


