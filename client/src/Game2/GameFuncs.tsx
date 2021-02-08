type getSet = (i: number, n: number) => number[]

const funcs = {
  initGrid: (ta: Turn[], n: number) => {
    console.time('init');
    let N = n*n;
    let values = new Array(N*N).fill(0);
    let players = new Array(N*N).fill(0);

    /**************************
    The order here is important
    could change it in the future
    ***************************/
    for(let i=0; i<ta.length; i++){
      let turn = ta[i]
      // First add the turn to the array
      values[turn.index] = turn.value;
      players[turn.index] = turn.player;

      // Then get auto completes
      let x = funcs.autoComplete(turn.index, values, n);
      // console.log(x);
      for(let a of x){
        values[a.index] = a.value;
        players[a.index] = turn.player;
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

  getSet1: (index: number, arr: number[], n: number) => {
    // console.time('getSet1');

    let indexes = funcs.getBox(index, n)
      .concat(funcs.getCol(index, n))
      .concat(funcs.getRow(index, n));
    let all = indexes.map( (e: number) => {
      return arr[e]
    })

    let set = new Set(all);

    // console.timeEnd('getSet1');
    return set
  },

  testInput: (index: number, arr: number[], n: number, value: number) => {
    let set = funcs.getSet1(index, arr, n);

    return !set.has(value);
  },

  // "sort through indexes" and get if any of those cells have only 1 possible value
  // right now this is "sorting through sets" to see if any sets have only 1 possible value
  _hasOne: ( func: getSet, index: number, n: number, arr: number[] ): AutoComplete | false => {
    let f = (e: number) => {return arr[e]};
    let indexes = func(index, n);
    let set = new Set(indexes.map(f));
    set.delete(0);
    
    if(set.size === n*n-1){
      let setArr = Array.from(set);
      let bools = Array(n*n).fill(false);
      let needsVal = 0;
      let ind = 0;

      setArr.forEach( (e) => bools[e-1] = true);
      bools.forEach( (e, i) => { if(!e) needsVal = i+1 });
      indexes.forEach( (e) => { if(arr[e] === 0) ind = e });
      // console.log(bools);

      return {value: needsVal, index: ind}
    } else {
      return false;
    }
  },

  // Make this recursive
  // Computer with "primary" digits instead of binary digits
  // 0000 = 0, 0110 = 5*3 0110 = 4+2
  autoComplete: (index: number, arr: number[], n: number): any => {
    let funcArr = [funcs.getBox, funcs.getCol, funcs.getRow];
    let autoVals = funcArr.map( (e: getSet) => {
      return funcs._hasOne(e, index, n, arr);
    })
    .filter( (e) => (e !== false) );
    let newArr = [...arr];    

    let hasMore = autoVals.map( (e) => {
      if(e !== false){
        newArr[e.index] = e.value;
        let x = funcs.autoComplete(e.index, newArr, e.value);
        // console.log(x);
        return x;
      }
    });

    return autoVals.concat(hasMore).flat();
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