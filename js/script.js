const guessedLetters = document.querySelector(".guessed-letters");
/*Unordered list where player's guessed letters appear */

const guessButton = document.querySelector(".guess");
/*Button with the text "guess!" in it */

const letterInput = document.querySelector(".letter");
/* where the player will guess the letter*/

const wordInProg = document.querySelector(".word-in-progress");
/*The empty paragraph where the word in progress will appear */

const remainingGuesses = document.querySelector(".remaining");
/*The paragraph where the remaining guesses will display */

const guessesSpan = document.querySelector(".remaining span");
/*The span inside the paragraph where the remaining guesses will display*/

const messages = document.querySelector(".messages");
/*The empty paragraph where messages will appear when the player guesses a letter */

const playAgainButton = document.querySelector(".play-again hide");
/*The hidden button that will appear prompting the player to play again */

const word = "magnolia";


const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetters.push("●"); 
    }
    wordInProg.innerText = placeHolderLetters.join("");
};

placeHolder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const valueInput = letterInput.value;
    console.log(valueInput);
    letterInput.value = "";

});