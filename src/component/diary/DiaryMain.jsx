import moment from 'moment';
import React, { useState } from 'react';
import { Button, Card, CardBody, Col, InputGroup, Row } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DiaryMain = () => {
    const [value, onChange] = useState(new Date());

    return (
        <>
            <div>
                <InputGroup className='center'>
                    <input type='search' />
                    <Button variant='success'>검색</Button>
                </InputGroup>
            </div>
            <div className='text-end mt-5'>
                <Button>등록하기</Button>
            </div>
            <div className='my-5'>
                <Row>
                    <Col>
                        <br />
                        <h1>D-day</h1>
                        <hr />
                        <p>
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
            </div>
            <div className='my-5'>
                <Row>
                    <Col>
                        <br />
                        <h1>D-day</h1>
                        <hr />
                        <p>
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
            </div>
            <div className='my-5'>
                <Row>
                    <Col>
                        <br />
                        <h1>D-day</h1>
                        <hr />
                        <p>
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
            </div>
            <div>
                <Card style={{ width: '25rem' }}>
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

            <div className="text-gray-500 mt-5">
                {moment(value).format("YYYY년 MM월 DD일")}
            </div>
            <div className='mt-5 justify-content-center'>
                <Calendar onChange={onChange} value={value}></Calendar>
            </div>

        </>
    );
};


export default DiaryMain