// player will guess a number between min and max
//you get x amount of guesses
//show remaining guesses
//show corect answwer if player lsot
//let player be able to play again

//game variables
 let min=1,
     max=10,
     winningNum = getRandomNum(min,max),
     guessesLeft =3;


//ui elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign min and max
minNum.textContent=min;
maxNum.textContent=max;

//play again event listener (since we are adding a class after the page is loaded we need to use delegation)
//using mouse down instead of click otherwise page will instantly reload without player seeing that he won
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }

});

//Listen for a guess
guessBtn.addEventListener('click',function(){
    let guess =parseInt(guessInput.value);

    //validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please Enter a nuber between ${min} and ${max}`,'red');
    }

    //Check if won
    else if(guess === winningNum){
        //Game over, you won
        gameOver(true,`${winningNum} is correct! You Win!`);
      
    }
    else{
        //wrong guess
         guessesLeft -=1;
         if (guessesLeft===0){
             //game over
             //disable input
            gameOver(false,`Game Over, You Lost. The correct number was ${winningNum} is correct! You Win!`);

         }else{
             //game continues - answer wrong
             guessInput.style.borderColor = 'red';
             //clear the input
             guessInput.value='';
             //tell user its wrong
             setMessage(`${guess} is not correct,  ${guessesLeft} guesses left`,'red');


         }

    }
});

//game over function
function gameOver(won,msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    
    guessInput.disabled = true;
    
    guessInput.style.borderColor = color;
    //text color
    message.style.color = color;
    
    setMessage(msg);
    // play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

//Message function
function setMessage(msg,color){
    message.style.color = color;
    message.style.fontSize ='20px';
    message.textContent = msg;
}
//wiiining number function
function getRandomNum(min,max){
    return Math.floor(Math.random()*(max -min +1)+min);

}






