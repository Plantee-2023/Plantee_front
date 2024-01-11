import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import DiaryTag from './DiaryTag';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';


const DiaryMain = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [query, setQuery] = useState("")
    const navi = useNavigate();

    const getList = async () => {
        setLoading(true);
        const res = await axios.get(`/diary/list.json/${sessionStorage.getItem("uid")}`);//?query=${query}
        console.log(res.data);
        setList(res.data);
        setLoading(false);
        // console.log(list);
    }

    // const onSubmit=(e)=>{
    //     e.preventDefault();
    //     if(query===""){
    //         alert("검색어를 입력하세요")
    //     }else{
    //         getList();
    //     }
    // }

    const getSun = (sunlight) => {
        switch (sunlight) {
            case '2~3':
                return <img src='/image/icon_sun.jpg' />;
            case '6':
                return <img src='/image/icon_sun2.jpg' />;
            case '12':
                return <img src='/image/icon_sun3.jpg' />;
            case '18':
                return <img src='/image/icon_sun3.jpg' />;
            default:
                return <img src='/image/icon_sun5.jpg' />;
        }
    };

    const getWater = (watering) => {
        switch (watering) {
            case 30:
                return <img src='/image/icon_water.jpg' />;
            case 21:
                return <img src='/image/icon_water2.jpg' />;
            case 14:
                return <img src='/image/icon_water3.jpg' />;
            case 7:
                return <img src='/image/icon_water3.jpg' />;
            default:
                return <img src='/image/icon_water5.jpg' />;
        }
    };

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
                    <Link to={`/diary/insert`}>
                        <img src='/image/icon-add.png' className='diary-img-insert' /><span className='diary-insert-size'><b><u>등록하기</u></b></span>
                    </Link>
                </div>
                <div className='text-center'>
                    {list.map(d =>
                        <div className='diary_detail my-5'>
                            <Link to={`/diary/read/${d.diary_id}`}>
                                <Row>
                                    <Col>
                                        <br />
                                        <h1>D-{d.date_water}</h1>
                                        <hr className='diary_dayline' />
                                        <p className='diary_icon_sun'>
                                            <p>{getSun(d.sunlight)}</p>
                                        </p>
                                        <p className='diary_icon_sun'>
                                            <p>{getWater(d.watering)}</p>
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
                            </Link>
                        </div>
                    )}
                    <div className='diarymain_cardgroup'>
                        <Card style={{ width: '50rem' }} className='diarymain_card'>
                            <Card.Body>
                                <Row>
                                    <Col md='5'>
                                        <div className='diary_logo'>
                                            <img src='/image/logo.png' />
                                        </div>
                                    </Col>
                                    <Col className='mt-2'>
                                        오늘은
                                        {list.map(d =>
                                            <span>
                                                [{d.plant_name}],
                                            </span>
                                        )}
                                        물 주는 날 입니다.
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