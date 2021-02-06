export const setBoard = (b: Board) => ({
  type: 'SET_BOARD',
  payload: {
    board: b
  }
})

export const setScore = (player: number, score: number) => ({
  type: 'SET_SCORE',
  payload: {
    score: {
      [player]: score
    }
  }
})

export const setFocus = (num: number) => ({
  type: 'SET_FOCUS',
  payload: {
    focus: num
  }
})