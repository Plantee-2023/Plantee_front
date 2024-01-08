import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Row, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

const DiaryRead = () => {
    const [loading, setLoading] = useState(false);
    const { diary_id } = useParams();

    const [diary, setDiary] = useState({
        diary_id: "", user_id: "", image: "", contents: "", reg_date: "", fmtdate: "", last_watering: "", watering: "", common_name: ""
    })

    const { user_id, plant_name, image, contents, reg_date, fmtdate, waterdate, watering, common_name } = diary;

    const getDiary = async () => {
        setLoading(true);
        const res = await axios.get(`/diary/read/${diary_id}`);
        console.log(res.data);
        setDiary(res.data);
        console.log(diary);
        setLoading(false);

    }

    useEffect(() => {
        getDiary();
    }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <div className='plant_wrap'>
            <div className='plant_contents'>
                <div className='text-center'>
                    <h1 className='mt-5'>상세보기</h1>
                    <Button className='diary-update-btn'>수정하기</Button>
                    <Button className='diary-delete-btn'>삭제</Button>
                    <div className='mt-5'>
                        <img src={image} alt='plante' />
                        <h2 className='mt-5'><b>{plant_name} ({common_name})</b></h2>
                    </div>
                    <div className='mt-5 diarymain_cardgroup'>
                        <Card style={{ width: '40rem' }} className='diaryread_card'>
                            <Card.Body>
                                <h5>함께한지 0 일이 지났어요</h5>
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