// Classes

class Player{
  constructor(cash){
    this.cash = cash
    this.cards = []
  }
  moveCash(value){
    this.cash += value
  }
}

// Variables 

let deckId = ''
let player = new Player(500)
let bot = new Player(500)
let pot = 0
let midCards = []

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
document.querySelector('#fold').addEventListener('click', resetGame)
document.querySelector('#bet').addEventListener('click', betCash)
document.querySelector('#check').addEventListener('click', checkId)

function checkId (){
  console.log(deckId)
}

// Game Logic
// TODO 
// Implement second round and third round

function firstRound(){
  dealCard(midCards, 3)
  setTimeout(showMidCards, 250)
 
}

function setupTable(){
  dealingToPlayers()
  setTimeout(showPlayerCards, 250)
  refreshInfo()
}

function resetGame() {
  // TODO
  // Find out how to start a new game
  midCards.splice(0,midCards.length)
  player.cards.splice(0,player.cards.length)
  bot.cards.splice(0,bot.cards.length)
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id
  })
  .catch(err => {
    console.log(`error ${err}`)
  });
}

// Ai
function botDeciding (playerAmount){
  // TODO
  // Add A raise bet Logic
  // Add what happens when he raises or checks
  let randNum = Math.floor(Math.random() * 10)
  if (randNum > 1){
    bot.moveCash(-playerAmount)
    pot += playerAmount
  }else {
    winPot(player)
  }
  
}

// Betting
function betCash(){
  let amount = prompt('How much cash are you betting')
  player.moveCash(-amount)
  pot += amount
  refreshInfo()
  botDeciding(amount)
  
  firstRound()
}
function winPot(winner){
  winner.cash += pot
  pot = 0
  resetGame()
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
// Show second round and third round
// show bot bets
// show pot
// show bot cash

function showPlayerCards() {
  document.querySelector(`#userCard1 > img`).src = player.cards[0]['cards'][0]['image']
  document.querySelector(`#userCard2 > img`).src = player.cards[0]['cards'][1]['image']
}
function showMidCards() {
  document.querySelector(`#midCard1 > img`).src = midCards[0]['cards'][0]['image']
  document.querySelector(`#midCard2 > img`).src = midCards[0]['cards'][1]['image']
  document.querySelector(`#midCard3 > img`).src = midCards[0]['cards'][2]['image']
}

function showHand (){
  console.log(playerHand)
  console.log(botHand)
}

function refreshInfo(){
  document.querySelector('#userCash').innerText = player.cash
}



