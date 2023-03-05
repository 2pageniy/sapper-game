import { useContext } from 'react';
import classNames from 'classnames';
import './style.css';
import { GameContext } from '../../context';

function Header() {
  const {
    gameResult, 
    setRestart, 
    mines, 
    seconds, 
    clicked
  } = useContext(GameContext);

  const classNameSmile = classNames('smile', gameResult, {'smile-clicked': clicked && !gameResult});

  return (
    <header className='header'>
      <div className='mine'>
        <div className={`pos pos-${Math.floor(mines / 100)}`} />  
        <div className={`pos pos-${Math.floor(mines / 10 % 10)}`} />  
        <div className={`pos pos-${Math.floor(mines % 10)}`} />  
      </div>
      <div className={classNameSmile} onClick={() => setRestart(true)}></div>
      <div className='timer'>
        <div className={`pos pos-${Math.floor(seconds / 100)}`} />  
        <div className={`pos pos-${Math.floor(seconds / 10 % 10)}`} />  
        <div className={`pos pos-${seconds % 10}`} />
      </div>
    </header>
  );
}
export default Header;
