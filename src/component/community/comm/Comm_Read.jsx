import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Col, Card, FormControl, Button, Pagination, ProgressBar, Row, NavLink, Image } from 'react-bootstrap'
import Comm_coment from '../Comm_coment'
import "../Community.css"
import Comm_share from '../Comm_share'
import { useParams } from 'react-router-dom'
import { FaRegThumbsUp } from "react-icons/fa";
import Chat_modal from '../market/Chat_modal';


const Comm_Read = () => {
    const [show, setShow] = useState(false);
    const [option, setOption] = useState(0);
    const { post_id } = useParams();
    const navi = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState('');
    const [vote, setVote] = useState([]);
    const [vote_id, setVote_id] = useState(0);
    const [rtotal, setRtotal] = useState(0);
    const [mylikes, setMylikes] = useState(0);
    const [myvote, setMyVote] = useState('');
    const { title, red_date, contents, address, nickname, uid, post_origin, plant_id, store_id, plant_title, image, plant_link } = post;
    const { myvote_cnt, myvote_option } = myvote;
    const { vote_title, res, res2, res3, result1, result2, result3 } = vote;

    // const [rtotal, setRtotal] = useState(0);

    const getPost = async () => {
        setShow(false);
        const res = await axios(`/comm/info/${post_id}?uid=${sessionStorage.getItem("uid")}`)
        console.log("length", res.data.show_vote.length)


        console.log(res);
        setPost(res.data.read);


        setMylikes(res.data.mylikes);

        if (res.data.show_vote.length > 0) {

            setVote_id(res.data.show_vote[0].vote_id)
            setVote(res.data.show_vote);
            setShow(true);
            setMyVote({ myvote_cnt: res.data.myvote.cnt, myvote_option: res.data.myvote.vote_option });
        }
        console.log("......................", myvote);
        console.log("fffff", res.data.mylikes)
        console.log(res.data.show_vote.length)
        //setRtotal(reply_total.data)



        if (!post_origin === '') {
            const reply_total = await axios(`/comm/reply_total/${post_origin}`)
            console.log("리플리", reply_total.data)







        }

        //const res2=  await axios(`/comm/mylikes?post_id=${post_id}&uid=${sessionStorage.getItem("uid")}`)
        //console.log("내좋아요",res2)




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

    const onClickRadio = (e) => {


        setOption(e.target.value);
        console.log(option);

    }



    const onSubmitVote = async (e) => {

        const data = { vote_id: vote_id, post_id: parseInt(post_id), option: parseInt(option), uid: sessionStorage.getItem("uid") }

        if (window.confirm(`투표하시겠습니까?`)) {
            if (myvote_cnt > 0) {
                alert("이미 투표 하셨습니다.");

            } else {


                await axios.post('/comm/update_votecnt', data);

                alert("투표 성공!");
                getPost();
            }
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



    console.log(show)

    return (
        <div className='my-5'>

            <h1 className='text-center mb-5'>게시글 상세</h1>
            <Row className='justify-content-center'>
                <Col xs lg={15}>
                    <div className='text-start mb-2'>
                        <a className='btn btn-success' style={{ color: "white" }} href='/comm'   >목록</a>

                    </div>
                    <Card className='p-5'>
                        <div className='comm'> 커뮤니티 ＞ 식물자랑   </div>
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

                                <div  >작성자 : [아이콘 png] {nickname}({uid})  </div>

                                <div  >작성일 :  {red_date} </div>
                                <div  >추천 :1 </div>
                                <hr />
                                <div>

                                    공유하기 : <p className='me-2'> <Comm_share /> </p>


                                </div>

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />


                                <div className='text-center' >
                                    {
                                        show === true &&
                                        <>

                                            <>

                                                <Col xs={6} md={4} lg={4}  >
                                                    <Card className='mb-2' style={{ padding: "10px" }}  >
                                                        <Card style={{ padding: "10px" }} className='mb-2'  >

                                                            {vote.map(v =>
                                                                <h5 key={v.post_id} >
                                                                    1.  <span className='option me-2'>{v.res} </span>: <span className='me-2'>   <input type="radio" name="option" value={1} onClick={onClickRadio} />
                                                                    </span> <br />
                                                                    2.  <span className='option me-2'>{v.res2} </span>: <span className='me-2'>   <input type="radio" name="option" value={2} onClick={onClickRadio} />
                                                                    </span><br />
                                                                    3.  <span className='option me-2'>{v.res3} </span>: <span className='me-2'>   <input type="radio" name="option" value={3} onClick={onClickRadio} />
                                                                    </span><br />

                                                                </h5>
                                                            )}
                                                        </Card>

                                                        <Button onClick={() => onSubmitVote()}>제출</Button>

                                                    </Card>

                                                </Col>
                                            </>
                                            {myvote &&
                                                <>
                                                    <Col xs={6} md={4} lg={4}  >

                                                        <Card style={{ padding: "10px" }} className='mb-2'  >
                                                            <Card style={{ padding: "10px" }} className='mb-2'  >

                                                                {vote.map(v =>
                                                                    <h5 key={v.post_id} >
                                                                        1.  <span className='me-2'>{v.res} </span>: <span className='me-2'>{v.result1}표</span> <br />
                                                                        2.  <span className='me-2'>{v.res2} </span>: <span className='me-2'>{v.result2}표</span><br />
                                                                        3.  <span className='me-2'>{v.res3} </span>: <span className='me-2'>{v.result3}표</span><br />


                                                                    </h5>

                                                                )}

                                                            </Card>

                                                            나의 응답: {myvote_option}번
                                                        </Card>



                                                    </Col>

                                                </>
                                            }
                                        </>
                                    }
                                </div>
                                <div className='text-center' dangerouslySetInnerHTML={{ __html: contents }}>


                                </div>
                                <br />

                            </Col>
                        </Row>

                        <div className='mx-auto' width="100%" style={{ padding: "3px", width: '5%', borderStyle: "solid", borderWidth: '3px' }}>
                            <div className='text-center'>
                                <span style={{ color: 'red !important', cursor: 'pointer' }}>{post.like_cnt}</span><br />
                                <FaRegThumbsUp style={{ fontSize: "30px" }} onClick={onClickLike} />
                            </div>
                        </div>
                    </Card>
                    <Row>
                        <Col lg={15}>

                            <h3 className='mt-2'>연관식물</h3>

                            <Card style={{ padding: "20px" }} className='mt-2'>

                                <Col xs={6} md={4} lg={2} >


                                    <Card className='mb-2' style={{ width: "180px", height: "250px" }}  >
                                        <Link to={plant_link}>

                                            <Card.Body style={{ height: "200px", overflow: "hidden" }} >

                                                <img src={image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

                                            </Card.Body  >
                                        </Link>
                                        <Card.Footer style={{ height: "50px" }} className="text-end"> [{plant_id}] {plant_title}</Card.Footer>

                                    </Card>


                                </Col>
                            </Card>
                        </Col>
                    </Row>
                    <div className='text-end mt-2'>

                        {sessionStorage.getItem("uid") === uid ?
                            <>
                                <a vaiant='success' href={`/comm/update/${post_id}`} className='btn btn-success ms-2 me-2' >수정</a>
                                <Button className='ms-2 me-2' vaiant='success' onClick={() => onDelete(post_id)}>삭제</Button>
                            </>
                            :
                            <>
                                <Button className='ms-2 me-2' vaiant='success' onClick={() => onClickReply(post_id)}>답변</Button>
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

export default Comm_Read