jQuery( document ).ready( function() {
  moment().utcOffset("+07:00");
  // Đặt thời gian chạy.
  var num = vn_time.thoigian;
  var numx = vn_time.thoigian;
  console.log('numxzlxc ='+num);
  var now2 = moment();
  var nwday2 = moment().format('YYYY-MM-DD');
  var currentday2 = moment( nwday2 + " 00:00:00"  );
  var localTime2 = moment(currentday2).add(num,'hours'); 
  if( localTime2 - now2 <= 0 )
   {
    num = num + numx;
   }
   
   
  var now3 = moment();
  var nwday3 = moment().format('YYYY-MM-DD');
  var currentday3 = moment( nwday3 + " 00:00:00"  );
  var localTime3 = moment(currentday3).add(num,'hours'); 
  if( localTime3 - now3 <= 0 )
   {
    num = num + numx;
   }
   
   var now4 = moment();
  var nwday4 = moment().format('YYYY-MM-DD');
  var currentday4 = moment( nwday4 + " 00:00:00"  );
  var localTime4 = moment(currentday4).add(num,'hours'); 
  if( localTime4 - now4 <= 0 )
   {
    num = num + numx;
   }
  console.log('numxcv ='+num);
  
  countDown();
  var countdown = setInterval(countDown, 1000);
  function countDown()
  {
  var now = moment();
  var nwday = moment().format('YYYY-MM-DD');
  var currentday = moment( nwday + " 00:00:00"  );
  var localTime = moment(currentday).add(num,'hours'); 
   var _widget = document.getElementById( 'timer-widget-' + 2555);
   var days_elem =  _widget.getElementsByClassName( 'days' )[0].getElementsByTagName( 'span' )[0];
   var hours_elem =  _widget.getElementsByClassName( 'hours' )[0].getElementsByTagName( 'span' )[0];
   var minutes_elem =  _widget.getElementsByClassName( 'minutes' )[0].getElementsByTagName( 'span' )[0];
   var seconds_elem =  _widget.getElementsByClassName( 'seconds' )[0].getElementsByTagName( 'span' )[0];
   var delta =   Math.abs( localTime - now ) / 1000;
   var days = 0;
   var hours = 0;
   var minutes = 0;
   var seconds = 0;
                      
   if( localTime - now <= 0 )
   {
    num = num + numx;
   }
   else
   {
    days = Math.floor( delta / 86400 );
    delta -= days * 86400;                       
    hours = Math.floor( delta / 3600 ) % 24;                     
    delta -= hours * 3600;                     
    minutes = Math.floor( delta / 60 ) % 60;
    delta -= minutes * 60;
    seconds = Math.floor( delta % 60 );
   }
   days_elem.innerHTML =   formatDigits( days, 2 );
   hours_elem.innerHTML =   formatDigits( hours, 2 );
   minutes_elem.innerHTML =  formatDigits( minutes, 2 );
   seconds_elem.innerHTML =  formatDigits( seconds, 2 );
   function formatDigits( value, digits_number )
   {
    if ( value.toString().length < digits_number )
    {
     return ( new Array( digits_number - value.toString().length + 1 ).join( '0' ) ) + value;
    }
    else
    {
     return value;
    }
   }
  }
 });