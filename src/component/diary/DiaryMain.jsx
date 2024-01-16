import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import DiaryTag from './DiaryTag';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import BtnToTop from '../common/BtnToTop';


const DiaryMain = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const getList = async () => {
        setLoading(true);
        const res = await axios.get(`/diary/list.json/${sessionStorage.getItem("uid")}`);
        // console.log(res.data);
        setList(res.data);
        setLoading(false);
        // console.log(list);
    }

    const handleWateringCanClick = async (diaryId) => {
        const diary_id = parseInt(diaryId);
        try {
            const res = await axios.post('/diary/water_update', diary_id, { headers: { 'Content-Type': 'application/json' } });
            console.log("성공!!!!!!!!!!");
            console.log(list);
        } catch (error) {
            console.error('물 주기 실패:', error);
        }
    };

    const getSun = (sunlight) => {
        switch (sunlight) {
            case '2~3':
                return <img src='/image/icon_sun.jpg' />;
            case '6':
                return <img src='/image/icon_sun2.jpg' />;
            case '12':
                return <img src='/image/icon_sun3.jpg' />;
            case '18':
                return <img src='/image/icon_sun3.jpg' />;
            default:
                return <img src='/image/icon_sun5.jpg' />;
        }
    };

    const getWater = (watering) => {
        switch (watering) {
            case 30:
                return <img src='/image/icon_water.jpg' />;
            case 21:
                return <img src='/image/icon_water2.jpg' />;
            case 14:
                return <img src='/image/icon_water3.jpg' />;
            case 7:
                return <img src='/image/icon_water3.jpg' />;
            default:
                return <img src='/image/icon_water5.jpg' />;
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredList = list.filter((item) => item.plant_name.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        // list가 업데이트될 때 동작할 로직 추가
        // console.log("List updated:", list);
    }, [list]);

    useEffect(() => {
        getList();
    }, []);


    if (loading) return <div className='my-5 text-center'><Spinner variant='success' /></div>
    return (
        <div className='diary_wrap'>
            <div className='diary_contents'>
                <div className='mt-3'>
                    <Container>
                        <DiaryTag />
                    </Container>
                </div>
                <div className='diary_searchwrap'>
                    <form>
                        <InputGroup className='diary_searchinputwrap'>
                            <input type='search' className='diary_searchinput' placeholder='검색어를 입력해주세요.' value={searchTerm} onChange={handleSearchChange} />
                            {/* <button className='diary_searchbtn' type='submit'><img src='/image/search_icon.png' /></button> */}
                        </InputGroup>
                    </form>
                </div>
                <div className='text-end mt-3'>
                    <Link to={`/diary/insert`}>
                        <img src='/image/icon-add.png' className='diary-img-insert' /><span className='diary-insert-size'><b><u>등록하기</u></b></span>
                    </Link>
                </div>
                <div className='text-center'>
                    {filteredList.map(d =>
                        <div className='diary_detail my-5'>
                            <Row>
                                {d.date_water > 2 ?
                                    <>
                                        <Col>
                                            <br />
                                            <h1>D-{d.date_water}</h1>
                                            <hr className='diary_dayline' />
                                            <p className='diary_icon_sun'>
                                                <p>{getSun(d.sunlight)}</p>
                                            </p>
                                            <p className='diary_icon_sun'>
                                                <p>{getWater(d.watering)}</p>
                                            </p>
                                        </Col>
                                    </>
                                    :
                                    <>
                                        <Col>
                                            <div className='mt-5'>
                                                <h3>{d.plant_name}의 물 주는 날이</h3><h4>{d.date_water}일 남았어요!</h4>
                                                <div className='mt-5'>
                                                    <img
                                                        src='/image/icon-watering-can.png'
                                                        width={'100px'}
                                                        height={'100px'}
                                                        onClick={() => handleWateringCanClick(d.diary_id)}
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </>
                                }

                                <Col>
                                    <Link to={`/diary/read/${d.diary_id}`}>
                                        <div>
                                            {/* <img src={d.image} width={300} height={300} /> */}
                                            {d.image ? (
                                                <img src={d.image} width={300} height={300} />
                                            ) : (
                                                <img src='http://via.placeholder.com/300x300' alt='대체 이미지' />
                                            )}
                                        </div>
                                    </Link>
                                </Col>
                                <Col>
                                    <br /><br /><br /><br />
                                    <h1>{d.plant_name}</h1>
                                </Col>
                            </Row>
                        </div>
                    )}
                    <div className='diarymain_cardgroup'>
                        <Card className='diary_plant_card'>
                            <Card.Body>
                                <Row>
                                    <Col md='5'>
                                        <div className='diary_logo'>
                                            <img src='/image/logo.png' />
                                        </div>
                                    </Col>
                                    <Col className='mt-2'>
                                        {(() => {
                                            const wateringDay = list.find(d => d.date_water < 1);
                                            if (wateringDay) {
                                                return (
                                                    <>
                                                        오늘은{' '}
                                                        <span>
                                                            [{wateringDay.plant_name}]
                                                        </span>
                                                        {' '} 물 주는 날입니다.
                                                    </>
                                                );
                                            }
                                            return '나의 반려식물 키우기'; // 아무것도 렌더링하지 않음
                                        })()}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <BtnToTop/>
        </div>
    );
};


export default DiaryMain