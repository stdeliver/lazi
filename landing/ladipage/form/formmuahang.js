$(document).ready(function() {
	var scriptjs;
	var vnurl = window.location+"";
	vnurl = vnurl.replace(/\:/g, ',').replace(/\//g, '_');

	var s = document.createElement("script");
	
$("head").append(s);
	$.ajax({
		type: "GET",
		url: 'http://lazishop.net/formlink/'+vnurl,
		success: function(data){
			console.log(data);
			if(data.show_type == 1){
				s.type = "text/javascript";
				s.src = "http://lazishop.net/landing/ladipage/form/thuoctinh_cau-hinh-form.js";
				alert('thuộc tính');
			}else{
				s.type = "text/javascript";
				s.src = "http://lazishop.net/landing/ladipage/form/thuong_cau-hinh-form.js";
				alert('thường');
			}
			document.head.appendChild(s);
		}
	});
	
});