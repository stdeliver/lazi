$(document).ready(function() {
    $('body').on('click','.enter-submit', function() {
		var lr = 0;
		var kenhban = $('#form0 #kenhban').val();
		if(kenhban === ''){
			kenhban = 'WEBSITE';
		}
		var pixel = $('#form0 #idpixel').val();
		var doitac = $('#form0 #doitac').val();
		var name = $('#form0 #name').val();
		name = name.replace(/&/g, "và");
		// var email = '';
		var email = $('#form0 #email').val();
		var mobile = $('#form0 #mobile').val();
		var district = $('#form0 #district').val();
		//var	tinhhuyen = district.split("-");
		var huyen = ''; // tinhhuyen[1];
		var city = ''; // tinhhuyen[0];
		var address = $('#form0 #address').val();
		address = address.replace(/&/g, " và ");
		address = address.replace(/\//g, " trên ");
		var business = $('#form0 #business').val();
		//var business = '01';
		var trongluong = $('#form0 #trongluong').val();
		var donvitinh = $('#form0 #donvitinh').val();
		
		var madvigiaodich = $('#form0 #madvigiaodich').val();
		//var madvigiaodich = '010101';
		var dateob = $('#form0 #dateob').val();
		var code = $('#form0 #code').val();
		var nameproduct = $('#form0 #nameproduct').val();
		var price = $('#form0 #price').val();
		console.log(business);
		price = price.replace(",", "");
		var total = $('#form0 #total').val();
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
			if(name ==''){
				$('#form0 #name').css("border","1px solid red");
			}
			if(mobile ==''){
				$('#form0 #mobile').css("border","1px solid red");
			}
			if(address ==''){
				$('#form0 #address').css("border","1px solid red");
			}
		}
		
		
		var regexfinal = '';
		var two_vnf_regex = /((09|03|07|08|05))/g;
		var three_vnf_regex = /((024|028))/g;
		var four_vnf_regex = /((0296|0254|0209|0204|0291|0222|0275|0256|0274|0271|0252|0290|0292|0206|0236|0262|0261|0215|0251|0277|0269|0219|0226|0239|0220|0225|0293|0218|0221|0258|0297|0260|0213|0263|0205|0214|0272|0228|0238|0229|0259|0210|0257|0232|0235|0255|0203|0233|0299|0212|0276|0227|0208|0237|0234|0273|0294|0207|0270|0211|0216))/g;
		
		var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
		var vnf_regex3 = /((024|028)+([0-9]{8})\b)/g;
		var vnf_regex4 = /((0296|0254|0209|0204|0291|0222|0275|0256|0274|0271|0252|0290|0292|0206|0236|0262|0261|0215|0251|0277|0269|0219|0226|0239|0220|0225|0293|0218|0221|0258|0297|0260|0213|0263|0205|0214|0272|0228|0238|0229|0259|0210|0257|0232|0235|0255|0203|0233|0299|0212|0276|0227|0208|0237|0234|0273|0294|0207|0270|0211|0216)+([0-9]{7})\b)/g;
		
		var twonumber = mobile.substring(0,2);
		var threenumber = mobile.substring(0,3);
		var fournumber = mobile.substring(0,4);
		
		if(mobile !==''){
			if(mobile.length < 8 || mobile.length > 12 ){
				alert('Vui lòng kiểm tra lại số điện thoại của bạn!');
				lr = 1;
			}

			if (two_vnf_regex.test(twonumber) == true) {
				regexfinal = vnf_regex;
			}else if(three_vnf_regex.test(threenumber) == true){
				regexfinal = vnf_regex3;
			}else if(four_vnf_regex.test(fournumber) == true){
				regexfinal = vnf_regex4;
			}else{
				alert('Đầu số điện thoại của bạn không hợp lệ!');
				regexfinal = '';
				lr = 1;
			}
			
			if(regexfinal !==''){
				if (regexfinal.test(mobile) == false){
					alert('Số điện thoại của bạn không đúng định dạng!');
					lr = 1;
				}
			}
		}else{
			lr = 1;
		}
		

		if(lr == 0){
			$(this).parent( ".btn-submit" ).append("<img class='ajaxok1' src='http://lazishop.net/landing/ajax-loader.gif'/>");
			$(this).hide();
				name = name.replace( /(\"|\\|\'|\&')/g,"");
				address = address.replace( /(\"|\\|\'|\&')/g,"");
				// name = encodeURIComponent(name);
				// address = encodeURIComponent(address);
				var ref = Math.round(new Date().getTime() + (Math.random() * 100));
				var dataJson = '{"ref":"'+ref+'","maDviQly":"'+business+'","madvigiaodich":"'+madvigiaodich+'","customer":"'+name+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","kenhban":"'+kenhban+'","doitac":"'+doitac+'","aff":"","afl_url":"'+afl_url+'","trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}';
				var urlApi = 'https://log.lazishop.com:8445/orders/data';
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

							var codedonlog = datalog.data.ref;
							setTimeout(function(){
								$(location).attr('href', 'http://lazishop.net/landing/thank-you/?px='+pixel+'&code=&ref='+ref+'&b='+business);
							},15000);
							
							$.ajax({
								type: "GET",
								//headers: { 'Access-Control-Allow-Origin': '*' },
								url: 'https://api.lazishop.com/lazi.api/lazi_service.htm?business='+business+'&function=BH0112&action=SAVE&subaction&laziKey=test&data={"trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","aff":"","customer":"'+name+'","kenhban":"'+kenhban+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","madvigiaodich":"'+madvigiaodich+'","afl_url":"'+afl_url+'","doitac":"'+doitac+'","ref":"'+ref+'","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}',
								success: function(data){
									console.log(data);
									if(data.responseStatus === 0){
										var codedon = data.bhOnline.maBanonline;
										setCookie('hoten_ldp',name, 30);
										setCookie('sdt_ldp',mobile, 30);
										setCookie('diachi_ldp',address, 30);
										// Thông báo nếu đặt hàng thành công
										//$("body").append("<div class='form-input showdivok'><div class='div-alert'>Xin cảm ơn! Bạn đã đặt hàng thành công!.</div></div>");
										$('#form0 #name').val('');
										$('#form0 #mobile').val('');
										$('#form0 #email').val('');
										$('#form0 #address').val('');
										
										$('#form0 .enter-submit').show();
										$(this).show();
										$('#form0').hide();
										$('.ajaxok1').remove();
										
										setTimeout(function(){
											$(location).attr('href', 'http://lazishop.net/landing/thank-you/?px='+pixel+'&code='+codedon+'&ref='+ref+'&b='+business);
										},1000);

									}else{
										// Thông báo lỗi
										$("body").append("<div class='form-input showdivok'><div class='div-alert'>Có lỗi khi đặt hàng,vui lòng kiểm tra lại thông tin!</div></div>");
										setTimeout(function(){
										$(this).show();
										},2000);
										$('.ajaxok1').remove();
										$( ".showdivok" ).remove();
									}
								}
								
							});
						}else{
							console.log('Ghi log không thành công!');
							$.ajax({
								type: "GET",
								//headers: { 'Access-Control-Allow-Origin': '*' },
								url: 'https://api.lazishop.com/lazi.api/lazi_service.htm?business='+business+'&function=BH0112&action=SAVE&subaction&laziKey=test&data={"trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","aff":"","customer":"'+name+'","kenhban":"'+kenhban+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","madvigiaodich":"'+madvigiaodich+'","afl_url":"'+afl_url+'","doitac":"'+doitac+'","ref":"'+ref+'","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}',
								success: function(data){
									console.log(data);
									if(data.responseStatus === 0){
										var codedon = data.bhOnline.maBanonline;
										setCookie('hoten_ldp',name, 30);
										setCookie('sdt_ldp',mobile, 30);
										setCookie('diachi_ldp',address, 30);
										// Thông báo nếu đặt hàng thành công
										//$("body").append("<div class='form-input showdivok'><div class='div-alert'>Xin cảm ơn! Bạn đã đặt hàng thành công!.</div></div>");
										$('#form0 #name').val('');
										$('#form0 #mobile').val('');
										$('#form0 #email').val('');
										$('#form0 #address').val('');
										
										$('#form0 .enter-submit').show();
										$(this).show();
										$('#form0').hide();
										$('.ajaxok1').remove();
										
										setTimeout(function(){
											$(location).attr('href', 'http://lazishop.net/landing/thank-you/?px='+pixel+'&code='+codedon+'&ref='+ref+'&b='+business);
										},1000);

									}else{
										// Thông báo lỗi
										$("body").append("<div class='form-input showdivok'><div class='div-alert'>Có lỗi khi đặt hàng,vui lòng kiểm tra lại thông tin!</div></div>");
										setTimeout(function(){
										$(this).show();
										},2000);
										$('.ajaxok1').remove();
										$( ".showdivok" ).remove();
									}
								}
								
							});
						}
						
					},
					error: function(jqXHR,error, errorThrown) {
					$.ajax({
							type: "GET",
							//headers: { 'Access-Control-Allow-Origin': '*' },
							url: 'https://api.lazishop.com/lazi.api/lazi_service.htm?business='+business+'&function=BH0112&action=SAVE&subaction&laziKey=test&data={"trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","aff":"","customer":"'+name+'","kenhban":"'+kenhban+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","madvigiaodich":"'+madvigiaodich+'","afl_url":"'+afl_url+'","doitac":"'+doitac+'","ref":"'+ref+'","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}',
							success: function(data){
								console.log(data);
								if(data.responseStatus === 0){
									var codedon = data.bhOnline.maBanonline;
									setCookie('hoten_ldp',name, 30);
									setCookie('sdt_ldp',mobile, 30);
									setCookie('diachi_ldp',address, 30);
									// Thông báo nếu đặt hàng thành công
									//$("body").append("<div class='form-input showdivok'><div class='div-alert'>Xin cảm ơn! Bạn đã đặt hàng thành công!.</div></div>");
									$('#form0 #name').val('');
									$('#form0 #mobile').val('');
									$('#form0 #email').val('');
									$('#form0 #address').val('');
									
									$('#form0 .enter-submit').show();
									$(this).show();
									$('#form0').hide();
									$('.ajaxok1').remove();
									
									setTimeout(function(){
										$(location).attr('href', 'http://lazishop.net/landing/thank-you/?px='+pixel+'&code='+codedon+'&ref='+ref+'&b='+business);
									},1000);

								}else{
									// Thông báo lỗi
									$("body").append("<div class='form-input showdivok'><div class='div-alert'>Có lỗi khi đặt hàng,vui lòng kiểm tra lại thông tin!</div></div>");
									setTimeout(function(){
									$(this).show();
									},2000);
									$('.ajaxok1').remove();
									$( ".showdivok" ).remove();
								}
							}
							
						});
					}
				});
					
				
		}
	});

	//ketthucadd
