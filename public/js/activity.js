var score = 0;
var counter = 1;
var rotation = 0;
var lastImageCounter = 34;

var rotationDegrees = [
  22.5,
  67.5,
  112.5,
  157.5,
  202.5,
  247.5,
  292.5,
  337.5
]

// Randomize animals and degrees
// Timer won't start until trial 3
// Show indication if they're correct on the first 2
// The degree rotation should 2 per item in the list
// 16 inverted, 16 mirror
// Different animals for pre and post
// Add description for cat


// Frequency should normalized

// Prime Number Checker
function isPrime(number) {
    var start = 2;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}

// Next Item Selector
function nextItem() {
  // var imageSource = $('.control-image').attr('src');
  // console.log(counter);
  // public/img/game01.png

  counter += 1;

  if(counter >= lastImageCounter) {
    counter = lastImageCounter;

    $('#game-title').html('Good Job!')
    $('#test-body').html('<center><img src="/public/img/game/100.png" class="img-responsive"/><a href="/"><br><button type="button" class="btn btn-lg btn-o btn-w btn-dark">Done</button></a></center>');
  }

  $('.control-image').attr('src', '/public/img/game/'+ counter + '.png');
  $('.test-image').attr('src', '/public/img/game/'+ counter + '.png');

  rotation = Math.floor((Math.random() * 360) + 1);

  if(isPrime(counter)) {
    rotation = 0;
  }

  $('.test-image').css('transform', 'rotate(' + rotation + 'deg)');

  $('#instructions').html('<center><span class="inside-title">Are they the same or not?</span></center>');
  $('#test-title').html('Test');

  console.log(counter);
}

function clickSame() {
  if(rotation == 0) {
    score += 10;
    console.log(score);
  } else {
    score -= 10;
    console.log(score);
  }

  nextItem();
}

function clickDiff() {
  if(rotation != 0) {
    score += 10;
    console.log(score);
  } else {
    score -= 10;
    console.log(score);
  }

  nextItem();
}

// // record start time
// var startTime;
//
// function display() {
//   // later record end time
//   var endTime = new Date();
//
//   // time difference in ms
//   var timeDiff = endTime - startTime;
//
//   // strip the miliseconds
//   timeDiff /= 1000;
//
//   // get seconds
//   var seconds = Math.round(timeDiff % 60);
//
//   // remove seconds from the date
//   timeDiff = Math.floor(timeDiff / 60);
//
//   // get minutes
//   var minutes = Math.round(timeDiff % 60);
//
//   // remove minutes from the date
//   timeDiff = Math.floor(timeDiff / 60);
//
//   // get hours
//   var hours = Math.round(timeDiff % 24);
//
//   // remove hours from the date
//   timeDiff = Math.floor(timeDiff / 24);
//
//   // the rest of timeDiff is number of days
//   var days = timeDiff;
//
//   // $('.time').text(days + ' days, ' + hours + ':' + minutes + ':' + seconds);
//   console.log(days + ' days, ' + hours + ':' + minutes + ':' + seconds);
//   setTimeout(display, 1000);
// }
//
// $('#start-test').click(function () {
//   startTime = new Date();
//   setTimeout(display, 1000);
// });
