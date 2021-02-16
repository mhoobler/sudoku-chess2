import React from 'react';

import GameFuncs from './GameFuncs';

import './styles/HintCell.css';

type Props = {
  index: number
  n: number
  values: number[]
}

const HintCell: React.FC<Props> = (P) => {
  // console.log('HINT: ' + P.index);

  // This array is created from a set, and stores the valid inputs for this cell as integers
  const set = Array.from(GameFuncs.getGroupSet(P.index, P.values, P.n));
  // We need n^2 hints so we create a n^2 array of booleans
  let arr = Array(P.n * P.n).fill(false);
  // Go through set and flip the necessary booleans
  for(let x of set){
    if(x > 0){
      arr[x-1] = true
    }
  }

  // map array and either give an integer or whitespace
  return(
    <div className={`hint-cell hint-cell-${P.n}`}>
      {arr.map( (e: boolean, i: number) => {
        return e ? <div key={i}>{i+1}</div> : <div key={i}>{'\xa0'}</div>
      })}
    </div>
  )
}

export default HintCell;