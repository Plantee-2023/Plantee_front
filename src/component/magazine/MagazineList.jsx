import React, { useEffect } from 'react'
import axios from 'axios';
import { Col, Form, InputGroup, Row, Button, Table, Spinner, Card } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from 'react';
import Pagination from 'react-js-pagination';
import "../common/Pagination.css"
import './Magazine.css'

const MagazineList = () => {
    const navi = useNavigate();
    const size = 5;
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const path = location.pathname;
    const [loading, setLoading] = useState(false);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [query, setQuery] = useState(search.get("query") ? search.get("query") : "");
    const [magazine, setMagazine] = useState([]);

    const getMagazineList = async () => {
        setLoading(true);
        const res = await axios.get(`/magazine/list.json?query=${query}&page=${page}&size=${size}`);
        setMagazine(res.data.list);
        setTotal(res.data.total);
        console.log(res.data.list);
        setLoading(false);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        navi(`${path}?page=1&query=${query}&size=${size}`);
        console.log();
    }
    const onChangePage = (page) => {
        navi(`${path}?page=${page}&query=${query}&size=${size}`);
    }
    useEffect(() => {
        getMagazineList();
    }, [location])

    if (loading) return <div className='text-center'><Spinner size='lg' /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <div className='magazine-list-title'>매거진</div>
                <Button className="magazine-write-btn">
                    <NavLink className="magazine-insert" to="/magazine/insert"><AiOutlineEdit />글쓰기</NavLink>
                </Button>
                <Table className='list' bordered hover>
                    <thead className='text-center'>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>등록일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {magazine.map(m =>
                            <tr key={m.post_id}>
                                <td className='text-center'>{m.post_id}</td>
                                <td><NavLink to={`/magazine/read/${m.post_id}`}>{m.title}</NavLink></td>
                                <td className='text-center'>{m.nickname}</td>
                                <td className='text-center'>{m.red_date}</td>
                                <td className='text-center'>{m.view_cnt}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Row>
                    <Col lg={5}>
                        <Form.Select className='select'>
                            <option value='1'>번호</option>
                            <option value='2'>제목</option>
                            <option value='3'>작성자</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='search'>
                                <Form.Control value={query} onChange={(e) => setQuery(e.target.value)} />
                                <Button className='magazine-btn'>검색</Button>
                            </InputGroup>
                        </form>
                    </Col>
                </Row>
                {total > size &&
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={size}
                        totalItemsCount={total}
                        pageRangeDisplayed={10}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={onChangePage} />
                }
            </div>
        </div>
    )
}

export default MagazineList