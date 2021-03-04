import React, { useState, useEffect } from "react";

import "./styles/FadeModal.css";

type Props = {
  addClass?: string;
  timer: number; //milliseconds
  handleModal: () => void;
};

const FadeModal: React.FC<Props> = (P) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(true);
  }, []);

  const handleHide = () => {
    setDisplay(false);
    setTimeout(() => {
      P.handleModal();
    }, P.timer);
  };

  return (
    <div
      className={`
      modal-test 
      ${display ? "show" : "hide"} 
      `}
      style={{
        transitionDuration: P.timer + "ms",
      }}
      data-modal="modal"
    >
      {React.Children.map(P.children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { handleHide });
        }
        return child;
      })}
    </div>
  );
};

export default FadeModal;