$("#form0 #name").change(function(){
    $('#form0 #name').css("border","1px solid #8095a8");
});
$("#form0 #mobile").change(function(){
    $('#form0 #mobile').css("border","1px solid #8095a8");
});
$("#form0 #address").change(function(){
    $('#form0 #address').css("border","1px solid #8095a8");
});

$('body').on('click','.close', function() {
	$('#form0').hide();
})
$(document).keyup(function(e) {
     if (e.keyCode == 27) {
      $('#form0').hide();
    }
});
$('body').on('click','.testclick', function() {
	$('#form0').show();
	var name = $(this).attr('data-name');
	var code = $(this).attr('data-code');
	var gia = $(this).attr('data-gia');
	$('#form0 .modal-title').html(name);
	$('#form0 #code').val(code);
	$('#form0 #price').val(gia);
	$('#form0 #nameproduct').val(name);


	if ( getCookie('hoten_ldp') ) {
		console.log(getCookie('hoten_ldp'));
		$('#form0 #name').val(getCookie('hoten_ldp'));
	}
	if ( getCookie('sdt_ldp') ) {
		console.log(getCookie('sdt_ldp'));
		$('#form0 #mobile').val(getCookie('sdt_ldp'));
	}
	if ( getCookie('diachi_ldp') ) {
		console.log(getCookie('diachi_ldp'));
		$('#form0 #address').val(getCookie('diachi_ldp'));
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