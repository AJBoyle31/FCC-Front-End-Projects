//player chooses x or o
  //use an prompt() to ask the user for their choice and store it in a variable
//player goes first selecting one of nine locations
//computer goes next selecting any location which doesn't have an x or o
//continues until someone get three in a row
  //this will be a function that runs after each player plays
//only 9 total moves possible

var player = "";
var computer = ""; //variables that will hold the x's and o's
var winner = '';
var movesLeft = ['a','b','c','d','e','f','g','h','i'];
var a,b,c,d,e,f,g,h,i; 
var whoseTurn;
var computerTurn = false;

//function that will allow the player to select x or o
function pickXorO() {
  
  $("#choice").show();
  
  $(".xO").click(function(){
    player = $(this).text();
    resetBoard();
    
    if (player === "X") {
    computer = "O";
    }
    else {
      computer = "X";
    }
    
    $("#choice").hide();
    
    
  });
};


//function to convert all moves to variables to be checked by gameCheck function
function boardToVariable() {
  a = $("#a").text();
  b = $("#b").text();
  c = $("#c").text();
  d = $("#d").text();
  e = $("#e").text();
  f = $("#f").text();
  g = $("#g").text();
  h = $("#h").text();
  i = $("#i").text();
};

//function to check status of game to see if there is a winner
function gameCheck(whoseTurn) {
  boardToVariable();
  winner = '';
  if (a == b && b == c && c == whoseTurn) { //across top
    winner = $('#a, #b, #c');
    return true;
  }
  else if (d == e && e == f && f == whoseTurn) { //across middle
    winner = $('#d,#e, #f');
    return true;
  }
  else if (g == h && h == i && i == whoseTurn) { //across bottom
    winner = $('#g, #h, #i');
    return true;
  }
  else if (a == d && d == g && g == whoseTurn) { //down left
    winner = $('#a, #d, #g');
    return true;
  }
  else if (b == e && e == h && h == whoseTurn) { //down middle
    winner = $('#b, #e, #h');
    return true;
  }
  else if (c == f && f== i && i== whoseTurn) { //down right
    winner = $('#c, #f, #i');
    return true;
  }
  else if (a == e && e == i && i == whoseTurn) { //diag
    winner = $('#a, #e, #i');
    return true;
  }
  else if (c == e && e == g && g == whoseTurn) { //diag
    winner = $('#c, #e, #g');
    return true;
  }
  
  else {
    return false;
  }
};

//function that runs when the player clicks on an available square. 
function playerMove() {
	whoseTurn = player;
  var id = $(this).attr('id'); 
	$(this).text(player);  //adds the X or O to clicked block
	$(this).css('pointer-events', 'none'); //makes that block unclickable
	
	movesLeft = movesLeft.filter(function(val) {
		return val !== (id); //removes the selected square from the available moves array
	});
  
	 //checks for a winning combination
		if (gameCheck(whoseTurn)) {	//if the checkGame function finds a winning combination, the gamePlaying variable is changed to false which should stop the game
			winner.css('color', 'red');
      alert("You win!");
			resetBoard(); //the game should be reset for the next game
			return;
		}
    else if (movesLeft.length == 0) { //if the movesLeft array is empty, then it must be a draw and the gameCheck didn't return a winner
      alert("It's a draw");
      resetBoard();
      return;
    }
		else {
		computerMove(); //the computer makes a move if there isn't a winner
		}
};

//function that runs after the player makes a move and there isn't a winner or draw from the player move
function computerMove() {
	whoseTurn = computer;
	var cellChoice = computerChoice(); //runs the computerChoice function
	movesLeft = movesLeft.filter(function(val) {
		return val !== cellChoice; //removes the selected square from the array
	});
  
	$('#' + cellChoice).text(computer);
	$('#' + cellChoice).css('pointer-events', 'none');
	
	if (gameCheck(whoseTurn)) { //checks for a winner
		winner.css('color', 'red');
    alert("Computer wins");
    resetBoard();
		return;
	}
  else if (movesLeft.length == 0) { //if no moves are left, game is a draw
      alert("It's a draw");
      resetBoard();
      return;
    }
};

//function that chooses which square the computer will pick
function computerChoice() {
	for (var x = 0; x < movesLeft.length; x++) { //iterates through movesLeft array
		$('#' + movesLeft[x]).text(computer); //adds computers choice to each square
    
		if (gameCheck(whoseTurn)) {          //checks to see if any squares are winners. if they are, then they are returned
			$('#' + movesLeft[x]).empty();
      return movesLeft[x];
		}
    
    $('#' + movesLeft[x]).text(player); //adds players choice to each square
    
		if (gameCheck(player)) {       //checks to see if the player wins on any squares. if there is a winner, then the computer selects that option
			$('#' + movesLeft[x]).empty();
      return movesLeft[x];
		}
    $('#' + movesLeft[x]).empty();
	}
  //if there aren't any winners, then the computer chooses a random square
  var randomNumber = Math.floor(Math.random() * (movesLeft.length - 1));
  return movesLeft[randomNumber];
};

//function to reset the board after a winner or draw. 
function resetBoard() {
	movesLeft = ['a','b','c','d','e','f','g','h','i'];
  $('.box').css('pointer-events', 'auto');
  $('.box').css('color', 'black');
	$('.box').empty();
  if (computerTurn) {
    computerMove();
    computerTurn = false;
  }
  else {
    computerTurn = true;
  }
};  



$(document).ready(function() {
	pickXorO();
	$('.box').click(playerMove);
  $('#reset').click(function() {
    resetBoard();
  });
  $('#repick').click(function() { //THIS DOESN'T WORK
    resetBoard();
    pickXorO();
  });
});
