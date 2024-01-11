import React, { useEffect } from 'react'
import axios from 'axios';
import './Magazine.css'
import { useState } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';

const Magazine = () => {
    const { post_id } = useParams();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({
        title: '',
        image: '',
        view_cnt: '',
        contents: ''
    });
    const { title, image, view_cnt, contents } = post;
    const getMagazine = async () => {
        setLoading(true);
        const res = await axios.get('/magazine/read/' + post_id);
        setPost(res.data);
        console.log(res.data);
        setLoading(false);
    }
    useEffect(() => {
        getMagazine();
    }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <h1 className='magazine-title'>{title}</h1>
                <hr />
                <Row>
                    {sessionStorage.getItem("uid") === "admin" &&
                        <Col>
                            <NavLink to={`/magazine/update/${post_id}`} className='magazine-update-btn btn'>수정하기</NavLink>
                        </Col>
                    }
                    <Col>
                        <div className='magazine-count'>조회수 : {view_cnt}</div>
                    </Col>
                </Row>
                <div className='magazine-img'>
                    <img width={900} height={600}></img>
                </div>
                <h5 className='magazine-text'>{contents}</h5>
            </div>
        </div>
    )
}

export default Magazine