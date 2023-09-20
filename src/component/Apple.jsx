import React from 'react';
import useStore from '../store/store';

const Apple = () => {
  const { apple } = useStore();

  return (
      <div className='apple' style={{
          gridColumnStart: apple.x + 1,
          gridRowStart: apple.y + 1,
          gridColumnEnd: apple.x + 2,
          gridRowEnd: apple.y + 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
      }}/>
  );
};

export default Apple;