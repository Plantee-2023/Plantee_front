import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import DiaryTag from './DiaryTag';
import axios from 'axios'
import { MdSunny } from "react-icons/md";
import { IoIosWater } from "react-icons/io";
import { RiMedicineBottleLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';


const DiaryMain = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const navi = useNavigate();

    const getList = async () => {
        setLoading(true);
        const res = await axios.get(`/diary/list.json`);
        // console.log(res.data);
        setList(res.data);
        setLoading(false);
        console.log(list);
    }

    const onClickInsert = ()=>{
        navi(`/diary/diarymain/insert`);

    }

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
                            <input type='search' className='diary_searchinput' placeholder='검색어를 입력해주세요.' />
                            <button className='diary_searchbtn' type='submit'><img src='/image/search_icon.png' /></button>
                        </InputGroup>
                    </form>
                </div>
                <div className='text-end mt-5'>
                    <Button onClick={()=>{onClickInsert()}}>등록하기</Button>
                </div>
                <div className='text-center'>
                    {list.map(d =>
                        <div className='diary_detail my-5'>
                            <a href='/diary/diarymain/read'>
                                <Row>
                                    <Col>
                                        <br />
                                        <h1>D-day</h1>
                                        <hr className='diary_dayline' />
                                        <p className='diary_icon_sun'>
                                            <MdSunny color='red' size="3rem"/>
                                            <MdSunny color='red' size="3rem"/>
                                            <MdSunny color='red' size="3rem"/>
                                        </p>
                                        <p>
                                            <IoIosWater color='skyblue' size="3rem" />
                                            <IoIosWater color='skyblue' size="3rem" />
                                        </p>
                                        <p>
                                            <RiMedicineBottleLine size="3rem" />
                                        </p>
                                    </Col>
                                    <Col>
                                        <div className='diary_img'>
                                            <img src={d.image} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <br /><br /><br /><br />
                                        <h1>{d.plant_name}</h1>
                                    </Col>
                                </Row>
                            </a>
                        </div>
                    )}
                    <div className='diarymain_cardgroup'>
                        <Card style={{ width: '30rem' }} className='diarymain_card'>
                            <Card.Body>
                                <Row>
                                    <Col md='5'>
                                        <div className='diary_logo'>
                                            <img src='/image/logo.png' />
                                        </div>
                                    </Col>
                                    <Col className='mt-2'>
                                        오늘은 플랜티식물 물 주는 날 입니다.
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default DiaryMain