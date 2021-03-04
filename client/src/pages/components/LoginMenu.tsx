import React from "react";
import {connect} from "react-redux";
import firebase from "firebase";
import "firebase/auth";

import MenuButton from "./MenuButton";

import {signInSomeAuth} from "../../redux/actions/userActions";

import "./styles/LoginMenu.css";

type Props = {
  handleHide: () => void;
  signInSomeAuth: (uid: string) => void;
};

const LoginMenu: React.FC<Props> = (P) => {
  const handleLogin = (str: string) => {
    var provider = (() => {
      switch (str) {
        case "GOOGLE": {
          return new firebase.auth.GoogleAuthProvider();
        }
        case "GITHUB": {
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
          let uid = firebase.auth().currentUser?.uid;
          console.log(uid);
          console.log(res);
          if(uid){
            P.signInSomeAuth(uid);
            P.handleHide();
          } else {
            console.warn("Google Auth failed");
          }
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

export default connect(null, {signInSomeAuth})(LoginMenu);
