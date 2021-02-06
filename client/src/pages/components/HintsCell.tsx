import React from 'react';
import GameClass from '../GameClass';

type H = {
  v: string | number
  size: number
}

const Hint: React.FC<H> = (P) => {
  return (
    <div
    className={`hint hint-size-${P.size}`}
    >
      {P.v}
    </div>
  )
}

type HR = {
  row: Array<boolean>
  add: number
  size: number
  hintStyle: 'default' | 'inverse'
}

const HintRow: React.FC<HR> = (P) => {
  return (
    <div className='hints-row'>
    {P.row.map( (b: boolean, i: number) => {
      return (
        <Hint
        key={i}
        size={P.size}
        v={
          P.hintStyle === 'default' ?
            b ? i + P.add + 1 : `\xa0`
          :
            b ? `\xa0` : i + P.add + 1
        }
        />)
    })}
    </div>

  )
}

interface Props {
  cell: GridCell
  grid: GameClass
  handleTurn: (cell: GridCell, value: number) => void
  focus: number
  hintStyle: 'default' | 'inverse'
}

const HintsCell: React.FC<Props> = (P) => {

  const bools: any = P.grid.getBooleanValues(P.cell);
  const rows = bools.reduce( (rows: Array<Array<boolean>>, b: boolean, i: number) => (
    i % P.grid.n === 0 ?
    rows.push([b])
    :
    rows[rows.length-1].push(b)
  ) && rows, []);

  return (
    <div className='hints-cell'>
      {rows.map( (row: Array<boolean>, i: number) => {
        return (
          <HintRow 
          key={i} 
          row={row} 
          add={i * P.grid.n} 
          size={P.grid.n}
          hintStyle={P.hintStyle}
          />
        )
      })}
    </div>
  )
}

export default HintsCell;