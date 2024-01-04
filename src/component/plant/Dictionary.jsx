import React, { useState } from 'react';
import './Plant.css';

const Dictionary = () => {

    const [isBtntoggle, setBtntoggle] = useState(false);

    const toggleSection = () => {
        setBtntoggle(!isBtntoggle);
    };

    return (
        <div className='plant_wrap'>
            <div className='plant_contents'>
                <div className='first_filter_section'>
                    <ul className='filter_list'>
                        <button className='filter_reset_btn' type='button'><img src='/image/reset_icon.png'/></button>
                        <button className='filter_btn' type='button' onClick={toggleSection}>초보자용</button>
                        <button className='filter_btn' type='button' onClick={toggleSection}>중급자용</button>
                        <button className='filter_btn' type='button' onClick={toggleSection}>상급자용</button>
                    </ul>
                </div>
                {isBtntoggle && (
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
                )}

                <div className='plant_count'>
                    <span>총 식물 데이터 : <strong>50</strong> </span>
                </div>
                <div className='plant_list'>
                    <ul className='plant_list_items'>
                        {/* 식물 item */}
                        <div className='plant_list_item'>
                            <a href=''>
                                <div className='plant_image'>
                                    <img src='/image/plant01.jpg'/>
                                </div>
                                <div className='plant_title'>
                                    <h3>화분01</h3>
                                </div>
                            </a>
                        </div>

                        {/* 식물 item */}
                        <div className='plant_list_item'>
                            <a href=''>
                                <div className='plant_image'>
                                    <img src='/image/plant02.jpg'/>
                                </div>
                                <div className='plant_title'>
                                    <h3>화분02</h3>
                                </div>
                            </a>
                        </div>

                        {/* 식물 item */}
                        <div className='plant_list_item'>
                            <a href=''>
                                <div className='plant_image'>
                                    <img src='/image/plant03.jpg'/>
                                </div>
                                <div className='plant_title'>
                                    <h3>화분03</h3>
                                </div>
                            </a>
                        </div>

                        {/* 식물 item */}
                        <div className='plant_list_item'>
                            <a href=''>
                                <div className='plant_image'>
                                    <img src='/image/plant04.jpg'/>
                                </div>
                                <div className='plant_title'>
                                    <h3>화분04</h3>
                                </div>
                            </a>
                        </div>

                        {/* 식물 item */}
                        <div className='plant_list_item'>
                            <a href=''>
                                <div className='plant_image'>
                                    <img src='/image/plant05.jpg'/>
                                </div>
                                <div className='plant_title'>
                                    <h3>화분05</h3>
                                </div>
                            </a>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dictionary