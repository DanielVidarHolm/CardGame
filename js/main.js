// Classes

class Player{
  constructor(name,cash){
    this.name = name
    this.cash = cash
    this.cards = []
  }
  moveCash(value){
    this.cash += value
  }
}

// Variables 

let deckId = ''
let player = new Player('Player',500)
let bot = new Player('Bot',500)
let pot = 0
let midCards = []
let roundCounter = 0
// Start of Side 

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id
  })
  .catch(err => {
    console.log(`error ${err}`)
  });

// Event Listeners
// TODO
// Folding and checking funcions
document.querySelector('#start').addEventListener('click', setupTable)
document.querySelector('#fold').addEventListener('click', playerFold)
document.querySelector('#bet').addEventListener('click', betCash)
document.querySelector('#check').addEventListener('click', checkId)

function checkId (){
  console.log(deckId)
}

// Game Logic
// TODO 

function firstRound(){
  dealCard(midCards, 3)
  setTimeout(showMidCards, 250)
  roundCounter++;
 
}
function secondRound(){
  dealCard(midCards, 1)
  setTimeout(showMidCards, 250)
  roundCounter++
 
}
function thirdRound(){
  dealCard(midCards, 1)
  setTimeout(showMidCards, 250)
  roundCounter++
 
}
function determineWinner(){
  showBotCards()
  //player wins
  winPot(player)
}

function setupTable(){
  dealingToPlayers()
  setTimeout(showPlayerCards, 250)
  hideBotCards()
  refreshInfo()
}

function resetGame() {
  // TODO
  document.querySelector('h5').classList.toggle('hide')
  midCards.splice(0,midCards.length)
  player.cards.splice(0,player.cards.length)
  bot.cards.splice(0,bot.cards.length)
  document.querySelectorAll('img').forEach(item => item.src = '')
  
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id
  })
  .catch(err => {
    console.log(`error ${err}`)
  });
  setupTable()
}

// Ai
function botDeciding (playerAmount){
  // TODO
  // Add A raise bet Logic
  // Add what happens when he raises or checks
  let randNum = Math.floor(Math.random() * 10)
  if (randNum > 1){
    
    bot.moveCash(-playerAmount)
    pot += Number(playerAmount)
  }else {
    winPot(player)
  }
  
}

// Betting
function betCash(){
  if (roundCounter > 3){
    console.log('last round')
    return
  }
  let amount = prompt('How much cash are you betting')
  player.moveCash(-amount)
  pot += Number(amount)
  
  botDeciding(amount)
  refreshInfo()

  switch (roundCounter){
    case 0:
      firstRound()
      break;
    case 1:
      secondRound()
      break;
    case 2:
      thirdRound()
      break;
    case 3:
      determineWinner()
      break;
  }
 
}
function playerFold(){
  winPot(bot)
}
function winPot(winner){
  console.log('winner')
  winner.cash += pot
  pot = 0
  document.querySelector('h5').innerText = `${winner.name} Wins!`
  document.querySelector('h5').classList.toggle('hide')
  showBotCards()
  setTimeout(resetGame,5000)
  
}

// Dealing Cards

function dealingToPlayers (){
  dealCard(player.cards,2)
  dealCard(bot.cards,2)
}
async function dealCard(cardPlayer,amount){
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${amount}`)
    .then(res => res.json())
    .then(data => {
      cardPlayer.push(data)
    })
}

// Show Things
// TODO
// show bot bets


function showPlayerCards() {
  document.querySelector(`#userCard1 > img`).src = player.cards[0]['cards'][0]['image']
  document.querySelector(`#userCard2 > img`).src = player.cards[0]['cards'][1]['image']
}
function hideBotCards(){
  document.querySelector(`#botCard1 > img`).src = './img/card-back.png'
  document.querySelector(`#botCard2 > img`).src = './img/card-back.png'
}
function showBotCards() {
  document.querySelector(`#botCard1 > img`).src = bot.cards[0]['cards'][0]['image']
  document.querySelector(`#botCard2 > img`).src = bot.cards[0]['cards'][1]['image']
}
function showMidCards() {
  
  document.querySelector(`#midCard1 > img`).src = midCards[0]['cards'][0]['image']
  document.querySelector(`#midCard2 > img`).src = midCards[0]['cards'][1]['image']
  document.querySelector(`#midCard3 > img`).src = midCards[0]['cards'][2]['image']
  if (midCards.length === 2){
    document.querySelector(`#midCard4 > img`).src = midCards[1]['cards'][0]['image']
  }
  if (midCards.length === 3){
    document.querySelector(`#midCard5 > img`).src = midCards[2]['cards'][0]['image']
  }
 
  
}

function showHand (){
  console.log(playerHand)
  console.log(botHand)
}

function refreshInfo(){
  document.querySelector('#userCash').innerText = player.cash
  document.querySelector('#botCash').innerText = bot.cash
  document.querySelector('#pot').innerText = pot
}
function calcOdds(){

}



