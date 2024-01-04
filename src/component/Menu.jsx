import React, { useContext, useState } from 'react'
import './Main.css'
import { InputGroup, NavDropdown, Navbar, Nav, Toast, CloseButton, ToastContainer, Card } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { LiaStoreAltSolid } from "react-icons/lia";
import { PiUserListBold } from "react-icons/pi";
import { GiTalk } from "react-icons/gi";
import { FiBookOpen } from "react-icons/fi";
import { SlNotebook } from "react-icons/sl";
import { BoxContext } from './common/BoxContext';

const Menu = () => {

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const { box, setBox } = useContext(BoxContext);
    const navigate = useNavigate();
    const onLogout = () => {
        setBox({
            show: true,
            message: "로그아웃 하시겠습니까?",
            action: () => {
                sessionStorage.clear();
                navigate("/");
            }
        });
    }
    return (
        <div className='menu_wrap'>
            <div className='menu_contents'>
                <div className='menu_header'>
                    <div className='menu_left'>
                        <h1 className='menu_logo'>
                            <a href='/'><img src='/image/logo.png' /></a>
                        </h1>
                        <div className='menu_searchwrap'>
                            <form>
                                <InputGroup className='menu_searchinputwrap'>
                                    <input type='search' className='menu_searchinput' placeholder='검색어를 입력해주세요.' />
                                    <button className='menu_searchbtn' type='submit'><img src='/image/search_icon.png' /></button>
                                </InputGroup>
                            </form>
                        </div>
                    </div>
                    <div className='menu_right'>
                        <ul className='menu_mymenu'>
                            {!sessionStorage.getItem("uid") ?
                                <>
                                    <li><NavLink to='/users/LoginPage'>로그인</NavLink></li>
                                    <li><NavLink to='/users/Join'>회원가입</NavLink></li>
                                </>
                                :
                                <>  
                                    <li><NavLink to='/users/mypage'>마이 페이지</NavLink></li>
                                    <li>
                                        <div onClick={toggleShowA} style={{ cursor: 'pointer' }} >{sessionStorage.getItem("uid")}님
                                            <ToastContainer position={'top-end'} className='menu-toast'>
                                                <Toast show={showA}>
                                                    <CloseButton className='menu-close-btn'/>
                                                    <Toast.Body>
                                                        <NavLink className='menu-btn btn' to="/users/mypage">내 정보</NavLink>
                                                        <Card className='menu-card'>캘린더</Card>
                                                        <Card className='menu-card'>나의 레시피</Card>
                                                        <Card className='menu-card'>내가 등록한글</Card>
                                                        <Card className='menu-card'>좋아요 목록</Card>
                                                    </Toast.Body>
                                                </Toast>
                                            </ToastContainer>
                                        </div>
                                    </li>
                                    <li><NavLink onClick={onLogout}>로그아웃</NavLink></li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
                <Navbar expand="lg" className="menu-back-color">
                    <Nav>
                        <PiUserListBold className='menu-icon' />
                        <NavDropdown className='menu-text-color' title="식물정보" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/plant/dictionary">식물백과</NavDropdown.Item>
                            <NavDropdown.Item href="">식물 큐레이트</NavDropdown.Item>
                            <NavDropdown.Item href="">레시피</NavDropdown.Item>
                            <NavDropdown.Item href="">지도</NavDropdown.Item>
                        </NavDropdown>
                        <GiTalk className='menu-icon' />
                        <NavDropdown className='menu-text-color' title="커뮤니티" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/comm">자유게시판</NavDropdown.Item>
                            <NavDropdown.Item href="">내 식물 자랑</NavDropdown.Item>
                            <NavDropdown.Item href="">나눔</NavDropdown.Item>
                            <NavDropdown.Item href="">Q&A</NavDropdown.Item>
                        </NavDropdown>
                        <LiaStoreAltSolid className='menu-icon' />
                        <NavLink className='menu-magazine' to='/store/main'>스토어</NavLink>
                        <FiBookOpen className='menu-icon' />
                        <NavLink className='menu-magazine' to='/main/magazineList'>매거진</NavLink>
                    </Nav>
                </Navbar>
            </div>
        </div>
    )
}

export default Menu