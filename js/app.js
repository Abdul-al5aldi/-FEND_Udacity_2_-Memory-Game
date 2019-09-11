let timestamp = new Date(),
stop = true;
const getElapsedTime = () => (new Date() - timestamp) / 1000,
startTimer = () => setInterval(updateTimer, 300),
timerDiv = document.querySelector(".timer");   

var stars = document.getElementsByClassName('fa-star'),
starIndex = 0;

var moves = 0,
moveCounter = document.querySelector('.moves'),
allCards = [],
openCards = [],
winningCards = 0,
wrongMoves = 0;


var deck = document.querySelector('.deck');


var cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];


// Updating timer:
function updateTimer() {
    if (!stop) {
        timerDiv.innerHTML = Math.floor(getElapsedTime());
    }
}

// Handling stars, depending on worng moves:
function starMechanism(wrongMoves) {
    if (wrongMoves % 10 == 0 && starIndex < stars.length - 1) {
        stars[starIndex].classList.add('fa-star-o');
        starIndex++;
    }
}


function generateCard(card) {
    return '<li class="card" data-card="' + card + '"> <i class="fa ' + card + '"></i> </li>';
}

// Shufflling the cards randomly:
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Initiate Game with all what needed (deck, timer, stars, moves):
function initGame() {

    deck = document.querySelector('.deck');

    var cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join('');
    allCards = document.querySelectorAll('.card');
    openCards = [];

    addListeners();
    document.getElementsByClassName('fa fa-repeat')[0].addEventListener('click', function (e) { window.location.reload() });

    moves = 0;
    moveCounter.innerText = moves;
    wrongMoves = 0;

    for (star of stars) {
        star.classList.remove('fa-star-o');
    }

    startTimer();
    starIndex = 0;
    starMechanism();

    timerDiv.innerHTML = 0;
    stop = false;
    timestamp = new Date();
}

initGame();

// Adding listenrs to the cards, and handeling the process of checking matches:
function addListeners() {

    allCards.forEach(function (card) {
        card.addEventListener('click', function (e) {

            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {

                openCards.push(card);
                card.classList.add('open', 'show');

                if (openCards.length == 2) {

                    disable();

                    if (openCards[0].dataset.card == openCards[1].dataset.card) {

                        openCards[0].classList.add('match');
                        openCards[1].classList.add('match');

                        winningCards += 2;
                        openCards = [];

                        if (winningCards == 16) {
                            card.classList.add('open', 'show');
                            allMatched();
                        }


                    } else {
                        openCards.forEach(function (card) {
                            card.classList.remove('open');
                            card.classList.add('wrong');
                        });
                        wrongMoves += 2;
                        starMechanism(wrongMoves);
                    }

                    setTimeout(function () {
                        openCards.forEach(function (card) {
                            card.classList.remove('wrong', 'show');
                        });
                        enable();
                        openCards = [];
                    }, 500);
                }
                moves += 1;
                moveCounter.innerText = moves;
            }
        });
    });
}


// Disabling cards temporarily:
function disable() {
    Array.prototype.filter.call(allCards, function (card) {
        card.classList.add('disabled');
    });
}


// Enabling cards:
function enable() {
    Array.prototype.filter.call(allCards, function (card) {
        card.classList.remove('disabled');
    });
}

// Showing results and check if replay:
function allMatched() {

    openCards.forEach(function (card) {
        card.classList.add('open', 'show');
    });

    setTimeout(function () {

        const wantToRestart = window.confirm(
            "Congratulations, you have made it!" + "\n" + "You took " + getElapsedTime() + " seconds, " + "\n" + "Your rate is " +
            (document.getElementsByClassName('fa-star').length - document.getElementsByClassName('fa-star-o').length) +
            " / " + document.getElementsByClassName('fa-star').length + "\n" + "To restart the game press OK"
        );
        if (wantToRestart) window.location.reload();
        else stop = true;
    }, 500);
}