import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, Spinner, Row, Col, Card, Badge, InputGroup } from 'react-bootstrap';
import "./Store.css";
import Pagination from 'react-js-pagination';
import "../common/Pagination.css"

const StoreMain = () => {
    const [loading, setLoading] = useState(false);

    const [isClickPlant, setClickPlant] = useState(false);
    const [isClickGoods, setClickGoods] = useState(false);

    const [goods, setGoods] = useState([]);

    const getList = async () => {
        setLoading(true)
        const res = await axios.get(`/store/list.json`);
        setGoods(res.data.list);
        setLoading(false);
    }

    useEffect(() => { getList(); }, []);

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>

                    <div className='store_filterbtn_group'>
                        <button className='plant_filterbtn'>↺</button>
                        <button className='button_hide' onClick={() => { setClickPlant((e) => !e); }} >
                            <div className={`${!isClickPlant ? 'store_filterbtn' : 'store_filterbtn_clicked'}`} >
                                <div>식물</div>
                            </div>
                        </button>
                        <button className='button_hide' onClick={() => { setClickGoods((e) => !e); }} >
                            <div className={`${!isClickGoods ? 'store_filterbtn' : 'store_filterbtn_clicked'}`} >
                                <div>용품</div>
                            </div>
                        </button>
                    </div>

                    {isClickPlant && (
                        <>
                            <div className='store_filterbtn_group'>
                                <button className='store_filterbtn'>초보자용</button>
                                <button className='store_filterbtn'>중급자용</button>
                                <button className='store_filterbtn'>상급자용</button>
                            </div>
                        </>
                    )}
                    {isClickGoods && (
                        <>
                            <div className='store_filterbtn_group'>
                                <button className='store_filterbtn'>전체</button>
                                <button className='store_filterbtn'>화분</button>
                                <button className='store_filterbtn'>수분</button>
                            </div>
                        </>
                    )}

                    <div>
                        <Navbar bg="#ffffff" data-bs-theme="light" className='pt-3 pb-3'>
                            <div>총 ###,###건</div>
                            <Container fluid>
                                <Navbar.Collapse id="navbarScroll">
                                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
                                        <Nav.Link href="#home">최신순</Nav.Link>
                                        <Nav.Link href="#home">인기순</Nav.Link>
                                        <Nav.Link href="#home">리뷰많은순</Nav.Link>
                                        <Nav.Link href="#home">낮은가격순</Nav.Link>
                                        <Nav.Link href="#home">높은가격순</Nav.Link>
                                    </Nav>
                                    <form>
                                        <InputGroup className='store_searchinputwrap'>
                                            <input type='search' className='store_searchinput' placeholder='검색어를 입력해주세요.' />
                                            <button className='store_searchbtn' type='submit'><img src='/image/search_icon.png' /></button>
                                        </InputGroup>
                                    </form>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>

                    <Row sm={1} md={3} lg={5} className="g-4">
                        {goods.map(g =>
                            <Col key={g.store_id} className="p-4">
                                <Card style={{ border: 'none' }}>
                                    <NavLink to={`/store/read/${g.store_id}`} style={{ color: "black" }}>
                                        <Card.Img variant="top" src="http://via.placeholder.com/10x10" />
                                        <Card.Body>
                                            <Card.Title>{g.title}</Card.Title>
                                            <Card.Text>{g.fmtprice}원<br /></Card.Text>
                                            <h5><Badge pill bg="success" style={{ background: '#4cc37c' }}>{g.tag}</Badge></h5>
                                        </Card.Body>
                                    </NavLink>
                                </Card>
                            </Col>
                        )}
                    </Row>

                </div>
            </div>

            <Pagination
                activePage={1}
                itemsCountPerPage={8}
                totalItemsCount={88}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(page) => { }} />

        </>
    )
}

export default StoreMain