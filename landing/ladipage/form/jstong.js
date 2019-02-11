$(document).ready(function() {
var urlweb = window.location+"";
console.log(urlweb);
urlweb = urlweb.split("?");
urlweb = urlweb[0];
console.log(urlweb);
urlweb = urlweb.replace(/\:/g, ',').replace(/\//g, '_');
var numItems = $('.showform_landing').length;
numItems = numItems - 1;
console.log('sodiv form' + numItems);

$('.showform_landing').each(function(f){
var datasp;
var idformshow = $(this).attr("id",'idform_'+f);
console.log('f là:'+ f);
$.ajax({
	type: "GET",
	url: 'http://lazishop.net/formlink/'+urlweb,
	success: function(data){

console.log('http://lazishop.net/formlink/'+urlweb);
if(data.show_type == 1){
	datasp = data;
	var countsp = data.detail.length;
	var bus = data.bus;
	var partner = data.partner;
	var idpixel = data.pixel;
	console.log('data: '+data);
	console.log('tổng form: '+ countsp);
	var formhtml = '<div class="widget-form class_wgform">\
	<div class="formnhap">\
	<div class="form-input">\
	<input id="madvigiaodich" type="hidden" value="'+bus+'0101"/>\
	<input id="business" type="hidden" value="'+bus+'"/>\
	<input id="trongluong" type="hidden" value="0"/>\
	<input id="donvitinh" type="hidden" value="CHIEC"/>\
	<input id="total" type="hidden" value="1"/>\
	<input id="kenhban" type="hidden" value="LDP"/>\
	<input id="doitac" type="hidden" value="'+partner+'"/>\
	<input id="idpixel" type="hidden" value="'+idpixel+'"/>\
	</div>\
	<div class="form-input"><input maxlength="99" class="form-input" id="name" type="text" name="name" placeholder="Họ tên" required="required"></div>\
	<div class="form-input"><input class="form-input" id="dateoball" type="text" name="dateoball" placeholder="01/01/1990" /></div>\
	<div class="form-input"><input class="form-input" id="email" type="email" name="email" placeholder="Email (Nếu có)" /></div>\
	<div class="form-input"><input class="form-input" id="mobile" type="tel" name="mobile" placeholder="Số điện thoại" required="required"></div>\
	<div class="form-input"><input class="form-input" id="address" type="text" name="address" placeholder="Địa chỉ" required="required"></div>\
	<div class="form-input">';

	if(data.show_type === 0){
		formhtml += '<select name="chonsp" id="chonsp">';
			if( (data.detail).length > 1 ){
				formhtml += '<option value="">Chọn sản phẩm</option>';
			}
			for (q in data.detail) {
				var maspq = data.detail[q].product_code;
				var nameq = data.detail[q].product_name;
				formhtml += '<option value="'+maspq+'">'+nameq+'</option>';	
			}
		formhtml += '</select>';
	}else{
		formhtml += '<select name="chonsp" id="chonsp">';
			formhtml += '<option value="">Chọn sản phẩm</option>';
			for (z in data.hhoa) {
				var mahh = data.hhoa[z].id;
				var namehh = data.hhoa[z].ten_hang;
				formhtml += '<option  value="'+mahh+'">'+namehh+'</option>';	
			}
		formhtml += '</select>';

			

		var tenthuoctinh = [];
			$.each(data.ttinh, function () {
				var namett = this.ten_ttinh;
				if (tenthuoctinh.indexOf(namett) < 0) {
					tenthuoctinh.push(namett);
				};
			});
			//console.log(tenthuoctinh);
			
			$.each(tenthuoctinh, function (index, namett) {
				var idct = [];
				formhtml += '<select class="sl_ttsp" name="'+ namett.toString() +'" id="selectid_'+index+'">';
				formhtml += '<option class="defaultopt" value="">'+ namett.toString() +'</option>';
				formhtml += '</select>';
			});
		}


	formhtml += '</div><div class="labelproduct"></div>\
	<div class="btn-submit"><button class="vccsm btn" type="button">Đặt hàng</button></div>\
	<div class="form-input hiddendiv" style="display:none;">\
		<div class="div-alert">Xin cảm ơn, Bạn đã đặt hàng thành công!.</div>\
	</div>\
	<div class="form-input faildiv" style="display:none;">\
		<div class="div-alert">Có lỗi khi đặt hàng,vui lòng kiểm tra lại thông tin!.</div>\
	</div>\
	</div>\
	</div><style>.sphidden {display: none;}<\/style>';
	if( (data.detail).length == 1 ){
		formhtml += '<style>#chonsp{display:none;}<\/style>';
	}
	if( numItems === f ){
		formhtml += '<script src="http://lazishop.net/landing/ladipage/form/thuoctinh_cau-hinh-form.js"><\/script>';
	}

	$('#idform_'+f).html(formhtml);

	$('body').on('change','#chonsp', function() {
	var parentform = $(this).parent().parent().parent();
	var idform = parentform.attr('id');
	$('#'+idform+' .sl_ttsp').val('');
	$('#'+idform+' .sl_ttsp .vnopt').addClass('hdnone');
	var idsp = $(this).val();
	$('#'+idform+' .sl_ttsp #ttsp_'+idsp).removeClass('hdnone');
	getttid(idsp);
	gethanghoaid(idform);
	});
	$('body').on('change','.sl_ttsp', function() {
	var parentform = $(this).parent().parent().parent();
	var idform = parentform.attr('id');
	gethanghoaid(idform);
	});

	function getttid(idform){
		$('.sl_ttsp').each(function() {
			var thuoctinh = $(this).attr('name');
			var idshow =  $(this).attr('id');
			$('#'+idshow+' .vnopt').remove();
			$.each(data.ttinh, function (index, tt) {
				//console.log(tt.id_hhoa);
				//console.log(idform);
				if(tt.id_hhoa == idform && tt.ten_ttinh == thuoctinh ){
					$('#'+idshow).append('<option class="vnopt" id="ttsp_'+tt.id_hhoa+'" value="'+tt.id_ttinh_ct+'">'+tt.gia_tri+'</option>')
				}
			});
		});
	}

}else{

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
	<div class="form-input"><input maxlength="99" class="form-input" id="name" type="text" name="name" placeholder="Họ tên" required="required"></div>\
	<div class="form-input"><input class="form-input" id="dateoball" type="text" name="dateoball" placeholder="01/01/1990" /></div>\
	<div class="form-input"><input class="form-input" id="email" type="email" name="email" placeholder="Email (Nếu có)" /></div>\
	<div class="form-input"><input class="form-input" id="mobile" type="tel" name="mobile" placeholder="Số điện thoại" required="required"></div>\
	<div class="form-input"><input class="form-input" id="address" type="text" name="address" placeholder="Địa chỉ" required="required"></div>\
	<div class="form-input">\
	<select name="chonsp" id="chonsp"><option value="">Chọn sản phẩm</option>';

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
		formhtml += '<script src="http://lazishop.net/landing/ladipage/form/thuong_cau-hinh-form.js"><\/script>';
	}

	$('#idform_'+f).html(formhtml);
	
}

	}
});



function gethanghoaid(idform){
	$('#'+idform+' .labelproduct').html('');
	var idhh = $('#'+idform+' #chonsp').val();
	if ($('#ttsp_'+idhh).length > 0) {
		var idtt = [];
		$('#'+idform+' .sl_ttsp').each(function() {
			idtt.push($('#'+idform+' #'+this.id).val());
		});
		var id_sp = [];
		$.each(datasp.ttinh, function (index, tt) {
			if(tt.id_hhoa == idhh && idtt.indexOf(tt.id_ttinh_ct) >= 0 ){
				 id_sp.push(tt);
			}
		});
		var result = [];
		$.each(id_sp, function(index, tt) {
			var i = 0;
			$.each(result, function(index, rs) {
				if(tt.id_hhoa_ct == rs.id){
					rs.count = rs.count + 1;
					i = 1;
				}
			});
			if(i == 0){
				var item = new Object();
				item.count = 1;
				item.id = tt.id_hhoa_ct;
				if(result.indexOf(item) < 0)
				result.push(item);
			}
		});
		var idsp = result[result.length-1];
		$.each(datasp.detail, function (index, sp) {
			if(idsp !== undefined && sp.product_id == idsp.id){

				var giatien = format_curency(sp.price_sale);
				var shsp = 1;
				$('#'+idform+' .sl_ttsp').each(function() {

					if(!$('#'+idform+' #'+this.id).val()){
						shsp = 0;
					}
				});
				if(shsp == 1){
					$('#'+idform+' .labelproduct').html('<div class="infoprd">'+sp.product_name+' - <span><i>Giá:</i> '+giatien+' đ</span></div>\
					<input type="hidden" id="codespmua" value="'+sp.product_code+'">\
					<input type="hidden" id="namespmua" value="'+sp.product_name+'">\
					<input type="hidden" id="giaspmua" value="'+sp.price_sale+'">');
					console.log('Test show');
				}else{
					console.log('Test show');
					$('#'+idform+' .labelproduct').html('');

				}
			}
		});
	   
	}else{
		console.log('khong có tt');
	}
}

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
	url: 'http://lazishop.net/formlink/'+urlweb,
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
var popuphtml ='<button data-name="'+name+'" data-code="'+masp+'" data-gia="'+gia+'" type="button" class="testclick btn btn-danger btn-lg" data-toggle="modal" data-target="#form0">Mua Ngay</button>\
';

if( numItempop == k ){
	popuphtml += '<script src="http://lazishop.net/landing/ladipage/form/thuoctinh_cau-hinh-pop.js"><\/script>';
	$("body").append('<div id="form0" class="checkfn modal fade in" role="dialog">\
<div class="modal-dialog">\
<div class="modal-content">\
<div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button>\
<h4 class="modal-title"></h4>\
</div>\
<div class="modal-body">\
<div class="widget-form">\
<div class="formnhap">\
<div class="form-input">\
<input id="madvigiaodich" type="hidden" value="'+bus+'0101"/>\
<input id="business" type="hidden" value="'+bus+'"/>\
<input id="trongluong" type="hidden" value="0"/>\
<input id="donvitinh" type="hidden" value="CHIEC"/>\
<input id="price" type="hidden" value=""/>\
<input id="code" type="hidden" value=""/>\
<input id="total" type="hidden" value="1"/>\
<input id="kenhban" type="hidden" value="LDP"/>\
<input id="doitac" type="hidden" value="'+partner+'"/>\
<input id="nameproduct" type="hidden" value=""/>\
<input id="idpixel" type="hidden" value="'+idpixel+'"/>\
</div>\
<div class="form-input"><input maxlength="99" class="form-input" id="name" type="text" name="name" placeholder="Họ tên" required="required"></div>\
<div class="form-input"><input class="form-input" id="dateob" type="text" name="dateob" placeholder="01/01/1990" /></div>\
<div class="form-input"><input class="form-input" id="email" type="email" name="email" placeholder="Email" /></div>\
<div class="form-input"><input class="form-input" id="mobile" type="tel" name="mobile" placeholder="Số điện thoại" required="required"></div>\
<div class="form-input"><input class="form-input" id="address" type="text" name="address" placeholder="Địa chỉ" required="required"></div>\
<div class="btn-submit classmua"><button class="enter-submit btn" type="button">Đặt hàng</button></div>\
</div></div></div>\
</div></div></div>');
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

function format_curency(a) {
	a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
	return a;
}

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
	url: 'http://lazishop.net/formlink/'+urlweb,
	success: function(datapx){
		var idpixel = datapx.pixel;
		var htmlpixel = '<script>fbq("init", "'+idpixel+'");<\/script>\
<noscript>\
<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id='+idpixel+'&ev=PageView&noscript=1">\
<\/noscript>';	
	}
});