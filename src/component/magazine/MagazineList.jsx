import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import { Col, Form, InputGroup, Row, Button, Table, Spinner, Card } from 'react-bootstrap'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
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
        <div className='plant_wrap'>
            <div className='plant_contents'>
                <h3 className='magazine-list-title'>매거진</h3>
                <Row>
                    <Col>
                        <form onSubmit={onSubmit}>
                            <InputGroup className='search'>
                                <input type='search' className='search_input_textinput' placeholder='검색어를 입력해주세요.' value={searchTerm} onChange={handleSearchChange} />
                                <button className='search_input_searchbtn' type='submit'><img src='/image/search_icon.png' /></button>
                            </InputGroup>
                        </form>
                    </Col>
                    <Col>
                        {sessionStorage.getItem('uid') === "admin" &&
                            <div className='plant_insert'>
                                <Link to="/magazine/magazineinsert"><button>추가하기</button></Link>
                            </div>

                        }
                    </Col>
                </Row>
                <Table className='mt-5' bordered hover>
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
                                <td style={{ width: 50 }} className='text-center'>{m.magazine_num}</td>
                                <td><NavLink style={{ color: '#000000' }} to={`/magazine/read/${m.magazine_num}`}>{m.title}</NavLink></td>
                                <td style={{ width: '100px' }} className='text-center'>{m.nickname}</td>
                                <td style={{ width: '300px' }} className='text-center'>{m.fmtdate}</td>
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