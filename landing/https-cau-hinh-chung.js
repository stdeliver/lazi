$(document).ready(function() {
$('.form-input#dateob').prop('type', 'date');
$('.form-input#dateoball').prop('type', 'date');
$('.form-input#mobile').prop('type', 'tel');
$('.form-input#email').prop('type', 'email');
});


$(document).ready(function() {
	$('.enter-submit').click(function(){
		var lr = 0;
		var parentid = $(this).parent().parent();
		var kenhban = parentid.find('#kenhban').val();
		if(kenhban === ''){
			kenhban = 'WEBSITE';
		}
		var doitac = parentid.find('#doitac').val();
		var name = parentid.find('#name').val();
		// var email = '';
		var email = parentid.find('#email').val();
		var mobile = parentid.find('#mobile').val();
		var district = parentid.find('#district').val();
		//var	tinhhuyen = district.split("-");
		var huyen = ''; // tinhhuyen[1];
		var city = ''; // tinhhuyen[0];
		var address = parentid.find('#address').val();
		var business = parentid.find('#business').val();
		var trongluong = parentid.find('#trongluong').val();
		var donvitinh = parentid.find('#donvitinh').val();
		
		var madvigiaodich = parentid.find('#madvigiaodich').val();
		var dateob = parentid.find('#dateob').val();
		var code = parentid.find('#code').val();
		var nameproduct = parentid.find('#nameproduct').val();
		var price = parentid.find('#price').val();
		console.log(business);
		price = price.replace(",", "");
		var total = parentid.find('#total').val();
		var totalmoney = price*total;
		//var afl_url = window.location.href;
		var afl_url = encodeURIComponent(window.location.href).replace(/%20/g,'+');

		console.log("nameproductx sp " + nameproduct);
		console.log("codex sp " + code);
		console.log("dateob sp " + dateob);
		console.log("pricex sp " + price);
		console.log("totalx sp " + total);
		console.log("totalmoneyx sp " + totalmoney);
		console.log("===============================");
		var numcc = /([0-9])/g;
	
		
		if(name =='' || mobile =='' || address ==''){
			alert('Vui lòng nhập đầy đủ thông tin của bạn!');
			lr = 1;
		}
		if(mobile !==''){
			if(mobile.length < 9 || mobile.length > 12 ){
				alert('Vui lòng kiểm tra lại số điện thoại của bạn!');
				lr = 1;
			}
			if (numcc.test(mobile) == false) 
			{
			   alert('Số điện thoại của bạn không đúng định dạng!');
			   lr = 1;
			}
		}else{
			alert('Bạn chưa điền số điện thoại!');
			lr = 1;
		}
		if(lr == 0){
		$(this).addClass('offvnx');
		$(this).parent( ".btn-submit" ).append("<img class='ajaxok1' src='https://www.jotform.com/images/ajax-loader.gif'/>");
		var ref = Math.round(new Date().getTime() + (Math.random() * 100));

		$.ajax({
			type: "GET",
			//headers: { 'Access-Control-Allow-Origin': '*' },
			url: 'https://api.lazishop.com:7002/lazi.api/lazi_service.htm?business='+business+'&function=BH0112&action=SAVE&subaction&laziKey=test&data={"trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","affId":"","customer":"'+name+'","kenhban":"'+kenhban+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","madvigiaodich":"'+madvigiaodich+'","afl_url":"'+afl_url+'","doitac":"'+doitac+'","ref":"'+ref+'","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}',
			success: function(data){
				
				console.log(data);
				if(data.responseStatus === 0){
					setCookie('hoten_ldp',name, 30);
					setCookie('sdt_ldp',mobile, 30);
					setCookie('diachi_ldp',address, 30);
					// Đặt mã Pixel
					fbq('track', 'CompleteRegistration');
					// Thông báo nếu đặt hàng thành công
					$("body").append("<div class='form-input showdivok'><div class='div-alert'>Xin cảm ơn! Bạn đã đặt hàng thành công!</div></div>");
					parentid.find('#name').val('');
					parentid.find('#mobile').val('');
					parentid.find('#email').val('');
					parentid.find('#address').val('');
					
					setTimeout(function(){
						$('.showdivok').remove();
						$('.modal').modal('hide');
					},4000);
					
				}else{
					// Thông báo lỗi
					$("body").append("<div class='form-input showdivok'><div class='div-alert'>Có lỗi khi đặt hàng,vui lòng kiểm tra lại thông tin!</div></div>");
					setTimeout(function(){
						$( ".showdivok" ).remove();
					},4000);
				}
			
			}
		});
		
		$(this).removeClass('offvnx');
		$('.ajaxok1').remove();
		}
	});
});


$(document).ready(function() {
$('.testclick').click(function(){

console.log('click ok');
$(this).parents('.page-element').addClass('bigpop');


	if ( getCookie('hoten_ldp') ) {
		console.log(getCookie('hoten_ldp'));
		$('.bigpop #name').val(getCookie('hoten_ldp'));
	}
	if ( getCookie('sdt_ldp') ) {
		console.log(getCookie('sdt_ldp'));
		$('.bigpop #mobile').val(getCookie('sdt_ldp'));
	}
	if ( getCookie('diachi_ldp') ) {
		console.log(getCookie('diachi_ldp'));
		$('.bigpop #address').val(getCookie('diachi_ldp'));
	}



var divselect = $(this).parent().find('.vnoption');
var divdate = $(this).parent().find('#dateob');

setTimeout(function(){
$('.modal-backdrop').remove();
},500);
console.log('show ok');
});
});






