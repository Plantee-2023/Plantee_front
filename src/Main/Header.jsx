import React from 'react'
import { Button, Col, InputGroup, Row } from 'react-bootstrap'
import './Header.css';
import { FaSearch } from "react-icons/fa";

const Header = () => {
    return (
        <div className='display'>
            <Row>
                <Col lg={2}>
                    <img src='/image/1.jpg' width={20} height={20}></img>
                </Col>
                <Col lg={8}>
                    <form>
                        <InputGroup className='center'>
                            <input type='search' className='search' placeholder='검색어를 입력해주세요.' />
                            <Button className='search_btn' type='submit'><FaSearch /></Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>

        </div>
    )
}

export default Header