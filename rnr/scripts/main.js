var currImg = 0;
var maxImg = 6;

var init = function() {          
  var i =0;
  var images = ['../img/mainbg1.jpg','../img/mainbg2.jpg','../img/mainbg.jpg'];
  var image = $('#bgs');

  image.css('background-image', 'url(image1.png)');
  
  setInterval(function(){  

   image.fadeOut(10, function () {

   image.css('background-image', 'url(' + images [i++] +')');
       
    console.log('changed');

   image.fadeIn(10);

   });

   if(i == images.length)
    i = 0;
  }, 2000);           
 };
