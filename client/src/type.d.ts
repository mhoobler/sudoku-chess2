interface NewBoard {
  playerCreate: string;
  playerJoin?: string;
  size: 81 | 256;
  turnArr: Turn[];
}

interface Board extends NewBoard {
  _id: string;
}

type Turn = {
  gameID: string;
  player: 1 | 2;
  index: number;
  value: number;
};

type AutoComplete = {
  index: number;
  value: number;
};

type GridCell = {
  column: number;
  row: number;
  box: number;
  index: number;
  value: number;
  player: 0 | 1 | 2;
};

type GridRow = GridCell[];

type GridMatrix = GridRow[];

type GameErrors = {
  types: string[];
  cells: number[];
};
