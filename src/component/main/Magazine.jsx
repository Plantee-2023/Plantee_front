import React, { useEffect } from 'react'
import '../Main.css'
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

const Magazine = () => {
    const [loading, setLoading] = useState(false);

    const getMagazine = () => {
        setLoading(true);
        setLoading(false);
    }
    useEffect(() => {
        getMagazine();
    }, [])

    if (loading) return <div className='text-center'><Spinner size='lg' /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <h1 className='magazine-title'>얘는 무슨 식물이냐?</h1>
                <hr />
                <div className='magazine-count'>조회수 : 0</div>
                <div className='magazine-img'>
                    <img src="/image/what1.jpg" width={900} height={600} />
                </div>
                <h5 className='magazine-text'>얘는 무슨 식물이냐?</h5>
            </div>
        </div>
    )
}

export default Magazine