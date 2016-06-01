//http://openweathermap.org/current

//user enters city and state or zip
//api is called with the user entered information
//the information will be displayed on the screen
  //more detailed information than on than on the other weather app
//if the user enters another place to search for, the previous place and information is cleared

var apikey = "4debbc67be59fdd456dd6b46b90619f5";
var url = "http://api.openweathermap.org/data/2.5/weather?zip=";
var title = $('#weather');
//backround[0] = clear sky; [1] = few clouds, scattered clouds, broken clouds; [2] = shower rain, rain; [3] = thunderstorm; [4] = snow; [5] = mist;
var background = ['http://leverhawk.com/wp-content/uploads/2013/09/iStock_000012580113Medium.jpg', 'http://eskipaper.com/images/cloudy-sky-9.jpg', 'http://www.10wallpaper.com/wallpaper/medium/1206/rain-Autumn_landscape_wallpaper_medium.jpg', 'http://cdn.c.photoshelter.com/img-get/I0000eha4E07wKk4/s/880/880/Landscape-Lightning-Cityscape-Johannesburg-Monochrome-ZAX7400JHB-Mitchell-Krog.jpg', 'http://www.hdwallpaperscool.com/wp-content/uploads/2014/11/germany-winter-landscape-new-hd-wallpaper-free-nature-picture.jpg', 'http://farm9.staticflickr.com/8082/8359914035_20390ae80a_b.jpg'];

//get the user entered city and state
function getSearch() {
  
  $('#city, #temp, #desc, #wind, #hum, #press').empty();
  url = "http://api.openweathermap.org/data/2.5/weather?zip=";
  var zipcode = $('#search').val();
  url += zipcode + "&APPID=" + apikey + '&units=';
  
  $.getJSON(url + 'imperial', getWeather, 'jsonp');
  
  $('input[type=radio][name=i-m]').change(function () {
    if ($('#i').is(':checked')) {
      var units = 'imperial';
    }
    else {
      units = 'metric';
    }
  
  $.getJSON(url + units, getWeather, 'jsonp');
  });
};


function getWeather(data) {
  if ($('#i').is(':checked')) {
    var windlabel = ' mph';
    var tempdeg = "F";
  }
  else {
    windlabel = ' m/s';
    tempdeg = "C";
  }
  var condition = data.weather[0].main;  
  $('#city').html(data.name + ', ' + data.sys.country);
  $('#temp').html(Math.round(data.main.temp) + "&deg;" + tempdeg);
  $('#desc').html(condition);
  $('#wind').html("Wind speed: " + Math.round(data.wind.speed) + windlabel);
  $('#hum').html("Humidity: " + data.main.humidity + "%");
  $('#footer').css('margin-top', '170px');
  
  switch (condition) {
      
    case 'Clear':
      title.css('background-image', 'url(' + background[0] + ')');
      title.css('color', 'black');
      title.css('text-shadow', '2px 2px 2px white');
      break;
      
    case 'Clouds':
      title.css('background-image', 'url(' + background[1] + ')');
      title.css('color', 'black');
      title.css('text-shadow', '2px 2px 2px white');
      break;
    
    case 'Rain':
      title.css('background-image', 'url(' + background[2] + ')');
      title.css('color', 'white');
      title.css('text-shadow', '2px 2px 2px black');
      break;
      
    case 'Thunderstorm':
      title.css('background-image', 'url(' + background[3] + ')');
      title.css('color', 'white');
      title.css('text-shadow', '2px 2px 2px black');
      break;
      
    case 'Snow':
      title.css('background-image', 'url(' + background[4] + ')');
      break;
      
    case 'Haze':
    case 'Mist':
      title.css('background-image', 'url(' + background[5] + ')');
      break;
      
    default: 
      title.css('background-image', 'url(' + background[1] + ')');
      title.css('color', 'black');
      title.css('text-shadow', '2px 2px 2px white');
      break;
  };
  
};


$(document).ready(function() {
  //$.getJSON(url + "22974" + "&APPID=" + apikey + '&units=imperial', getWeather, 'jsonp');
  
  $('#button').click(function() {
    getSearch();
    $('#search').val('');
  });
  
  
  
  });
