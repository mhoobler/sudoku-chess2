const initCell: (index: number, n: number, value?: number) => GridCell =
  (index, n, value = 0) => {
    let N = Math.pow(n, 2);
    let c = index % N;
    let r = Math.floor(index / N);

    let cell: GridCell = {
      column: c,
      row: r,
      box: Math.floor(r / n) * n + (Math.floor(c / n) % n),
      index: index,
      value: value,
      player: 0
    }
    
    return cell;
  }

export const allButTwo = (N: number, _id: string) => {
  let arr = Array.from(Array(N-1).keys());
  console.log(arr);

  let turns: Turn[] = arr.map( (e: number) => {
    return {
      gameID: _id,
      player: (e % 2) ? 1 : 2,
      index: e,
      value: e+1
    }
  });

  return turns
}

class GameClass {
  board: Board;
  cells: Array<GridCell>
  hints: boolean[][];
  n: number
  N: number
  playerTurn: 1 | 2 = 1;
  score: {
    1: number,
    2: number
  } = {1: 0, 2: 0};

  constructor(b: Board) {
    this.n = Math.sqrt(Math.sqrt(b.size));
    this.N = this.n * this.n;
    this.board = b;

    let arr = Array.from(Array(b.size).keys());

    let cells = arr.map( (i: number) => {
      let cell = initCell(i, this.n);
      // console.log(cell);
      return cell;
    });

    this.cells = [...cells];

    this.hints = Array(this.N * this.N)
      .fill( Array(this.N).fill(false) );
      // console.log(this.hints);

    // Test turns
    // this.board.turnArr = allButTwo(this.N, this.board._id);

    for(let t of b.turnArr){
      console.log(t);
      let score = {...this.score}[t.player];

      cells[t.index].value = t.value;
      cells[t.index].player = t.player;
      
      // let autos = this.autoComplete(cells[t.index], t.player);
      // for(let a of autos){
      //   cells[a.index] = a;
      //   score++;
      // }

      this.score[t.player] = score;
    };

    // console.log(cells);
    this.cells = [...cells];

  }

  getRow = (num: number) => {
    let add = num * this.N;
    let row = Array(this.N);
    for(let i=0; i<this.N; i++){
      row[i] = this.cells[i + add];
    }

    return row;
  }

  getColumn = (num: number) => {
    let col = Array(this.N);
    for(let i=0; i<this.N; i++){
      let mul = i*this.N;
      col[i] = this.cells[num + mul];
    }

    return col;
  }

  getBox = (num: number) => {
    let box = Array(this.N);
    // brset // -0 27 54 || -0 64 128 192
    // bcset // -0 -3 -6 || -0 -4 --8 -12
    let brset = Math.floor(num / this.n) * this.n * this.N;
    let bcset = (num % this.n) * this.n;
    let start = brset + bcset;

    for(let brow=0; brow<this.n; brow++){
      for(let bcol=0; bcol<this.n; bcol++){
        let i = (brow * this.n) + bcol;
        let target = start + (brow * this.N) + (bcol);
        box[i] = this.cells[target];
      }
    }

    return box;
  }

  get Rows(): GridMatrix {
    let rows = Array.from(Array(this.N).keys());

    return rows.map( (i: number) => {
      return this.getRow(i);
    })
  }

  get Columns(): GridMatrix {
    let cols = Array.from(Array(this.N).keys());

    return cols.map( (i: number) => {
      return this.getColumn(i);
    })
  }

  get Boxes(): GridMatrix {
    let boxes = Array.from(Array(this.N).keys());

    return boxes.map( (i: number) => {
      return this.getBox(i);
    })
  }


  getBooleanValues = (cell: GridCell) => {

    let vals: boolean[] = Array(this.N + 1).fill(false);
    let row = this.getRow(cell.row).map( (e: GridCell) => {return e.value} );
    let col = this.getColumn(cell.column).map ( (e: GridCell) => {return e.value} );
    let box = this.getBox(cell.box).map( (e: GridCell) => {return e.value} );
    let all = row.concat(col).concat(box);
    let set = Array.from(new Set(all));
    console.log(set);

    for(let i=0; i<this.N; i++){
      if(set[i] !== 0) {
        vals[ set[i] ] = true;
      }
    }
    // console.log(vals);

    // We shift the array here to remove the ZERO value
    // Which would just be an empty cell
    vals.shift();
    return vals;
  }

  //Find sets with only 1 empty cell
  //Find value of empty cell
  //Update cell with value
  //autoComplete cell
  autoComplete: (cell: GridCell, player: 1| 2) => GridCell[] = (cell, player) => {
    let sets = [
      this.getRow(cell.row).filter( (e: GridCell) => {return e.value < 1} ),
      this.getColumn(cell.column).filter( (e: GridCell) => {return e.value < 1} ),
      this.getBox(cell.box).filter( (e: GridCell) => {return e.value < 1} )
    ]
    // console.log(sets);

    let willComplete = sets.filter( (cellArr: GridCell[]) => {
      return cellArr.length === 1;
    })
    // console.log(willComplete);
    let flat = willComplete.flat();
    // console.log(flat);

    if(willComplete.length > 0) {
      let a = flat.map( (e: GridCell) => {
        let value = this.getBooleanValues(e).findIndex( x => x === false) + 1;
        
        this.cells[e.index] = {
          ...this.cells[e.index],
          value: value,
          player: player
        }
        console.log(this.cells[e.index]);
        return this.autoComplete(this.cells[e.index], player);
      }).flat();
      console.log(a);
      return a;
    }
    else
    {
      return [cell];
    }

  }

  testInput = (cell: GridCell, value: number) => {
    let row = this.getRow(cell.row).map( (e: GridCell) => {return e.value} );
    let col = this.getColumn(cell.column).map ( (e: GridCell) => {return e.value} );
    let box = this.getBox(cell.box).map( (e: GridCell) => {return e.value} );

    let vals = row.concat(col).concat(box);

    for(let v of vals){
      if(value === v){
        return false;
      }
    }

    this.cells[cell.index].value = value;
    return true;
  }

}

export default GameClass;

/* 
0  00 01 02 03 04 05 06 07 08
1  09 10 11 12 13 14 15 16 17 
2  18 19 20 21 22 23 24 25 26 
3  27 28 29 30 31 32 33 34 35 
4  36 37 38 39 40 41 42 43 44
5  45 46 47 48 49 50 51 52 53 
6  54 55 56 57 58 59 60 61 62 
7  63 64 65 66 67 68 69 70 71 
8  72 73 74 75 76 77 78 79 80
*/