export const setBoard = (b: Board, p: 1 | 2) => ({
  type: 'SET_BOARD',
  payload: {
    board: b,
    isPlayer: p
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

export const setTurnArr = (ta: Turn[]) => ({
  type: 'SET_TURNS',
  payload: {
    turnArr: ta
  }
})