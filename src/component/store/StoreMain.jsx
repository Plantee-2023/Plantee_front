import React, { useState } from 'react'
import "./Store.css";

const StoreMain = () => {

    const [isClickPlant, setClickPlant] = useState(false);
    const [isClickGoods, setClickGoods] = useState(false);

    return (
        <>

            <div className='store_wrap'>
                <div className='store_contents'>

                    <div className='store_filterbtn_group'>

                        <button className='button_hide' onClick={() => { setClickPlant((e1) => !e1); }} >
                            <div className={`${!isClickPlant ? 'store_filterbtn' : 'store_filterbtn_clicked'}`} >
                                <div style={{ verticalAlign: 'middle' }}>식물</div>
                            </div>
                        </button>
                        <button className='button_hide' onClick={() => { setClickGoods((e2) => !e2); }} >
                            <div className={`${!isClickGoods ? 'store_filterbtn' : 'store_filterbtn_clicked'}`} >
                                <div style={{ verticalAlign: 'middle' }}>용품</div>
                            </div>
                        </button>
                        
                    </div>


                    {isClickPlant && (
                        <>
                            <div className='store_filterbtn_group'>
                                <button className='store_filterbtn'>초보자용</button>
                                <button className='store_filterbtn'>중급자용</button>
                                <button className='store_filterbtn'>상급자용</button>
                            </div>
                        </>
                    )}
                    {isClickGoods && (
                        <>
                            <div className='store_filterbtn_group'>
                                <button className='store_filterbtn'>전체</button>
                                <button className='store_filterbtn'>화분</button>
                                <button className='store_filterbtn'>수분</button>
                            </div>
                        </>
                    )}



                </div>
            </div>


        </>
    )
}

export default StoreMain