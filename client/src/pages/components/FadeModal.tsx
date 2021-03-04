import React, {useState, useEffect} from 'react';

import './styles/Test.css';

type Props = {
  addClass?: string
  timer: number //milliseconds
  handleModal: (b?: boolean) => void
}

const FadeModal: React.FC<Props> = (P) => {

  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(false);

  useEffect( () => {
    handleShow();
  },[]);

  const handleShow = () => {
    setActive(true);
    setDisplay(true);
    setTimeout( () => {
      setActive(false);
    }, P.timer);
  }

  const handleHide = () => {
    setActive(true);
    setDisplay(false);
    setTimeout( () => {
      setActive(false);
      P.handleModal();
    }, P.timer);
  }

  return(
    <div className={`
      modal-test 
      ${display ? 'show' : 'hide'} 
      ${active ? 'active' : '' }
      `}
      style={{
        transitionDuration: P.timer + 'ms'
      }}
      onClick={display ? handleHide : handleShow}
    >
      <div className='modal-body'>
        FadeModal
      </div>
    </div>
  )
}

export default FadeModal;
