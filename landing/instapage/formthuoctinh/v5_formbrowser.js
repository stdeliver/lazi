$(document).ready(function() {
var urlweb = window.location+"";
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
	url: 'http://mascom.vn/api.lazisite/formlink/'+urlweb,
	success: function(data){
		
	datasp = data;
	var countsp = data.detail.length;
	var bus = data.bus;
	var partner = data.partner;
	var idpixel = data.pixel;
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
<div class="form-input"><input class="form-input" id="name" type="text" name="name" placeholder="Họ tên" /></div>\
<div class="form-input"><input class="form-input" id="dateoball" type="text" name="dateoball" placeholder="01/01/1990" /></div>\
<div class="form-input"><input class="form-input" id="email" type="email" name="email" placeholder="Email" /></div>\
<div class="form-input"><input class="form-input" id="mobile" type="tel" name="mobile" placeholder="Số điện thoại" /></div>\
<div class="form-input"><input class="form-input" id="address" type="text" name="address" placeholder="Địa chỉ"></div>\
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
			formhtml += '<select class="sl_ttsp" id="selectid_'+index+'">';
			formhtml += '<option value="">Chọn '+ namett.toString() +'</option>';
		    $.each(data.ttinh, function (i, detailtt) {
		        if (detailtt.ten_ttinh == namett.toString() && idct.indexOf(detailtt.id_ttinh_ct) < 0) {
		        	idct.push(detailtt.id_ttinh_ct);
		        	formhtml += '<option value="'+detailtt.id_ttinh_ct+'">'+detailtt.gia_tri+'</option>';
		        }
		    });
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
	formhtml += '<script src="http://ldp.lazishop.com/landing/v5_sptt/cau-hinh-form.js"><\/script>';
}

$('#idform_'+f).html(formhtml);
		
	},
    error: function(jqXHR,error, errorThrown) {  
          }
});


$('body').on('change','#chonsp', function() {
var parentform = $(this).parent().parent().parent();
var idform = parentform.attr('id');
gethanghoaid(idform);
});
$('body').on('change','.sl_ttsp', function() {
var parentform = $(this).parent().parent().parent();
var idform = parentform.attr('id');
gethanghoaid(idform);
});

	function gethanghoaid(idform){
	var idhh = $('#'+idform+' #chonsp').val();
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
	result = result.sort((a, b) => parseFloat(a.count) - parseFloat(b.count));
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
			}else{
				$('#'+idform+' .labelproduct').html('');
			}
		}
	});
}

});




var numItempop = $('.popupform_landing').length;
numItempop = numItempop - 1;

