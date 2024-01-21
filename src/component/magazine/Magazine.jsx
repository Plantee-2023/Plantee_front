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
    const { magazine_num } = useParams();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({
        title: '',
        contents: '',
        image: '',
        view_cnt: '',
        uid: 'admin'
    });
    const { title, view_cnt, image, contents, uid } = post;

    const getMagazine = async () => {
        setLoading(true);
        try {
            const res = await axios(`/magazine/read/${magazine_num}`);
            setPost(res.data);
            setLoading(false);
        } catch (error) {
            alert(error.message);
        }
    }

    const onDelete = () => {
        setBox({
            show: true,
            message: `매거진을 삭제하시겠습니까?`,
            action: async () => {
                await axios.get(`/magazine/delete/${magazine_num}`);
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
        <>
            <div className='mainbanner_section'>
                <img className='banner_img' src="/image/header/Magazine.png" />
            </div>
            <div id="main_wrap">
                <div className="main_contents">
                    <h1 className='magazine-title'>{title}</h1>
                    <hr />
                    <Row>
                        {sessionStorage.getItem("uid") === "admin" &&
                            <Col>
                                <NavLink to={`/magazine/update/${magazine_num}`} className='magazine-update-btn btn'>수정하기</NavLink>
                                <Button onClick={onDelete} className='magazine-update-btn ms-2'>삭제하기</Button>
                            </Col>
                        }
                        <Col>
                            <div className='magazine-count'>조회수 : {view_cnt}</div>
                        </Col>
                    </Row>
                    <div className='magazine-img'>
                        <img src={image || 'http://via.placeholder.com/150x150'} width={900} height={600}></img>
                    </div>
                    <h5 className='magazine-text'>{contents}</h5>
                </div>
            </div>
        </>
    )
}

export default Magazine