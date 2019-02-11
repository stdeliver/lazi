<!DOCTYPE HTML>
<html lang='en-US'>
<head>
	<meta charset='UTF-8'>
	<title>Demo</title>
</head>
<body>
	<h1>Cảm ơn bạn đã đặt hàng thành công!</h1>
	<?php if(isset($_GET['px'])){ ?>
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
		  fbq('track', 'AddToCart');
		</script>
		<noscript><img height="1" width="1" style="display:none"
		  src="https://www.facebook.com/tr?id=<?php echo $_GET['px']; ?>&ev=PageView&noscript=1"
		/></noscript>
	<?php } ?>
</body>
</html>