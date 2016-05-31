//var apikey = "4debbc67be59fdd456dd6b46b90619f5";

// imperial is F and metric is C


//background array which will contain all of the background images which will be used. each one will be displayed depending on the current conditions. 
//backround[0] = clear sky; [1] = few clouds, scattered clouds, broken clouds; [2] = shower rain, rain; [3] = thunderstorm; [4] = snow; [5] = mist;
var background = ['http://leverhawk.com/wp-content/uploads/2013/09/iStock_000012580113Medium.jpg', 'http://eskipaper.com/images/cloudy-sky-9.jpg', 'http://www.10wallpaper.com/wallpaper/medium/1206/rain-Autumn_landscape_wallpaper_medium.jpg', 'http://cdn.c.photoshelter.com/img-get/I0000eha4E07wKk4/s/880/880/Landscape-Lightning-Cityscape-Johannesburg-Monochrome-ZAX7400JHB-Mitchell-Krog.jpg', 'http://www.hdwallpaperscool.com/wp-content/uploads/2014/11/germany-winter-landscape-new-hd-wallpaper-free-nature-picture.jpg', 'http://farm9.staticflickr.com/8082/8359914035_20390ae80a_b.jpg'];

//function used in getJSON method, will display all of the current info
var getWeather = function (data) {
  //and if and else statement that will determine which radio button is checked. depending on which one that is checked, the windlabel will be adjusted to the appropriate description.
  
  if ($('#i').is(':checked')) {
    var windlabel = ' mph';
    var tempdeg = "F";
  }
  else {
    windlabel = ' m/s';
    tempdeg = "C"
  }
  
  //in the city element, the name of the city and country are added with a comma and whitespace separating each.
  $('#city').html(data.name + ", " + data.sys.country);
  //the temperature is added to the tempf element, rounded to a whole number with a degree symbol.
  $('#tempf').html(Math.round(data.main.temp) + "&deg;" + tempdeg);
  //the wind speed is added to the wind element. the wind speed is rounded to a whole number and labeled with the appropriate desc.
  $('#wind').html("Wind speed is " + Math.round(data.wind.speed) + windlabel);
  
  //the condition variable is used to store the main weather description. this will make it easier for the following code.
  var condition = data.weather[0].main;
  //the condition variable, which holds the weather desc, is added to the condition element. 
  $('#condition').html(condition);
  
  //a switch function to determine which background and font style should be shown based on the current conditions. a default is set up for any descriptions not identified. 
  switch (condition) {
      
    case 'Clear':
      $('.heading').css('background-image', 'url(' + background[0] + ')');
      $('.heading').css('color', 'black');
      $('.heading').css('text-shadow', '2px 2px 2px white');
      break;
      
    case 'Clouds':
      $('.heading').css('background-image', 'url(' + background[1] + ')');
      $('.heading').css('color', 'black');
      $('.heading').css('text-shadow', '2px 2px 2px white');
      break;
    
    case 'Rain':
      $('.heading').css('background-image', 'url(' + background[2] + ')');
      $('.heading').css('color', 'white');
      $('.heading').css('text-shadow', '2px 2px 2px black');
      break;
      
    case 'Thunderstorm':
      $('.heading').css('background-image', 'url(' + background[3] + ')');
      $('.heading').css('color', 'white');
      $('.heading').css('text-shadow', '2px 2px 2px black');
      break;
      
    case 'Snow':
      $('.heading').css('background-image', 'url(' + background[4] + ')');
      break;
      
    case 'Haze':
    case 'Mist':
      $('.heading').css('background-image', 'url(' + background[5] + ')');
      break;
      
    default: 
      $('.heading').css('background-image', 'url(' + background[1] + ')');
      $('.heading').css('color', 'black');
      $('.heading').css('text-shadow', '2px 2px 2px white');
      break;
  };
  
};

//function to pull the information from the weather api
var getData = function(url) {
  
  //.getJSON method to call the weather api using imperial as the default.
  $.getJSON(url + 'imperial', getWeather, 'jsonp');
  //function to change the weather api call url based on which units are selected: imperial or metric. 
  $('input[type=radio][name=i-m]').change(function () {
    if ($('#i').is(':checked')) {
      var units = 'imperial';
    }
    else {
      units = 'metric';
    }
  //the .getJSON method is rerun using the selected units (imperial or metric)  
  $.getJSON(url + units, getWeather, 'jsonp');
  })
  };
    

//function to get the lat and long from computer
function getLocation() {
  $.getJSON('http://ip-api.com/json/?callback=', getPosition );
  
  
  /* this no longer works
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getPosition, error);
}
  */
};



//function to use the lat, long and api key to compile the url for the getJSON
function getPosition(position) {
  //the lat and long variables are used to store the respective numbers pulled from the geolocation function
  
  //var lat = position.coords.latitude;
  //var long = position.coords.longitude;
 var lat = position.lat;
 var long = position.lon;
  
  //apikey variable holds the key needed to call the weather api 
  var apikey = "4debbc67be59fdd456dd6b46b90619f5";
  //url variable holds the entire url. this will make it easier in other parts of the code when we need to call the api. also, adjustments will only need to be made to this variable if anything changes with the api call.
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=" + apikey + "&units=";
  
  //the getData function is called.
  getData(url);
   
};



$(document).ready(function () {
  //when the document is ready, the getLocation function is called which begins the process of filling out the page with the relevant information. 
  getLocation();
  
  
  
});
