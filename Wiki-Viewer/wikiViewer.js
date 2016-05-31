//search result returns 10 entries
// I can search Wikipedia entries in a search box and see the resulting Wikipedia entries.
// I can click a button to see a random Wikipedia entry.
//Here's a URL you can use to get a random Wikipedia article: http://en.wikipedia.org/wiki/Special:Random.
//Here's an entry on using Wikipedia's API: http://www.mediawiki.org/wiki/API:Main_page.

//things to add:
  //able to hit enter to perform a search


//function to display the results from the getJSON method
var getInfo = function(data) {
 //html variable will hold the entire html mark up for the entire search results. will be used to add all of the results to the viewer.
 var html = "";
 //markup variable will hold the beginning html elements to start each div element 
 //the .results class will have a style='background-color: #e6e6e6;' 
 var markup = "<div class='results'><h3 class='title'>";
 //link variable will hold the html elements needed to make each div element clickable and take the user to the appropriate wiki page in a new tab 
 var link = "<a target='_blank' style='text-decoration: none' href='http://en.wikipedia.org/?curid=";
 //results variable will hold the entire object result from the api call  
 var results = data.query.pages;
 //keys variable will hold an array of the results enumerable properties
 var keys = Object.keys(results);
  
 //function to cycle through each of the key results to access the information for each result. that information is then added to the html variable 
 keys.forEach(function(key) {
    html += link + results[key].pageid + "'>" + markup + results[key].title + "</h3><p class='paragraph'>" + results[key].extract + "</div></a>";
  })
 
 //adds the entire string (which contains the html markup and information) to the div with the id result.
  $('#result').html(html);
};

//function to get the users search request
var getSearch = function() {
  //storing search in variable
  var search = $('#search').val();
  //validating something was entered. if something was not entered, then a message appears asking the user to enter something.
  if (search == '') {
    $('#nosearch').html("Please enter something to search");
  }
  else {
    //if something was entered, the nosearch div is cleared removing the please enter something to search warning so it doesn't show in the results.
    $('#nosearch').empty();
    //need to check for spaces in search variable and replace with + signs for api call
    var searchrep = search.split(" ").join("+");
    
    //then call the getJSON with the url + search variable + endurl
    //url variable holds the beginning portion of the url for the wiki api call
    var url = "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exsentences=1&exlimit=20&exintro=1&explaintext=1&gsrsearch=";
    //endurl variable contains the end of the url string for the wiki api call
    var endurl = "&gsrprop=snippet&gsrlimit=10&callback=?";
    //.getJSON method for calling the wiki api. the getInfo function is run with the data
    $.getJSON(url + searchrep + endurl, getInfo, 'jsonp');
    
  }
};

//when the webpage loads
$(document).ready(function() {
  $('#button').click(getSearch);
})
