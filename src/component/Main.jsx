import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Row, Col, InputGroup, Button, Card, Carousel, Spinner } from 'react-bootstrap';
import { CgChevronRight } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { LiaComment } from "react-icons/lia";
import './Main.css'

const Main = () => {
    const [plants, setPlants] = useState([]); // 플랜트
    const [community, setCommunity] = useState([]); // 커뮤니티
    const [magazine, setMagazine] = useState([]);
    const [store, setStore] = useState([]); //스토어
    const [loading, setLoading] = useState(false);

    const getMain = async () => {
        setLoading(true);
        // const res = await axios.get(`/store/list.json`);
        // const res1 = await axios.get(`/magazine/list.json`);
        //const res2 = await axios.get(`/comm/list.json`); //커뮤니티
        //const res3 = await axios.get(`/plant/list.json`); // 플랜트
        // setStore(res.data.list);
        // setMagazine(res1.data.list);
        // console.log(res1.data.list);
        //setCommunity(res2.data.list);
        //setPlants(res3.data.list);
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
                    {/* {store.map(s =>
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
                            </Row>
                        </Carousel.Item>
                    )} */}
                </Carousel>
                <Row>
                    <Col>
                        <div className='main-title mb-4'>
                            식물 도감
                        </div>
                    </Col>
                    <Col>
                        <a className='main_more' href='/plant'>
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
                    {plants.map(p =>
                        <Carousel.Item>
                            <Row>
                                <Col key={p.plant_id}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Img width={200} height={200} ></Card.Img>
                                            <Card.Body>
                                                <div>이름 : {p.common_name}</div>
                                                <div>난이도 : {p.care_level}단계</div>
                                                <div>햇빛 : {p.sunlight}</div>
                                                <div>물주기 : {p.watering}</div>
                                            </Card.Body>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    )}
                </Carousel>
                <Row>
                    <Col>
                        <div className='main-title mb-3'>
                            스토리
                        </div>
                    </Col>
                    <Col>
                        <a className='main_more' href='/comm'>
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
                    {/* {community.map(c =>
                        <Carousel.Item>
                            <Row>
                                <Col key={c.post_id}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Img src='/image/story1.jpg' width={200} height={200} />
                                            <Card.Body>
                                                <div> 제목 : {c.title}</div>
                                                <div> 닉네임 : {c.nickname}</div>
                                            </Card.Body>
                                        </Card.Body>
                                        <Card.Footer className='text-start'>
                                            {c.like_cnt} <MdFavoriteBorder /> {c.view_cnt} <FaRegBookmark /> {c.coment_cnt} <LiaComment size={20} />
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    )} */}
                </Carousel>
                <Row>
                    <Col>
                        <h2 className='main-title mb-3'>
                            매거진
                        </h2>
                    </Col>
                </Row>
                <Carousel className='mb-5 mt-5'>
                    {/* {magazine.map(m =>
                        <Carousel.Item>
                            <Row>
                                <Col key={m.user_id}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Img src='/image/what1.jpg' width={200} height={200} />
                                            <hr />
                                            <div>제목 : {m.title}</div>
                                            <div>내용 : {m.contents}</div>
                                        </Card.Body>
                                        <Card.Footer className='text-start'>
                                            {m.like_cnt} <MdFavoriteBorder /> {m.coment_cnt} <LiaComment size={20} />
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    )} */}
                </Carousel>
            </div>
        </div>
    )
}

export default Main