import React from 'react';


const Cell = (({index, x, y, snakeLength}) => {
    let snakeClass;
    if (index === 0) {
        snakeClass = 'head';
    } else if (index === snakeLength - 1) {
        snakeClass = 'tail';
    } else {
        snakeClass = 'body';
    }

    return <div
        className={`cell ${snakeClass}`}
        style={{
            gridColumnStart: x + 1,
            gridRowStart: y + 1,
            gridColumnEnd: x + 2,
            gridRowEnd: y + 2
        }}
    >
    {
        index === 0 &&(
            <div className='eyes'>
                <div className={`eyesLeft`}>*</div>
                <div className={`eyesRight`}>*</div>
            </div>
        )
    }

    </div>
})


export default Cell;
