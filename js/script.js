const guessedLettersElement = document.querySelector(".guessed-letters");
/*Unordered list where player's guessed letters appear */

const guessButton = document.querySelector(".guess");
/*Button with the text "guess!" in it */

const letterInput = document.querySelector(".letter");
/* where the player will guess the letter*/

const wordInProg = document.querySelector(".word-in-progress");
/*The empty paragraph where the word in progress will appear */

const remainingGuessesParagraph = document.querySelector(".remaining");
/*The paragraph where the remaining guesses will display */

const guessesSpan = document.querySelector(".remaining span");
/*The span inside the paragraph where the remaining guesses will display*/

const message = document.querySelector(".message");
/*The empty paragraph where messages will appear when the player guesses a letter */

const playAgainButton = document.querySelector(".play-again");
/*The hidden button that will appear prompting the player to play again */

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeHolder(word);
};
getWord();



/*Display our symbols as placeholders for the chosen word's letters*/
const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetters.push("●");
    
    }
    wordInProg.innerText = placeHolderLetters.join("");
}

/*fire off the game! */
getWord();


guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    };
});



validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please only choose one letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please pick a letter A - Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showPlayerGuesses();
        CountGuesses(guess);
        updateWordInProg(guessedLetters);

    };
};

const showPlayerGuesses = function () {
    guessedLettersElement.innerHTML = "";
    
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    } 
};

  const updateWordInProg = function (guessedLetters) {
      const wordUpper = word.toUpperCase();
      const wordArray = wordUpper.split("");
      const correctWord = [];
    
      for (const letter of wordArray) {
        if (guessedLetters.includes (letter)) {
            correctWord.push(letter.toUpperCase());
          } else {
              correctWord.push("●");
          } 
      }
      wordInProg.innerText = correctWord.join("");
      checkWinner();
  };

  const CountGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
    
         if (wordUpper.includes (guess)) {
            message.innerText = `${guess} is in the word.`;
         } else {
             message.innerText = `${guess} isn't in the word.`;
             remainingGuesses -= 1;
           
         };

         if (remainingGuesses === 0) {
             message.innerHTML = `Game over. Answer is <span class="highlight">${wordUpper}</span>.`;
             startOver();
         } else if (remainingGuesses === 1) {
             guessesSpan.innerText = `${remainingGuesses} guess`;
         } else {
             guessesSpan.innerText = `${remainingGuesses} guesses`;
         }

  };



  const checkWinner = function () {
        if (word.toUpperCase() === wordInProg.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You correctly guessed the word! Congrats!</p>`; 
        startOver();
    }  
  };


const startOver = function () {
    remainingGuessesParagraph.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    guessButton.classList.add("hide");
    playAgainButton.classList.remove("hide");
    
}; 

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessesSpan.innerText = `${remainingGuessesParagraph} guesses`;
    guessButton.classList.remove("hide");
    remainingGuessesParagraph.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();

});