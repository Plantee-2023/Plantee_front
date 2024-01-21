import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Card, FormControl, Button, Pagination, ProgressBar, Row, NavLink, Image } from 'react-bootstrap'
import Comm_coment from '../Comm_coment'
import "../Community.css"
import Comm_share from '../Comm_share'
import { useParams, useNavigate } from 'react-router-dom'
import { FaRegThumbsUp } from "react-icons/fa";
import Chat_modal from './Chat_modal';
import { TiHeart } from "react-icons/ti";

const Market_read = () => {
    const navi = useNavigate();
    const { post_id } = useParams();
    const [post, setPost] = useState('');
    const [mylikes, setMylikes] = useState(0);
    const { red_date, title, contents, address, nickname, uid, price, user_photo, address1 } = post;
    const getPost = async () => {
        const res = await axios(`/comm/info/${post_id}?uid=${sessionStorage.getItem("uid")}`);
        setMylikes(res.data.mylikes);
        console.log(".........", res.data.read)
        setPost(res.data.read);
    }

    useEffect(() => {
        getPost();
    }, []);

    const handleGoBack = () => {
        navi(-1); // 이전 페이지로 이동
    };

    const onDelete = async (post_id) => {
        if (window.confirm(`${post_id}번 글을 삭제하시겠습니까?`)) {
            await axios.post('/comm/delete', { post_id: post.post_id });
            alert("게시글이 삭제되었습니다.");
            handleGoBack();
        }
    }

    //좋아요 //
    const onClickLike = async () => {
        if (!sessionStorage.getItem("uid")) {
            sessionStorage.setItem("target", `/comm/info/${post_id}`);
            window.location.href = "/login";
        } if (mylikes > 0) {
            alert("이미 좋아요 하셨습니다.");
        }
        else {
            //좋아요추가
            await axios(`/comm/insert/favorites?post_id=${post_id}&uid=${sessionStorage.getItem("uid")}`);
            alert("좋아요추가!");
            getPost();
        }
    }

    const onClickDeleteLike = async () => {
        await axios(`/shop/delete/favorites?uid=${sessionStorage.getItem("uid")}&post_id=${post_id}`);
        alert("좋아요삭제!");
        getPost();
    }

    return (
        <>
            <div className='mainbanner_section'>
                <img className='banner_img' src="/image/header/Transaction.png" />
            </div>
            <div className='community_wrap'>
                <div className='community_contents'>
                    <Row className='justify-content-center'>
                        <Col xs lg={15}>
                            <div className='market_btn_section'>
                                <div className='comm_backbtn'>
                                    <a href='/comm/market'>목록</a>
                                </div>
                                {sessionStorage.getItem("uid") === uid &&
                                    <div>
                                        <a href={`/comm/market/update/${post_id}`} className='btn btn-success mx-4 me-2' >수정</a>
                                        <Button onClick={() => onDelete(post_id)} className='btn btn-outline-success' variant="outline-success">삭제</Button>
                                    </div>
                                }
                            </div>
                            <Card className='p-5'>
                                <div style={{ padding: "100px" }}>
                                    <h4 className="text-center" style={{ "font-weight": "bold" }}>[{address1}] {title} </h4>
                                    <Row>
                                        <Col lg={3} xs={5} md={4} className='align-self-center'>
                                            <div className='mt-1'>
                                                <Image src={user_photo} roundedCircle width="80%" />
                                            </div>
                                        </Col>
                                        <Col className='px-3 text-start' >
                                            <h5> </h5>
                                            <hr />
                                            <div>
                                                <Col className='details_subtitle ms-4'>가격:
                                                    {!price === 0 ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "무료나눔"}</Col>
                                            </div>
                                            <hr />
                                            닉네임 : [아이콘 png] {nickname}({uid})
                                            <div  >작성일 : 2023.12.31 </div>
                                            <div  >추천 :1 </div>
                                            <hr />
                                            <div className='comm_read_share'>
                                                <p className='me-2'>공유하기 : <Comm_share /> </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                            <div className='text-center' dangerouslySetInnerHTML={{ __html: contents }}></div>
                                            <br />
                                        </Col>
                                    </Row>
                                    <div className='comm_read_like' style={{ width: "90px", height: "90px", padding: "15px", borderWidth: '1px', borderRadius: '50px', border: '1px solid #ddd' }}>
                                        <div className='text-center'>
                                            <span className='comm_read_cnt' style={{ cursor: 'pointer' }}>{post.like_cnt}</span><br />
                                            <FaRegThumbsUp style={{ fontSize: "30px" }} onClick={onClickLike} />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <div className='text-end mt-2'>
                                <Chat_modal post={post} />
                            </div>
                        </Col>
                    </Row>
                    <div className='text-start'>
                    </div>
                    <Comm_coment post_id={post_id} post={post} />
                </div>
            </div>
        </>
    )
}

export default Market_read