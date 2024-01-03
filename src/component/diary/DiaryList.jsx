import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import DiaryTag from './DiaryTag'

const DiaryList = () => {
    return (
        <div>
            <div className='mt-3'>
                <Container>
                    <DiaryTag />
                </Container>
            </div>
            <div className='plant_wrap'>
                <div className='plant_contents'>
                    <div className='mt-5 text-center'>
                        <h1><b>목록</b></h1>
                    </div>
                    <div className='text-center mt-5'>
                        <div className='line'>
                            <h3>물주기</h3>
                            <Card style={{ width: '30rem' }}>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <img src="http://via.placeholder.com/100x100" alt='plante' />
                                        </Col>
                                        <Col>
                                            <form>
                                                식물이름
                                            </form>
                                            <form>
                                                <img src="http://via.placeholder.com/50x50" alt='plante' />
                                            </form>
                                            <form>
                                                메모장?
                                            </form>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                        <div className='line mt-5'>
                            <h3>영양제</h3>
                            <Card style={{ width: '30rem' }}>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <img src="http://via.placeholder.com/100x100" alt='plante' />
                                        </Col>
                                        <Col>
                                            <form>
                                                식물이름
                                            </form>
                                            <form>
                                                <img src="http://via.placeholder.com/50x50" alt='plante' />
                                            </form>
                                            <form>
                                                메모장?
                                            </form>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryList