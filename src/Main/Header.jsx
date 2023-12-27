import React from 'react'
import { Button, Col, InputGroup, Row } from 'react-bootstrap'
import './Header.css';
import { FaSearch } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='display'>
            <Row>
                <Col md={1}>
                    <NavLink>PlanTee</NavLink>
                </Col>
                <Col>
                    <form>
                        <InputGroup className='center'>
                            <input type='search' className='search' />
                            <Button className='btn' type='submit'><FaSearch /></Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>

        </div>
    )
}

export default Header