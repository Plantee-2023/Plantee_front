import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Row, Col, InputGroup, Button, Card, Carousel, Spinner } from 'react-bootstrap';
import { CgChevronRight } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { LiaComment } from "react-icons/lia";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import MainBannerPage from './MainBannerPage';

const HomePage = () => {
    const [plants, setPlants] = useState([]); // 플랜트
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCareLevel, setSelectedCareLevel] = useState(null);

    const [community, setCommunity] = useState([]); // 커뮤니티
    const [magazine, setMagazine] = useState([]);
    const [store, setStore] = useState([]); //스토어
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const size = 20;
    const [query, setQuery] = useState("");
    const filter = '';


    const getMain = async () => {
        setLoading(true);
        const res = await axios.get(`/store/list.json?page=${page}&size=20&query=${query}`);
        const res1 = await axios.get(`/magazine/list.json?query=''&page=1&size=8`);
        const res2 = await axios.get(`/comm/filter_list.json?category=3&page=1&size=${size}&query=${query}&filter=${filter}`); //커뮤니티
        const res3 = await axios.get(`/plant/list.json`); // 플랜트
        setStore(res.data.list);
        setMagazine(res1.data.list);
        setCommunity(res2.data.list);
        setPlants(res3.data.list);
        setLoading(false);
    }
    useEffect(() => {
        getMain();
    }, []);

    const handleCareLevelFilter = (careLevel) => {
        setSelectedCareLevel(careLevel);
    };

    const filteredList = plants.filter((item) => {
        const nameMatches = item.common_name.toLowerCase().includes(searchTerm.toLowerCase());
        const careLevelMatches = selectedCareLevel ? item.care_level == selectedCareLevel : true;
        return nameMatches && careLevelMatches;
    });

    const getPlant = (care_level) => {
        switch (care_level) {
            case '1':
                return '초보자용';
            case '2':
                return '중급자용';
            default:
                return '상급자용';
        }
    };

    if (loading) return <div className='main-spinner'><Spinner /></div>
    return (
        <div className='homepage_wrap'>
            <MainBannerPage />
            <div className='homepage_contents'>
                <Row className='mt-5'>
                    <Col>
                        <div className='homepage_maintitle'>
                            🌳 이번달 식물 추천
                        </div>
                    </Col>
                    <Col>
                        <a className='homepage_more' href='/store/main'>
                            더보기<CgChevronRight className='homepage_more_icon' />
                        </a>
                    </Col>
                </Row>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={5}
                    autoplay={{ delay: 2000 }}
                    navigation
                    style={{ "--swiper-navigation-color": "#ffffff" }}>
                    {store.map(s =>
                        <SwiperSlide>
                            <Card className='store-line'>
                                <Card.Body >
                                    <Card.Img src={s.image || 'http://via.placeholder.com/150x150'} width={200} height={240} >
                                    </Card.Img>
                                    <Card.Body className='main_text'>
                                        <h4 className='homepage-ellipsis'>{s.title}</h4>
                                        <div>{s.fmtprice} 원</div>
                                    </Card.Body>
                                </Card.Body>
                                <Card.Footer className='text-end'>
                                    <MdFavoriteBorder style={{ color: "red" }} className='mx-2' />{s.like_cnt} <LiaComment size={20} className='mx-2' /> {s.review_cnt}
                                </Card.Footer>
                            </Card>
                        </SwiperSlide>
                    )}
                </Swiper>
                <Row className='mt-5'>
                    <Col>
                        <div className='homepage_maintitle'>
                            🌱 식물 도감
                        </div>
                    </Col>
                    <Col>
                        <a className='homepage_more' href='/plant'>
                            더보기<CgChevronRight className='homepage_more_icon' />
                        </a>
                    </Col>
                </Row>
                <div className='homepage_first_filter_section'>
                    <div className='homepage_first_filter_between'>
                        <ul className='homepage_filter_list'>
                            <button className={`filter_reset_btn ${selectedCareLevel === null ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(null)}>
                                <img src='/image/reset_icon.png' alt='reset icon' />
                            </button>
                            <button className={`filter_btn ${selectedCareLevel === 1 ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(1)}>
                                초보자용
                            </button>
                            <button className={`filter_btn ${selectedCareLevel === 2 ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(2)}>
                                중급자용
                            </button>
                            <button className={`filter_btn ${selectedCareLevel === 3 ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(3)}>
                                상급자용
                            </button>
                        </ul>
                    </div>
                </div>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={5}
                    autoplay={{ delay: 13000 }}
                    navigation
                    style={{ "--swiper-navigation-color": "#ffffff" }}>
                    {filteredList.map(p =>
                        <SwiperSlide>
                            <Card className='mt-5 mb-5'>
                                <Card.Body>
                                    <Card.Img src={p.image || 'http://via.placeholder.com/150x150'} width={150} height={250} ></Card.Img>
                                    <Card.Body>
                                        <h4 className='homepage-ellipsis'>{p.common_name}</h4>
                                        <div>난이도 : {getPlant(p.care_level)}</div>
                                        <div>햇빛 　: {p.sunlight}일</div>
                                        <div>물주기 : {p.watering}일</div>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>
                    )}
                </Swiper>
                <Row>
                    <Col>
                        <div className='homepage_maintitle'>
                            📖 스토리
                        </div>
                    </Col>
                    <Col>
                        <a className='homepage_more' href='/comm'>
                            더보기<CgChevronRight className='homepage_more_icon' />
                        </a>
                    </Col>
                </Row>
                <div className='homepage_tagbtn'>
                    <button className='filter_btn'>전체보기</button>
                    <button className='filter_btn'>식물자랑</button>
                    <button className='filter_btn'>거래</button>
                </div>
                <div>
                    {community.slice(0, 8).map((c, index) => (
                        (index % 4 === 0) ? // Check if it's the start of a new row
                            <div key={index} className="row">
                                {[0, 1, 2, 3].map(i => (
                                    (index + i < community.length) ? // Check if the current index is within the array bounds
                                        <div key={index + i} className="col">
                                            <div>
                                                <div className='homepage_community mb-4'>
                                                    <Card.Body>
                                                        <Card.Img src={community[index + i].image || 'http://via.placeholder.com/150x150'} width={30} height={235} />
                                                    </Card.Body>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                ))}
                            </div>
                            : null
                    ))}
                </div>
                <Row>
                    <Col className='homepage_lasttitle'>
                        <h2 className='homepage_maintitle_last'>
                            💚 초보 가드너를 위한 반려식물 이야기 💚
                        </h2>
                    </Col>
                    <Col>
                        <a className='homepage_more mt-4' href='/magazine/magazineList'>
                            더보기<CgChevronRight className='homepage_more_icon' />
                        </a>
                    </Col>
                </Row>
                <Row>
                    {magazine.map(m =>
                        <Col>
                            <div className='homepage_magazine_layout'>
                                {m.magazine_num > 4 && (
                                    <Card className='homepage_magazine'>
                                        <Card.Body>
                                            <Card.Img src={m.image || 'http://via.placeholder.com/150x150'} width={30} height={175} />
                                            <hr />
                                            <h5 className='text-center'><b>{m.title}</b></h5>
                                        </Card.Body>
                                    </Card>
                                )}
                            </div>
                        </Col>
                    )}
                </Row>
            </div>
        </div>
    )
}

export default HomePage