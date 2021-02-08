import {Server as ioServer, Socket} from 'socket.io';
import {Server as httpServer} from 'http';
import Controller from './controller';
import Board from '../models/Game/Board'

class SocketHandler {
  io: ioServer;
  roomByPlayer: {
    [key: string]: string
  } = {};
  playersByRoom: {
    [key: string]: [string]
  } = {};

  constructor(http: httpServer){
    this.io = new ioServer(http);

    this.io.on('connection', (socket: Socket) => {
      const id: string = socket.client.conn.id;
      console.log(id);

      socket.on('GET_BOARD', async (message: any) => {
        Controller({type: 'GET_BOARD', payload: message});
      });

      socket.on('NEW_GAME', async (message: any, callback: any) => {
        //Create Game & Board
        let board: NewBoard = {
          playerCreate: 'test',
          size: message.size,
          turnArr: []
        }
        try{

          let x = await Controller({type: 'POST_BOARD', payload: board});
        
          //Create room
          
          callback(x);

          this.roomByPlayer[id] = x._id;
          this.playersByRoom[x._id] = [id];
          socket.join(x._id);

        } catch(err) {console.log(err)}
      });

      socket.on('GET_GAMES', async (message: any, callback: any) => {
        console.log(Object.keys(this.playersByRoom));
        callback( Object.keys(this.playersByRoom) );
      })

      socket.on('JOIN_GAME', async (message: any, callback: any) => {

      })

      socket.on('ADD_TURN', async (message: any, callback: any) => {
        console.log(message);

        try{
          let x = await Controller({type: 'ADD_TURN', payload: message});
        
          // console.log(x);
          console.log(this.roomByPlayer[id]);
          this.io.in(this.roomByPlayer[id]).emit('UPDATE_TURN', {turnArr: x.turnArr});

        } catch(err) {console.log(err)}

      })
    })
  }

}


//Move these types later
interface NewBoard {
  playerCreate: string,
  playerJoin?: string,
  size: 81 | 256,
  turnArr: Turn[]
}

type Turn = {
  gameID: string,
  player: 1 | 2,
  target: number,
  value: number
}

export default SocketHandler;