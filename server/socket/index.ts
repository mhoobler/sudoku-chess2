import {Server as ioServer, Socket} from 'socket.io';
import {Server as httpServer} from 'http';
import Controller from './controller';

import * as Lib from './lib';

type Callback = <T>(t: T) => void;

class SocketHandler {
  io: ioServer;
  rooms: {
    [key: string]: string[]
  } = {}
  constructor(http: httpServer){
    this.io = new ioServer(http);

    this.io.on('connection', (socket: Socket) => {
      const id: string = socket.id;
      console.log('USER CONNECT: ' + id);

      // Initialize new Board and socket room
      socket.on('NEW_GAME', async (message: {size: 81 | 256}, callback: Callback) => {
        let board: NewBoard = {
          playerCreate: 'test',
          size: message.size,
          turnArr: []
        }
        try{

          let x = await Controller({type: 'POST_BOARD', payload: board});
          
          callback(x);

          socket.join( String(x._id) );
          this.rooms[ String(x._id) ] = [id];

        } catch(err) {console.log(err)}
      });

      // Return initalized Boards with less than 2 players
      socket.on('GET_GAMES', async (message: null, callback: Callback) => {
        let notFull = Object.keys(this.rooms).filter( (e: string) => (
          this.rooms[e].length !== 2
        ))
        
        callback( notFull );
      });

      // Return selected Board by _id and join socket room
      socket.on('JOIN_GAME', async (message: {_id: string}, callback: Callback) => {

        try{
          let x = await Controller({type: 'GET_BOARD', payload: message});

          callback(x);

          socket.join( String(x._id) );
          this.rooms[ String(x._id) ].push(id)

          socket.to( String(message._id) ).emit('PLAYER_JOIN', {});
        } catch(err) {console.log(err)}
      });

      // Accept any turn and return updated Board
      socket.on('ADD_TURN', async (message: any) => {
        console.log(socket.rooms);

        try{
          let x = await Controller({type: 'ADD_TURN', payload: message});

          this.io.in( String(x._id) ).emit('UPDATE_TURN', {turnArr: x.turnArr});

        } catch(err) {console.log(err)}

      });

      // Remove empty rooms and handle in-game disconnect issues
      socket.on('disconnect', () => {
        
        Object.keys(this.rooms).forEach( (e: string) => {
          let set = new Set(this.rooms[e]);

          if(set.has(id)){
            this.io.in( e ).emit('USER_QUIT', {});
            delete this.rooms[e]
          }
        });

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