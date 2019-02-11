$(document).ready(function() {
	$('.optall').attr("id","newId");

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
			
			
			var code = parentid.find('#codespmua').val();
			if( !code) {
				alert('Xin vui lòng chọn đủ thông tin sản phẩm cần mua!');
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
			
			var dataJson = '{"ref":"'+ref+'","maDviQly":"'+business2+'","madvigiaodich":"'+madvigiaodich+'","customer":"'+name+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","kenhban":"'+kenhban+'","doitac":"'+doitac+'","affId":"","afl_url":"'+afl_url+'","trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}';
			
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
				url: 'http://api.lazishop.com:7070/lazi.api/lazi_service.htm?business='+business2+'&function=BH0112&action=SAVE&subaction&laziKey=test&data={"trongluong":'+trongluong+',"donvitinh":"'+donvitinh+'","derived":"","affId":"","customer":"'+name+'","kenhban":"'+kenhban+'","mobile":"'+mobile+'","email":"'+email+'","address":"'+address+'","madvigiaodich":"'+madvigiaodich+'","afl_url":"'+afl_url+'","doitac":"'+doitac+'","ref":"'+ref+'","arrOrderProduct":[{"productId":"0","code":"'+code+'","name":"'+nameproduct+'","price":"'+price+'","total":"'+total+'","totalmoney":"'+totalmoney+'"}]}',
				async: false,
				success: function(data){
					console.log(data);
					if(data.responseStatus === 0){
						var codedon = data.bhOnline.maBanonline;
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
			
			$(this).removeClass('offvn');
			$('.ajaxok').remove();
			}
		});
	});
	
});