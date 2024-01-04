import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import DiaryTag from './DiaryTag';

const DiaryMain = () => {

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
                            <Button>등록하기</Button>
                        </div>
                        <div className='text-center'>
                            <div className='diary_detail my-5'>
                                <a href='/diary/diarymain/read'>
                                    <Row>
                                        <Col>
                                            <br />
                                            <h1>D-day</h1>
                                            <hr className='diary_dayline'/>
                                            <p className='diary_icon_sun'>
                                                <img src="http://via.placeholder.com/50x50" alt='plante' />
                                            </p>
                                            <p>
                                                <img src="http://via.placeholder.com/50x50" alt='plante' />
                                            </p>
                                        </Col>
                                        <Col>
                                            <img src="http://via.placeholder.com/250x250" alt='plante' />
                                        </Col>
                                        <Col>
                                            <br /><br /><br /><br />
                                            <h1>식물이름</h1>
                                        </Col>
                                    </Row>
                                </a>
                            </div>
                            <div className='diarymain_cardgroup'>
                                <Card style={{ width: '25rem' }} className='diarymain_card'>
                                    <Card.Body>
                                        <Row>
                                            <Col md='2'>
                                                <img src="http://via.placeholder.com/60x60" alt='로고' />
                                            </Col>
                                            <Col className='mt-3'>
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