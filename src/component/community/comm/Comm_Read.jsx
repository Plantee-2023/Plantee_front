import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Col, Card, FormControl, Button, Pagination, ProgressBar, Row, NavLink, Image } from 'react-bootstrap'
import Comm_coment from '../Comm_coment'
import "../Community.css"
import Comm_share from '../Comm_share'
import { useParams } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaRegThumbsUp } from "react-icons/fa";
import Chat_modal from '../market/Chat_modal';
import CandidateList from '../CandidateList';
import Comm_vote from '../Comm_vote';

const Comm_Read = () => {
    const { post_id } = useParams();
    const navi = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState('');
    const [rtotal, setRtotal] = useState(0);

    const { title, red_date, contents, address, nickname, uid, post_origin, like_cnt } = post;
    // const [rtotal, setRtotal] = useState(0);

    const getPost = async () => {
        const res = await axios(`/comm/info/${post_id}?uid=${sessionStorage.getItem("uid")}`)
        console.log(res.data);
        setPost(res.data);
        console.log("오리진", post_origin)
        if (!post_origin === '') {
            const reply_total = await axios(`/comm/reply_total/${post_origin}`)
            console.log("리플리", reply_total.data)

            //console.log(reply_total.data);
            setRtotal(reply_total.data)
        }
    }
    const handleGoBack = () => {
        navi(-1); // 이전 페이지로 이동
    };
    useEffect(() => {
        getPost();
    }, []);

    const onDelete = async (post_id) => {
        if (window.confirm(`${post_id}번 글을 삭제하시겠습니까?`)) {
            await axios.post('/comm/delete', { post_id: post.post_id });
            alert("게시글이 삭제되었습니다.");
            handleGoBack();
        }
    }

    const onClickReply = (post_id) => {
        window.location.href = `/comm/write/${post_id}`;
    }

    //좋아요 //
    const onClickLike = async () => {
        if (!sessionStorage.getItem("uid")) {
            sessionStorage.setItem("target", `/comm/info/${post_id}`);
            window.location.href = "/login";
        } else {
            //좋아요추가
            await axios(`/comm/insert/favorites?post_id=${post_id}&uid=${sessionStorage.getItem("uid")}`);
            alert("좋아요추가!");
            getPost();
        }
    }

    return (
        <div className='comm_wrap' >
            <div className='comm_contents'>
                <h1 className='text-center mb-5'>게시글 상세</h1>
                <Row>
                    <Col xs lg={15}>
                        <div className='plant_insert mb-3'>
                            <button style={{ color: "white" }} href='/comm'>목록</button>
                        </div>
                        <Card className='comm_read_card'>
                            <div className='comm'> 커뮤니티 ＞ 식물자랑
                                <div className='text-end mx-5'>
                                    <span>
                                        {like_cnt === 0 ?
                                            <FaRegHeart onClick={onClickLike} />
                                            :
                                            <FaHeart color="#ff0000" onClick={onClickLike} />
                                        }
                                        <span className='mx-3' style={{ color: 'red !important', cursor: 'pointer' }}>{post.like_cnt}</span><br />
                                    </span>
                                </div>
                            </div>
                            <div className='comm_read_card_in'>
                                <div className='comm_read_big_title'>
                                    <h4 style={{ "font-weight": "bold" }}>
                                        <span className='comm_detail_logo'>Plantee<img src='/image/carelevel_icon.png' /></span>
                                        <span className='comm_read_title'>{title}</span>
                                    </h4>
                                </div>
                                <Row>
                                    <Col lg={3} xs={5} md={4}>
                                        <div className='text-center'>
                                            <Image src="http://via.placeholder.com/160x170" roundedCircle />
                                        </div>
                                    </Col>
                                    <Col className='px-3 text-start' >
                                        <br />
                                        <h5>작성자 : {nickname} ({uid})</h5>
                                        <h5>작성일 : {red_date} </h5>
                                        <h5>추천 : {like_cnt} </h5>
                                        <h5>공유하기 : <span className='mx-2'> <Comm_share /> </span></h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr className='mb-5 mt-5' />
                                        <br />
                                        <div className='text-center' dangerouslySetInnerHTML={{ __html: contents }}></div>
                                        <br />
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                        <div className='text-end mt-2'>
                            {sessionStorage.getItem("uid") === uid ?
                                <>
                                    <Button className='ms-2 me-2' variant='success'>수정</Button>
                                    <Button className='ms-2 me-2' variant='success' onClick={() => onDelete(post_id)}>삭제</Button>
                                </>
                                :
                                <>
                                    <Button className='ms-2 me-2' variant='success' onClick={() => onClickReply(post_id)}>답변</Button>
                                </>
                            }
                        </div>
                    </Col>
                </Row>
                <div className='text-start'>
                </div>
                <Comm_coment post_id={post_id} post={post} />
            </div>
        </div>
    )
}

export default Comm_Read