/* Navbar Scrollspy */
var start = $("#video").offset().top - 50;

$(document).scroll(function(){
  if($(this).scrollTop() > start) {
    // $('.custom-navbar').animate({"backgroundColor": "red"}, "slow");
    $('.mg-navbar').css({"visibility" : "visible"});
  } else {
    $('.mg-navbar').css({"visibility" : "hidden"});
  }
});

$('body').scrollspy({ target: '#mg-navbar-target' });
