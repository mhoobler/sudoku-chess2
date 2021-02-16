import React from 'react';
import {Link} from 'react-router-dom';

import './styles/MenuButton.css';

type Props = {
  action: string | ( ( e?: any)  => void )
  text: string
}

const MenuButton: React.FC<Props> = (P) => {

  if(typeof P.action === 'string'){

    return (
      <Link
      className='menu-button'
      to={P.action}> 
        {P.text} 
      </Link>
    )

  } else {

    return (
      <button
      className='menu-button'
      onClick={P.action}
      >
        {P.text}
      </button>
    )

  }
}

export default MenuButton;