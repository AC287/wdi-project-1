$(document).ready(function(){
  console.log('loaded');

  $(function(){
    $('#dialog').dialog({
      autoOpen: false,
      show:{
        effect: "fade",
        duration: 1000
      },
      hide:{
        effect: "fade",
        duration: 1000
      }
    });
    $('.howtoPopup').click(function(){
      $('.howtoPopup').dialog('open');
      // return false;
    });
  });

  clearField();
  $('.start').click(initial); // begin game.


});
var player1 = '', player2 = '';
var masterTime = 60, countdown, p1t=0, p2t=0, turn=0, word, lastLetter;
var p1icon = '<img src="https://cdn2.iconfinder.com/data/icons/snipicons/500/hand-left-128.png"/>'; //player1 icon from iconfinder.com
var p2icon = '<img src="https://cdn2.iconfinder.com/data/icons/snipicons/500/hand-right-128.png"/>'; //player2 icon from iconfinder.com
var pArchive = [];

function clearField() {
  // $('#message').empty();
  $('.player1').empty();
  $('.p1Word li').remove();
  $('.player2').empty();
  $('.p2Word li').remove();
  $('input').remove();
  // $('#midcol').empty();
}

function initial(){
  $('#message').empty();
  // clearField();
  $('#message').html('<h5>Enter your names. Player 1 will go first.</h5>');
  $('#message').append('<div class="container"><div class="row"></div></div>');
  $('#message .container .row').append('<div class="six columns"><input type="text" id="p1" placeholder="Player 1"></div>')
  $('#message .container .row').append('<div class="six columns"><input type="text" id="p2" placeholder="Player 2"></div>')
  $('#message').append('<input type="submit" id="submit">');
  $('#submit').click(function(){
    player1 = $('#p1').val();
    if(player1 ==='') player1 = 'Player 1'; // assign default name.
    player2 = $('#p2').val();
    if(player2 ==='') player2 = 'Player 2'; // assign default name.
    $('#message').empty();
    $('#message').html('<h4>Welcome ' + player1 + ' & ' + player2+'.</h4>');
    setTimeout(mainGame,2000);
  });
}


function mainGame(){
  countdown = setInterval(masterCountdown,1000);
  $('.player1').html('<h2><u>'+player1+'</u></h2>');
  $('.player2').html('<h2><u>'+player2+'</u></h2>');
  // $('.mainBox').remove();
  $('.mainBox').html('<h5>'+p1icon+'<br>Enter the first word to begin the game. Press "Enter" to submit. </h5>');
  $('.mainBox').append('<input type="text" id="words" autofocus>');
  // $('.inputBox').html('<input type="text" id="words" autofocus>');

  $('#words').keydown(function(e){
    word = $('#words').val();
    // console.log(word)
    if(e.keyCode===13){
      word = word.toLowerCase();
      pArchive.push(word);
      console.log(word);
      $('.p1Word').append('<li>'+word+'</li>');
      $('#words').val('');
      lastLetter = word[word.length-1];
      console.log(lastLetter);
      turn++;
      turnSwitch();
    }
  })
  // console.log(word);

}

function masterCountdown(){ // masterCountdown
  masterTime--;
  $('#message').html('<h4>' + masterTime + '</h4>')
  if(masterTime === 0){
    clearInterval(countdown);
    $('#message').html('<h1 class="gameover">GAME OVER</h1>');
    // $('#message .gameover').animate({
    //   font-size: "60rem"
    // },1500);
    $('input').remove();
    $('.mainBox').empty();
    var finalScore = winner();
    var wInner;
    if(finalScore[0]===finalScore[1]){ wInner = 'None. The result is tie';}
    else if(finalScore[0] > finalScore[1]){ wInner = player1;}
    else { wInner = player2;}
    setTimeout(function(){
      // clearField();
      $('.mainBox').html('<h3> Winner is: ' + wInner + '!<br>'+player1+'\'s score is ' + finalScore[0] + '<br>'+player2+'\'s score is '+ finalScore[1]);
    },2000)
  }
} // end masterCountdown

function p1time(){ // player 1 timer
  p1t++;

} // end player 1 timer.

function p2time(){ // player 2 timer
  p2t++;

} // end player 2 timer.


function turnSwitch(){
  var tempWord = '';
  if((turn%2)===0){
    $('.mainBox').html('<h5>'+ p1icon +'<br>Word that begins with "'+ lastLetter +'"</h5>');
    $('.mainBox').append('<input type="text" id="words">');
    $('#words').focus();
    $('#words').keydown(function(e){
      word = $('#words').val();
      // console.log(word)
      if(e.keyCode===13){
        word = word.toLowerCase();
        pArchive.push(word);
        // console.log(word);
        if(lastLetter === word[0] && isRepeat()===true){
          lastLetter = word[word.length-1];
          // console.log(lastLetter);
          $('.p1Word').append('<li>'+word+'</li>');
          $('#words').val('');
          turn++;
          turnSwitch();
        }
        else {
          console.log(lastLetter)
          $('.mainBox').empty();
          $('.mainBox').html('<h5>Invalid word. Your turn will end.</h5>');
          turn++;
          setTimeout(turnSwitch,1000);
        };
      };
    });
  }
  else {
    $('.mainBox').html('<h5>'+ p2icon +'<br>Word that begins with "'+ lastLetter +'"</h5>')
    $('.mainBox').append('<input type="text" id="words">');
    $('#words').focus();
    $('#words').keydown(function(e){
      word = $('#words').val();
      if(e.keyCode===13){
        word = word.toLowerCase();
        pArchive.push(word);
        // console.log(word);
        if(lastLetter === word[0] && isRepeat()===true){
          lastLetter = word[word.length-1];
          console.log(lastLetter);
          $('.p2Word').append('<li>'+word+'</li>');
          $('#words').val('');
          turn++;
          turnSwitch();
        }
        else {
          console.log(lastLetter);
          $('.mainBox').empty();
          $('.mainBox').html('<h5>Invalid word. Your turn will end.</h5>');
          turn++;
          setTimeout(turnSwitch,1000);
        };
      };
    });
  };
};

function isRepeat(){ // check to see if word is already entered. If repeat, return false.
  for(var i=0; i< (pArchive.length-1); i++){
    if(pArchive[i]===pArchive[pArchive.length-1]){
      return false;
    }
  }
  return true;
}// end isRepeat

function winner(){ // determine winstate.
  var p1S = $('.p1Word li').length;
  var p2S = $('.p2Word li').length;
  for(var i=0; i<($('.p1Word li').length-1); i++) {
    if(($('.p1Word li').eq(i).text().length)>=10){
      p1S = p1S + 1;
    }
  };
  for(var j=0; j<($('.p2Word li').length-1); j++) {
    if(($('.p2Word li').eq(j).text().length)>=10){
      p2S = p2S + 1;
    }
  }
  return [p1S,p2S];
}; // end winner

// self note:
// find spiecific value at list position (index)
// $('.p1Word li').eq(index).text();
// $('.p1Word li').length;
// empty() leave div and empty out the value.
// remove() delete everything inside including inner node.
// use dialog method for howto and acknowledgement.
// research on modal
