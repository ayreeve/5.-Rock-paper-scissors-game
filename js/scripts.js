// jslint devel: true

// new game button listener
var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);


// one of three choices listener
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function () {
    playerPick('rock')
});
pickPaper.addEventListener('click', function () {
    playerPick('paper')
});
pickScissors.addEventListener('click', function () {
    playerPick('scissors')
});

// initial values
var gameState = 'notStarted', //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

// elements displayed depending on game state
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Replay!';
            newGameBtn.style.fontSize = '0.9em';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}

setGameElements();

// new game start (after press new game/play again button)
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    swal({
            title: "Hello there!",
            text: "Please, enter your name:",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "player's name"
        },
        function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("Don't be so mysterious! Type your name");
                return false;
            }
            swal("Let's play!", "Good luck, " + inputValue, "success");
            player.name = inputValue;


            if (player.name) {
                player.score = computer.score = 0;
                gameState = 'started';
                setGameElements();

                playerNameElem.innerHTML = player.name;
                setGamePoints();
            }
        }); // koniec wywolania swal    

}

// players pick function
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}

// check round winner function
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // draw
        document.getElementById("js-playerResult").style.color = "#fff";
        document.getElementById("js-computerResult").style.color = "#fff";
        playerResultElem.innerHTML = "Draw";
        computerResultElem.innerHTML = "Draw";
    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') ||
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Winner!";
        document.getElementById("js-playerResult").style.color = "#b20404";
        player.score++;
    } else if (winnerIs == 'computer') {
        document.getElementById("js-computerResult").style.color = "#b20404";
        computerResultElem.innerHTML = "Winner!";
        computer.score++;
    }
    setGamePoints();
    gameFinished();
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

// game finished
function gameFinished() {
    if (player.score === 10) {
        swal({
            title: "Sweet!",
            text: "You are the winner!",
            imageUrl: "../images/game_result/win.svg"
        });

        gameState = 'ended';
    } else if (computer.score === 10) {

        swal({
            title: "Sorry",
            text: "Computer is the winner",
            imageUrl: "../images/game_result/loose.svg"
        });

        gameState = 'ended';
    }
    setGameElements();
}
