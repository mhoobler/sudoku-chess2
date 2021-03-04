import React from 'react';

type Props = {
  handleModal: () => void;
}

const Login: React.FC<Props> = (P) => {

  return <div id='login' onClick={P.handleModal}> Login </div>
}

export default Login;
