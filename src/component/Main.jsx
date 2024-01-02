import React from 'react'
import { Row, Col, InputGroup, Button, Card, Carousel } from 'react-bootstrap';
import { CgChevronRight } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { LiaComment } from "react-icons/lia";
import './Main.css'

const Main = () => {
    return (
        <div className="main_wrap">
            <div className='main_contents'>
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
                <Row>
                    <Col>
                        <div className='main-title mb-3'>
                            이번달 식물 추천
                        </div>
                    </Col>
                    <Col>
                        <a className='main_more' href='/'>
                            더보기<CgChevronRight />
                        </a>
                    </Col>
                </Row>
                <Carousel className='mb-5 mt-5'>
                    <Carousel.Item>
                        <Row>
                            <Col >
                                <Card>
                                    <Card.Body >
                                        <Card.Img src='/image/tee1.jpg' width={200} height={200} />
                                        <Card.Body className='main_text'>
                                            <div>이름 : </div><br />
                                            <div>가격 : </div>
                                        </Card.Body>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/tee2.jpg' width={200} height={200} />
                                        <Card.Body className='main_text'>
                                            <div>이름 : </div><br />
                                            <div>가격 : </div>
                                        </Card.Body>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body >
                                        <Card.Img src='/image/tee3.jpg' width={200} height={200} />
                                        <Card.Body className='main_text'>
                                            <div>이름 : </div><br />
                                            <div>가격 : </div>
                                        </Card.Body>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/tee4.jpg' width={200} height={200} />
                                        <Card.Body className='main_text'>
                                            <div>이름 : </div><br />
                                            <div>가격 : </div>
                                        </Card.Body>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
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
                                        <Card.Body className='main_text'>
                                            <div>이름 : </div><br />
                                            <div>가격 : </div>
                                        </Card.Body>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what2.jpg' width={200} height={200} />
                                        <Card.Body className='main_text'>
                                            <div>이름 : </div><br />
                                            <div>가격 : </div>
                                        </Card.Body>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what3.jpg' width={200} height={200} />
                                        <Card.Body className='main_text'>
                                            <div>이름 : </div><br />
                                            <div>가격 : </div>
                                        </Card.Body>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what4.jpg' width={200} height={200} />
                                        <Card.Body className='main_text'>
                                            <div>이름 : </div><br />
                                            <div>가격 : </div>
                                        </Card.Body>
                                        <Card.Footer className='text-start'>
                                            1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <Col>
                        <div className='main-title mb-4'>
                            MBTI 추천
                        </div>
                    </Col>
                    <Col>
                        <a className='main_more' href='/'>
                            더보기<CgChevronRight />
                        </a>
                    </Col>
                </Row>
                <InputGroup>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                </InputGroup>
                <Carousel className='mb-5 mt-5'>
                    <Carousel.Item>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what1.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what2.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what3.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what4.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <Col>
                        <div className='main-title mb-3'>
                            스토리
                        </div>
                    </Col>
                    <Col>
                        <a className='main_more' href='/'>
                            더보기<CgChevronRight />
                        </a>
                    </Col>
                </Row>
                <InputGroup>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                    <Button className='main_btn'>태그</Button>
                </InputGroup>
                <Carousel className='mb-5 mt-5'>
                    <Carousel.Item>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story1.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story2.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story3.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story4.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='mt-3'> {/* 스토리 두번째 */}
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story5.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story6.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story7.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/story8.jpg' width={200} height={200} />
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <Col>
                        <h2 className='main-title mb-3'>
                            매거진
                        </h2>
                    </Col>
                </Row>
                <Carousel className='mb-5 mt-5'>
                    <Carousel.Item>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what1.jpg' width={200} height={200} />
                                        <hr />
                                        <div>제목 : 이 식물을 안키운다면 멍청이!</div>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what2.jpg' width={200} height={200} />
                                        <hr />
                                        <div>제목 : 아기 있는 집안에 하나는 있어야하는것!</div>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what3.jpg' width={200} height={200} />
                                        <hr />
                                        <div>제목 : 당신은 식물을 키워야한다!</div>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src='/image/what4.jpg' width={200} height={200} />
                                        <hr />
                                        <div>제목 : 당신은 식물을 키워야한다!</div>
                                    </Card.Body>
                                    <Card.Footer className='text-start'>
                                        1 <MdFavoriteBorder /> 0 <FaRegBookmark /> 0 <LiaComment size={20} />
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}

export default Main