$(document).ready(function() {
$('.optall').attr("id","newId");
	$('.listsp').each(function(){
		var codedata = $(this).attr("id");
		var namedata = $(this).find('#nameproduct').val();
		$('#chonsp').append('<option value="'+codedata+'">'+namedata+'</option>');
	});
	$('.vccsm').parents('.widget-form').addClass('formtong');
	
	if ( getCookie('hoten_ldp') ) {
		console.log(getCookie('hoten_ldp'));
		$('.formtong #name').val(getCookie('hoten_ldp'));
	}
	if ( getCookie('sdt_ldp') ) {
		console.log(getCookie('sdt_ldp'));
		$('.formtong #mobile').val(getCookie('sdt_ldp'));
	}
	if ( getCookie('diachi_ldp') ) {
		console.log(getCookie('diachi_ldp'));
		$('.formtong #address').val(getCookie('diachi_ldp'));
	}
	
	
	$('.vccsm').click(function(){
		var err = 0;
		var parentid = $(this).parent().parent();
		var kenhban = parentid.find('#kenhban').val();
		if(kenhban === ''){
			kenhban = 'WEBSITE';
		}
		var doitac = parentid.find('#doitac').val();
		var name = parentid.find('#name').val();
		// var email = '';
		var email = parentid.find('#email').val();
		var mobile = parentid.find('#mobile').val();
		
		var district = parentid.find('.optall').val();
		// var	tinhhuyen = district.split("-");
		var huyen = ''; // tinhhuyen[1];
		var city = ''; // tinhhuyen[0];
		var address = parentid.find('#address').val();
		var business2 = parentid.find('#business').val();
		var trongluong = parentid.find('#trongluong').val();
		var donvitinh = parentid.find('#donvitinh').val();
		
		var madvigiaodich = parentid.find('#madvigiaodich').val();
		var dateob = parentid.find('#dateoball').val();
		
		
		var code = parentid.find('#chonsp').val();
		if( !code) {
			alert('Xin vui lòng chọn sản phẩm cần mua!');
		}
		
		var nameproduct = $('#'+code).find('#nameproduct').val();
		var price = $('#'+code).find('#price').val();
		
		
		console.log(business2);
		price = price.replace(",", "");
		var total = parentid.find('#total').val();
		var totalmoney = price*total;
		//var afl_url = window.location.href;
		var afl_url = encodeURIComponent(window.location.href).replace(/%20/g,'+');

		console.log("nameproductx sp " + nameproduct);
		console.log("codex sp " + code);
		console.log("dateob sp " + dateob);
		console.log("pricex sp " + price);
		console.log("totalx sp " + total);
		console.log("totalmoneyx sp " + totalmoney);
		console.log("===============================");
		var numcc = /([0-9])/g;
		
		if(name =='' || mobile =='' || address ==''){
			alert('Vui lòng nhập đầy đủ thông tin của bạn!');
			err = 1;
		}
		
		if(mobile !==''){
			if(mobile.length < 9 || mobile.length > 12 ){
				alert('Vui lòng kiểm tra lại số điện thoại của bạn!');
				err = 1;
			}
			if (numcc.test(mobile) == false) 
			{
			   alert('Số điện thoại của bạn không đúng định dạng!');
			   err = 1;
			}
		}else{
			alert('Bạn chưa điền số điện thoại!');
			err = 1;
		}
		var ref = Math.round(new Date().getTime() + (Math.random() * 100));
		if(err == 0) {
		$(this).addClass('offvn');
		$(this).parent( ".btn-submit" ).append("<img class='ajaxok' src='https://www.jotform.com/images/ajax-loader.gif'/>");
		
		$.ajax({
			type: "GET",
			//headers: { 'Access-Control-Allow-Origin': '*' },
			url: 'https://api.lazishop.com:7002/lazi.api/lazi_service.htm?business='+business2+'&function=BH0112&action=SAVE&subaction&laziKey=test&data={"trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","affId":"","customer":"'+name+'","kenhban":"'+kenhban+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","madvigiaodich":"'+madvigiaodich+'","afl_url":"'+afl_url+'","doitac":"'+doitac+'","ref":"'+ref+'","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}',
			success: function(data){
				console.log(data);
				if(data.responseStatus === 0){
					setCookie('hoten_ldp',name, 30);
					setCookie('sdt_ldp',mobile, 30);
					setCookie('diachi_ldp',address, 30);
					// Đặt mã Pixel
					fbq('track', 'CompleteRegistration');
					// Thông báo nếu đặt hàng thành công
					$("body").append("<div class='form-input showdivok'><div class='div-alert'>Xin cảm ơn! Bạn đã đặt hàng thành công!</div></div>");
					parentid.find('#name').val('');
					parentid.find('#mobile').val('');
					parentid.find('#email').val('');
					parentid.find('#address').val('');
					setTimeout(function(){
						$('.showdivok').remove();
						$('.modal').modal('hide');
					},4000);
					
				}else{
					// Thông báo lỗi
					$("body").append("<div class='form-input showdivok'><div class='div-alert'>Có lỗi khi đặt hàng,vui lòng kiểm tra lại thông tin!</div></div>");
					setTimeout(function(){
						$( ".showdivok" ).remove();
					},4000);
				}
				
			}
		});
		
		
			
		$(this).removeClass('offvn');
		$('.ajaxok').remove();
		}
	});
	
});

function getCookie(c_name) {
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) {
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1) {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start, c_end));
	}
	return c_value;
}
function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	var parts = location.hostname.split('.');
	var domainx = parts.slice(-2).join('.');
	console.log(domainx);
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value + ";domain="+domainx;
}

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');