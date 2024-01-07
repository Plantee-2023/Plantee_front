import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, Container, Form, InputGroup, NavLink, Row, Spinner } from 'react-bootstrap';
import DiaryTag from './DiaryTag';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const DiaryMain = () => {
    const [list, setList] = useState([]);
    // const { uid } = useParams();
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
                <div className='diary_searchwrap'>
                    <form>
                        <InputGroup className='diary_searchinputwrap'>
                            <input type='search' className='diary_searchinput' placeholder='검색어를 입력해주세요.' />
                            <button className='diary_searchbtn' type='submit'><img src='/image/search_icon.png' /></button>
                        </InputGroup>
                    </form>
                </div>
                <div className='text-end mt-3'>
                <Button className='diary-img-btn' onClick={() => { onClickInsert() }}>등록하기</Button>
                </div>
                <div className='text-center'>
                    {list.map(d =>
                        <div className='diary_detail my-5'>
                            <NavLink to={`/diary/main/read/`}>{/*${diary_id} */}
                                <Row>
                                    <Col>
                                        <br />
                                        <h1>D-1</h1>
                                        <hr className='diary_dayline' />
                                        <p className='diary_icon_sun'>
                                            <img src='/image/icon_sun.png' width={'60px'} height={'60px'} />
                                            <img src='/image/icon_sun.png' width={'60px'} height={'60px'} />
                                            <img src='/image/icon_sun.png' width={'60px'} height={'60px'} />
                                            <img src='/image/icon_sun.png' width={'60px'} height={'60px'} />
                                        </p>
                                        <p>
                                            <img src='/image/icon_water.png' width={'40px'} height={'40px'} />
                                            <img src='/image/icon_water.png' width={'40px'} height={'40px'} />
                                        </p>
                                    </Col>
                                    <Col>
                                        <div>
                                            <img src={d.image} width={300} height={300} />
                                        </div>
                                    </Col>
                                    <Col>
                                        <br /><br /><br /><br />
                                        <h1>{d.plant_name}</h1>
                                    </Col>
                                </Row>
                            </NavLink>
                        </div>
                    )}
                    <div className='diarymain_cardgroup'>
                        <Card style={{ width: '30rem' }} className='diarymain_card'>
                            <Card.Body>
                                <Row>
                                    <Col md='5'>
                                        <div className='diary_logo'>
                                            <img src='/image/logo.png' />
                                        </div>
                                    </Col>
                                    <Col className='mt-2'>
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