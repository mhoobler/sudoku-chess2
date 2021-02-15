import React, { useState, useEffect } from 'react';
import './styles/GameCell.css';

type Props = {
  player: number
  value: number
  index: number
  n: number
  handleTurn: (i: number, v: number) => boolean
}

const InputCell: React.FC<Props> = (P) => {
  const [value, setValue] = useState<number>(P.value);

  const remove = (el: any) => {
    el.removeEventListener('keyup', test);
  }

  const test = (evt: any) => {
    console.log(evt);
    if( (evt as unknown as KeyboardEvent).key === 'Enter') {
      console.log(value);
      let x = P.handleTurn(P.index, value);
      if(x) { remove(evt.currentTarget) };
      evt.Handled = true;
    }
  }

  useEffect( () => {
    let x = document.getElementsByClassName('infocus');
    if(x[0]){
      x[0].addEventListener('keyup', test);
    }

  }, [value])

  return (
    <input
    className={`input-cell ${P.value === 0 ? 'infocus' : 'nofocus'}`}
    type='number'
    min={0}
    max={P.n * P.n}
    value={P.value > 0 ? Number(P.value).toString() : Number(value).toString()}
    onChange={ 
      (evt) => {
        let val = parseInt(evt.currentTarget.value);
        console.log(val);
        setValue(val);
      }
    }
    disabled={P.value > 0}
    />
  )
}


export default InputCell;