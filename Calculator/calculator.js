//User Story: I can add, subtract, multiply and divide two numbers.

//User Story: I can clear the input field with a clear button.

//User Story: I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output.

//use the eval() function to get "2+2" to equal 4

var result = $("#result");
var num = "";
var answer;
var input = "";

function showResult() {
  answer = eval(num);
  result.text(answer);
  num = "";
}

$(document).ready(function() {
  $("td").click(function(){
    input = $(this).text();
    
    if (input == "="){
      showResult();
    }
    
    else if (input === "AC"){
      num = "";
      result.text(num);
    }
    
    else if (input === "CE"){
      num = num.slice(0,-1);
      result.text(num);
    }
    
    else if (input === "%"){
      num *= .01;
      result.text(num);
    }
       
    else {
    num += $(this).text();
    result.text(num);
    }
  })
  
  $(document).keypress(function(e){
    if(e.which == 13) {
      showResult();
    }
    else if (e.which == 48) {
      num += 0;
      result.text(num);
    }
    else if (e.which == 49) {
      num += 1;
      result.text(num);
    }
    else if (e.which == 50) {
      num += 2;
      result.text(num);
    }
    else if (e.which == 51) {
      num += 3;
      result.text(num);
    }
    else if (e.which == 52) {
      num += 4;
      result.text(num);
    }
    else if (e.which == 53) {
      num += 5;
      result.text(num);
    }
    else if (e.which == 54) {
      num += 6;
      result.text(num);
    }
    else if (e.which == 55) {
      num += 7;
      result.text(num);
    }
    else if (e.which == 56) {
      num += 8;
      result.text(num);
    }
    else if (e.which == 57) {
      num += 9;
      result.text(num);
    }
    else if (e.which == 43) {
      num += "+";
      result.text(num);
    }
    else if (e.which == 45) {
      num += "-";
      result.text(num);
    }
    else if (e.which == 42) {
      num += "*";
      result.text(num);
    }
    else if (e.which == 47) {
      num += "/";
      result.text(num);
    }
    else if (e.which == 46) {
      num += ".";
      result.text(num);
    }
  })
  
  
})
