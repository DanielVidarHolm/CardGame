let deckId = ''
const playerHand = []
const botHand = []

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id
  })
  .catch(err => {
    console.log(`error ${err}`)
  });
  
document.querySelector('#start').addEventListener('click', setupTable)
document.querySelector('#show').addEventListener('click', showHand)








async function dealOneCard(){
  let res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
  return await res.json()
}

async function setupTable (){
  playerHand.push(dealOneCard())
  botHand.push(dealOneCard())
  playerHand.push(dealOneCard())
  botHand.push(dealOneCard())
  console.log(Promise.resolve(playerHand))
  console.log(Promise.resolve(botHand))
}
function showHand (){
  console.log(playerHand)
  console.log(botHand)
}