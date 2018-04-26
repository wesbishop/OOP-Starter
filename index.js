function Card(point,suit) {
  this.point = point;
  this.suit = suit;
};

Card.prototype.getImageURL = function() {
  return "images/" + this.point + "_of_" + this.suit +".png";
}

function Hand(card) {
  this.cards = [];
}
Hand.prototype.addCard = function(card) {
  this.cards.push(card);
}
Hand.prototype.showHand = function() {
  console.log("My hand contains " + this.cards.length + " cards.")
  this.cards.forEach( card => {
     console.log("point: "+ card.point + ", suit: " + card.suit);
  })
}

Hand.prototype.getPoints = function() {
  return this.cards.reduce((a,v) => {
    return a + v.point;
  },0);
}


function Deck() {
  this.cards = [];
  var suits = ["clubs","diamonds","hearts","spades"];

  for (var i=0; i< 52; i++) {
    var point = i % 13 + 1;
    var suit = suits[Math.floor(i / 13)];
    this.cards.push(new Card(point,suit));
  }
}

Deck.prototype.shuffle = function() {
  var i = 0
  , j = 0
  , temp = null

  for (i = this.cards.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = this.cards[i]
    this.cards[i] = this.cards[j]
    this.cards[j] = temp
  }

}

Deck.prototype.draw = function() {
  var randomIndex = Math.floor(Math.random() * (this.cards.length-1));
  var randomCard = this.cards[randomIndex];

  //remove card from deck
  this.cards.splice(randomIndex,1)
  return randomCard;

}
Deck.prototype.showAllCards = function() {
  this.cards.forEach( (card ,idx) => {
    console.log(`Card ${idx} point: ${card.point}, suit: ${card.suit}` )
  })
}

Deck.prototype.numCardsLeft = function() {
  return this.cards.length;
}

//Test CARD constructor
let myCard = new Card(5,"diamonds");
console.log("CARD constructor");
console.log("My card is " + "point: " + myCard.point + ", suit: " + myCard.suit);
console.log("My card image is " + myCard.getImageURL());
console.log("\n");

//Test HAND constructor
var myHand = new Hand();
myHand.addCard(new Card(5,"diamonds"));
myHand.addCard(new Card(13,"spades"));
myHand.showHand();
console.log("My hand is worth: " + myHand.getPoints() + " points. \n\n");

//Test DECK constructor
var myDeck = new Deck();
var card1 = myDeck.draw();
console.log("Draw 2 cards");
console.log(`Card 1: point: ${card1.point}, suit: ${card1.suit}`)
var card2 = myDeck.draw();
console.log(`Card 2: point: ${card2.point}, suit: ${card2.suit}`)

myDeck.shuffle();
console.log("\nThere are " + myDeck.numCardsLeft() + " cards remaining.");
myDeck.showAllCards();

