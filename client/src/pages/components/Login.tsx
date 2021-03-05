import React from "react";

type Props = {
  handleModal: (() => void) | false;
};

const Login: React.FC<Props> = (P) => {
  if (!P.handleModal) {
    return <div id="login"> Signed in </div>;
  }
  return (
    <div id="login" onClick={P.handleModal}>
      {" "}
      Login{" "}
    </div>
  );
};

export default Login;
