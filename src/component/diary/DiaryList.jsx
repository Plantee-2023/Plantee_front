import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, Col, Container, Row, Spinner } from 'react-bootstrap'
import DiaryTag from './DiaryTag'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const DiaryList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();

    const getList = async () => {
        setLoading(true);
        const res = await axios.get(`/diary/list.json/${sessionStorage.getItem("uid")}`);
        console.log(res.data);
        setList(res.data);
        setLoading(false);
        // console.log(list);
    }

    const onClickInsert = () => {
        navi(`/diary/main/insert`);
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
                <div className='mt-5 text-center'>
                    <h1><b>앨범</b></h1>
                </div>
                <div className='text-end mt-3' onClick={() => { onClickInsert() }}>
                    <img src='/image/icon-add.png' className='diary-img-insert' /><span className='diary-insert-size'><b><u>등록하기</u></b></span>
                </div>
                <div className='list_all'>
                    <div className='line_top1'>
                        <img src='/image/icon_water.png' width={'40px'} height={'40px'} />
                        <span> 물 주기</span>
                    </div>
                    <div className='line_1'>
                        <h2 className='mb-5'>물 주기</h2>
                        <div className='diarylist_cardgroup'>
                            {list.map(d =>
                                <div>
                                    {d.date_water > -3 && (
                                        <Card style={{ width: '40rem' }} className='diarylist_card'>
                                            <CardBody>
                                                <Row>
                                                    <Col md={4}>
                                                        <img src={d.image} width={150} height={150} />
                                                    </Col>
                                                    <Col className='list_col'>
                                                        <h3>
                                                            {d.plant_name}
                                                        </h3>
                                                        <form>
                                                            {d.fmtdate}
                                                        </form>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='line_top2'>
                        <img src='/image/icon_soild.png' width={'60px'} height={'60px'} />
                    </div>
                    <div className='line_2'>
                        <h2 className='mb-5'>분갈이 해주기</h2>
                        <div className='diarylist_cardgroup'>
                            {list.map(d =>
                                <div>
                                    {d.date_medicine > -3 && (
                                    <Card style={{ width: '40rem' }} className='diarylist_card'>
                                        <CardBody>
                                            <Row>
                                                <Col md={4}>
                                                    <img src={d.image} width={150} height={150} />
                                                </Col>
                                                <Col className='list_col'>
                                                    <h3>
                                                        {d.plant_name}
                                                    </h3>
                                                    <form>
                                                        {d.fmtdate}
                                                    </form>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='line_top3'>
                        <img src='/image/icon_medicine.png' width={'60px'} height={'60px'} />
                    </div>
                    <div className='line_3'>
                        <h2 className='mb-5'>영양제 주기</h2>
                        <div className='diarylist_cardgroup'>
                            {list.map(d =>
                                <div>
                                    {d.date_change > -3 && (
                                    <Card style={{ width: '40rem' }} className='diarylist_card'>
                                        <CardBody>
                                            <Row>
                                                <Col md={4}>
                                                    <img src={d.image} width={150} height={150} />
                                                </Col>
                                                <Col className='list_col'>
                                                    <h3>
                                                        {d.plant_name}
                                                    </h3>
                                                    <form>
                                                        {d.fmtdate}
                                                    </form>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryList