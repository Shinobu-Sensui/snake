import React, { useEffect, useState } from 'react';
import useStore from '../store/store';
import { msToTime } from '../util/util';

const Score = () => {
    const {game, gameInProgress, startGame, resetGame, stopGame, stateGame, setStateGame} = useStore();
    const [elapsedTime, setElapsedTime] = useState(0);
    const [displayedScore, setDisplayedScore] = useState(0);

    const action = () => {
        if (gameInProgress) {
          return {
            action: () => {
              stopGame(elapsedTime);
              setStateGame({state:"En pause", value: stateGame.value + 1});
            }, 
            className:"active"
          };
        } else {
          return {
            action: () => {
              startGame()
              if (stateGame.value === 1) {
                setStateGame({state:"Premier jeu", value: stateGame.value + 1});
              } else {
                setStateGame({state:"En jeu", value: stateGame.value + 1});
              }
            },
            className:"stop"
          };
        }
      }
      



    useEffect(() => {
        if (gameInProgress) {
            setDisplayedScore(game.apple);
        } else if (!gameInProgress) {
            setDisplayedScore(0);
        }
    }, [game.apple, gameInProgress]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (gameInProgress) {
             setElapsedTime(Date.now() - game.time);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [gameInProgress]);

    return (
        <div className='score'>
            <div className="time">{msToTime(elapsedTime)}</div>
            <div className="pomme">{displayedScore}</div>
            <div className='state'>{stateGame.state}</div>
            <button className={`action ${action().className}`}  onClick={ action().action}>
        {gameInProgress ? 'Pause' : 'Play'}
        </button>
        </div>
    );
};

export default Score;
