$(document).ready(function(){
  console.log('loaded');
  clearField();
  $('button').click(initial); // begin game.

});
var player1 = '', player2 = '';
var masterTime = 60, countdown, p1t=0, p2t=0, turn=0, word;

function clearField() {
  // $('#message').empty();
  $('.player1').empty();
  $('.p1Word').empty();
  $('.player2').empty();
  $('.p2Word').empty();
  $('#midcol').empty();
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
    $('#message').html('<h5>Welcome ' + player1 + ' & ' + player2+'.</h5>');
    setTimeout(mainGame,2000);
  });
}


function mainGame(){
  countdown = setInterval(masterCountdown,1000);
  $('.player1').html('<h2>'+player1+'</h2>');
  $('.player2').html('<h2>'+player2+'</h2>');
  $('.mainBox').html('<h5>'+player1+', enter the first word to begin the game. Press "Enter" to submit. </h5>');
  $('.mainBox').append('<input type="text" id="words">');
  $('#words').keydown(function(e){
    word = $('#words').val();
    // console.log(word)
    if(e.keyCode===13){
      console.log(word);
      $('.p1Word').append('<li>'+word+'</li>');
      $('#words').val('');
      turn++;
      turnSwitch();
    }
  })
  // console.log(word);

}

function masterCountdown(){ // masterCountdown
  masterTime--;
  $('#message').html('<h2>' + masterTime + '</h2>')
  if(masterTime === 0){
    clearInterval(countdown);
    $('#message').html('<h1 class="gameover">GAME OVER</h1>');
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
    tempWord = ($('.p2Word li').eq(($('.p2Word li').length-1)).text());
    $('.mainBox').html('<h5>'+ player1 +', enter a word that starts with the letter "'+ tempWord[tempWord.length-1]+'"</h5>');
    $('.mainBox').append('<input type="text" id="words">');
    $('#words').keydown(function(e){
      word = $('#words').val();
      // console.log(word)
      if(e.keyCode===13){
        console.log(word);
        $('.p1Word').append('<li>'+word+'</li>');
        $('#words').val('');
        turn++;
        turnSwitch();
      }
    })
  }
  else {
    tempWord = ($('.p1Word li').eq(($('.p1Word li').length-1)).text())
    $('.mainBox').html('<h5>'+ player2 +', enter a word that starts with the letter "'+ tempWord[tempWord.length-1]+'"</h5>');
    $('.mainBox').append('<input type="text" id="words">');
    $('#words').keydown(function(e){
      word = $('#words').val();
      // console.log(word)
      if(e.keyCode===13){
        console.log(word);
        $('.p2Word').append('<li>'+word+'</li>');
        $('#words').val('');
        turn++;
        turnSwitch();
      }
    })
  }
}

// self note:
// find spiecific value at list position (index)
// $('.p1Word li').eq(index).text();
