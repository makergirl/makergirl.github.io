var score = 0;
var counter = 1;
var rotation = 0;
var lastImageCounter = 34;
var startTime;
var endTime;
var itemValue;
var isFlipped;

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

var results = [];

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
  counter += 1;

  if(counter >= lastImageCounter) {
    counter = lastImageCounter;

    $('#game-title').html('Good Job!')
    $('#test-body').html('<center><img src="/public/img/game/100.png" class="img-responsive"/><a href="/"><br><button type="button" class="btn btn-lg btn-o btn-w btn-dark">Done</button></a></center>');

    console.log(results);
  }

  $('.control-image').attr('src', '/public/img/game/'+ counter + '.png');
  $('.test-image').attr('src', '/public/img/game/'+ counter + '.png');

  if(counter == 3) {
    startTime = new Date();
  }

  if(counter > 2) {
    index = Math.floor((Math.random() * 8) + 1);

    if(isPrime(counter)) {
      rotation = 0;
      isFlipped = true;
      $('.test-image').addClass('flip');
    } else {
      $('.test-image').removeClass('flip');
      isFlipped = false;
    }

    $('#instructions').html('<center><span class="inside-title">Are they the same or not?</span></center>');
    $('.test-image').css('transform', 'rotate(' + rotationDegrees[index] + 'deg)');
  } else {
    $('#instructions').html("<p>Now, see those cats? Are those the same, or different (mirror image)? Use the mouse to move and click on either SAME or MIRROR IMAGE.</p>");
    $('.test-image').addClass('flip');
  }


  console.log(counter);
}

function clickSame() {
  if(counter > 2) {
    if(rotation == 0) {
      score += 10;
      itemValue = true;
    } else {
      score -= 10;
      itemValue = false;
    }

    endTime = new Date();
    console.log(endTime - startTime);

    results.push({
      'id' : counter,
      'isCorrect' : itemValue,
      'isFlipped' : isFlipped,
      'rotationValue' : rotation,
      'time' : endTime - startTime
    });

    nextItem();
  } else {
    if(counter == 1) {
      score += 10;
      $('#correct').modal('show');

      nextItem();
    } else if (counter == 2) {
      score -= 10;
      $('#wrong').modal('show');
    }
  }
}

function clickDiff() {
  if(counter > 2) {
    if(rotation != 0) {
      score += 10;
      itemValue = true;
    } else {
      score -= 10;
      itemValue = false;
    }

    endTime = new Date();
    console.log(endTime - startTime);

    results.push({
      'id' : counter,
      'isCorrect' : itemValue,
      'isFlipped' : isFlipped,
      'rotationValue' : rotation,
      'time' : endTime - startTime
    });

    nextItem();
  } else {
    if(counter == 1) {
      score += 10;
      $('#wrong').modal('show');
    } else if (counter == 2) {
      score -= 10;
      $('#correct').modal('show');

      nextItem();
    }
  }
}
