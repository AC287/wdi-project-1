$(document).ready(function(){
  console.log('loaded');
  clearField();
  $('button').click(initial); // begin game.

});
var player1 = '';
var player2 = '';

function clearField() {
  // $('#message').empty();
  $('.player1').empty();
  $('.p1Word').empty();
  $('.player2').empty();
  $('.p2Word').empty();
  $('#midcol').empty();
}

function initial(){
  // clearField();
  $('#message').html('<h5>Enter your names. Player 1 will go first.</h5>');
  $('#message').append('<div class="container"><div class="row"></div></div>');
  $('#message .container .row').append('<div class="six columns"><input type="text" id="p1" placeholder="Player 1"></div>')
  $('#message .container .row').append('<div class="six columns"><input type="text" id="p2" placeholder="Player 2"></div>')
  $('#message').append('<input type="submit" id="submit">');
  $('#submit').click(function(){
    player1 = $('#p1').val();
    if(player1 ==='') player1 = 'Player 1';
    player2 = $('#p2').val();
    if(player2 ==='') player2 = 'Player 2';
    $('#message').empty();
    $('#message').html('<h5>Welcome ' + player1 + ' & ' + player2+'.</h5>');
  });
  setTimeout(mainGame,3000);
}


function mainGame(){
}
