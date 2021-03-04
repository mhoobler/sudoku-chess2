import React from "react";
import firebase from "firebase";
import "firebase/auth";

import MenuButton from "./MenuButton";

import "./styles/LoginMenu.css";

type Props = {
  handleHide: () => void;
};

const LoginMenu: React.FC<Props> = (P) => {
  const handleLogin = (str: string) => {
    var provider = (() => {
      switch (str) {
        case "GOOGLE": {
          return new firebase.auth.GoogleAuthProvider();
        }
        case "GITHUB": {
          //          return new firebase.auth.GithubAuthProvider();
          return console.warn("Github not enabled");
        }
        default: {
          throw new Error("Authentication Provider Error");
        }
      }
    })();

    if (provider) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          let id = firebase.auth().currentUser?.uid;
          console.log(id);
          console.log(res);
          P.handleHide();
        })
        .catch((err) => console.log(err))
        .finally(P.handleHide);
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <button onClick={P.handleHide}>X</button>
      </div>
      <div className="modal-body">
        <MenuButton action={() => handleLogin("GOOGLE")}>
          <span className="menu-button-icon fa fa-google"></span> Google
        </MenuButton>
        <MenuButton action={() => handleLogin("GITHUB")}>
          <span className="menu-button-icon fa fa-github"></span> Github
        </MenuButton>
      </div>
    </div>
  );
};

export default LoginMenu;
