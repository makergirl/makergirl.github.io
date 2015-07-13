/* Smooth Scrolling */
$(function() {
  $('ul.nav a').bind('click',function(event) {
    var $anchor = $(this);

    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1250,'easeInOutExpo');
    event.preventDefault();
  });
});

/* Navbar Scrollspy */
var start = $("#video").offset().top - 50;

$(document).scroll(function(){
  if($(this).scrollTop() > start) {
    // $('.custom-navbar').animate({"backgroundColor": "red"}, "slow");
    $('.mg-navbar').css({"display" : "block"});
  } else {
    $('.mg-navbar').css({"display" : "none"});
  }
});

$('body').scrollspy({ target: '#mg-navbar-target' });
