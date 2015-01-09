function preloader() {
  
    
    <!--//--><![CDATA[//><!--

			if (document.images) {
                
				img0 = new Image();
				img1 = new Image();
				img2 = new Image();
				img3 = new Image();
				img4 = new Image();
				img5 = new Image();
				img6 = new Image();
				img7 = new Image();
                
				img0.src = "../img/mainbg.jpg";
				img1.src = "../img/mainbg1.jpg";
				img2.src = "../img/mainbg2.jpg";
				img3.src = "../img/mainbg3.jpg";
				img4.src = "../img/mainbg4.jpg";
				img5.src = "../img/mainbg5.jpg";
				img6.src = "../img/mainbg6.jpg";
				img7.src = "../img/mainbg7.jpg";
			}
    init();
		//--><!]]>
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}

addLoadEvent(preloader);



var init = function() {
    
  
    document.getElementById("blankBG").style.opacity = 0;
    document.getElementById("blankBG").style.display = "none";
    
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
