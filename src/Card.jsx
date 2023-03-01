import './Card.scss'
import cardBack from './images/MonsterCardBack.png';

function Card(props) {
  return (
    <div className={`Card ${props.flipped ? "card-disabled" : ""}`} data-pair-id={props.pairId} onClick={(event) => props.checkForPair(event, props.index)}>
      { props.flipped &&
        <div className="card-front">
          <img src={props.image}/>
        </div>
      }
      { props.flipped === false &&
        <div className="card-back">
          <img src={cardBack}/>
        </div>
      }
    </div>
  )
}

export default Card
