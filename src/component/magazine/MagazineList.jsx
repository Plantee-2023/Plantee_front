import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import { Col, Form, InputGroup, Row, Button, Table, Spinner, Card } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from 'react';
import Pagination from 'react-js-pagination';
import "../common/Pagination.css"
import './Magazine.css'
import { BoxContext } from '../common/BoxContext'

const MagazineList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { box, setBox } = useContext(BoxContext);
    const navi = useNavigate();
    const size = 10;
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const path = location.pathname;
    const [loading, setLoading] = useState(false);
    const page = search.get("page") ? parseInt(search.get("page")) : 1;
    const [magazine, setMagazine] = useState([]);

    const getMagazineList = async () => {
        setLoading(true);
        const res = await axios.get(`/magazine/list.json?query=${searchTerm}&page=${page}&size=${size}`);
        console.log(res.data)
        setMagazine(res.data.list);
        setLoading(false);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (searchTerm == '') {
            setBox({
                show: true,
                message: "검색어를 입력하세요"
            })
        } else {
            navi(`${path}?query=${searchTerm}&page=1&size=${size}`)
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredList = magazine.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        getMagazineList();
    }, [location])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <div className='magazine-list-title'>매거진</div>
                <Row>
                    <Col>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='search'>
                                <Form.Control type='search' value={searchTerm} onChange={handleSearchChange} placeholder='검색어' />
                                <Button className='magazine-btn'>검색</Button>
                            </InputGroup>
                        </form>
                    </Col>
                    <Col>
                        {sessionStorage.getItem('uid') === "admin" &&
                            <Button className="magazine-write-btn">
                                <NavLink className="magazine-insert" to="/magazine/magazineinsert"><AiOutlineEdit />글쓰기</NavLink>
                            </Button>
                        }
                    </Col>
                </Row>
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
                        {filteredList.map(m =>
                            <tr key={m.magazine_num}>
                                <td style={{width:50}} className='text-center'>{m.magazine_num}</td>
                                <td><NavLink style={{ color: '#000000' }} to={`/magazine/read/${m.magazine_num}`}>{m.title}</NavLink></td>
                                <td style={{ width: '100px' }} className='text-center'>{m.nickname}</td>
                                <td style={{ width: '300px' }} className='text-center'>{m.red_date}</td>
                                <td style={{ width: '100px' }} className='text-center'>{m.view_cnt}회</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default MagazineList