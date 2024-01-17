import React, { useState } from 'react';
import './Plant.css';

const Dictionary = () => {

    return (
        <div className='plant_wrap'>
            <div className='plant_contents'>
                <div className='first_filter_section'>
                    <ul className='filter_list'>
                        <button className='filter_reset_btn' type='button'><img src='/image/reset_icon.png'/></button>
                        <button className='filter_btn' type='button'>초보자용</button>
                        <button className='filter_btn' type='button'>중급자용</button>
                        <button className='filter_btn' type='button'>상급자용</button>
                    </ul>
                </div>
                <div className='second_filter_section'>
                    <div className='filter_division'></div>
                    <ul className='filter_list'>
                        <button className='filter_btn' type='button'>잎</button>
                        <button className='filter_btn' type='button'>꽃</button>
                        <button className='filter_btn' type='button'>열매</button>
                        <button className='filter_btn' type='button'>다육/선인장</button>
                        <button className='filter_btn' type='button'>실내</button>
                        <button className='filter_btn' type='button'>실외</button>
                        <button className='filter_btn' type='button'>반려안전</button>
                        <button className='filter_btn' type='button'>식용</button>
                    </ul>
                </div>

                <div className='plant_count'>
                    <span>총 식물 데이터 : <strong>50</strong> </span>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Dictionary