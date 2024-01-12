import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import './Magazine.css'
import { useState } from 'react';
import { Spinner, Row, Col, Button } from 'react-bootstrap';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { BoxContext } from '../common/BoxContext'

const Magazine = () => {
    const navi = useNavigate();
    const { box, setBox } = useContext(BoxContext);
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
        setLoading(false);
    }
    const onDelete = () => {
        setBox({
            show: true,
            message: `매거진을 삭제하시겠습니까?`,
            action: async () => {
                await axios.get(`/magazine/delete/${post_id}`);
                setBox({
                    show: true,
                    message: "삭제 완료되었습니다."
                })
                navi(`/magazine/magazineList`);
            }
        })
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
                            <Button onClick={onDelete} className='magazine-update-btn ms-2'>삭제하기</Button>
                        </Col>
                    }
                    <Col>
                        <div className='magazine-count'>조회수 : {view_cnt}</div>
                    </Col>
                </Row>
                <div className='magazine-img'>
                    <img src={image ||'http://via.placeholder.com/150x150'} width={150} height={150}></img>
                </div>
                <h5 className='magazine-text'>{contents}</h5>
            </div>
        </div>
    )
}

export default Magazine