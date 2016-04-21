var score = 0;
var counter = 1;
var rotation = 0;
var lastImageCounter = 34;
var startTime;
var endTime;
var itemValue;
var isFlipped;

var rotationDegrees = [
  22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5,
  22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5,
  22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5,
  22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5
]

var flipOptions = [
  1, 0, 1, 0, 1, 0, 1, 0,
  1, 0, 1, 0, 1, 0, 1, 0,
  1, 0, 1, 0, 1, 0, 1, 0,
  1, 0, 1, 0, 1, 0, 1, 0
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

// Initial
// var initialSource =  $('.test-image').attr('src');
// if(initialSource == 'public/img/1.png') {
//   $('.test-image').css('transform', 'rotate(' + 22.5 + 'deg)');
// }


// Prime Number Checker
// function isPrime(number) {
//     var start = 2;
//     while (start <= Math.sqrt(number)) {
//         if (number % start++ < 1) return false;
//     }
//     return number > 1;
// }

if(counter == 1) {
  $('.test-image').css({
    'transform' : 'rotate(' + (360 - 22.5) + 'deg)'
  });
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
    $('#test-container').html(`
      <div>
        <p>Now that you understand the game let’s do some more. Remember, <b>SAME</b> means it’s the exact same picture, only rotated, <b>MIRROR IMAGE</b> means it’s a mirror image of the first picture. You’re now going to see many other animals. For each animal you have to decide if the two pictures are the same or different. Use the mouse to move to the buttons of either SAME or DIFFERENT. When you finish each animal, a new animal will appear. You cannot change your mind about your choices. Try to work as fast as you can. You may see the same animals again, but think carefully and quickly each time if the pictures are the same or different.</p>

        <p>Click <b>START</b> to begin the game.</p>

      </div>

      <div class="row">
        <div class="col-md-12">
          <center>
            <button id="start-test" type="button" class="btn btn-lg btn-o btn-w btn-dark" onclick="startTest()">Start</button>
          </center>
        </div>
      </div>

      <div class="row"></div>
    `);

    startTime = new Date();
  }

  if(counter > 2) {
    rotationIndex = Math.floor((Math.random() * rotationDegrees.length) + 1);
    flipIndex = Math.floor((Math.random() * flipOptions.length) + 1);

    if(flipOptions[flipIndex] == 1) {
      rotation = 0;
      isFlipped = true;

      $('.test-image').css({
        'transform' : 'rotate(' + (360 - rotationDegrees[rotationIndex]) + 'deg) scaleX(-1)',
        'filter': 'flipH'
      });

    } else {
      $('.test-image').removeClass('flip');

      $('.test-image').css({
        'transform' : 'rotate(' + (360 - rotationDegrees[rotationIndex]) + 'deg)'
      });

      isFlipped = false;
    }

    rotationDegrees.splice(rotationIndex, 1);
    flipOptions.splice(flipIndex, 1);
    console.log('rotationIndex: ' + rotationIndex);
    console.log('Removed: ' + rotationDegrees[rotationIndex]);
    console.log('Array: ');
    console.log(rotationDegrees);

    console.log('flipIndex: ' + flipIndex);
    console.log('Removed: ' + flipOptions[flipIndex]);
    console.log('Array: ');
    console.log(flipOptions);

    $('#instructions').html('');
  } else {
    $('#instructions').html(`<p>Let's try one more. Are these the same or different?</p><p>Remember, <b>SAME</b> means it’s the same image, just rotated, <b>MIRROR IMAGE</b> means it's as if the animal is looking in the mirror.</p>`);
    $('#wrong-message').html(`Actually, those are mirror images. Do you see how the different cats look in different directions?`);
    $('.test-image').css({
      'transform' : 'rotate(' + (360 - 67.5) + 'deg) scaleX(-1)',
      'filter': 'flipH'
    });
  }


  console.log(counter);
}

function clickSame() {
  if(counter > 2) {
    if(rotation == 0) {
      score += 10;
      itemValue = true;
    } else {
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
      $('#wrong').modal('show');
    } else if (counter == 2) {
      score += 10;
      $('#correct').modal('show');

      nextItem();
    }
  }
}


function startTest() {
  $('#test-container').html(`
    <div class="row">
      <div class="col-md-6">
        <center>
          <img class="control-image" src="/public/img/game/3.png"/>
          <br>
          <!-- <button type="button" class="btn btn-lg btn-o btn-success click" onclick="clickSame()">Same</button> -->
        </center>
      </div>
      <div class="col-md-6">
        <center>
          <img class="test-image" src="/public/img/game/3.png"/>
          <br>
          <!-- <button type="button" class="btn btn-lg btn-o btn-danger click" onclick="clickDiff()">Different</button> -->
        </center>
      </div>
    </div>

    <div class="row">
      <center>
        <button type="button" class="btn btn-lg btn-w btn-o btn-success click" onclick="clickSame()">Same</button>
        <br><br>
        <button type="button" class="btn btn-lg btn-w btn-o btn-danger click" onclick="clickDiff()">Mirror Image</button>
      </center>
    </div>

    <div class="row"></div>
  `);
}
