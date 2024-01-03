import React from 'react'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

const DiaryRead = () => {
    return (
        <div className='plant_wrap'>
            <div className='plant_contents'>
                <div className='text-center'>
                    <h1 className='mt-5'>상세보기</h1>
                    <div className='mt-5'>
                        <img src="http://via.placeholder.com/250x250" alt='plante' />
                        <h2 className='mt-5'><b>식물이름</b></h2>
                    </div>
                    <div className='mt-5 text-center'>
                        <Card style={{ width: '40rem' }}>
                            <Card.Body>
                                <h5>함께한지 0 일이 지났어요</h5>
                                <hr />
                                <Row>
                                    <Col>
                                        <h5>물 주기</h5>
                                    </Col>
                                    <Col>
                                        <h5>마지막 물 준 날</h5>
                                    </Col>
                                    <Col>
                                        <h5>처음 함께한 날</h5>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '40rem' }} className='mt-2'>
                            <h5>D-Day</h5>
                            <Row>
                                <Col>
                                    <h5>D-5</h5>
                                    <p>물</p>
                                </Col>
                                <Col>
                                    <h5>D-5</h5>
                                    <p>영양제</p>
                                </Col>
                                <Col>
                                    <h5>D-7</h5>
                                    <p>분갈이</p>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div className='mt-5'>
                        <Card style={{ width: '40rem' }}>
                            <CardBody>
                                <h5>메모</h5>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='mt-5'>
                        <Card>
                            <Card.Body>
                                <h2>스토어연결</h2>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryRead