import './Table.scss'
import Card from './Card.jsx'

function Table(props) {
  return (
    <div className={`card-grid ${props.checkingMatch ? "card-grid-disabled": ""}`} >
        {
          props.cardList.map((card, index) => (
            <Card key={index} image={card.name} index={index} pairId={card.pairId} matched={card.matched} flipped={card.flipped} checkForPair={props.checkForPair}/>
          ))
        }
        
      </div>
  )
}

export default Table
