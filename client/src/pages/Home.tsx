import React from 'react';

import MenuButton from './components/MenuButton';

import './styles/MenuContainer.css';

const Home: React.FC = () => {

  return (
    <div className='menu-container'>

      <MenuButton
      action={'/create'}
      text={'Create Game'}
      />

      <MenuButton
      action={'/join'}
      text={'Join Game'}
      />

      <MenuButton
      action={'/join'}
      text={'Test'}
      />
    </div>
  )
}

export default Home;