import React, { useEffect } from 'react'
import axios from 'axios';
import './Magazine.css'
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

const Magazine = () => {
    const [loading, setLoading] = useState(false);
    const [magazine, setMagazine] = useState([]);

    const getMagazine = async () => {
        setLoading(true);
        const res = await axios.get(`/magazine/list.json`);
        setMagazine(res.data.list);
        setLoading(false);
    }
    useEffect(() => {
        getMagazine();
    }, [])

    if (loading) return <div className='text-center'><Spinner size='lg' /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                {magazine.map(m =>
                    <>
                        <h1 className='magazine-title'>{m.title}</h1>
                        <hr />
                        <div className='magazine-count'>조회수 : {m.view_cnt}</div>
                        <div className='magazine-img'>
                            <img width={900} height={600}>{m.image}</img>
                        </div>
                        <h5 className='magazine-text'>{m.contents}</h5>
                    </>
                )}
            </div>
        </div>
    )
}

export default Magazine