var flipper=1;

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

function flip(){
    if(flipper==1)
    {
        document.getElementById("flipped1").style.display = "none";
        document.getElementById("flipped2").style.display = "block";
        
        flipper=0;
    }
    else{
        
     
        document.getElementById("flipped2").style.display = "none";
        document.getElementById("flipped1").style.display = "block";
        
        
        
        
        
        flipper=1;
    }
}

function preloader(){
    
     moveProgressBar();
    // on browser resize...
    $(window).resize(function() {
        moveProgressBar();
    });

    // SIGNATURE PROGRESS
    function moveProgressBar() {
        var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
        var getProgressWrapWidth = $('.progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        var animationLength = 2500;
        
        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar').stop().animate({
            left: progressTotal
        }, animationLength);
    }
    
    
    
    
    
    
    
    
    
  
    
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

var im=0; 
var image;
var images = ['../img/mainbg1.jpg','../img/mainbg2.jpg','../img/mainbg3.jpg','../img/mainbg4.jpg','../img/mainbg5.jpg','../img/mainbg6.jpg','../img/mainbg7.jpg','../img/mainbg.jpg'];



var init = function() {
    
  
    document.getElementById("blankBG").style.opacity = 0;
    document.getElementById("blankBG").style.display = "none";
    
  image = $('#bgs');
  image.css('background-image', 'url("../img/mainbg.jpg")')
  
  setInterval(function(){  

   image.fadeOut(500, function () {

   image.css('background-image', 'url(' + images [im++] +')');
   if(im >= images.length)
    im = 0;      
   image.fadeIn(500);

   });


  }, 8000);           
 

    

};

function rightImg()
{
   image.fadeOut(500, function () {

   image.css('background-image', 'url(' + images [im] +')');
   im++;
       
   if(im >= images.length)
    im = 1;
   image.fadeIn(500);

   });

    
}

function leftImg()
{
   image.fadeOut(500, function () {

   image.css('background-image', 'url(' + images [im] +')');
       im--;
          if(im <= 0)
    im = images.length-1;
   image.fadeIn(500);

   });


    
}















(function(){
    //get the background-color for each tile and apply it as background color for the cooresponding screen
    $('.tile').each(function(){
        var $this= $(this),
            page = $this.data('page-name'),
            bgcolor = $this.css('background-color'),
            textColor = $this.css('color');
            
            //if the tile rotates, we'll use the colors of the front face
            if($this.hasClass('rotate3d')) {
              frontface = $this.find('.front');
              bgcolor = frontface.css('background-color');
              textColor = frontface.css('color');
            }

            //if the tile has an image and a caption, we'll use the caption styles
            if($this.hasClass('fig-tile')) {
              caption = $this.find('figcaption');
              bgcolor = caption.css('background-color');
              textColor = caption.css('color');
            }

        $this.on('click',function(){
          $('.'+page).css({'background-color': bgcolor, 'color': textColor})
                     .find('.close-button').css({'background-color': textColor, 'color': bgcolor});
        });
    });

	  function showDashBoard(){
      for(var i = 1; i <= 3; i++) {
        $('.col'+i).each(function(){
            $(this).addClass('fadeInForward-'+i).removeClass('fadeOutback');
        });
      }
    }

    function fadeDashBoard(){
      for(var i = 1; i <= 3; i++) {
        $('.col'+i).addClass('fadeOutback').removeClass('fadeInForward-'+i);
      }
    }
  
    
  //listen for when a tile is clicked
  //retrieve the type of page it opens from its data attribute
  //based on the type of page, add corresponding class to page and fade the dashboard
  $('.tile').each(function(){
    var $this= $(this),
        pageType = $this.data('page-type'),
        page = $this.data('page-name');
        
    $this.on('click',function(){
      if(pageType === "s-page"){
          fadeDashBoard();
          $('.'+page).addClass('slidePageInFromLeft').removeClass('slidePageBackLeft');
        }
        else{
          $('.'+page).addClass('openpage');
          fadeDashBoard();
        }
    });
  });

  //when a close button is clicked:
  //close the page
  //wait till the page is closed and fade dashboard back in
  $('.r-close-button').click(function(){
      $(this).parent().addClass('slidePageLeft')
          .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                $(this).removeClass('slidePageLeft').removeClass('openpage');
              });
      showDashBoard();
  });
  $('.s-close-button').click(function(){
      $(this).parent().removeClass('slidePageInFromLeft').addClass('slidePageBackLeft');
      showDashBoard();
  });

})();


  $(document).ready(function () {

        // you want to enable the pointer events only on click;

        $('#map_canvas1').addClass('scrolloff'); // set the pointer events to none on doc ready
        $('#canvas1').on('click', function () {
            $('#map_canvas1').removeClass('scrolloff'); // set the pointer events true on click
        });

        // you want to disable pointer events when the mouse leave the canvas area;

        $("#map_canvas1").mouseleave(function () {
            $('#map_canvas1').addClass('scrolloff'); // set the pointer events to none when mouse leaves the map area
        });
    });