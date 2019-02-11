<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Cảm ơn bạn đã mua hàng!</title>
<!-- css -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="css/normalize.css">
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<!-- end css -->
<!-- js -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>

<!-- end js v1 -->
</head>
<body class="bg-body" id="body">
<nav id="navv">
	<?php 
		$sdt = '';
		$logo = '';
		$cpn = '';
		$domain = '';
		$ref = '';
		if(isset($_GET['b'])){
		$bus = $_GET['b'];

		if($bus == 55){
			$sdt = '0961.649.666 - 0967.353.666';
			$logo = '_55';
			$cpn = 'Mandara';
			$domain = 'http://mandara.vn';
		}
		elseif($bus == 66){
			$sdt = '0967.170.666';
			$logo = '_66';
			$cpn = 'Jstone';
			$domain = 'http://jstone.vn';
		}
		elseif($bus == 89){
			$sdt = '0964.25.88.99';
			$logo = '_89';
			$cpn = 'Cổ Ngọc';
			$domain = 'https://www.facebook.com/congoc.vn';
		}
		elseif($bus == 33){
			$sdt = '0985.900.246';
			$logo = '_33a';
			$cpn = 'Asoca';
			$domain = 'https://www.facebook.com/phongthuy.asoca/';
		}
		elseif($bus == 69){
			$sdt = '0989.53.66.99';
			$logo = '_69';
			$cpn = 'Rockstone';
			$domain = 'https://www.facebook.com/rockstone88/';
		}
		elseif($bus == 83){
			$sdt = '096.274.6688';
			$logo = '';
			$cpn = 'Phong Thủy Ô Tô';
			$domain = 'https://www.facebook.com/phongthuyoto.vn/';
		}
		elseif($bus == 98){
			$sdt = '0981.27.69.69';
			$logo = '_98';
			$cpn = 'Trầm Quảng';
			$domain = 'https://www.facebook.com/trangsuctramtunhien/';
		}
		else{
			$sdt = '19001588';
			$logo = '';
			$cpn = 'Mixi';
			$domain = 'http://mixi.vn';
		}

	}?>
	<!--- nav pc -->
	<div class="d-none d-lg-block bg-bl">
		<div class="container no-pd">
			<div class="row row-nmg justify-content-between" style="padding-top: 4px;padding-bottom: 6px">
				<div class="col no-pd"> <img class="d-inline-block" src="img/icon/outline-call-24px.svg" height="15px" width="15px" alt=""/>
					<p class="d-inline-block no-mg-bt font-14 color-w" style="padding-left: 5px"><?php echo $sdt; ?></p>
				</div>
			</div>
		</div>
		<hr style="margin: 0;">
		<div class="container no-pd">
			<div class="row row-nmg align-items-center" style="padding-top: 0.7rem; padding-bottom: 1rem; position: relative">
				<div class="col-12"><center><a href="<?php echo $domain; ?>"><img class="img-fluid" src="img/logo<?php echo $logo; ?>.png" alt=""/></a></center></div>
			</div>
		</div>
	</div>
	<!--- end nav pc ---->
	<!--- nav mobi -->
	<div class="d-lg-none" style="width: 100vw; background-color: #1d1e1e">
		<div class="container-fluid">
			<div class="row row-nmg justify-content-between" style="padding-top: 4px;padding-bottom: 6px">
				<div class="col no-pd" style="text-align: center;"> <img class="d-inline-block" src="img/icon/outline-call-24px.svg" height="15px" width="15px" alt=""/>
					<p class="d-inline-block no-mg-bt font-14 color-w" style="padding-left: 5px;text-align: center;"><?php echo $sdt; ?></p>
				</div>
			</div>
			<div style="padding: .7rem 0"><center><a href="<?php echo $domain; ?>"><img class="img-fluid" src="img/logo<?php echo $logo; ?>.png" alt=""/></a></center></div>
		</div>
	</div>
	<!-- end mobi-->
