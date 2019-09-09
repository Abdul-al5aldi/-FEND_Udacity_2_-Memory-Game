/*
 * Create a list that holds all of your cards
 */

let winningCards = 0;
let winningPage = document.getElementById('winningPage');
let winFlag = false;


let stars = document.getElementsByClassName('fa-star')
let starIndex = 0;
let wrongMoves = 0;


function starMechanism(wrongMoves) {
    if (wrongMoves % 10 == 0 && starIndex < stars.length-1) {
        stars[starIndex].classList.add('fa-star-o');
        starIndex++;
    }
}



 // @description game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" min "+second+" sec";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


 var cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt',
'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];


function generateCard(card) {
    return '<li class="card" data-card="' + card + '"> <i class="fa ' + card + '"></i> </li>';
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


var moves = 0;
var moveCounter = document.querySelector('.moves');
var allCards = [];
var openCards = [];

var deck = document.querySelector('.deck');

 function initGame() {


     deck = document.querySelector('.deck');
     var cardHTML = shuffle(cards).map( function(card) {
         return generateCard(card);
     });

     

     moves = 0;
     moveCounter.innerText = moves;

     deck.innerHTML = cardHTML.join('');

     allCards = document.querySelectorAll('.card');
     openCards = [];

     addListeners();
     document.getElementsByClassName('fa fa-repeat')[0].addEventListener('click', function (e) { initGame()} );

         //reset timer

    //clearInterval(interval);
    resetTimer();
    startTimer();


    for (star of stars) {
        star.classList.remove('fa-star-o');
    }
    
 starIndex = 0;
 wrongMoves = 0;


    starMechanism();


 }

 function resetTimer () {
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 min 0 sec";
    clearInterval(interval);
 }
 

// document.body.onload = initGame();
initGame();


 function addListeners () {

    allCards.forEach( function(card) {
        card.addEventListener('click', function(e) {
            
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {

                openCards.push(card);
                card.classList.add('open', 'show');

                if (openCards.length == 2) {

                    disable();

                    //allCards.forEach( classList.add('preventClick'));
                
                    

                    if (openCards[0].dataset.card == openCards[1].dataset.card) {
                        openCards[0].classList.add('match');
                        //openCards[0].classList.add('open');
                        //openCards[0].classList.add('show');

                        openCards[1].classList.add('match');
                        //openCards[1].classList.add('open');
                        //openCards[1].classList.add('show');

                        winningCards += 2;

                        openCards = [];

                        
                if (winningCards == 16) {
                    winFlag = true;
                    
    console.log('out  = ' + moves);
                    win(moves);
                    setTimeout(function(){
                        if(confirm("Do you want to play again ?")){
                            window.location.reload();
                        }else{
                            return;
                        };
                    },1000);
                }

                        
                    } else {
                        wrongMoves += 2;
                        starMechanism(wrongMoves);
                        
                    }

                    setTimeout( function() {
                        openCards.forEach( function(card) {

                            card.classList.remove('open', 'show');
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
 

 /*
 allCards.forEach( function(card) {
     card.addEventListener('click', function(e) {

         if (openCards.length >= 2) {
             setTimeout( function() {
                 openCards.forEach( function(card) {
                     card.classList.remove('open', 'show');
                 });
             }, 1000);
                  } else {
             openCards.push(card);
             card.classList.add('open', 'show');
         }
    });
 });
*/





// @description disable cards temporarily
function disable(){
    Array.prototype.filter.call(allCards, function(card){
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(allCards, function(card){
        card.classList.remove('disabled');
    });
}





function win(moves) {
    console.log('in func = ' + moves);
    deck.innerHTML = '';
    deck.style.display = 'none'
    document.getElementsByClassName('fa-repeat')[0].style.display = 'none'
    document.getElementsByClassName('moves')[1].innerHTML = moves+1;
    winningPage.style.display = "block";
}