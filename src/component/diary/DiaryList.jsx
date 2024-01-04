import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import DiaryTag from './DiaryTag'

const DiaryList = () => {
    return (
        <div className='diary_wrap'>
            <div className='diary_contents'>
                <div className='mt-3'>
                    <Container>
                        <DiaryTag />
                    </Container>
                </div>
                <div className='mt-5 text-center'>
                    <h1><b>목록</b></h1>
                </div>
                <div className='line'>
                    <h3>물주기</h3>
                    <div className='diarylist_cardgroup'>
                        <Card style={{ width: '30rem' }} className='diarylist_card'>
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
                <div className='line'>
                    <h3>물주기</h3>
                    <div className='diarylist_cardgroup'>
                        <Card style={{ width: '30rem' }} className='diarylist_card'>
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
    )
}

export default DiaryList