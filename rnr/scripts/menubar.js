$(function() {
    var $Nav = $('#menu');
    var $placeholder = $('#placeholder');
    var $window = $(window);
    
    var $contact = $('#first');
    var maxTop = $contact.height();
    window.navFixed = 1;
    var height = $window.height() * .1;
    $window.bind("scroll resize", function() {
        var currentTop = $window.scrollTop();
        //if (window.console) console.log(currentTop);
        //if (window.console) console.log(maxTop);
        if (currentTop <= maxTop && window.navFixed == 0) {
            $Nav.css({
               position:'relative'
            });
            $placeholder.css({
                position:'relative',
                height:0
            });
            window.navFixed = 1;
            //if (window.console) console.log('maxTop');
        } 
        else if (currentTop > maxTop && window.navFixed == 1) {
            //window.scroll(0,currentTop-height);
            $Nav.css({
                position: 'fixed',
                top: 0,
                height: height
            });
            $placeholder.css({
                position:'relative',
                height:'2%'
            });
            window.navFixed = 0; 
        }
        check();
    }).scroll();    
});
function check(){
    var $body = $("body");
    var $window = $(window);
    var currentTop = $window.scrollTop();
    if(currentTop > $("#fifth").offset().top -1)
        {
        $("#menu5").html("<u>EVENTS</u>");
        $("#menu4").html("RATES");
        $("#menu2").html("GAMES");
        $("#menu1").html("ABOUT");
        }
        else if(currentTop > $("#fourth").offset().top -1)
        {
        $("#menu5").html("EVENTS");
        $("#menu4").html("<u>RATES</u>");
        $("#menu2").html("GAMES");
        $("#menu1").html("ABOUT");
        }
        else if(currentTop > $("#third").offset().top -1)
        {
        $("#menu5").html("EVENTS");
        $("#menu4").html("RATES");
        $("#menu2").html("<u>GAMES</u>");
        $("#menu1").html("ABOUT");
        }
        else if(currentTop > $body.height()- (($body.height()*4)/5 )-1)
        {
        $("#menu5").html("EVENTS");
        $("#menu4").html("RATES");
        $("#menu2").html("GAMES");
        $("#menu1").html("<u>ABOUT</u>");
        }
        else{
        $("#menu5").html("EVENTS");
        $("#menu4").html("RATES");
        $("#menu2").html("GAMES");
        $("#menu1").html("ABOUT");
        }
};


$(".arrow").click(function(){
    $.scrollTo($('#menu'), 1000);
    check();
});
$("#menu1").click(function(){
    if(window.navFixed ==1)
        $.scrollTo($('#menu'), 1000);
    else
        $.scrollTo($('#placeholder'), 1000);
    check();
});
$("#menu2").click(function(){
    $.scrollTo($('#third'), 1000);
    check();
});

$("#menu3").click(function(){
    $.scrollTo($('#topofpage'), 1000);
    check();
});

$("#menu4").click(function(){
    $.scrollTo($('#fourth'), 1000);
    check();
});
$("#menu5").click(function(){
    $.scrollTo($('#fifth'), 1000);
    check();
});