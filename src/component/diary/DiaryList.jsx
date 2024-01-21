import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, Col, Container, Row, Spinner } from 'react-bootstrap'
import DiaryTag from './DiaryTag'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import BtnToTop from '../common/BtnToTop';

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

    useEffect(() => {
        getList();
    }, []);

    if (loading) return <div className='my-5 text-center'><Spinner variant='success' /></div>
    return (
        <>
            <div className='mainbanner_section'>
                <img className='banner_img' src="/image/header/Calendar.png" />
            </div>
            <div className='diary_wrap'>
                <div className='diary_contents'>
                    <div className='mt-3'>
                        <Container>
                            <DiaryTag />
                        </Container>
                    </div>
                    <div className='plant_insert'>
                        <Link to="/diary/insert"><button>추가하기</button></Link>
                    </div>
                    <div className='list_all'>
                        <div className='line_top1'>
                            <img src='/image/icon_water.png' width={'40px'} height={'40px'} />
                        </div>
                        <div className='line_1'>
                            <h2 className='mb-5'>물 주기</h2>
                            <div className='diarylist_cardgroup'>
                                {list.map(d =>
                                    <div className="diary_detail">
                                        <Link to={`/diary/read/${d.diary_id}`}>
                                            {d.date_water < 7 && (
                                                <Card style={{ width: '40rem' }} className='diarylist_card'>
                                                    <CardBody>
                                                        <Row>
                                                            <Col md={4}>
                                                                {d.image ? (
                                                                    <img src={d.image} width={150} height={150} />
                                                                ) : (
                                                                    <img src='http://via.placeholder.com/150x150' alt='대체 이미지' />
                                                                )}
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
                                        </Link>
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
                                    <div className="diary_detail">
                                        <Link to={`/diary/read/${d.diary_id}`}>
                                            {d.date_change < 30 && (
                                                <Card style={{ width: '40rem' }} className='diarylist_card'>
                                                    <CardBody>
                                                        <Row>
                                                            <Col md={4}>
                                                                {d.image ? (
                                                                    <img src={d.image} width={150} height={150} />
                                                                ) : (
                                                                    <img src='http://via.placeholder.com/150x150' alt='대체 이미지' />
                                                                )}
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
                                        </Link>
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
                                    <div className="diary_detail">
                                        <Link to={`/diary/read/${d.diary_id}`}>
                                            {d.date_medicine <= 20 && (
                                                <Card style={{ width: '40rem' }} className='diarylist_card'>
                                                    <CardBody>
                                                        <Row>
                                                            <Col md={4}>
                                                                {/* <img src={d.image} width={150} height={150} /> */}
                                                                {d.image ? (
                                                                    <img src={d.image} width={150} height={150} />
                                                                ) : (
                                                                    <img src='http://via.placeholder.com/150x150' alt='대체 이미지' />
                                                                )}
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
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <BtnToTop />
                </div>
            </div >
        </>
    )
}

export default DiaryList