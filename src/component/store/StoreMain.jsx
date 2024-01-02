import React, { useState } from 'react'
import "./Store.css";

const StoreMain = () => {

    const [isClick, setClick] = useState(false);

    return (
        <>

            <div className='store_wrap'>
                <div className='store_contents'>


                    <button
                        onClick={() => {
                            // setCheck로 state값을 변경해주자.
                            // e로 상태값을 받아왔다. 클릭시 상태값은 !상태값이므로 값이 반전된다 false -> true
                            setClick((e) => !e);
                        }}
                    >
                        <div style={{ background: !isClick ? "red" : "blue" }} >
                        {isClick ? "식물" : "식물"}
                        </div>
                    </button>


                    {isClick && (
                        <p>
                            <div className='store_filterbtn_group2'>
                                <button className='store_filterbtn2'>초보자용</button>
                                <button className='store_filterbtn3'>중급자용</button>
                                <button className='store_filterbtn4'>상급자용</button>
                                <button className='store_filterbtn4'>상급자용</button>
                            </div>
                        </p>
                    )}



                    <div className='store_filterbtn_group'>
                        <button className='store_filterbtn1'>↺</button>
                        <button className='store_filterbtn2'>신상</button>
                        <button className='store_filterbtn2'>식물</button>
                        <button className='store_filterbtn3'>용품</button>
                    </div>
                    <div className='store_filterbtn_group2'>
                        <button className='store_filterbtn2'>초보자용</button>
                        <button className='store_filterbtn3'>중급자용</button>
                        <button className='store_filterbtn4'>상급자용</button>
                        <button className='store_filterbtn4'>상급자용</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default StoreMain