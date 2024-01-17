import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Row, Col, InputGroup, Button, Card, Carousel, Spinner } from 'react-bootstrap';
import { CgChevronRight } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { LiaComment } from "react-icons/lia";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './Main.css'

const Main = () => {
    const [plants, setPlants] = useState([]); // 플랜트
    const [community, setCommunity] = useState([]); // 커뮤니티
    const [magazine, setMagazine] = useState([]);
    const [store, setStore] = useState([]); //스토어
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const getMain = async () => {
        setLoading(true);

        const res = await axios.get(`/store/list.json?page=${page}&size=20&query=${query}`);
        const res1 = await axios.get(`/plant/list.json`); // 플랜트
        //const res2 = await axios.get(`/comm/list.json?category=3&page=1&size=5&query=""`); //커뮤니티
        const res3 = await axios.get(`/magazine/list.json?query=''&page=1&size=8`);
        setStore(res.data.list);
        setPlants(res1.data.list);
        //setCommunity(res2.data.list);
        setMagazine(res3.data.list);
        setLoading(false);
    }
    useEffect(() => {
        getMain();
    }, []);

    if (loading) return <div className='main-spinner'><Spinner /></div>
    return (
        <div id="main_wrap">
            <div className='main_contents'>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{ delay: 2000 }}
                    navigation
                    style={{"--swiper-navigation-color": "#ffffff"}}>
                    <SwiperSlide><img src='/image/1.jpg' width={1280} height={300} /></SwiperSlide>
                    <SwiperSlide><img src='/image/2.jpg' width={1280} height={300} /></SwiperSlide>
                    <SwiperSlide><img src='/image/3.jpg' width={1280} height={300} /></SwiperSlide>
                    <SwiperSlide><img src='/image/4.jpg' width={1280} height={300} /></SwiperSlide>
                </Swiper>
                <Row className='mt-5'>
                    <Col>
                        <div className='main-title mb-3'>
                            스토어
                        </div>
                    </Col>
                    <Col>
                        <a className='main_more' href='/store/main'>
                            더보기<CgChevronRight />
                        </a>
                    </Col>
                </Row>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={70}
                    slidesPerView={4}
                    autoplay={{ delay: 2000 }}
                    navigation
                    style={{"--swiper-navigation-color": "#ffffff"}}>
                    {store.map(s =>
                        <SwiperSlide>
                            <Card>
                                <Card.Body >
                                    <Card.Img src={s.image || 'http://via.placeholder.com/150x150'} width={200} height={200} >
                                    </Card.Img>
                                    <Card.Body className='main_text'>
                                        <div>이름 : {s.title}</div><br />
                                        <div>가격 : {s.fmtprice}</div>
                                    </Card.Body>
                                </Card.Body>
                                <Card.Footer className='text-start'>
                                    {s.like_cnt} <MdFavoriteBorder /> {s.review_cnt} <LiaComment size={20} />
                                </Card.Footer>
                            </Card>
                        </SwiperSlide>
                    )}
                </Swiper>
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
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={70}
                    slidesPerView={4}
                    autoplay={{ delay: 2000 }}
                    navigation
                    style={{"--swiper-navigation-color": "#ffffff"}}>
                    {plants.map(p =>
                        <SwiperSlide>
                            <Card className='mt-5 mb-5'>
                                <Card.Body>
                                    <Card.Img src={p.image || 'http://via.placeholder.com/150x150'} width={200} height={200} ></Card.Img>
                                    <Card.Body>
                                        <div>이름 : {p.common_name}</div>
                                        <div>난이도 : {p.care_level}단계</div>
                                        <div>햇빛 : {p.sunlight}</div>
                                        <div>물주기 : {p.watering}</div>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>
                    )}
                </Swiper>
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
                                            {c.like_cnt} <MdFavoriteBorder /> {c.view_cnt} : {c.coment_cnt} <LiaComment size={20} />
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
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={70}
                    slidesPerView={4}
                    autoplay={{ delay: 2000 }}
                    navigation={true}
                    style={{"--swiper-navigation-color": "#ffffff"}}>
                    {magazine.map(m =>
                        <SwiperSlide>
                            <Card>
                                <Card.Body>
                                    <Card.Img src={m.image || 'http://via.placeholder.com/150x150'} width={200} height={200} />
                                    <hr />
                                    <div>제목 : {m.title}</div>
                                    <hr />
                                    <div>내용 : {m.contents}</div>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    )
}

export default Main