import React from 'react';

type Props = {
  label: 1 | 2
  isPlayer: 1 | 2,
  sum: number,
  isTurn: boolean
}

const Scorecard: React.FC<Props> = (P) => {

  return (
    <div className='score-card'>
     
      <div className={`player-dot player-${P.label} ${P.isTurn ? 'isturn': null}`}>&nbsp;</div>
      <h4 className={`player-label`}>
        {P.isPlayer === P.label ? 'You' : 'Them'}:&nbsp;
        {P.sum}
      </h4>
    </div>
  )
}

export default Scorecard;