//url variable to hold the url needed to call the api. This will make it easier to set up the .getJSON method when calling the api. the url was copied from the forismatic website. 
var url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

//names a function called getQuote which will be the function that is run when the api is called and information is returned.
var getQuote = function(data) {
  //some quotes do not have authors attributed to them, the if statement will identify those quotes and assign the string anonymous for those authors.
  if (data.quoteAuthor === '') {
    data.quoteAuthor = "Anonymous";
  }
  //the quote and author are then set to their respective elements in the html. quotation marks are added to the quote and a dash for the author. 
  $('#quote').text('"' + data.quoteText + '"');
  $('#author').text("- " + data.quoteAuthor);
  
  
  //information regarding the twitter button was found at https://dev.twitter.com/web/tweet-button/web-intent
  
  //quoteAndAuthor variable is used to store the full string which will be used in an if statement to determine whether or not the quote and author exceed the 140 character limit.
  var quoteAndAuthor = data.quoteText + ' - ' + data.quoteAuthor;
  
   
 //if statment to determine whether or not the full quote and author will fit in a tweet. if the variable quoteAndAuthor length is longer than 140 characters, adjustments are made to the quote.
 if (quoteAndAuthor.length > 140) {
    //variable removalNumber stores how many letters need to be sliced off the end of the quote. extra spaces are removed for the ...". this number needs to be negative in order for the slice method to work on the next variable. 
    var removalNumber = (135 - quoteAndAuthor.length);
    //variable quote will store the sliced quoteText with ... added to the end
    var quote = data.quoteText.slice(0,removalNumber) + '...';
    //the button with class twitter sets the property href to the appropriate weblink
    $(".twitter").prop("href", "https://twitter.com/intent/tweet?text=" + quote + " - " + data.quoteAuthor);
  }
  //if the quoteAndAuthor length was less than 140 characters, the below executes
  else {
    //the button with class twitter sets the property href to the appropriate weblink 
    $(".twitter").prop("href", 'https://twitter.com/intent/tweet?text=' +  data.quoteText + " - " + data.quoteAuthor);
  }
  
};

$(document).ready(function() {
  //calls the api using the url variable and getQuote function
  $.getJSON(url, getQuote);
  
  //when the button with id button is clicked, the .getJSON method is run
  $('.button').click(function() {
    $.getJSON(url, getQuote);
  });
  
});
