//need to add a sound when timer is up
//var tone = some link to an mp3 or wav file
//var audio = new Audio(tone);
//audio.play();

//timer will hold the setInterval function. this variable will be used to stop the timer when the stop button is pressed
var timer;
//the totalSecondsWork and totalSecondsBreak will hold the work minutes and break minutes converted from minutes to seconds respectively. will be used in the work and break countdown functions
var totalSecondsWork;
var totalSecondsBreak;
//breakLength and workLength are the user selected minutes for break and work respectively. these are defaulted to 5 and 25 respectively which is what is shown when the page is first loaded.
var breakLength = 5;
var workLength = 25;
//workCountdown and breakCountdown booleans will be used to execute the correct setInterval when start is clicked and also when resume is clicked.
var workCountdown = false;
var breakCountdown = false;

//setTimer function will take the user entered break and work lengths, convert them into seconds and store them in the totalSecondsWork & totalSecondsBreak variables, change the workCountdown to true and then call the workOrBreak function which will determine which setInterval will execute.
function setTimer(workLength, breakLength) {
  
  if (workCountdown == true || breakCountdown ==true){    
  }
  
  else {
  $("#title").text("Time to Work");
  totalSecondsWork = (workLength * 60);
  totalSecondsBreak = (breakLength * 60);
  workCountdown = true;
  breakCountdown = false;
  workOrBreak();
  }
};

//workOrBreak function will decide which setInterval to execute; startWork or startBreak based upon their respective boolean variable. 
function workOrBreak() {
  if (workCountdown) {
    timer = setInterval(startWork, 1000);
  }
  if (breakCountdown) {
    timer = setInterval(startBreak, 1000);
  }
};

//startWork function changes the timer heading, sets the work background, and decreases the totalseconds by one. If the totalseconds are 0, then the timer is stopped, work boolean is changed to false, break boolean is changed to true and the workOrBreak function is called to start the break countdown. If the totalseconds are greater than 0, then the variable m holds the minutes left on the timer, the variable s holds the seconds (an if statement checks to see if the seconds digit is less than 10 and if it is, adds a 0 to the front of the digit) and then the remaining time is displayed.
function startWork() {
  $("#title").text("Time to Work");
  $('body').css('background-image', 'url(http://glamox.com/upload/2013/09/23/pharmaceutical-office-hq_dublin_meetingroom1.jpg)');
  totalSecondsWork--;
  if (totalSecondsWork === 0){
    clearInterval(timer);
    workCountdown = false;
    breakCountdown = true;
    workOrBreak();
  }
  var m = Math.floor(totalSecondsWork / 60);
  var s = totalSecondsWork % 60;
  if (s < 10){
    s = "0" + s;
  }
  $('#countdown').text(m + ":" + s);
};


//startBreak function changes the timer heading, sets the break background, and decreases the totalseconds by one. If the totalseconds are 0, then the timer is stopped, work boolean is changed to true, break boolean is changed to false and the workOrBreak function is called to start the work countdown. If the totalseconds are greater than 0, then the variable m holds the minutes left on the timer, the variable s holds the seconds (an if statement checks to see if the seconds digit is less than 10 and if it is, adds a 0 to the front of the digit) and then the remaining time is displayed.
function startBreak() {
  $("#title").text("BREAK TIME");
  $('body').css('background-image', 'url(http://dreamatico.com/data_images/beach/beach-6.jpg)');
  totalSecondsBreak--;
  if (totalSecondsBreak === 0){
    clearInterval(timer);
    breakCountdown = false;
    setTimer(workLength, breakLength);
  }
  var m = Math.floor(totalSecondsBreak / 60);
  var s = totalSecondsBreak % 60;
  if (s < 10){
    s = "0" + s;
  }
  $('#countdown').text(m + ":" + s);
};

//resetValues function is used when the user changes the break or work lengths. it shows the start button to start the timer, hides the resume button, changes the title and background to the work values
function resetValues() {
    $("#start").show();
    $("#resume").hide();
    $("#title").text("Time to Work");
    $('body').css('background-image', 'url(http://glamox.com/upload/2013/09/23/pharmaceutical-office-hq_dublin_meetingroom1.jpg)');
};

//when the break length increase button is clicked, it first checks to see if either of the countdown timers are running, if they are then nothing happens and the function returns. if the timer is stopped then the resetValues function is called, breakLength is increased and displayed.
$("#breakPlus").click(function(){
    if (workCountdown == true || breakCountdown == true){
      return;
    }
    resetValues();
    breakLength++;
    $('#breakLength').html(breakLength);
  });
  
//when the break length decrease button is clicked, it first checks to see if either of the countdown timers are running, if they are then nothing happens and the function returns. if the timer is stopped then the resetValues function is called, breakLength is decreased and displayed. and addition if statement is used to make sure the user can't enter a timer value lower than 1. 
  $("#breakMinus").click(function(){
    if (workCountdown == true || breakCountdown == true){
      return;
    }
    resetValues();
    breakLength--;
    if (breakLength < 1) {
      breakLength = 1;
    }
    $('#breakLength').html(breakLength);
  });
  
 //when the work length increase button is clicked, it first checks to see if either of the countdown timers are running, if they are then nothing happens and the function returns. if the timer is stopped then the resetValues function is called, worklength is increased and displayed.
  $("#workPlus").click(function(){
    if (workCountdown == true || breakCountdown == true){
      return;
    }
    resetValues();
    workLength++;
    $(".workLength").html(workLength);
  });
  
//when the work length decrease button is clicked, it first checks to see if either of the countdown timers are running, if they are then nothing happens and the function returns. if the timer is stopped then the resetValues function is called, workLength is decreased and displayed. and addition if statement is used to make sure the user can't enter a timer value lower than 1. 
  $("#workMinus").click(function(){
    if (workCountdown == true || breakCountdown == true){
      return;
    }
    resetValues();
    workLength--;
    if (workLength < 1) {
      workLength = 1;
    }
    $(".workLength").html(workLength);
  });
  
//when the user clicks the start button, the setTimer function is called, the start button is hidden and the stop button appears
  $("#start").click(function(){
    setTimer(workLength, breakLength);
    $("#start").hide();
    $("#stop").show();
  });

//when the stop button is clicked, both work and break countdown booleans are set to false, the timer is stopped, the stop button is hidden and the resume button appears. 
$("#stop").click(function(){
  workCountdown = false;
  breakCountdown = false;
  clearInterval(timer);
  $("#stop").hide();
  $("#resume").show();
});

//when the resume button is clicked, the resume button is hidden, the stop button appears, and then an if statement evaluates the status of the totalSecondsWork variable to decide which timer needs to be restart.
$("#resume").click(function(){
  $("#resume").hide();
  $("#stop").show();
  if (workLength * 60 > totalSecondsWork && totalSecondsWork != 0){
    workCountdown = true;
    workOrBreak();
  }
  else {
    breakCountdown = true;
    workOrBreak();
  }
    
});
