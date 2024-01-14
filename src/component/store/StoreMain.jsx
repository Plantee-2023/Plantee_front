import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Spinner, Row, Col, Card, Badge, InputGroup } from 'react-bootstrap';
import "./Store.css";
import Pagination from 'react-js-pagination';
import "../common/Pagination.css"

const StoreMain = () => {
    const navi = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const [goods, setGoods] = useState([]);
    const [total, setTotal] = useState(0);
    const [isSeller, setIsSeller] = useState('');

    const search = new URLSearchParams(location.search);
    const [page, setPage] = useState(1);
    const size = 20;
    const [query, setQuery] = useState("");

    const getList = async () => {
        setLoading(true)
        const res = await axios.get(`/store/list.json?page=${page}&size=20&query=${query}`);
        // console.log(res.data.list[0].seller_yn);
        // let isSeller = res.data.list;
        // // 판매자인지 확인하기
        // for (let i = 0; i < isSeller.length; i++) {
        //     const s = isSeller[i];
        //     if (s.seller_yn === "y") {
        //         isSeller[i].seller_yn = s;
        //     }
        // }
        setGoods(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const setQueryStr = (queryStr) => {
        // console.log(queryStr);
        setQuery(queryStr);
    }

    const setQueryClean = () => {
        setQuery("");
        window.location.reload();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPage(1);
        const res = await axios.get(`/store/list.json?page=${1}&size=20&query=${query}`);
        setGoods(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const onChangePage = async (page) => {
        setLoading(true);
        setPage(page);
        const res = await axios.get(`/store/list.json?page=${page}&size=20&query=${query}`);
        setGoods(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    useEffect(() => { getList(); }, [location]);

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>

                    {/* <div className='store_filterbtn_group'>
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
                    )} */}

                    <div>
                        <Navbar bg="#ffffff" data-bs-theme="light" className='pt-3 pb-3'>
                            <div>총 {total}건</div>

                            <Container fluid>
                                <Navbar.Collapse id="navbarScroll">
                                    {/* <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
                                        <Nav.Link href="#home">최신순</Nav.Link>
                                        <Nav.Link href="#home">리뷰많은순</Nav.Link>
                                        <Nav.Link href="#home">낮은가격순</Nav.Link>
                                        <Nav.Link href="#home">높은가격순</Nav.Link>
                                    </Nav> */}

                                    <button className='filter_reset_btn' type='button'><img src='/image/reset_icon.png' onClick={setQueryClean} /></button>

                                    <form onSubmit={onSubmit}>
                                        <InputGroup className='store_searchinputwrap'>
                                            <input type='search' className='store_searchinput' placeholder='검색어를 입력해주세요.'
                                                onChange={(e) => setQueryStr(e.target.value)} value={query} />
                                            <button className='store_searchbtn' type='submit'><img src='/image/search_icon.png' /></button>
                                        </InputGroup>
                                    </form>
                                </Navbar.Collapse>
                            </Container>

                        </Navbar>
                    </div>


                    <div className='plant_insert'>
                        <Link to="/store/insert" ><button>추가하기</button></Link>
                    </div>

                    <Row sm={1} md={3} lg={5} className="g-4">
                        {goods.map(g =>
                            <Col key={g.store_id} className="p-4">
                                <Card style={{ border: 'none' }}>
                                    <NavLink to={`/store/read/${g.store_id}`} style={{ color: "black" }}>
                                        {sessionStorage.getItem("uid") === g.uid ?
                                            <>
                                                <Card.Img variant="top" src="http://via.placeholder.com/10x10" />
                                                <Card.ImgOverlay>
                                                    <h5><Badge bg="success">내가 쓴 글</Badge></h5>
                                                </Card.ImgOverlay>
                                            </>
                                            :
                                            <>
                                                <Card.Img variant="top" src="http://via.placeholder.com/10x10" />
                                            </>
                                        }
                                        <Card.Body>
                                            <Card.Title>{g.title}</Card.Title>
                                            <Card.Text>{g.fmtprice}원<br /></Card.Text>
                                            {/* <button className='store_tag_badge'>{g.tag}</button> */}
                                        </Card.Body>
                                    </NavLink>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>

            <Pagination
                activePage={page}
                itemsCountPerPage={size}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(newpage) => onChangePage(newpage)} />

        </>
    )
}

export default StoreMain