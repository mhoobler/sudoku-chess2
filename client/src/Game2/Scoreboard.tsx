import React from 'react';

type Props = {
  players: number[]
  errors: GameErrors
}

const ScoreBoard: React.FC<Props> = (P) => {

  const sum = (acc: number, curr: number) => ( acc + curr );
  const handleErrors = (e: string, i: number) => {
    switch(e){
      case('BAD_INPUT'): {
        return (
          <div key={i} className='error'>
            Move was blocked by {P.errors.cells.length > 1 ? 'cells' : 'cell'}:{'\xa0'}
            {P.errors.cells.map( (e: number, i: number) => {
              return <span key={i}>{P.errors.cells.length-1 !== i ? (e + ',\xa0') : e}</span>
            })}
          </div>
        )
      }
      case('NOT_TURN'): {
        return (
          <div key={i} className='error'>
            It's not your turn
          </div>
        )
      }
      case('BIG_NUM'): {
        return (
          <div key={i} className='error'>
            Number must be less than {Math.sqrt(P.players.length) + 1}
          </div>
        )
      }
      case('NEG_NUM'): {
        return (
          <div key={i} className='error'>
            Number must be greater than 0
          </div>
        )
      }
      default: {
        return (
          <div key={i} className='error'>
            Error
          </div>
        )
      }
    }
  }

  return (
    <div className='game-sidebar'>
      <h4>Score</h4>
      <div>Player 1: {P.players.filter( (e) => e === 1).reduce(sum, 0)}</div>
      <div>Player 2: {P.players.filter( (e) => e === 2).reduce(sum, 0)/2}</div>

      {
        P.errors.types.map( (e: string, i) => (handleErrors(e, i)) )
      }
    </div>
  )
}


export default ScoreBoard;