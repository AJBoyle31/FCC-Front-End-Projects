
var myfavs = ["freecodecamp", "monstercat", "quickybaby", "lirik", "giantwaffle", "ugliestpieceofbread", "lost_in_house", "stodeh","taipan59", "kuothe", "shortyyguy", "summit1g", "encryptedcow", "deadmau5"];


//url for getJSON method to get offline streamers
var offlineurl = "https://api.twitch.tv/kraken/channels/";
//url for getJSON method to get online streamers
var onlineurl = "https://api.twitch.tv/kraken/streams/";
//end of the url for the getJSON method
var endurl = "?callback=?";

var link = "<a target='_blank' style='text-decoration: none' href='http://www.twitch.tv/";

//online 
var beginhtml = '<div class="stream ';
var beginimg = '"><img class="preview" src="';
var endimg = '"><h5 id="name">';
var endname = '</a></h5><h5 id="status">';
var endstatus = '</h5></div>';

//offline
var begicon = "<div class='row stream ";
var endicon = "'><div class='col-sm-2 icon'><img src='"
var streamer = "'></div><div class='col-sm-4 streamer'>";
var info = "</a></div><div class='col-sm-6 info'>";
var end = "</div></div>";

var name = '';
var testing = '';

var getTwitch = function(data) {
  console.log(name);
  var html = "";
  var logo, game, status, preview;
  var line = "online";
  
    //offline
    if (data.stream === null) {
      status = "Offline";
      line = "offline";
      
      $.getJSON(offlineurl + name, function(data) {
        name = data.display_name;
        if(data.logo === null) {
          logo = "https://upload.wikimedia.org/wikipedia/commons/3/33/White_square_with_question_mark.png";
          html += begicon + line + endicon + logo + streamer + link + name +  "'>" + name + info + status + end;
          $('.results').append(html);
          
        }
        
        else {
          logo = data.logo;
          html += begicon + line + endicon + logo + streamer + link + name + "'>" + name + info + status + end;
          $('.results').append(html);
          
        }
      })
    }
   
  //not found
   else if (data.stream == undefined) {
     $('.alert').show();
     
   }
  
  //online
   else {
      name = data.stream.channel.display_name;
      game = data.stream.channel.game;
      status = data.stream.channel.status;
      preview = data.stream.preview.large;
         
     //need to add online class 
     html += beginhtml + line + beginimg + preview + endimg + link + name + "'>" + name + endname + game + ": " + status + endstatus; 
       
        $('.results').append(html);
        
   }
};


//function to add streams that people can search for???? need to add something to the div's in order for users to remove streamers????
var getAdd = function() {
  $('.alert').hide();
  var search = $('#searchbox').val();
  name = search;
  $.getJSON(onlineurl + search + endurl, getTwitch);
};

//not working, might be a forEach issue. maybe try a for loop

var favorites = function() {
    myfavs.forEach(function(user) {
      $.getJSON(onlineurl + user + endurl, function(data) {
            
        var html = "";
        var logo, game, status, name, preview;
        var line = "online";
  
    //offline
    if (data.stream === null) {
      status = "Offline";
      line = "offline";
      
      $.getJSON(offlineurl + user, function(data) {
        name = data.display_name;
        if(data.logo === null) {
          logo = "https://upload.wikimedia.org/wikipedia/commons/3/33/White_square_with_question_mark.png";
          html += begicon + line + endicon + logo + streamer + link + name +  "'>" + name + info + status + end;
          $('.results').append(html);
          
        }
        
        else {
          logo = data.logo;
          html += begicon + line + endicon + logo + streamer + link + name + "'>" + name + info + status + end;
          $('.results').append(html);
          
        }
      })
    }
   
  //not found
   else if (data.stream == undefined) {
     $('.alert').show();
     
   }
  
  //online
   else {
      name = data.stream.channel.display_name;
      game = data.stream.channel.game;
      status = data.stream.channel.status;
      preview = data.stream.preview.large;
         
     //need to add online class 
     html += beginhtml + line + beginimg + preview + endimg + link + name + "'>" + name + endname + game + ": " + status + endstatus; 
       
        $('.results').append(html);
        
   }
    })
      
        
      })
};




$("#search").click(function() {
    getAdd();
    $('#searchbox').val('');
  });

$("#online").click(function() {
    $(".offline").hide();
    $(".online").show();
  })
$("#offline").click(function() {
    $(".online").hide();
    $(".offline").show();
  })
$("#all").click(function() {
    $(".online").show();
    $(".offline").show();
  })
$(document).keypress(function(e){
    if(e.which == 13) {
      getAdd();
      $('#searchbox').val('');
    }
  });
$('#clear').click(function(){
  $('.results').empty();
});


$(document).ready(function() {
  $('#favs').click(function() {
    favorites();
  });  
});
