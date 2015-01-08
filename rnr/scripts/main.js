var currImg = 0;
var maxImg = 6;

var init = function() {   
    
  var i =0;
  var images = ['../img/mainbg1.jpg','../img/mainbg2.jpg','../img/mainbg3.jpg','../img/mainbg4.jpg','../img/mainbg5.jpg','../img/mainbg6.jpg','../img/mainbg7.jpg','../img/mainbg.jpg'];
  var image = $('#bgs');

  image.css('background-image', 'url("../img/mainbg.jpg")')
  
  setInterval(function(){  

   image.fadeOut(500, function () {

   image.css('background-image', 'url(' + images [i++] +')');
       
   image.fadeIn(500);

   });

   if(i == images.length)
    i = 0;
  }, 8000);           
 

    

};
