// Arcade Game Code
const arcade = {
    playerName: null,
    gameSessionActive: false,
    guessingGameActive: false,
    magicBallActive: false,
    bnhActive: false,
    wins: 0,
    gamesPlayed: 0,
  };
  
  const errors = {
    invalidName: "Error: Name is invalid.",
    invalidYesNo: "Error: Only 'Yes' or 'No' allowed.",
    invalidNumber: "Error: Invalid number.",
    emptyInput: "Error: No question detected. Please write a question.",
    nullInput: "Error: Operation canceled.",
  };
  
  const prompts = {
    game: {
      enterName: "Welcome! What's your name?",
      endSession: "Would you like to pick another game to play? yes/no",
      endGame: "Would you like to keep playing this game? yes/no",
    },
    guessingGame: {
      guessNumber: "Guess a number between 1 and 10.",
      tooLow: "Guess was too low, guess again.",
      tooHigh: "Guess was too high, guess again.",
    },
    magicBall: {
      questionText: "Ask a question to the Magic Eight Ball.",
    },
    bnh: {
      choose: "Who are you: Bear, Ninja, or Hunter?",
    },
  };
  
  let userInput = undefined;
  let inputError = false;
  
  const promptUser = (message, errorMessage = "") => {
    while (true) {
      const input = prompt(`${message}${errorMessage ? "\n" + errorMessage : ""}`)?.trim();
      if (input) return input;
      errorMessage = errors.emptyInput;
    }
  };
  
  const continuePrompt = (message) => {
    while (true) {
      userInput = promptUser(message);
      if (userInput.toLowerCase() === "yes" || userInput.toLowerCase() === "no") break;
      alert(errors.invalidYesNo);
    }
  };
  
  const startSession = (game) => {
    if (!arcade.playerName) {
      arcade.playerName = promptUser(prompts.game.enterName, errors.invalidName);
    }
    arcade[game] = true;
    arcade.gameSessionActive = true;
  };
  
  const endSession = (game) => {
    arcade[game] = false;
    continuePrompt(`${arcade.playerName}, ${prompts.game.endSession}`);
    arcade.gameSessionActive = userInput.toLowerCase() === "yes";
  
    if (!arcade.gameSessionActive) {
      alert("Thanks for playing! Your results:");
      console.table({
        Player: arcade.playerName,
        GamesPlayed: arcade.gamesPlayed,
        Wins: arcade.wins,
        WinRate: `${((arcade.wins / arcade.gamesPlayed) * 100).toFixed(2)}%`,
      });
    }
  };
  
  const playGuessingGame = () => {
    startSession("guessingGameActive");
    while (arcade.guessingGameActive) {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      let guessedCorrectly = false;
      let attempts = 0;
  
      while (!guessedCorrectly) {
        const guess = parseInt(promptUser(prompts.guessingGame.guessNumber), 10);
        attempts++;
  
        if (isNaN(guess)) {
          alert(errors.invalidNumber);
        } else if (guess === randomNumber) {
          alert(`Correct! You guessed it in ${attempts} attempts.`);
          guessedCorrectly = true;
          arcade.wins++;
        } else {
          alert(guess < randomNumber ? prompts.guessingGame.tooLow : prompts.guessingGame.tooHigh);
        }
      }
  
      arcade.gamesPlayed++;
      continuePrompt(prompts.game.endGame);
      if (userInput.toLowerCase() === "no") {
        endSession("guessingGameActive");
      }
    }
  };
  
  const playMagicBall = () => {
    startSession("magicBallActive");
    const answers = [
      "Yes, absolutely!",
      "No, definitely not.",
      "Ask again later.",
      "It is certain.",
      "Don't count on it.",
      "My sources say no.",
      "Outlook is good.",
      "Reply hazy, try again.",
    ];
  
    while (arcade.magicBallActive) {
      userInput = prompt(prompts.magicBall.questionText);
      if (!userInput) {
        alert(errors.emptyInput);
      } else {
        const answer = answers[Math.floor(Math.random() * answers.length)];
        alert(answer);
        arcade.gamesPlayed++;
      }
  
      continuePrompt(prompts.game.endGame);
      if (userInput.toLowerCase() === "no") {
        endSession("magicBallActive");
      }
    }
  };
  
  const playBNH = () => {
    startSession("bnhActive");
    const choicesArray = ["Bear", "Ninja", "Hunter"];
  
    while (arcade.bnhActive) {
      const playerChoice = promptUser(prompts.bnh.choose);
      const standardizedChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1).toLowerCase();
  
      if (!choicesArray.includes(standardizedChoice)) {
        alert("Invalid choice. Please choose Bear, Ninja, or Hunter.");
        continue;
      }
  
      const computerChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];
      let result;
  
      if (standardizedChoice === computerChoice) {
        result = "It's a tie!";
      } else if (
        (standardizedChoice === "Bear" && computerChoice === "Ninja") ||
        (standardizedChoice === "Ninja" && computerChoice === "Hunter") ||
        (standardizedChoice === "Hunter" && computerChoice === "Bear")
      ) {
        result = `You win! ${standardizedChoice} beats ${computerChoice}.`;
        arcade.wins++;
      } else {
        result = `You lose! ${computerChoice} beats ${standardizedChoice}.`;
      }
    }
}