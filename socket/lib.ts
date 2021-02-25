export type Action = {
  type: string;
  payload: any;
};

export type GAME = {
  id?: string;
  name: string;
};

export interface NewBoard {
  playerCreate: string;
  playerJoin?: string;
  size: 81 | 256;
  turnArr: Turn[];
}

export interface Board extends NewBoard {
  _id: string;
}

export type Turn = {
  gameID: string;
  player: 1 | 2;
  index: number;
  value: number;
};
