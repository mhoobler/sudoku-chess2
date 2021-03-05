import React from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";

import MenuButton from "./MenuButton";

import { signInSomeAuth } from "../../redux/actions/userActions";

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
        default: {
          window.alert(
            "Sorry there was an error with the authetication process"
          );
        }
      }
    })();

    if (provider) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          let uid = firebase.auth().currentUser?.uid;

          if (uid) {
            P.signInSomeAuth(uid);
            P.handleHide();
          } else {
            console.warn("Did not receive uid");
          }
        })
        .catch((err) => {
          window.alert(
            "Sorry there was an error with the Google provier process"
          );
          console.log(err);
        })
        .finally(P.handleHide);
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <button className="fa fa-arrow-left" onClick={P.handleHide}></button>
        <h4>Login</h4>
      </div>
      <div className="modal-body">
        <MenuButton action={() => handleLogin("GOOGLE")}>
          <span className="menu-button-icon fa fa-google"></span> Google
        </MenuButton>
      </div>
    </div>
  );
};

export default connect(null, { signInSomeAuth })(LoginMenu);
