import React from 'react';
import Snake from './Snake';
import Score from './Score';
import useStore from '../store/store';


const Planche = () => {
    const game = useStore()
    return (
        <div className='container-snake'>
            <Snake/>
            <Score/>
        </div>
    );
};

export default Planche;