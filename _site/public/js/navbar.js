/* Navbar Scrollspy */
var start = $('.scrollspyhook').offset().top - 50;

$(document).scroll(function(){
  if($(this).scrollTop() > start) {
    // $('.custom-navbar').animate({'backgroundColor': 'red'}, 'slow');
    $('.mg-navbar').css({'opacity' : 1});
    $('.mg-navbar-wide').css({
      'opacity' : 1,
      'background' : '#ce0b7b'
    });
  } else {
    $('.mg-navbar').css({'opacity' : 0});
    $('.mg-navbar-wide').css({
      'opacity' : 1,
      'background' : 'transparent'
    });
  }
});

$('body').scrollspy({ target: '#mg-navbar-target' });
