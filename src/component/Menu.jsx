import React from 'react'
import './Main.css'
import { Row, Col, InputGroup, Button, NavDropdown, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { LiaStoreAltSolid } from "react-icons/lia";
import { PiUserListBold } from "react-icons/pi";
import { GiTalk } from "react-icons/gi";
import { FiBookOpen } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";

const Menu = () => {
    return (
        <div className='display'>
            <Row>
                <Col xs={3} md={6} lg={2}>
                    <NavLink to='/'>
                        <img className='logo' src='/image/logo.png' width={200} height={150}></img>
                    </NavLink>
                </Col>
                <Col xs={1} md={2} lg={8}>
                    <form>
                        <InputGroup className='search'>
                            <input type='search' className='inputGroup-search' placeholder='검색어를 입력해주세요.' />
                            <Button className='search_btn' type='submit'><FaSearch /></Button>
                        </InputGroup>
                    </form>
                </Col>
            </Row>
            <Navbar expand="lg" className="mt-3 recommend">
                <Nav>
                    <PiUserListBold className='icon ms-4' />
                    <NavDropdown className='text-color' title="메뉴유" id="basic-nav-dropdown">
                        <NavDropdown.Item href="">식물 추천</NavDropdown.Item>
                        <NavDropdown.Item href="">식물 큐레이트</NavDropdown.Item>
                        <NavDropdown.Item href="">레시피</NavDropdown.Item>
                        <NavDropdown.Item href="">지도</NavDropdown.Item>
                    </NavDropdown>
                    <GiTalk className='icon ms-4' />
                    <NavDropdown className='text-color' title="커뮤니티" id="basic-nav-dropdown">
                        <NavDropdown.Item href="">내 식물 자랑</NavDropdown.Item>
                        <NavDropdown.Item href="">나눔</NavDropdown.Item>
                        <NavDropdown.Item href="">자유게시판</NavDropdown.Item>
                        <NavDropdown.Item href="">Q&A</NavDropdown.Item>
                    </NavDropdown>
                    <LiaStoreAltSolid className='icon ms-4' />
                    <NavLink className='menu-magazine' to='/store'>스토어</NavLink>
                    <FiBookOpen className='icon ms-4' />
                    <NavLink className='menu-magazine' to='/main/magazineList'>매거진</NavLink>
                    <SlCalender className='icon ms-4'/>
                    <NavLink className='menu-magazine' to='/diary/diaryMain'>다이어리</NavLink>
                </Nav>
                <NavLink className='menu-login' to='/users/loginPage'>
                    로그인
                </NavLink>
                <NavLink className='ms-5 menu-login' to='/users/join'>
                    회원가입
                </NavLink>
            </Navbar>
        </div>
    )
}

export default Menu