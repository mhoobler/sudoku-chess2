import React from 'react';

type Props = {
  score: {
    1: number,
    2: number
  }
}

const GameScore: React.FC<Props> = (P) => {

  return(
    <div id='score-container'>
      <h3>Score</h3>
      <div> Player 1: <span>{P.score[1]}</span></div>
      <div> Player 2: <span>{P.score[2]}</span></div>
    </div>
  )
}

export default GameScore;