</nav>
<main id="main">
	<div class="container">
		<div class="d-flex justify-content-center finish flex-wrap" style="margin-top: 1.8rem">
			<div class="col-12 text-center" style="margin-bottom: 1rem">
				<h1>Đặt hàng thành công!</h1>
				<?php if(isset($_GET['code'])){ ?>
				<p>Mã đơn hàng của bạn là: <strong><?php echo $_GET['code']; ?></strong></p>
				<?php } ?>
			</div>
			<div class="col-12 text-center">
			<?php if($_GET['b'] == 55){ ?>
				<p>Cảm ơn bạn đã tin tưởng và đồng hành cùng Mandara.</p>
				<p>Nhân viên của chúng tôi sẽ liên hệ xác nhận đơn hàng với bạn trong thời gian gần nhất.</p>
				<p>Giờ làm việc Mandara từ 7h đến 22h các ngày trong tuần.</p>
			<?php }else{ ?>
				<p>Cảm ơn bạn đã tin tưởng và đồng hành cùng <?php echo $cpn; ?><br> Nhân viên của chúng tôi sẽ liên hệ với bạn trong vài phút tới</p>
			<?php } ?>
			</div>
			<a class="red-bt" style="margin-top: 2.5rem" href="<?php echo $domain; ?>">VỀ TRANG CHỦ</a>
			<a class="red-bt" style="margin-top: 2.5rem; margin-left:5px" href="javascript:history.go(-1)">MUA HÀNG TIẾP</a>
			<?php if($_GET['b'] == 88){ ?>
				<div class="col-12 text-center">
					<a class="blue-bt" style="margin-top: 6px; margin-left:5px" href="https://m.me/367966470078831?ref=kh_pbm">ĐĂNG KÝ NHẬN QUÀ MIỄN PHÍ</a>
				</div>
				<style>.blue-bt{background: #0080f7;color: #fff;display: inline-block;padding: 0.7rem 2.3rem}.blue-bt:hover{color: #fff}</style>
			<?php } ?>
		</div>
	</div>
</main>

<?php
date_default_timezone_set('Asia/Ho_Chi_Minh');
$filename = $bus.'-'.date('d-m-Y').'.txt';
$time = date('Y-m-d H:i:s');
$filename = "log/$filename";
$link = $_SERVER["HTTP_REFERER"];
if($link !==''){
	if (file_exists($filename)) {
	    $txt = "[$time] - $link";
		$myfile = file_put_contents($filename, $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
	} else {
		$myfile = fopen($filename, "w") or die("Unable to open file!");
		$txt = "[$time] - $link";
		$myfile = file_put_contents($filename, $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
		fclose($myfile);
	}
}
?>

<script>
	$(document).ready(function(){
		$("#body").css({paddingTop: $("#navv").height() + "px"});
		$("#body").css({width: $(window).width() + "px"});
	});
	$(window).resize(function(){
		$("#body").css({paddingTop: $("#navv").height() + "px"});
		$("#body").css({width: $(window).width() + "px"})
	});
	  var $hamburger = $(".hamburger");
	  $hamburger.on("click", function(e) {
		$hamburger.toggleClass("is-active");
		$("#sub-menu").toggleClass("hide-nav");
	  });

	$(document).ready(function(){
		var urlrdr = '<?php echo $_SERVER['HTTP_REFERER']; ?>';
		urlrdr = encodeURIComponent(urlrdr).replace(/%20/g,'+');
		var dataJson = '{"bus": "<?php echo $bus; ?>", "link": "'+urlrdr+'", "order": "<?php echo $_GET['code']; ?>", "ref": "<?php echo $_GET['ref']; ?>"}';
		var urlApi = 'http://log.lazishop.com:8902/complete/data';
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
				console.log('Ghi log trang cảm ơn thành công!');
			}else{
				console.log('Ghi log trang cảm ơn không thành công!');
			}
			
		}
		});
	});
</script>


<?php if(isset($_GET['px'])){
$pxstring = $_GET['px'];
if (preg_match('/\,/',$pxstring)) {

$pxl = explode(',', $pxstring); ?>

<!-- Facebook Pixel Code x-->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
 <?php foreach ($pxl as $idvalue) { ?>fbq('init', '<?php echo $idvalue; ?>');<?php } ?>
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=<?php echo $idvalue; ?>&ev=PageView&noscript=1"
/></noscript>
<script>
		fbq('track', 'AddToCart');
        fbq('track', 'CompleteRegistration');
</script>
<!-- End Facebook Pixel Code x -->

<?php }else{ ?>

	<!-- Facebook Pixel Code df -->
	<script>
	  !function(f,b,e,v,n,t,s)
	  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	  n.queue=[];t=b.createElement(e);t.async=!0;
	  t.src=v;s=b.getElementsByTagName(e)[0];
	  s.parentNode.insertBefore(t,s)}(window, document,'script',
	  'https://connect.facebook.net/en_US/fbevents.js');
	  fbq('init', '<?php echo $_GET['px']; ?>');
	  fbq('track', 'PageView');
	</script>
	<noscript><img height="1" width="1" style="display:none"
	  src="https://www.facebook.com/tr?id=<?php echo $_GET['px']; ?>&ev=PageView&noscript=1"
	/></noscript>
	<script>
		fbq('track', 'AddToCart');
        fbq('track', 'CompleteRegistration');
	</script>
	<!-- End Facebook Pixel Code -->

<?php } ?>

<?php } ?>

</body>
</html>
