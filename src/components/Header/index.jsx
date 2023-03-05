import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../context';
import './style.css';

function Header() {
  const {lose, win, setRestart, mines, seconds} = useContext(GameContext);

  return (
    <header className="header">
      <div className={`mine`}>
        <div className={`pos pos-${Math.floor(mines / 100)}`} />  
        <div className={`pos pos-${Math.floor(mines / 10 % 10)}`} />  
        <div className={`pos pos-${Math.floor(mines % 10)}`} />  
      </div>
      <div className={`smile${lose ? ' smile-lose' : ''}${win ? ' smile-win' : ''}`} onClick={() => setRestart(true)}></div>
      <div className="timer">
        <div className={`pos pos-${Math.floor(seconds / 100)}`} />  
        <div className={`pos pos-${Math.floor(seconds / 10 % 10)}`} />  
        <div className={`pos pos-${seconds % 10}`} />
      </div>
    </header>
  );
}
export default Header;
