import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import { Col, Form, InputGroup, Row, Button, Table, Spinner, Card } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from 'react';
import Pagination from 'react-js-pagination';
import "../common/Pagination.css"
import './Magazine.css'
import { BoxContext } from '../common/BoxContext'

const MagazineList = () => {
    const post_id = useParams();

    const { box, setBox } = useContext(BoxContext);
    const navi = useNavigate();
    const size = 3;
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
        console.log(res.data)
        setMagazine(res.data.list);
        setTotal(res.data.total);
        setLoading(false);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (query == "") {
            setBox({
                show: true,
                message: "검색어를 입력하세요"
            })
        } else {
            navi(`${path}?query=${query}&page=1`)
        }
    }
    const onChangePage = (page) => {
        navi(`${path}?page=${page}&query=${query}&size=${size}`);
    }

    const onDelete = async () => {
        setBox({
            show: true,
            message: `도서를 삭제하시겠습니까?`
        })
        const res = await axios.post(`/magazine/delete`, { post_id });
        if (res.data === 0) {

            setBox({
                show: true,
                message: "삭제 실패"
            })
        } else {
            //alert("삭제 성공");
            setBox({
                show: true,
                message: "삭제 성공"
            })
            navi(`/magazine/magazineList`);
        }
    }
    useEffect(() => {
        getMagazineList();
    }, [location])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <div className='magazine-list-title'>매거진</div>
                {sessionStorage.getItem('uid') === "admin" &&
                    <Button className="magazine-write-btn">
                        <NavLink className="magazine-insert" to="/magazine/magazineinsert"><AiOutlineEdit />글쓰기</NavLink>
                    </Button>
                }
                <Table className='list' bordered hover>
                    <thead className='text-center'>
                        <tr>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>등록일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {magazine.map(m =>
                            <tr key={m.post_id}>
                                <td><NavLink style={{ color: '#000000' }} to={`/magazine/read/${m.post_id}`}>{m.title}</NavLink></td>
                                <td className='text-center'>{m.nickname}</td>
                                <td className='text-center'>{m.red_date}</td>
                                <td className='text-center'>{m.view_cnt}</td>
                                <td>
                                    <button onClick={onDelete} className='magazine-delete-btn' >삭제</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <form onSubmit={onSubmit}>
                    <InputGroup className='search'>
                        <Form.Control type='search' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='검색어'/>
                        <Button className='magazine-btn'>검색</Button>
                    </InputGroup>
                </form>
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