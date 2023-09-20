import React, { useEffect, useMemo, useState } from 'react';
import useStore from '../store/store';
import Cell from './Cell';
import Apple from './Apple';
import GridCell from './GridCell';


const Snake = () => {
    const { setDirection, direction, moveSnake, snake, gameInProgress } = useStore()
    const gridCells = useMemo(() => {
        const cells = [];
        for (let y = 0; y < 20; y++) {  // y corresponds to number of rows
            for (let x = 0; x < 18; x++) {  // x corresponds to number of columns
                cells.push(<GridCell key={`${x}-${y}`} x={x} y={y} />);
            }
        }
        return cells;
    }, []);
    

    useEffect(() => {
        let interval;
        if(gameInProgress) {
          interval = setInterval(() => {
            moveSnake()
          }, 150);
        }
        
        return () => clearInterval(interval);
      }, [moveSnake, gameInProgress]);
    
    const handleKeyDown = (event) => {
        switch(event.key) {
            case 'ArrowUp':
                setDirection('UP')
                break;
            case 'ArrowDown':
                setDirection('DOWN')
                break;
            case 'ArrowLeft': 
                setDirection('LEFT')
                break;
            case 'ArrowRight':
                setDirection('RIGHT')
                break;
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])


    return (
        <div className='planche'>
            <Apple/>
            {gridCells}
       
                {snake.map((segment, index) => (
                    <Cell index={index} key={index} x={segment.x} y={segment.y} snakeLength={snake.length} direction={direction} />
                ))}
        </div>
    );
};

export default Snake;