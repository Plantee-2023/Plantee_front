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
    const {  red_date, title,  contents, address, nickname, uid, price } = post;
 


    const getPost = async () => {
        const res = await axios(`/comm/info/${post_id}?uid=${sessionStorage.getItem("uid")}`);
    
        setMylikes(res.data.mylikes);
        console.log(".........",res)
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
    }   if(mylikes>0){
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
        <div className='my-5'>
            <h1 className='text-center mb-5'>게시글 상세</h1>
            <Row className='justify-content-center'>
                <Col xs lg={15}>
                    <div className='text-start mb-2'>
                        <a className='btn btn-success' style={{ color: "white" }} href='/comm/market'   >목록</a>

                    </div>



                    <Card className='p-5'>

                        <div style={{ padding: "100px" }}>
                            <h4 className="text-center" style={{ "font-weight": "bold" }}>[{address}] {title} </h4>


                            <Row>

                                <Col lg={3} xs={5} md={4} className='align-self-center'>
                                    <div className='mt-1'>
                                        <Image src="http://via.placeholder.com/171x180" roundedCircle />


                                    </div>


                                </Col>
                                <Col className='px-3 text-start' >
                                    <h5  > </h5>
                                    <hr />

                                    <div  >
                                        <Col className='details_subtitle ms-4'>가격:
                                            {!price === 0 ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "무료나눔"}</Col>

                                    </div>
                                    <hr />





                                    닉네임 : [아이콘 png] {nickname}({uid})

                                    <div  >작성일 : 2023.12.31 </div>
                                    <div  >추천 :1 </div>
                                    <hr />
                                    <div>

                                        공유하기 : <p className='me-2'> <Comm_share /> </p>


                                    </div>


                                </Col>
                            </Row>
                           <Row>
                            <Col>
                            <hr/>
                            <div className='text-center'dangerouslySetInnerHTML={{ __html:contents }}>
                             
 
                            </div>
                            <br/>
                           
                            </Col>
                        </Row>

                            <div className='mx-auto' width="100%" style={{ padding: "3px", width: '5%', borderStyle: "solid", borderWidth: '3px' }}>
                                <div className='text-center'>
                                <span style={{ color: 'red !important', cursor: 'pointer' }}>{post.like_cnt}</span><br/>
                                <FaRegThumbsUp style={{ fontSize: "30px" }} onClick={onClickLike} />
                                </div>
                            </div>
                        </div>
                    </Card>


                    <div className='text-end mt-2'>







                        <Chat_modal post={post} />
                        {sessionStorage.getItem("uid") === uid &&
                            <>

                                <a vaiant='success' href={`/comm/market/update/${post_id}`} className='btn btn-success ms-2 me-2' >수정</a>
                                <Button onClick={() => onDelete(post_id)} className='ms-2 me-2' vaiant='success'>삭제</Button>
                            </>
                        }
                    </div>
                </Col>
            </Row>
            <div className='text-start'>





            </div>
            <Comm_coment post_id={post_id} post={post} />


        </div>

    )
}

export default Market_read