import React from 'react'
import RouterPage from './RouterPage';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LiaStoreAltSolid } from "react-icons/lia";
import { FaCommentDots } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import './Menu.css';

const Menu = () => {
    return (
        <div className='display'>
            <Navbar expand="lg" className="mt-5 recommend" >
                <Nav>
                    <PiUserListBold className='icon ms-5' />
                    <NavDropdown className='text_color' title="메뉴유" id="basic-nav-dropdown">
                        <NavDropdown.Item  href="#action/3.1">식물 추천</NavDropdown.Item>
                        <NavDropdown.Item  href="#action/3.1">식물 큐레이트</NavDropdown.Item>
                        <NavDropdown.Item  href="#action/3.1">레시피</NavDropdown.Item>
                        <NavDropdown.Item  href="#action/3.1">지도</NavDropdown.Item>
                    </NavDropdown>
                    <FaCommentDots className='icon ms-5' />
                    <NavDropdown className='text_color' title="커뮤니티" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">내 식물 자랑</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">나눔</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">자유게시판</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Q&A</NavDropdown.Item>
                    </NavDropdown>
                    <LiaStoreAltSolid className='icon ms-5' />
                    <NavDropdown className='text_color' title="스토어" id="basic-nav-dropdown">
                        <NavDropdown.Item href="1">화분</NavDropdown.Item>
                        <NavDropdown.Item href="2">관리용품</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <a className='menu_login' href='/login'>
                    로그인
                </a>
                <a className='ms-5 menu_login' href='/add'>
                    회원가입
                </a>
            </Navbar>
            <RouterPage />
        </div>
    )
}

export default Menu