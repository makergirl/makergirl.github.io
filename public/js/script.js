/* Navbar Scrollspy */
var start = $("#about-us").offset().top;

$(document).scroll(function(){
  if($(this).scrollTop() > start) {
    // $('.custom-navbar').animate({"backgroundColor": "red"}, "slow");
    $('.mg-navbar').css({"display" : "block"});
  } else {
    $('.mg-navbar').css({"display" : "none"});
  }
});

$('body').scrollspy({ target: '#mg-navbar-target' });
