$(document).ready(function() {
	$('.class_wgform').each(function(i) {
		var formid = 'formid_'+(i+1);
    	$(this).attr('id', formid);
	
		$('#'+formid+' .vccsm').parents('.widget-form').addClass('formtong');
		
		$('body').on('click','#'+formid+' .vccsm', function() {
			var err = 0;
			var parentid = $(this).parent().parent();
			var kenhban = parentid.find('#kenhban').val();
			if(kenhban === ''){
				kenhban = 'WEBSITE';
			}
			var pixel = parentid.find('#idpixel').val();
			var doitac = parentid.find('#doitac').val();
			var name = parentid.find('#name').val();
			name = name.replace(/&/g, "và");

			// var email = '';
			var email = parentid.find('#email').val();
			var mobile = parentid.find('#mobile').val();
			
			// var	tinhhuyen = district.split("-");
			var huyen = ''; // tinhhuyen[1];
			var city = ''; // tinhhuyen[0];
			var address = parentid.find('#address').val();
			address = address.replace(/&/g, " và ");
			address = address.replace(/\//g, " trên ");
			//var business2 = '01';
			var business2 = parentid.find('#business').val();
			var trongluong = parentid.find('#trongluong').val();
			var donvitinh = parentid.find('#donvitinh').val();
			
			//var madvigiaodich = '010101';
			var madvigiaodich = parentid.find('#madvigiaodich').val();
			var dateob = parentid.find('#dateoball').val();
			
			
			var code = parentid.find('#codespmua').val();
			if( !code) {
				alert('Xin vui lòng chọn đủ thông tin sản phẩm cần mua!');
				err = 1;
			}
			
			var nameproduct = parentid.find('#namespmua').val();
			var price = parentid.find('#giaspmua').val();
			
			
			console.log(business2);
			//price = price.replace(",", "");
			var total = parentid.find('#total').val();
			var totalmoney = price*total;
			var urlvn = window.location.href;
			var afl_url = encodeURIComponent(window.location.href).replace(/%20/g,'+');
			console.log(urlvn);
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
				if(name ==''){
				parentid.find('#name').css("border","1px solid red");
				}
				if(mobile ==''){
					parentid.find('#mobile').css("border","1px solid red");
				}
				if(address ==''){
					parentid.find('#address').css("border","1px solid red");
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
					err = 1;
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
					err = 1;
				}
				
				if(regexfinal !==''){
					if (regexfinal.test(mobile) == false){
						alert('Số điện thoại của bạn không đúng định dạng!');
						err = 1;
					}
				}
			}else{
				err = 1;
			}
			
			
			var ref = Math.round(new Date().getTime() + (Math.random() * 100));
			if(err == 0) {
			
			$(this).parent( ".btn-submit" ).append("<img class='ajaxok1' src='http://lazishop.net/landing/ajax-loader.gif'/>");
			$('#'+formid+' .vccsm').hide();
			name = name.replace( /(\"|\\|\'|\&')/g,"");
			address = address.replace( /(\"|\\|\'|\&')/g,"");
			// name = encodeURIComponent(name);
			// address = encodeURIComponent(address);
			var dataJson = '{"ref":"'+ref+'","maDviQly":"'+business2+'","madvigiaodich":"'+madvigiaodich+'","customer":"'+name+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","kenhban":"'+kenhban+'","doitac":"'+doitac+'","aff":"","afl_url":"'+afl_url+'","trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}';
			
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
								$(location).attr('href', 'http://lazishop.net/landing/thank-you/?px='+pixel+'&code=&ref='+ref+'&b='+business2);
							},15000);
							
							$.ajax({
								type: "GET",
								//headers: { 'Access-Control-Allow-Origin': '*' },
								url: 'https://api.lazishop.com/lazi.api/lazi_service.htm?business='+business2+'&function=BH0112&action=SAVE&subaction&laziKey=test&data={"trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","aff":"","customer":"'+name+'","kenhban":"'+kenhban+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","madvigiaodich":"'+madvigiaodich+'","afl_url":"'+afl_url+'","doitac":"'+doitac+'","ref":"'+ref+'","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}',
								success: function(data){
									console.log(data);
									if(data.responseStatus === 0){
										var codedon = data.bhOnline.maBanonline;
										// Thông báo nếu đặt hàng thành công
										//$("body").append("<div class='form-input showdivok'><div class='div-alert'>Xin cảm ơn! Bạn đã đặt hàng thành công!...</div></div>");
										parentid.find('#name').val('');
										parentid.find('#mobile').val('');
										parentid.find('#email').val('');
										parentid.find('#address').val('');
										setTimeout(function(){
											$(location).attr('href', 'http://lazishop.net/landing/thank-you/?px='+pixel+'&code='+codedon+'&ref='+ref+'&b='+business2);
										},1000);
										
									}else{
										// Thông báo lỗi
										$("body").append("<div class='form-input showdivok'><div class='div-alert'>Có lỗi khi đặt hàng,vui lòng kiểm tra lại thông tin!</div></div>");
										setTimeout(function(){
											$( ".showdivok" ).remove();
										},2000);
									}

									$('#'+formid+' .vccsm').show();
									$('.ajaxok1').remove();
									
								}
							});
						}else{
							console.log('Ghi log không thành công!');
							$.ajax({
								type: "GET",
								//headers: { 'Access-Control-Allow-Origin': '*' },
								url: 'https://api.lazishop.com/lazi.api/lazi_service.htm?business='+business2+'&function=BH0112&action=SAVE&subaction&laziKey=test&data={"trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","aff":"","customer":"'+name+'","kenhban":"'+kenhban+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","madvigiaodich":"'+madvigiaodich+'","afl_url":"'+afl_url+'","doitac":"'+doitac+'","ref":"'+ref+'","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}',
								success: function(data){
									console.log(data);
									if(data.responseStatus === 0){
										var codedon = data.bhOnline.maBanonline;
										// Thông báo nếu đặt hàng thành công
										//$("body").append("<div class='form-input showdivok'><div class='div-alert'>Xin cảm ơn! Bạn đã đặt hàng thành công!...</div></div>");
										parentid.find('#name').val('');
										parentid.find('#mobile').val('');
										parentid.find('#email').val('');
										parentid.find('#address').val('');
										setTimeout(function(){
											$(location).attr('href', 'http://lazishop.net/landing/thank-you/?px='+pixel+'&code='+codedon+'&ref='+ref+'&b='+business2);
										},1000);
										
									}else{
										// Thông báo lỗi
										$("body").append("<div class='form-input showdivok'><div class='div-alert'>Có lỗi khi đặt hàng,vui lòng kiểm tra lại thông tin!</div></div>");
										setTimeout(function(){
											$( ".showdivok" ).remove();
										},2000);
									}

									$('#'+formid+' .vccsm').show();
									$('.ajaxok1').remove();
									
								}
							});
						}
					},
					error: function(jqXHR,error, errorThrown) {
						$.ajax({
							type: "GET",
							//headers: { 'Access-Control-Allow-Origin': '*' },
							url: 'https://api.lazishop.com/lazi.api/lazi_service.htm?business='+business2+'&function=BH0112&action=SAVE&subaction&laziKey=test&data={"trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","aff":"","customer":"'+name+'","kenhban":"'+kenhban+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","madvigiaodich":"'+madvigiaodich+'","afl_url":"'+afl_url+'","doitac":"'+doitac+'","ref":"'+ref+'","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}',
							success: function(data){
								console.log(data);
								if(data.responseStatus === 0){
									var codedon = data.bhOnline.maBanonline;
									// Thông báo nếu đặt hàng thành công
									//$("body").append("<div class='form-input showdivok'><div class='div-alert'>Xin cảm ơn! Bạn đã đặt hàng thành công!...</div></div>");
									parentid.find('#name').val('');
									parentid.find('#mobile').val('');
									parentid.find('#email').val('');
									parentid.find('#address').val('');
									setTimeout(function(){
										$(location).attr('href', 'http://lazishop.net/landing/thank-you/?px='+pixel+'&code='+codedon+'&ref='+ref+'&b='+business2);
									},1000);
									
								}else{
									// Thông báo lỗi
									$("body").append("<div class='form-input showdivok'><div class='div-alert'>Có lỗi khi đặt hàng,vui lòng kiểm tra lại thông tin!</div></div>");
									setTimeout(function(){
										$( ".showdivok" ).remove();
									},2000);
								}

								$('#'+formid+' .vccsm').show();
								$('.ajaxok1').remove();
								
							}
						});
					}
					
				});


			
			

			}
		});
	});

$(".formtong #name").change(function(){
    $('.formtong #name').css("border","1px solid #8095a8");
});
$(".formtong #mobile").change(function(){
    $('.formtong #mobile').css("border","1px solid #8095a8");
});
$(".formtong #address").change(function(){
    $('.formtong #address').css("border","1px solid #8095a8");
});

});