import React from 'react'
import { Col, Form, InputGroup, Row, Button, Table } from 'react-bootstrap'
import './Magazine.css'
import { NavLink } from 'react-router-dom'
import { AiOutlineEdit } from "react-icons/ai";

const MagazineList = () => {
    return (
        <div>
            <div className='magazine-list-title'>매거진</div>
            <NavLink className="magazine-insert" to="/main/magazineInsert"><AiOutlineEdit />글쓰기</NavLink>
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
                    <tr>
                        <td className='text-center'>1</td>
                        <td><a href='/main/magazine'>얘는 무슨 식물이냐?</a></td>
                        <td className='text-center'>관리자</td>
                        <td className='text-center'>2023/12/29</td>
                        <td className='text-center'>0</td>
                    </tr>
                    <tr>
                        <td className='text-center'>2</td>
                        <td><a href=''>우리 토마토가 어디가 아픈건가요?</a></td>
                        <td className='text-center'>관리자</td>
                        <td className='text-center'>2023/12/28</td>
                        <td className='text-center'>0</td>
                    </tr>
                </tbody>
            </Table>
            <Row>
                <Col lg={5}>
                    <Form.Select className='select'>
                        <option>번호</option>
                        <option>제목</option>
                        <option>작성자</option>
                    </Form.Select>
                </Col>
                <Col>
                    <InputGroup className='search'>
                        <Form.Control type='text' />
                        <Button className='magazine-btn'>검색</Button>
                    </InputGroup>
                </Col>
            </Row>
        </div>
    )
}

export default MagazineList