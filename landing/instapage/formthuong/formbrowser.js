$(document).ready(function() {
	
var urlweb = window.location+"";
urlweb = urlweb.replace(/\:/g, ',').replace(/\//g, '_');
var numItems = $('.showform_landing').length;
numItems = numItems - 1;
console.log('sodiv form' + numItems);
$('.showform_landing').each(function(f){
var idformshow = $(this).attr("id",'idform_'+f);
console.log('f là:'+ f);
$.ajax({
	type: "GET",
	url: 'http://mascom.vn/api.lazisite/formlink/'+urlweb,
	success: function(data){
	var countsp = data.detail.length;
	console.log('tổng form: '+ countsp);
		var formhtml = '<div class="widget-form class_wgform">\
<div class="formnhap">\
<div class="form-input">';

for (i in data.detail) {
		var bus = data.bus;
		var partner = data.partner;
		var idpixel = data.pixel;
		var masp = data.detail[i].product_code;
		var gia = data.detail[i].price_sale;
		var name = data.detail[i].product_name;
		formhtml += '<div class="listsp" id="'+masp+'">\
		<input id="price" type="hidden" value="'+gia+'">\
		<input id="nameproduct" type="hidden" value="'+name+'">\
		</div>';	
}

formhtml += '<input id="madvigiaodich" type="hidden" value="'+bus+'0101"/>\
<input id="business" type="hidden" value="'+bus+'"/>\
<input id="trongluong" type="hidden" value="0"/>\
<input id="donvitinh" type="hidden" value="CHIEC"/>\
<input id="total" type="hidden" value="1"/>\
<input id="kenhban" type="hidden" value="LDP"/>\
<input id="doitac" type="hidden" value="'+partner+'"/>\
<input id="idpixel" type="hidden" value="'+idpixel+'"/>\
</div>\
<div class="form-input"><input class="form-input" id="name" type="text" name="name" placeholder="Họ tên" /></div>\
<div class="form-input"><input class="form-input" id="dateoball" type="text" name="dateoball" placeholder="01/01/1990" /></div>\
<div class="form-input"><input class="form-input" id="email" type="email" name="email" placeholder="Email" /></div>\
<div class="form-input"><input class="form-input" id="mobile" type="tel" name="mobile" placeholder="Số điện thoại" /></div>\
<div class="form-input"><input class="form-input" id="address" type="text" name="address" placeholder="Địa chỉ"></div>\
<div class="form-input">\
<select name="chonsp" id="chonsp">';

if( (data.detail).length > 1 ){
	formhtml += '<option value="">Chọn sản phẩm</option>';
}
for (q in data.detail) {
		var maspq = data.detail[q].product_code;
		var nameq = data.detail[q].product_name;
		formhtml += '<option value="'+maspq+'">'+nameq+'</option>';	
}
formhtml += '</select>\
</div>\
<div class="btn-submit"><button class="vccsm btn" type="button">Đặt hàng</button></div>\
<div class="form-input hiddendiv" style="display:none;">\
	<div class="div-alert">Xin cảm ơn, Bạn đã đặt hàng thành công!.</div>\
</div>\
<div class="form-input faildiv" style="display:none;">\
	<div class="div-alert">Có lỗi khi đặt hàng,vui lòng kiểm tra lại thông tin!.</div>\
</div>\
</div>\
</div>';
if( (data.detail).length == 1 ){
	formhtml += '<style>#chonsp{display:none;}<\/style>';
}
if( numItems === f ){
	formhtml += '<script src="http://ldp.lazishop.com/landing/v4/cau-hinh-form.js"><\/script>';
}

$('#idform_'+f).html(formhtml);
		
	},
    error: function(jqXHR,error, errorThrown) {  
          }
});

});
var numItempop = $('.popupform_landing').length;
numItempop = numItempop - 1;

console.log('sodiv pop' + numItempop);
$('.popupform_landing').each(function(k){
var idformpop = $(this).attr("id").replace("popform_", "");
var idsp = idformpop + k;
$(this).attr("id","popform_"+idsp);
console.log('tổng pop:'+k);
$.ajax({
	type: "GET",
	url: 'http://mascom.vn/api.lazisite/formlink/'+urlweb,
	success: function(data){


var countsp = data.detail.length;
var bus = data.bus;
var partner = data.partner;
var idpixel = data.pixel;

for (i in data.detail) {
if(data.detail[i].product_id === idformpop ){
var masp = data.detail[i].product_code;
var gia = data.detail[i].price_sale;
var name = data.detail[i].product_name;
var popuphtml ='<button type="button" style="font-size:25px;text-transform:uppercase;padding:20px 10px" class="testclick btn btn-success btn-lg" data-toggle="modal" data-target="#form'+k+'">Mua Ngay</button>\
<div id="form'+k+'" class="checkfn modal fade" role="dialog">\
<div class="modal-dialog">\
<div class="modal-content">\
<div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button>\
<h4 class="modal-title">'+name+'</h4>\
</div>\
<div class="modal-body">\
<div class="widget-form">\
<div class="formnhap">\
<div class="form-input">\
<input id="madvigiaodich" type="hidden" value="'+bus+'0101"/>\
<input id="business" type="hidden" value="'+bus+'"/>\
<input id="trongluong" type="hidden" value="0"/>\
<input id="donvitinh" type="hidden" value="CHIEC"/>\
<input id="price" type="hidden" value="'+gia+'"/>\
<input id="code" type="hidden" value="'+masp+'"/>\
<input id="total" type="hidden" value="1"/>\
<input id="kenhban" type="hidden" value="LDP"/>\
<input id="doitac" type="hidden" value="'+partner+'"/>\
<input id="nameproduct" type="hidden" value="'+name+'"/>\
<input id="idpixel" type="hidden" value="'+idpixel+'"/>\
</div>\
<div class="form-input"><input class="form-input" id="name" type="text" name="name" placeholder="Họ tên" /></div>\
<div class="form-input"><input class="form-input" id="dateob" type="text" name="dateob" placeholder="01/01/1990" /></div>\
<div class="form-input"><input class="form-input" id="email" type="email" name="email" placeholder="Email" /></div>\
<div class="form-input"><input class="form-input" id="mobile" type="tel" name="mobile" placeholder="Số điện thoại" /></div>\
<div class="form-input"><input class="form-input" id="address" type="text" name="address" placeholder="Địa chỉ"></div>\
<div class="btn-submit classmua"><button class="enter-submit btn" type="button">Đặt hàng</button></div>\
</div></div></div>\
<div class="modal-footer">\
<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>\
</div></div></div></div>';

if( numItempop == k ){
	popuphtml += '<script src="http://ldp.lazishop.com/landing/v4/cau-hinh-pop.js"><\/script>';
}

$('#popform_'+idsp).html(popuphtml);
}
}
	},
    error: function(jqXHR,error, errorThrown) {  
          }
});
});
});

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

var urlweb = window.location+"";
urlweb = urlweb.replace(/\:/g, ',').replace(/\//g, '_');
$.ajax({
	type: "GET",
	url: 'http://mascom.vn/api.lazisite/formlink/'+urlweb,
	success: function(datapx){
		var idpixel = datapx.pixel;
		var htmlpixel = '<script>fbq("init", "'+idpixel+'");<\/script>\
<noscript>\
<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id='+idpixel+'&ev=PageView&noscript=1">\
<\/noscript>';	
	}
});