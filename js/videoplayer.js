$(document).ready(function(){
var options, player, $playButton, $progressBar, $soundButton, $fwdButton, $buttonsDiv, $thisButton;

  options = {
    id: 347119375,
    texttrack: 'en',
    loop: false,
    autoplay: true,
    controls: false
  };

player = new Vimeo.Player('player', options);

// Add custom control buttons
    $playButton = $('<button>',{
      'class': 'material-icons'  + ' ' + 'play',
      'id': 'btn-play'
    }).text('play_arrow');

    $fwdButton = $('<button>',{
      'class': 'material-icons' + ' ' + 'fwd'
    }).text('skip_next');

    $soundButton = $('<button>',{
      'class': 'material-icons' + ' ' + 'sound'
    }).text('volume_up');

// PROGRESS BAR     
    $progressBar = $('<div id="prog-bar">',{
      'class': 'progress-bar'
    }).text('');

// wrap buttons and progress bar in control-bar div
    $buttonsDiv = $('<div class="flex-container control-bar">',{
      'class': 'buttons'
    }).append($playButton, $fwdButton, $soundButton, $progressBar);
    $('div#player').after($buttonsDiv);

// PLAY BUTTON
    $playButton.on('click',function() {
    $thisButton = $(this);
    player.getPaused().then(function(paused) {
      if (paused) {
        player.play().then(function() {
        $thisButton.text('stop');
      });    
    }
      else {
        player.pause().then(function() {
        $thisButton.text('play_arrow');
        });
      }
    }).catch(function(error) {
      console.log('Error on getPaused: ', error);
  });
});

// PLAYBACK SPEED 
    $fwdButton.on('click',function() {
    $thisButton = $(this);
    player.getPlaybackRate().then(function(getPlaybackRate) {
      if (getPlaybackRate == 1) {
        player.setPlaybackRate(2).then(function() {
        $thisButton.text("fast_forward");
      });
    }
      else {
        player.setPlaybackRate(1).then(function() {
        $thisButton.text("skip_next");
        });
      }

    }).catch(function(error) {
      console.log('Error on getPlaybackRate: ', error);
  });
});

// SOUND ON/SOUND MUTE
    $soundButton.on('click',function() {
    $thisButton = $(this);
    player.getVolume().then(function(volume) {
      if (volume) {
      player.setVolume(0).then(function() {
      $thisButton.text('volume_mute');
      });
    }
      else {
        player.setVolume(.5).then(function() {
        $thisButton.text('volume_up');
        });
      }
  }).catch(function(error) {
    switch (error.name) {
    case 'RangeError':
    break;
    default:
    break;
    }
  });
});


// PROGRESS BAR
      player.on('timeupdate', function(data) {
      var p = (data.percent * 100);
      document.getElementById('prog-bar').style.width = p + "%" ;
      document.getElementById('prog-bar').style.background = "#ee4266" ;  
      });
    });
