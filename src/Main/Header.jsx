import React from 'react'
import { Button, Col, InputGroup, Row } from 'react-bootstrap'
import './Header.css';
import { FaSearch } from "react-icons/fa";

const Header = () => {
    return (
        <div className='display'>
            <Row>
                <Col lg={1}>
                    <a>1</a>
                </Col>
                <Col lg={11}>
                    <form>
                        <InputGroup className='center'>
                            <input type='search' className='search' />
                            <Button className='search_btn' type='submit'><FaSearch /></Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>

        </div>
    )
}

export default Header