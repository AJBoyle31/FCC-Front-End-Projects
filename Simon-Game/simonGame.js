//https://s3.amazonaws.com/freecodecamp/simonSound1.mp3
//https://s3.amazonaws.com/freecodecamp/simonSound2.mp3
//https://s3.amazonaws.com/freecodecamp/simonSound3.mp3
//https://s3.amazonaws.com/freecodecamp/simonSound4.mp3

//					regular		light
//paddle a:		#cc0000	#ff6666
//paddle b:		#0000ff		#6666ff
//paddle c:		#008000	#33ff33
//paddle d:		#cccc00	#ffff66



var counter = 0; //keep track of the number of steps
var moves = []; //keep track of the previous moves
var allPaddles = $('#a, #b, #c, #d');
var index = 0;
var id = '';
var color = '';
var power = false;
var startgame = false;
var strictgame = false;

//function to keep track of the counter, update the counter timer, get a random paddle letter, push that letter to the moves array, then call previousMoves function with the new paddle
function paddleStep() {	
	allPaddles.css('pointer-events', 'none');
  if (counter == 20) {
    alert('Congrats, you win!');
    return;
  }
  counter++;
	$('#counter').text(counter);
	var letter = '';
	letter = randomPaddle();
	moves.push(letter);
	previousMoves(index); //lights up the previous moves
	
};


//function that will choose a random number, that number will be converted to the appropriate letter associated with each paddle
function randomPaddle() {
	var randomLetter = '';
	var randomNumber = Math.floor((Math.random() * 4) + 1);  //random number between 1 and 4
	switch (randomNumber) {
		case 1:
			randomLetter = 'a';
			break;
		case 2:
			randomLetter = 'b';
			break;
		case 3:
			randomLetter = 'c';
			break;
		case 4:
			randomLetter = 'd';
			break;
	}
	return randomLetter;

};


function lightPaddle(paddleLetter) {		//lights up the specific paddle
	
  switch (paddleLetter) {
		case 'a':
			$('#a').css('background','#ff6666');
      $('#paddle1')[0].play();
			setTimeout(function() {$('#a').css('background','#cc0000'); }, 500); 
			break;
      
		case 'b':
			$('#b').css('background','#6666ff');
      $('#paddle2')[0].play();
			setTimeout(function() {$('#b').css('background','#0000ff'); }, 500);
			break;
	
    case 'c':
			$('#c').css('background','#33ff33');
      $('#paddle3')[0].play();
			setTimeout(function() {$('#c').css('background','#008000'); }, 500);
			break;
		
    case 'd':
			$('#d').css('background','#ffff66');
      $('#paddle4')[0].play();
			setTimeout(function() {$('#d').css('background','#cccc00'); }, 500);
			break;
	}

};

//function to call the lightPaddle function with the correct moves index. the movesIndex function is called on a delay after the lightPaddle funciton has had time to run
function previousMoves(index) {
	lightPaddle(moves[index]);
	setTimeout(movesIndex, 1000);
	
};

//function to increase the index variable by one, and then call the previousMoves function. if the index variable is greater than the moves array then all previous moves have been lit.
function movesIndex() {
	index++;
	if (index >= moves.length) {
		index = 0;
		allPaddles.css('pointer-events', 'auto');
    return;
	}
	else {
		previousMoves(index);
	}
	
};

function resetGame() {
  counter = 0;
  $('#counter').text('');
  moves = [];
  startgame = false;
  strictgame = false;
  allPaddles.css('pointer-events', 'none');	
  $('#start, #strict').css('background', 'yellow');
};




//how to check if the user inputs are correct
$(document).ready(function(){
	
  allPaddles.css('pointer-events', 'none');	
  
  $('#onoff').click(function() {
		if (!power) {
		  power = true;
		  $('#counter').text('- -'); 
      $('#onoff').css({'background': 'white', 'color': 'black', });
    }
    else {
      power = false;
      $('#onoff').css({'background': 'black', 'color': 'white', });
      resetGame();
    }
  });
  
	$('#start').click(function() {
		if (!startgame){
      resetGame();
      startgame = true;
      $('#start').css('background', 'green');
      paddleStep();  
    }
    else {
      resetGame();
      startgame = true;
      paddleStep();
    }
  });
  
  $('#strict').click(function() {
    if (!strictgame){
      resetGame();
      strictgame = true;
      $('#strict').css('background','green');
      paddleStep();
    }
    else {
      resetGame();
      strictgame = true;
      paddlestep();
    }
  });
		
	
	$('.paddles').on('mousedown', function(){
		
		id = $(this).attr('id');
		color = $(this).css('background-color');
		
		switch (id) {
			case 'a':
				$('#a').css('background','#ff6666');
        $('#paddle1')[0].play();
				break;
        
			case 'b':
				$('#b').css('background','#6666ff');
        $('#paddle2')[0].play();
				break;
        
			case 'c':
				$('#c').css('background','#33ff33');
        $('#paddle3')[0].play();
				break;
        
			case 'd':
				$('#d').css('background','#ffff66');
        $('#paddle4')[0].play();
				break;
	}
	
}).on('mouseup', function() {
		$('#' + id).css('background', color);
    
    if (id != moves[index]) {
			if (startgame){
        index = 0;
			  previousMoves(index);
      }
      else {
        index = 0;
        resetGame();
        $('#strict').css('background','green');
        strictgame = true;
      }
		}
    else {
		index++;
    }
    
    if (index >= moves.length) {
			index = 0;
			setTimeout(paddleStep, 500);
		}
	});
	
});
