var channels = ["FreeCodeCamp", "syndicate", "riotgames", "nalcs1", "esl_csgo", "Nightblue3", "summit1g", "LIRIK", "captainsparklez", "imaqtpie", "rocketleague", "comster404"];

$(document).ready(function() {
  for (var i = 0; i < channels.length; i++) {
    getTwitchChannelData(channels[i]);
  }
  $(".online-button").click(function() {
    $(".online-channels").css("display", "block");
    $(".offline-channels,.unknown-channels").css("display", "none");
  });
  $(".offline-button").click(function() {
    $(".offline-channels").css("display", "block");
    $(".online-channels,.unknown-channels").css("display", "none");
  });
  $(".all-button").click(function() {
    $(".online-channels,.offline-channels,.unknown-channels").css("display", "block");
  });
});

function getTwitchStreamData(channelName, channelData) {
  var html = "";
  $.ajax({
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    url: 'https://api.twitch.tv/kraken/streams/' + channelName + '?client_id=ngrtod1fa12fx5slxunbntk8brfps96', // The URL to the API. 
    data: {}, // Additional parameters here
    dataType: 'jsonp',
    success: function(data) {
      console.log(data);
      console.log(channelData);

      if (data.error) {
        html = '<div class="channel-info no-transform animated fadeIn">' +
          '      <div><img class="logo img img-responsive" src="http://cliparts.co/cliparts/8cG/Eyk/8cGEykoMi.png" alt="Channel Logo" height="50" width="50"></div>' +
          '       <div> <h3 class="title">' + channelName + '</h3>' +
          '        <p class="summary">Channel Not Found :( </p>' +
          '      </div></div><hr>';
        $(".unknown-channels").append(html);
        $(".unknown-channels").css("display", "block");

      } else {

        if (data.stream) {
          // <p class="Summary"><b>' + data.stream.game + '</b>: ' + data.stream.channel.status + '</p>
          html = '<a href="' + channelData.url + '" target="_blank"><div class="channel-info animated fadeIn">' +
            '      <div><img class="logo img img-responsive" src="' + channelData.logo + '" alt="Channel Logo" height="50" width="50"></div>' +
            '       <div> <h3 class="title">' + channelName + '</h3>' +
            '        <p class="summary"><b>' + data.stream.game + '</b>: ' + data.stream.channel.status + '</p></div>' +
            '      </div></a><hr>';
          $(".online-channels").append(html);
          $(".online-channels").css("display", "block");

        } else {
          html = '<a href="' + channelData.url + '" target="_blank"><div class="channel-info animated fadeIn">' +
            '      <div><img class="logo img img-responsive" src="' + channelData.logo + '" alt="Channel Logo" height="50" width="50"></div>' +
            '       <div> <h3 class="title">' + channelName + '</h3>' +
            '        <p class="summary"><b>' + ((channelData.game !== "") ? channelData.game : "Game Name Not Available") + '</b>: ' + 'Channel is offline</p></div>' +
            '      </div></a><hr>';
          $(".offline-channels").append(html);
          $(".offline-channels").css("display", "block");

        }
      }

    },
    error: function(err) {},
    beforeSend: function(xhr) {

    }
  });
}

function getTwitchChannelData(channelName) {
  $.ajax({
    url: 'https://api.twitch.tv/kraken/channels/' + channelName + '?client_id=ngrtod1fa12fx5slxunbntk8brfps96', // The URL to the API. 
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'jsonp',
    success: function(data) {
      getTwitchStreamData(channelName, data);
    },
    error: function(err) {},
    beforeSend: function(xhr) {}
  });
}