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

  const set = Array.from(GameFuncs.getSet1(P.index, P.values, P.n));
  let arr = Array(P.n * P.n).fill(false);
  
  for(let x of set){
    if(x > 0){
      arr[x-1] = true
    }
  }

  // console.log(arr);

  return(
    <div className={`hint-cell-${P.n}`}>
      {arr.map( (e: boolean, i: number) => {
        return e ? <div key={i}>{i+1}</div> : <div key={i}>{'\xa0'}</div>
      })}
    </div>
  )
}

export default HintCell;