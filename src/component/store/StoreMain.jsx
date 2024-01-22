import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Spinner, Row, Col, Card, Badge, InputGroup } from 'react-bootstrap';
import "./Store.css";
import Pagination from 'react-js-pagination';
import "../common/Pagination.css"

const StoreMain = () => {
    const navi = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [selectedCareLevel, setSelectedCareLevel] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [goods, setGoods] = useState([]);
    const [total, setTotal] = useState(0);
    const [isSeller, setIsSeller] = useState('');

    const search = new URLSearchParams(location.search);
    const [page, setPage] = useState(1);
    const size = 20;
    const [query, setQuery] = useState("");

    const [sellerYn, setSellerYn] = useState("");

    const getList = async () => {
        setLoading(true);
        const res = await axios.get(`/store/list.json?page=${page}&size=20&query=${query}`);
        setGoods(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }

    const getUserInfo = async () => {
        setLoading(true);
        // setForm(sessionStorage.getItem("uid"));
        const uid = sessionStorage.getItem("uid");
        const res = await axios.get(`/store/getUserInfoAct?query=${uid}`);
        let sellerYnStr = "";
        if (res.data == null) {
            sellerYnStr = "n";
        } else {
            sellerYnStr = res.data.seller_yn;
            if (uid == 'admin') {
                sellerYnStr = 'y';
            }
        }
        setSellerYn(sellerYnStr);
        setLoading(false);
    }

    const setQueryStr = (queryStr) => {
        setQuery(queryStr);
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

    const handleCareLevelFilter = (level) => {
        setSelectedCareLevel(level);
    };

    const filteredList = goods.filter((item) => {
        const nameMatches = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const careLevelMatches = selectedCareLevel ? item.level == selectedCareLevel : true;
        return nameMatches && careLevelMatches;
    });

    const getLevel = (level) => {
        switch (level) {
            case 1:
                return '초보자용';
            case 2:
                return '중급자용';
            default:
                return '상급자용';
        }
    };

    useEffect(() => { getList(); getUserInfo(); }, [location]);

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (

        <>
            <div className='mainbanner_section'>
                <img className='banner_img' src="/image/header/Store.png" />
            </div>
            <div className='store_wrap'>
                <div className='store_contents'>

                    <div>
                        <Navbar bg="#ffffff" data-bs-theme="light" className='pt-5 pb-4'>
                            <div className='first_filter_section'>
                                <div className='first_filter_between'>
                                    <div className='store_filter_list'>
                                        {sellerYn === 'y' ?
                                            <div className='store_insert'>
                                                <Link to="/store/insert" ><button id='insertButton'>판매글 쓰기</button></Link>
                                            </div>
                                            :
                                            <></>
                                        }
                                        <button className={`filter_reset_btn ${selectedCareLevel === null ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(null)}>
                                            <img src='/image/reset_icon.png' alt='reset icon' />
                                        </button>
                                        <button className={`filter_btn ${selectedCareLevel === 1 ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(1)}>
                                            초보자용
                                        </button>
                                        <button className={`filter_btn ${selectedCareLevel === 2 ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(2)}>
                                            중급자용
                                        </button>
                                        <button className={`filter_btn ${selectedCareLevel === 3 ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(3)}>
                                            상급자용
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Navbar>

                        <div className='plant_data'>
                            <div className='plant_layout'>
                                <div className='store_total'>총 스토어 :<strong> {total}</strong>건</div>
                                <form onSubmit={onSubmit}>
                                    <InputGroup className='search_input_inputgroup'>
                                        <input type='search' className='search_input_textinput' placeholder='검색어를 입력해주세요.'
                                            onChange={(e) => setQueryStr(e.target.value)} value={query} />
                                        <button className='search_input_searchbtn' type='submit'><img src='/image/search_icon.png' /></button>
                                    </InputGroup>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Row sm={1} md={3} lg={5} className="g-4">
                        {filteredList.map(g =>
                            <Col key={g.store_id} className="p-4">
                                <Card style={{ border: 'none' }}>
                                    <NavLink to={`/store/read/${g.store_id}`} style={{ color: "black" }}>
                                        <Card.Img width={220} height={260} variant="top" src={g.image || 'http://via.placeholder.com/10x10'} />
                                        {sessionStorage.getItem("uid") === g.uid &&
                                            <Card.ImgOverlay>
                                                <h5><Badge bg="success">내가 쓴 글</Badge></h5>
                                            </Card.ImgOverlay>
                                        }
                                        <Card.Body>
                                            <Card.Title>{g.title}</Card.Title>
                                            <Card.Text>{g.fmtprice}원<br /></Card.Text>
                                            <button className='store_tag_badge'>{getLevel(g.level)}</button>
                                        </Card.Body>
                                    </NavLink>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </div >
            </div >

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