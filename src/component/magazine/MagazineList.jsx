import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import { Col, Form, InputGroup, Row, Button, Container, Spinner, Card } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from 'react';
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
                            <Button className="magazine-write-btn">
                                <NavLink className="magazine-insert" to="/magazine/magazineinsert" style={{ color: '#ffffff' }}><AiOutlineEdit />글쓰기</NavLink>
                            </Button>
                        }
                    </Col>
                </Row>
                <Row sm={1} md={2} lg={3} className='magazine-grid'>
                        {filteredList.map(m =>
                            <Col key={m.magazine_num} >
                                <Card style={{ border: 'none' }}>
                                    <NavLink to={`/magazine/read/${m.magazine_num}`} style={{ color: "black",textDecoration:'none' }}>
                                        <Card.Img width={220} height={220} src={m.image || 'http://via.placeholder.com/10x10'} />
                                        <Card.Body>
                                            <Card.Title className='text-center'>{m.title}</Card.Title>
                                            <Card.Text className='ellipsis'>{m.contents}<br /></Card.Text>
                                        </Card.Body>
                                    </NavLink>
                                </Card>
                            </Col>
                        )}
                    </Row>
            </div>
        </div>
    )
}

export default MagazineList