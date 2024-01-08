import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Row, Col, InputGroup, Button, Card, Carousel, Spinner } from 'react-bootstrap';
import { CgChevronRight } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { LiaComment } from "react-icons/lia";
import './Main.css'

const Main = () => {
    const size = 3;
    const [plants, setplants] = useState([]); // 플랜트
    const [community, setCommunity] = useState([]); // 커뮤니티
    const [diary, setDiary] = useState([]); // 다이어리
    const [store, setStore] = useState([]); //스토어
    const [loading, setLoading] = useState(false);

    const getMain = async () => {
        setLoading(true);
        const res = await axios.get(`/store/list.json`);
        // const res1 = await axios.get(`/diary/list.json/${sessionStorage.getItem("uid")}`); 다이어리
        // const res2 = await axios.get(`/comm/list.json?page=1&size=3`); 커뮤니티
        // const res3 = await axios.get(`/plant/list.json`); 플랜트
        setStore(res.data.list);
        // setDiary(res1.data.list);
        // setCommunity(res2.data.list);
        setLoading(false);
    }
    useEffect(() => {
        getMain();
    }, []);

    if (loading) return <div className='main-spinner'><Spinner /></div>
    return (
        <div id="main_wrap">
            <div className='main_contents'>
                <Carousel className='main-carousel'>
                    <Carousel.Item>
                        <img src='/image/1.jpg' width={1280} height={300} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='/image/2.jpg' width={1280} height={300} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='/image/3.jpg' width={1280} height={300} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src='/image/4.jpg' width={1280} height={300} />
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <Col>
                        <div className='main-title mb-3'>
                            이번달 식물 추천
                        </div>
                    </Col>
                    <Col>
                        <a className='main_more' href='/'>
                            더보기<CgChevronRight />
                        </a>
                    </Col>
                </Row>
                <Carousel className='mb-5 mt-5'>
                    {store.map(s =>
                        <Carousel.Item>
                            <Row>
                                <Col key={s.store_id}>
                                    <Card>
                                        <Card.Body >
                                            <Card.Img width={200} height={200} >{s.image}</Card.Img>
                                            <Card.Body className='main_text'>
                                                <div>이름 : {s.title}</div><br />
                                                <div>가격 : {s.fmtprice}</div>
                                            </Card.Body>
                                        </Card.Body>
                                        <Card.Footer className='text-start'>
                                            {s.like_cnt} <MdFavoriteBorder /> {s.review_cnt} <LiaComment size={20} />
                                        </Card.Footer>
                                    </Card>
                                </Col>
                                <Col key={s.store_id}>
                                    <Card>
                                        <Card.Body >
                                            <Card.Img width={200} height={200} >{s.image}</Card.Img>
                                            <Card.Body className='main_text'>
                                                <div>이름 : {s.title}</div><br />
                                                <div>가격 : {s.fmtprice}</div>
                                            </Card.Body>
                                        </Card.Body>
                                        <Card.Footer className='text-start'>
                                            {s.like_cnt} <MdFavoriteBorder /> {s.review_cnt} <LiaComment size={20} />
                                        </Card.Footer>
                                    </Card>
                                </Col>
                                <Col key={s.store_id}>
                                    <Card>
                                        <Card.Body >
                                            <Card.Img width={200} height={200} >{s.image}</Card.Img>
                                            <Card.Body className='main_text'>
                                                <div>이름 : {s.title}</div><br />
                                                <div>가격 : {s.fmtprice}</div>
                                            </Card.Body>
                                        </Card.Body>
                                        <Card.Footer className='text-start'>
                                            {s.like_cnt} <MdFavoriteBorder /> {s.review_cnt} <LiaComment size={20} />
                                        </Card.Footer>
                                    </Card>
                                </Col>
                                <Col key={s.store_id}>
                                    <Card>
                                        <Card.Body >
                                            <Card.Img width={200} height={200} >{s.image}</Card.Img>
                                            <Card.Body className='main_text'>
                                                <div>이름 : {s.title}</div><br />
                                                <div>가격 : {s.fmtprice}</div>
                                            </Card.Body>
                                        </Card.Body>
                                        <Card.Footer className='text-start'>
                                            {s.like_cnt} <MdFavoriteBorder /> {s.review_cnt} <LiaComment size={20} />
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    )}
                </Carousel>
                <Row>
                    <Col>
                        <div className='main-title mb-4'>
                            MBTI 추천
                        </div>
                    </Col>
                    <Col>
                        <a className='main_more' href='/'>
                            더보기<CgChevronRight />
                        </a>
                    </Col>
                </Row>
                <InputGroup>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                </InputGroup>
                <Carousel className='mb-5 mt-5'>
                    <Carousel.Item>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what1.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what2.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what3.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what4.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <Col>
                        <div className='main-title mb-3'>
                            스토리
                        </div>
                    </Col>
                    <Col>
                        <a className='main_more' href='/'>
                            더보기<CgChevronRight />
                        </a>
                    </Col>
                </Row>
                <InputGroup>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                </InputGroup>
                <Carousel className='mb-5 mt-5'>
                    <Carousel.Item>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story1.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story2.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story3.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story4.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='mt-3'> {/* 스토리 두번째 */}
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story5.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story6.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story7.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story8.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <Col>
                        <h2 className='main-title mb-3'>
                            매거진
                        </h2>
                    </Col>
                </Row>
                <Carousel className='mb-5 mt-5'>
                    <Carousel.Item>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what1.jpg' width={200} height={200} />
                                        <hr />
                                        <div>제목 : 이 식물을 안키운다면 멍청이!</div>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what2.jpg' width={200} height={200} />
                                        <hr />
                                        <div>제목 : 아기 있는 집안에 하나는 있어야하는것!</div>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what3.jpg' width={200} height={200} />
                                        <hr />
                                        <div>제목 : 당신은 식물을 키워야한다!</div>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what4.jpg' width={200} height={200} />
                                        <hr />
                                        <div>제목 : 당신은 식물을 키워야한다!</div>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default Main