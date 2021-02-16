import React from 'react';

import Scorecard from './Scorecard';

import './styles/Scoreboard.css';

type Props = {
  players: number[]
  errors: GameErrors
  isTurn: 1 | 2
  isPlayer: 1 | 2
}

const ScoreBoard: React.FC<Props> = (P) => {

  const sum = (acc: number, curr: number) => ( acc + curr );

  // Error.types is an array of strings which contains what errors need to be displayed
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
      case('ZERO_NUM'): {
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
    <div className='game-sidebar-left'>
      <h2>Score</h2>
      {/* Just add all the '1's inside of the player array to get score*/}
      <Scorecard 
      isTurn={P.isTurn === 1}
      isPlayer={P.isPlayer}
      label={1}
      sum={P.players.filter( (e) => e === 1).reduce(sum, 0)}
      />
      {/* Add all the '2's inside the player array and divide to get score */}
      <Scorecard 
      isTurn={P.isTurn === 2}
      isPlayer={P.isPlayer}
      label={2}
      sum={P.players.filter( (e) => e === 2).reduce(sum, 0)/2}
      />
      {
        P.errors.types.map( (e: string, i) => (handleErrors(e, i)) )
      }
    </div>
  )
}


export default ScoreBoard;