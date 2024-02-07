'use strict';
// selecting Elements

// Storing Game History Array

const gameHistory = {
    scores : {
        player1:  [],
        player2:  []
    }
};
const player1Score = [];
const player2Score = [];
// const gameHistory = {
//     playerOneHistory : [],
//     playerTwoHistory : []
// };

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1')
const mainPage = document.querySelector('.main');
const heroPage = document.querySelector('.hero');
const wholeName = document.querySelector('.name');


const nameP1 = document.getElementById('name--0')
const nameP2 = document.getElementById('name--1')
const player1Input = document.querySelector('.player1-input')
const player2Input = document.querySelector('.player2-input')
const scoreLimit = document.querySelector('.score-limit');

const score0El = document.querySelector('#score--0');
const score1El =  document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const howToPlay = document.querySelector('.how-to-play')

const btnready = document.querySelector('.ready-btn')
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnHow =  document.querySelector('.btn-how')
const btnHome = document.querySelector('.btn-home');




//Starting Conditions
let score , currentscore , activePlayer , playing;
    

    // player1N1.textContent = player1Name;
    // player2N2.textContent = player2Name;

const captitalzedFirst = str => str.slice(0,str.indexOf(' ')+2);

btnHome.addEventListener('click' , function(){
    window.location.reload();
})
btnready.addEventListener('click' , function(){
    if(player1Input.value == 0 || player2Input.value == 0 || scoreLimit.value == 0){
        alert('Please Insert all Inputs!!!!!');
    }
    else{
    
        const p1Strings = captitalzedFirst(player1Input.value)
        const p2Strings = captitalzedFirst(player2Input.value)

        nameP1.textContent = p1Strings;
        nameP2.textContent = p2Strings;
        heroPage.classList.add('hidden');
        mainPage.classList.remove('hidden');

        gameHistory.player1Name = player1Input.value;
        gameHistory.player2Name = player2Input.value;
        gameHistory.target = scoreLimit.value;
        

    }
})
// btnHow.addEventListener('click' , function(){
//     howToPlay.classList.remove('hidden');
//     howToPlay.classList.add('overlay')
// })

const init = () =>{
    score0El.textContent = 0
    score1El.textContent = 0
    current0El.textContent = 0;
    current1El.textContent = 0;


    
    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    score = [0,0];
    currentscore = 0
    activePlayer = 0
    playing = true;
}
init();
const switchPlayer = () =>{
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentscore = 0;
        activePlayer = activePlayer == 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
    }

//roll Dice Functionality

btnRoll.addEventListener('click' , function()
{
    //Generate a random dice roll
    if(playing){

    const dice = Math.floor(Math.random() * 6) + 1;
    
    //Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `images/dice-${dice}.png`;
   
    //Check for roll 1 if true switch to next player

    if(dice != 1){
        currentscore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentscore;
        
    }
    else{
        switchPlayer();
    }
    }
})

btnHold.addEventListener('click' , function()
{
    if(playing){
    score[activePlayer] += currentscore;

    document.getElementById(`score--${activePlayer}`).textContent =  score[activePlayer];

    if(score[activePlayer] >= Number(scoreLimit.value))
    {
        playing = 0;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        //document.querySelector(`player--${activePlayer}`).classList.remove('player--active');
        
        gameHistory.scores.player1.push(score[0]);
        gameHistory.scores.player2.push(score[1])
    }
    else{
        switchPlayer();
    }
}
})

btnNew.addEventListener('click' , init);
