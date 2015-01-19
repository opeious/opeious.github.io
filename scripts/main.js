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

