import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Socket } from 'socket.io-client';

type Props = {
  conn: typeof Socket
}

const JoinGame: React.FC<Props> = (P) => {
  
  useEffect( () => {
    P.conn.emit('GET_GAMEs', {message: 'test'}, (x: any) => {
      console.log(x);
    })
  }, [])

  return (
    <div className='menu-container'>
      JoinGame
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    conn: state.test.conn
  }
}

export default connect(mapStateToProps, {})(JoinGame);