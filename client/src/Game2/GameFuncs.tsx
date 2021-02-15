type getIndexes = (i: number, n: number) => number[]

const funcs = {
  initGrid: (ta: Turn[], n: number) => {
    // console.clear();
    console.time('init');
    let N = n*n;
    let values = new Array(N*N).fill(0);
    let players = new Array(N*N).fill(0);

    /**************************
    The order here is important
    ***************************/
    for(let i=0; i<ta.length; i++){
      let turn = ta[i]
      // First add the turn to the array
      values[turn.index] = turn.value;
      players[turn.index] = turn.player;

      // Then get auto completes
      let autos = funcs.autoComplete(turn.index, values, 3);
      console.log(autos);
      if(autos){
        for(let a of autos){
          if(a.value !== 0){
            values[a.index] = a.value;
            players[a.index] = turn.player;
          }
        }
      }

    }

    console.timeEnd('init');
    return {values, players}
  },
  
  getRow: (index: number, n: number) => {
    let N = n*n;
    let ri = Math.floor(index / N) * N;
    let rowIndexes: number[] = Array.from( Array(N).keys() ).map( (e: number) => {
      return ri+e;
    });
  
    return rowIndexes;
  },
  
  getCol: (index: number, n: number) => {
    let N = n*n;
    let ci = index % N;
    
    let colIndexes: number[] = Array.from( Array(N).keys() ).map ( (e: number) => {
      return ci + (N*e);
    })
  
    return colIndexes;
  },
  
  getBox: (index: number, n: number) => {
    let N = n*n;
    let rstart = Math.floor( index / (N * n));
    let cstart = Math.floor( (index % N) / n);
    let start = (rstart * N * n) + (cstart * n);
    // console.log(start);
  
    let boxIndexes: number[] = [];

    for(let ri=0; ri<n; ri++){
      for(let ci=0; ci<n; ci++){
        boxIndexes.push( (start + ci) + (ri * N) )
      }
    }

    return boxIndexes;
  },

  getGroupSet: (index: number, arr: number[], n: number) => {
    // console.time('getGroupSet');

    let indexes = funcs.getBox(index, n)
      .concat(funcs.getCol(index, n))
      .concat(funcs.getRow(index, n));
    let all = indexes.map( (e: number) => {
      return arr[e]
    })

    let set = new Set(all);

    // console.timeEnd('getGroupSet');
    return set
  },

  testInput: (index: number, arr: number[], n: number, value: number) => {
    let set = funcs.getGroupSet(index, arr, n);

    if(set.has(value)){
      let indexes = Array.from(
        new Set( [
          funcs.getRow(index, n),
          funcs.getCol(index, n),
          funcs.getBox(index, n)
        ].flat() )
      );

      return indexes.filter( (e: number) => (arr[e] === value) )
    }
    else {
      return true;
    }
  },

  // Make this recursive
  // Computer with "primary" digits instead of binary digits
  // 0000 = 0, 0110 = 5*3 0110 = 4+2
  autoComplete: (index: number, arr: number[], n: number, autoArr: AutoComplete[] = []): any => {
    
    let indexes = new Set( [
      funcs.getRow(index, n),
      funcs.getCol(index, n),
      funcs.getBox(index, n)
    ].flat() )

    let found = Array.from(indexes).map( (e: any) => {
      return {
        set: funcs.getGroupSet(e, arr, n),
        index: e
      };
    }).filter( (e) => e.set.size === n*n && arr[e.index] === 0);
    console.log(found);

    if(found.length > 0){

      let newArr = [...arr];

      let autos = found.map( (e) => {
        e.set.delete(0);
        let setArr = Array.from(e.set);
        let boolArr = Array(n*n).fill(false);

        for(let i=0; i<setArr.length; i++){
          boolArr[ setArr[i]-1 ] = true;
        }

        let auto = {
          index: e.index,
          value: boolArr.findIndex( (b: boolean) => (!b) ) + 1
        }

        newArr[auto.index] = auto.value;
        found.forEach( e => e.set.add(auto.value) )

        return auto;
      })

      console.log(autos);
      let bigChungus = autos.map( (e) => {
        return funcs.autoComplete(e.index, newArr, n, [...autoArr, e]);
      });
      let bigSet = new Set(autos.concat(bigChungus).flat())
      return Array.from(bigSet);
    } else {
      return autoArr;
    }

  }
} 


export default funcs;
/*     0        1        2
0  00 01 02 03 04 05 06 07 08
1  09 10 11 12 13 14 15 16 17 
2  18 19 20 21 22 23 24 25 26 
-      3        4        5
3  27 28 29 30 31 32 33 34 35 
4  36 37 38 39 40 41 42 43 44
5  45 46 47 48 49 50 51 52 53 
-      6        7        9
6  54 55 56 57 58 59 60 61 62 
7  63 64 65 66 67 68 69 70 71 
8  72 73 74 75 76 77 78 79 80
*/