console.log('sodiv pop' + numItempop);
$('.popupform_landing').each(function(k){
var datasp2;
var idformpop = $(this).attr("id").replace("popform_", "");
var idsp = idformpop + k;
$(this).attr("id","popform_"+idsp);
$.ajax({
	type: "GET",
	url: 'http://mascom.vn/api.lazisite/formlink/'+urlweb,
	success: function(data){

datasp2 = data;
var countsp = data.detail.length;
var bus = data.bus;
var partner = data.partner;
var idpixel = data.pixel;

var popuphtml ='<button type="button" style="font-size:25px;text-transform:uppercase;padding:20px 10px" class="testclick btn btn-success btn-lg" data-toggle="modal" data-target="#form'+k+'">Mua Ngay</button>\
<div id="form'+k+'" class="checkfn modal fade" role="dialog">\
<div class="modal-dialog">\
<div class="modal-content">\
<div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button>\
<h4 class="modal-title">Chọn sản phẩm</h4>\
</div>\
<div class="modal-body">\
<div class="widget-form">\
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
<div class="form-input"><input class="form-input" id="name" type="text" name="name" placeholder="Họ tên" /></div>\
<div class="form-input"><input class="form-input" id="dateob" type="text" name="dateob" placeholder="01/01/1990" /></div>\
<div class="form-input"><input class="form-input" id="email" type="email" name="email" placeholder="Email" /></div>\
<div class="form-input"><input class="form-input" id="mobile" type="tel" name="mobile" placeholder="Số điện thoại" /></div>\
<div class="form-input"><input class="form-input" id="address" type="text" name="address" placeholder="Địa chỉ"></div>';
var tenthuoctinh = [];
	$.each(data.ttinh, function (i, info) {
	    var namett = this.ten_ttinh;
	    if(info.id_hhoa == idformpop){
	    	if (tenthuoctinh.indexOf(namett) < 0) {
	       		tenthuoctinh.push(namett);
	   		};
	    }
	    
	});
	//console.log(tenthuoctinh);
	
	$.each(tenthuoctinh, function (index, namett) {
		var idct = [];
		popuphtml += '<select class="sl_ttsp2" id="selectid_'+index+'">';
		popuphtml += '<option value="">Chọn '+ namett.toString() +'</option>';
	    $.each(data.ttinh, function (i, detailtt) {
	        if (detailtt.ten_ttinh == namett.toString() && idct.indexOf(detailtt.id_ttinh_ct) < 0) {
	        	idct.push(detailtt.id_ttinh_ct);
	        	popuphtml += '<option value="'+detailtt.id_ttinh_ct+'">'+detailtt.gia_tri+'</option>';
	        }
	    });
	    popuphtml += '</select>';
	});

popuphtml += '<div class="labelproduct"></div><div class="btn-submit classmua"><button class="enter-submit btn" type="button">Đặt hàng</button></div>\
</div></div></div>\
<div class="modal-footer">\
<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>\
</div></div></div></div>';

if( numItempop == k ){
	popuphtml += '<script src="http://ldp.lazishop.com/landing/v5_sptt/cau-hinh-pop.js"><\/script>';
}

$('#popform_'+idsp).html(popuphtml);
	},
    error: function(jqXHR,error, errorThrown) {  
          }
});



$('body').on('change','.sl_ttsp2', function() {
var parentform = $(this).parent().parent().parent().parent().parent().parent().parent();
var idform = parentform.attr('id');
gethanghoaid(idform);
console.log(idform);
});

	function gethanghoaid(idform){
	var idformpophh = idform.replace("popform_", "");
	var idtrue = idformpophh;
	idtrue = idtrue.slice(0, -1);
	var idhh = parseInt(idtrue);
	var idtt = [];
	$('#'+idform+' .sl_ttsp2').each(function() {
		idtt.push($('#'+idform+' #'+this.id).val());
	});
	//console.log(idtt);
	var id_sp2 = [];
	$.each(datasp2.ttinh, function (index, tt) {
		if(tt.id_hhoa == idhh && idtt.indexOf(tt.id_ttinh_ct) >= 0 ){
			 id_sp2.push(tt);
		}
	});

	var result = [];
	$.each(id_sp2, function(index, tt) {
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
	result = result.sort((a, b) => parseFloat(a.count) - parseFloat(b.count));
	var idsp = result[result.length-1];
	$.each(datasp2.detail, function (index, sp) {
		if(idsp !== undefined && sp.product_id == idsp.id){
			var giatien = format_curency(sp.price_sale);
			var shsp = 1;
			$('#'+idform+' .sl_ttsp2').each(function() {
				if(!$('#'+idform+' #'+this.id).val()){
					shsp = 0;
				}
			});
			if(shsp == 1){
				$('#'+idform+' .labelproduct').html('<div class="infoprd">'+sp.product_name+' - <span><i>Giá:</i> '+giatien+' đ</span></div>\
				<input type="hidden" id="code" value="'+sp.product_code+'">\
				<input type="hidden" id="nameproduct" value="'+sp.product_name+'">\
				<input type="hidden" id="price" value="'+sp.price_sale+'">');
			}else{
				$('#'+idform+' .labelproduct').html('');
			}

				
		}
	});
}



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
	url: 'http://mascom.vn/api.lazisite/formlink/'+urlweb,
	success: function(datapx){
		var idpixel = datapx.pixel;
		var htmlpixel = '<script>fbq("init", "'+idpixel+'");<\/script>\
<noscript>\
<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id='+idpixel+'&ev=PageView&noscript=1">\
<\/noscript>';	
	}
});