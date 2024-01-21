import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import DiaryTag from './DiaryTag';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const DiaryRead = () => {
    const [loading, setLoading] = useState(false);
    const { diary_id } = useParams();
    const navi = useNavigate();
    const [list, setList] = useState([]);

    const [diary, setDiary] = useState({
        diary_id: "", user_id: "", image: "", contents: "", reg_date: "", fmtdate: "", last_watering: "", watering: "", common_name: "", date_now: "", date_water: "", date_medicine: "", date_change: "",
    })

    const { user_id, plant_name, image, contents, reg_date, fmtdate, waterdate, watering, common_name, date_now, date_water, date_medicine, date_change } = diary;

    const getDiary = async () => {
        setLoading(true);
        const res = await axios.get(`/diary/read/${diary_id}`);
        console.log(res.data);
        setDiary(res.data);
        // console.log(diary);
        setLoading(false);

    }

    const getStore_Diary = async () => {
        setLoading(true);
        const res = await axios.get(`/diary/storelist.json/${diary_id}`);
        // console.log(res.data);
        setList(res.data);
        // console.log(list);
        setLoading(false);
    }

    const onClickDelete = async (plant_name, diary_id) => {
        if (window.confirm(`${plant_name}을 삭제하시겠습니까?`)) {
            // console.log(diary_id);
            await axios.post(`/diary/delete/${diary_id}`);
            navi(`/diary/main`);

        }
    }

    useEffect(() => {
        getDiary();
    }, [])

    useEffect(() => {
        getStore_Diary();
    }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='mainbanner_section'>
                <img className='banner_img' src="/image/header/Calendar.png" />
            </div>
            <div className='plant_wrap'>
                <div className='plant_contents'>
                    <div className='mt-3'>
                        <Container>
                            <DiaryTag />
                        </Container>
                    </div>
                    <div className='text-center'>
                        <h1 className='mt-5'>상세보기</h1>
                        <div className='text-end'>
                            <Link to={`/diary/update/${diary_id}`}>
                                <img src='/image/icon-update.png' className='diary-img-update' /><span className='diary-insert-size'><b><u>수정하기</u></b></span>
                            </Link>
                            <span onClick={() => onClickDelete(plant_name, diary_id)}>
                                <img src='/image/icon-delete.png' className='diary-img-update' /><span className='diary-insert-size'><b><u>삭제</u></b></span>
                            </span>
                        </div>
                        <div className='mt-5'>
                            {image ? (
                                <img src={image} alt={`${plant_name} 이미지`} width={350} height={350}/>
                            ) : (
                                <img src='http://via.placeholder.com/300x300' alt='대체 이미지' />
                            )}
                            <h2 className='mt-5'><b>{plant_name} ({common_name})</b></h2>
                        </div>
                        <div className='mt-5 diarymain_cardgroup'>
                            <Card style={{ width: '40rem' }} className='diaryread_card'>
                                <Card.Body>
                                    <h5>함께한지 {date_now} 일이 지났어요</h5>
                                    <hr />
                                    <Row>
                                        <Col>
                                            <h5>물 주기</h5>
                                            <p>{watering}일</p>
                                        </Col>
                                        <Col>
                                            <h5>마지막 물 준 날</h5>
                                            <p>{waterdate}</p>
                                        </Col>
                                        <Col>
                                            <h5>처음 함께한 날</h5>
                                            <p>{fmtdate}</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '40rem' }} className='mt-3 diaryread_card'>
                                <Card.Body>
                                    <h5>D-Day</h5>
                                    <hr />
                                    <Row>
                                        <Col>
                                            <h5>D-{date_water}</h5>
                                            <p>물</p>
                                        </Col>
                                        <Col>
                                            <h5>D-{date_medicine}</h5>
                                            <p>영양제</p>
                                        </Col>
                                        <Col>
                                            <h5>D-{date_change}</h5>
                                            <p>분갈이</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='mt-3'>
                            <Card style={{ width: '40rem' }} className='diaryread_card'>
                                <CardBody>
                                    <h5 className='text-start'>메모</h5>
                                    <div style={{ whiteSpace: "pre-line" }} className='text-start'>
                                        <p>{contents}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        <div className='mt-5'>
                            <Card>
                                <Card.Body>
                                    {/* <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={50}
                                    slidesPerView={3}
                                    navigation
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                > */}
                                    <h2>{common_name} 난이도 관련식물</h2>
                                    {/* <SwiperSlide> */}
                                    <Row>
                                        {list.slice(0, 5).map(s =>
                                            <Card style={{ width: '15rem' }} className='diary_read_store_card my-4 '>
                                                <CardBody>
                                                    <Col>
                                                        <div className='storeread_card'>
                                                            <img src={s.image} alt='plante' />
                                                            <h3 className='mt-2'>{s.title}</h3>
                                                            <h5>{s.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</h5>
                                                        </div>
                                                    </Col>
                                                </CardBody>
                                            </Card>
                                        )}
                                    </Row>
                                    {/* </SwiperSlide>
                                </Swiper> */}

                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiaryRead