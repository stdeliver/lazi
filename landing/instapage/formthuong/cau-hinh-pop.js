$(document).ready(function() {
	$('.classmua').each(function(i) {
	var muaid = 'muaid_'+(i+1);
    $(this).attr('id', muaid);
	$('body').on('click','#'+muaid+' .enter-submit', function() {
		var lr = 0;
		var parentid = $(this).parent().parent();
		var kenhban = parentid.find('#kenhban').val();
		if(kenhban === ''){
			kenhban = 'WEBSITE';
		}
		var pixel = parentid.find('#idpixel').val();
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
		var dataJson = '{"ref":"'+ref+'","maDviQly":"'+business+'","madvigiaodich":"'+madvigiaodich+'","customer":"'+name+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","kenhban":"'+kenhban+'","doitac":"'+doitac+'","affId":"","afl_url":"'+afl_url+'","trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}';
		var urlApi = 'http://log.lazishop.com:8902/orders/data';
		console.log('URL API: ' + urlApi);
		$.ajax({
			type: "GET",
			headers: { 'Access-Control-Allow-Origin': '*' },
			//crossDomain: true,
			url: urlApi+"/"+dataJson,
			//data: dataJson,
			//contentType: "application/json; charset=utf-8",
			success: function(datalog){
				console.log(datalog);
				//datalog=JSON.parse(datalog);
				if(datalog.status_code === 200){
					console.log('Ghi log thành công!');
				}else{
					console.log('Ghi log không thành công!');
				}
				
			}
		});
			
		$.ajax({
			type: "GET",
			//headers: { 'Access-Control-Allow-Origin': '*' },
			url: 'http://api.lazishop.com:7070/lazi.api/lazi_service.htm?business='+business+'&function=BH0112&action=SAVE&subaction&laziKey=test&data={"trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","affId":"","customer":"'+name+'","kenhban":"'+kenhban+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","madvigiaodich":"'+madvigiaodich+'","afl_url":"'+afl_url+'","doitac":"'+doitac+'","ref":"'+ref+'","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}',
			async: false,
			success: function(data){
				console.log(data);
				if(data.responseStatus === 0){
					var codedon = data.bhOnline.maBanonline;
					setCookie('hoten_ldp',name, 30);
					setCookie('sdt_ldp',mobile, 30);
					setCookie('diachi_ldp',address, 30);
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
					window.open('http://ldp.lazishop.com/landing/thank-you/?px='+pixel+'&code='+codedon, '_blank');
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
	//ketthucadd

var divaddpop = '.page-element';


$('.testclick').each(function(i) {
	var popid = 'popid_'+(i+1);
    $(this).attr('id', popid);

$('body').on('click','#'+popid, function() {

console.log('click ok');

$(divaddpop).removeClass('bigpop');

$(this).parents(divaddpop).addClass('bigpop');


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