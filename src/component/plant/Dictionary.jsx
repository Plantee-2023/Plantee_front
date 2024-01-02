import React from 'react';
import './Plant.css';

const Dictionary = () => {
    return (
        <div className='plant_wrap'>
            <div className='plant_contents'>
                <div className='plant_filterbtn_group'>
                    <button className='plant_filterbtn1'>↺</button>
                    <button className='plant_filterbtn2'>초보자용</button>
                    <button className='plant_filterbtn3'>중급자용</button>
                    <button className='plant_filterbtn4'>상급자용</button>
                </div>
                <div className='plant_filterbtn_group2'>
                    <button className='plant_filterbtn2'>초보자용</button>
                    <button className='plant_filterbtn3'>중급자용</button>
                    <button className='plant_filterbtn4'>상급자용</button>
                    <button className='plant_filterbtn4'>상급자용</button>
                </div>
            </div>
        </div>
    )
}

export default Dictionary