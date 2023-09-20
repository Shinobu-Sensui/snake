import React from 'react';

const GridCell = ({ x, y }) => {
    let cellClass = ((x + y) % 2 === 0) ? "grid-cell even" : "grid-cell odd";

    return (
        <div 
            className={cellClass}
            style={{
                gridColumnStart: x + 1,
                gridRowStart: y + 1,
                gridColumnEnd: x + 2,
                gridRowEnd: y + 2
            }}
        />
    );
};

export default GridCell;
