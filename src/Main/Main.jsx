import React from 'react'
import { Card, Row, Col, Carousel } from 'react-bootstrap';

const Main = () => {
    return (
        <div className='display'>
            <Carousel className='mb-5 mt-5'>
                <Carousel.Item>
                    <img src='/image/1.jpg' width={1280} height={300} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='/image/2.jpg' width={1280} height={300} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='/image/3.jpg' width={1280} height={300} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src='/image/4.jpg' width={1280} height={300} />
                </Carousel.Item>
            </Carousel>
            <h2 className='text-start mb-3'>
                이번달 식물 추천
            </h2>
            <Carousel className='mb-5 mt-5'>
                <Carousel.Item>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/tee1.jpg' width={200} height={200} />
                                    <Card.Body>
                                        <h7>이름 : </h7><br/>
                                        <h7>가격 : </h7>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/tee2.jpg' width={200} height={200} />
                                    <Card.Body>
                                        <h7>이름 : </h7><br/>
                                        <h7>가격 : </h7>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/tee3.jpg' width={200} height={200} />
                                    <Card.Body>
                                        <h7>이름 : </h7><br/>
                                        <h7>가격 : </h7>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/tee4.jpg' width={200} height={200} />
                                    <Card.Body>
                                        <h7>이름 : </h7><br/>
                                        <h7>가격 : </h7>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
                <Carousel.Item>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what1.jpg' width={200} height={200} />
                                    <Card.Body>
                                        <h7>이름 : </h7><br/>
                                        <h7>가격 : </h7>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what2.jpg' width={200} height={200} />
                                    <Card.Body>
                                        <h7>이름 : </h7><br/>
                                        <h7>가격 : </h7>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what3.jpg' width={200} height={200} />
                                    <Card.Body>
                                        <h7>이름 : </h7><br/>
                                        <h7>가격 : </h7>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what4.jpg' width={200} height={200} />
                                    <Card.Body>
                                        <h7>이름 : </h7><br/>
                                        <h7>가격 : </h7>
                                    </Card.Body>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>
            <Row>
                <Col>
                    <h2 className='text-start mb-3'>
                        ???
                    </h2>
                </Col>
                <Col>
                    <h5 className='text-end'>
                        더보기
                    </h5>
                </Col>
            </Row>
            <Carousel className='mb-5 mt-5'>
                <Carousel.Item>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what1.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what2.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what3.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what4.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>
            <h2 className='text-start mb-3'>
                스토리
            </h2>
            <Carousel className='mb-5 mt-5'>
                <Carousel.Item>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/story1.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/story2.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/story3.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/story4.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='mt-3'> {/* 스토리 두번째 */}
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/story5.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/story6.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/story7.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/story8.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>
            <h2 className='text-start mb-3'>
                가이드 북
            </h2>
            <Carousel className='mb-5 mt-5'>
                <Carousel.Item>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what1.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what2.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what3.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Img src='/image/what4.jpg' width={200} height={200} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Main