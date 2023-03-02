import { useState } from 'react'
import './Card.scss'
import Table from './Table.jsx'
import gluttony from './images/b2-gluttony.png'
import ragman from './images/b2-rag_man.png'
import squirt from './images/b2-squirt.png'
import krampus from './images/fsp2-krampus.png'
import momshand from './images/b2-moms_dead_hand.png'
import steven from './images/g2-steven.png'
import isaac from './images/b2-isaac.png'
import azazel from './images/g2-azazel.png'
import guppy from './images/fsp2-guppy.png'
import bloat from './images/p-the_bloat.png'

const cardImages = [
  gluttony,
  ragman,
  squirt,
  krampus,
  momshand,
  steven,
  isaac,
  azazel,
  guppy,
  bloat
]

class CardPrototype {
  name;
  pairId;
  matched = false;
  flipped = false;

  constructor(name, pairId) {
    this.name = name;
    this.pairId = pairId;
  }
}

const cards = [];

for (let i = 0, len = cardImages.length; i < len; i++) {
  cards.push(new CardPrototype(cardImages[i], i));
}

function generateCards(singletonCards) {
  const fullCardList = [];
  for(let i = 0, len = singletonCards.length; i < len; i++){
    fullCardList.push(singletonCards[i]);
    fullCardList.push(Object.assign({}, singletonCards[i])); //create new card, not just a reference
  }
  return fullCardList;
}

function shuffleCards(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const fullCardList = generateCards(cards);
const shuffledCards = shuffleCards(fullCardList);

let currentCard = null; //global reference so choice can exist between calls.

function App() {
  const [cardList, setCardList] = useState(shuffledCards);
  const [checkingMatch, setCheckingMatch] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [allMatchesFound, setAllMatchesFound] = useState(false);

  function checkForPair(event, key) {
    const nextCardsState = cardList.map((card) => {return card;});
    nextCardsState[key].flipped = true;

    if (currentCard === null) { //No card currently chosen
      currentCard = {
        card: nextCardsState[key],
        index: key
      };
    } else { //Card already chosen, check for match
      setCheckingMatch(true); //Set checking match to lock out user input until match check completed
      const testCard = {
        card: nextCardsState[key],
        index: key
      };

      if (currentCard.card.pairId === testCard.card.pairId) { //Match found
        nextCardsState[currentCard.index].matched = true;
        nextCardsState[testCard.index].matched = true;
        currentCard = null;

        setDisplayText("Match!");
        setCheckingMatch(false);

        setTimeout(() => {
          if (allMatchesFound === false) {
            setDisplayText("");
          }
        }, 1000);
      } else { //No match found, reset
        setDisplayText("No Match!");
        setTimeout(() => {
          cardList[currentCard.index].flipped = false;
          cardList[testCard.index].flipped = false;
          currentCard = null;

          setCardList(cardList);
          setCheckingMatch(false);
        }, 1000)
      }

      setTimeout(() => {
        if (allMatchesFound === false) {
          setDisplayText("");
        }
      }, 1000);
    }
    setCardList(nextCardsState);

    const allMatched = nextCardsState.find(card => {
      return card.matched === false;
    });

    if (allMatched === undefined) {
      setAllMatchesFound(true);
      setDisplayText("All Matches Found!");
    }
  }

  function resetGame() {
    const newCardSet = shuffleCards(fullCardList);
    newCardSet.forEach((card) => {
      card.flipped = false;
      card.matched = false;
    });
    setCardList(newCardSet);
    setAllMatchesFound(false);
  }

  return (
    <div className="card-table-background">
      <Table checkingMatch={checkingMatch} cardList={cardList} checkForPair={checkForPair}/>
      <div className="card-table-messages">
        <h2>{displayText}</h2>
        { allMatchesFound &&
          <button onClick={() => resetGame()}>Reset</button>
        }
      </div>
    </div>
  )
}

export default App
