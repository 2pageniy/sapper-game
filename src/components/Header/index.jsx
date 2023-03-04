import { useContext } from 'react';
import { GameContext } from '../../context';
import './style.css';

function Header() {
  const {lose, win, setRestart, mines} = useContext(GameContext);

  return (
    <header className="header">
      <div className="mine">{mines}</div>
      <div className={`smile${lose ? ' smile-lose' : ''}${win ? ' smile-win' : ''}`} onClick={() => setRestart(true)}></div>
      <div className="timer">000</div>
    </header>
  );
}

export default Header;
