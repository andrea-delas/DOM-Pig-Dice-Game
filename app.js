
var scores, roundScore, activePlayer, gamePlaying;  // this is the variables in global scope so we can access them from everywhere in our code, we don't need to define it here, we simply need to declare them
init();  // call the init function that set all values to 0, remove the winner clas and active class from the last round, and add an active class to player 0

document.querySelector('.btn-roll').addEventListener('click', function() {  //anonymus function -> function that can't be used anywhere else
	if (gamePlaying) {  //gamePlaying is the variable that is already set to true, we want to player roll the dice only when game is playing, after we have the winner gameplaying variable would be false


	//1. Random number

		var dice = Math.floor(Math.random() * 6) + 1; // random number between 1 and 6 save in variable dice
	//2. Display the result
		
		var diceDOM = document.querySelector('.dice'); // creating a variable where we can store the selection and then used it again, sticking to the DRY principle - Don't repeat yourself!
		diceDOM.style.display = 'block'; // display image of dice
		diceDOM.src = 'dice-' + dice + '.png'; // change the source attribut from html, this is a simple trick how to display image that show random number given by variable dice
	//3. Update the round score IF the rolled number was not a 1

			if (dice !== 1) {  // Add score
				roundScore += dice;  //roundScore = roundScore + dice
				document.querySelector('#current-' + activePlayer).textContent = roundScore;  // this is also a little trick, if the active player is number 0 then the current 0 element would get the text content
				} else {
			//next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
		if (gamePlaying) {
			// Add CURRENT score to GLOBAL score
			scores[activePlayer] += roundScore;  // add score that active player won from this round to the score that player won in last round
			// Update the UI
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];  
			// Check if player won the game
			if (scores[activePlayer] >= 100) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; // replacing player's name with the word Winner
				document.querySelector('.dice').style.display = 'none';   // change the property from css -> dice is gone
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // add winner class to panel of the player who win the game 
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // remove the active player class from the panel, we didn't use toggle here because toggle add the class if it's not there, and if it's there then remove it, and we know that the winner class isn't there so we add it, and the active class is there so we remove it
				gamePlaying = false;  // this is where we detect if the player won the game  so this is a perfect place to set game playing variable to false
			} else {
				nextPlayer(); // if the score is less than 100 and player roll 1 then it's the other player round
		}
	}
});

function nextPlayer() {
	//next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // if active player is 0 then active player should be 1 else active player should be 0
	roundScore = 0;  // when one player rolls the 1 then the other player roll the dice and the round scores is reset to 0

	document.getElementById('current-0').textContent = '0';  // set values to 0 when it is the next player's turn
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.toggle('active'); // toggle -> add the class if it's not there, and if it's there then remove it
	document.querySelector('.player-1-panel').classList.toggle('active');

	//document.querySelector('.player-0-panel').classList.remove('active');   when we remove and add class to change the active planer we change from player 1 to player 2 but when player 2 roll 1 the active panel doesn't change
	//document.querySelector('.player-1-panel').classList.add('active');      that's way we used toggle

	document.querySelector('.dice').style.display = 'none';  // when the next player's turn is, we don't want any dice visible until he start roll the dice
};

	document.querySelector('.btn-new').addEventListener('click', init); // not calling the anonymus function but instead we pass the init function to event listener function, that's way we don't use the function call operator () because if we write () then the function would be called immediately, and we do not want that, we want to call the function when click on the new game button

function init() {
	scores = [0,0];   // reseting all values when we starting the new game
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';  // remove the image of dice
	document.getElementById('score-0').textContent = '0';    // set all values (score and current from player 1 and player 2) to 0
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';  // when we starting the new game we want the player called player 1 and player 2
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner'); // removing the winner class from the last game when new game is clicked
	document.querySelector('.player-1-panel').classList.remove('winner'); // we remove the winner class from both player because we don't know who won in last game
	document.querySelector('.player-0-panel').classList.remove('active'); // we also remove the active class from both player 
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');  // on the end we add active class to player 0
	// why do we first remove active class from bith player and then add active class to player 0?
	// imagine that player 0 was the active player from the last round, active class would be there, and then we called active class on player 0 again so the player 0 would have two active classes 
}