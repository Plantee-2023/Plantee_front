import React, { useContext, useEffect, useRef, useState } from 'react'
import { InputGroup, NavDropdown, Navbar, Nav, Toast, CloseButton, ToastContainer, Card } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { LiaStoreAltSolid } from "react-icons/lia";
import { PiUserListBold, PiCookingPot } from "react-icons/pi";
import { GiTalk } from "react-icons/gi";
import { FiBookOpen } from "react-icons/fi";
import { SlNotebook } from "react-icons/sl";
import { CiCalendar } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { BoxContext } from './common/BoxContext';
import './Main.css'

export const useScroll = () => {
    const [state, setState] = useState({
        x: 0,
        y: 0
    });
    const onScroll = () => {
        setState({ y: window.scrollY, x: window.screenX });
    };
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return state;
};

const Menu = () => {
    const { y } = useScroll();
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
        <div id='menu_wrap'>
            <div className='menu_contents'>
                <div className='menu_header'>
                    <div className='menu_left'>
                        <h1 className='menu_logo'>
                            <a href='/'><img src='/image/logo.png' /></a>
                        </h1>
                    </div>
                    <div className='menu_right'>
                        <ul className='menu_mymenu'>
                            {!sessionStorage.getItem("uid") ?
                                <>
                                    <li><NavLink to='/users/Join'>회원가입</NavLink></li>
                                    <li><NavLink to='/users/LoginPage'>로그인</NavLink></li>
                                </>
                                :
                                <>
                                    <li><NavLink to='/users/mypage'>마이 페이지</NavLink></li>
                                    <li>
                                        <div onClick={toggleShowA} style={{ cursor: 'pointer' }} >{sessionStorage.getItem("uid")}님
                                            <ToastContainer position={'top-end'} className='menu-toast'>
                                                <Toast show={showA}>
                                                    <CloseButton className='menu-close-btn' />
                                                    <Toast.Body>
                                                        <NavLink className='menu-btn btn' to="/users/mypage">내 정보</NavLink>
                                                        <Card className='menu-card-card'>
                                                            <div className="menu-card-text">마이페이지</div>
                                                            <ul>
                                                                <li>
                                                                    <Card className='menu-card1'><a href='/diary/diarycalendar'>
                                                                        <CiCalendar className='menu-toast-icon' /></a></Card>
                                                                    <div className='menu-toast-text'>캘린더</div>
                                                                </li>
                                                                <li>
                                                                    <Card className='menu-card2'><a href='/plant/recipe'>
                                                                        <PiCookingPot className='menu-toast-icon' /></a></Card>
                                                                    <div className='menu-toast-text'>레시피</div>
                                                                </li>
                                                                <li>
                                                                    <Card className='menu-card3'><a href='/mypage/mypagecomment'>
                                                                        <TfiWrite className='menu-toast-icon' /></a></Card>
                                                                    <div className='menu-toast-text'>나의 글</div>
                                                                </li>
                                                                <li>
                                                                    <Card className='menu-card4'><a href='/mypage/mypagefavorite'>
                                                                        <MdFavoriteBorder className='menu-toast-icon' /></a></Card>
                                                                    <div className='menu-toast-text'>좋아요</div>
                                                                </li>
                                                            </ul>
                                                        </Card>
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
                <Navbar className={y < 100 ? "menu-back-color" : "menu-fixed-back-color"}>
                    <Nav>
                        <PiUserListBold className='menu-icon' />
                        <NavDropdown className='menu-text-color' title="식물정보" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/plant">식물백과</NavDropdown.Item>
                            <NavDropdown.Item href="/plant/test">식물 큐레이트</NavDropdown.Item>
                            <NavDropdown.Item href="/plant/recipe">레시피</NavDropdown.Item>
                        </NavDropdown>
                        <GiTalk className='menu-icon' />
                        <NavDropdown className='menu-text-color' title="커뮤니티" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/comm">자유게시판</NavDropdown.Item>
                            <NavDropdown.Item href="/comm/market">거래</NavDropdown.Item>
                        </NavDropdown>
                        <LiaStoreAltSolid className='menu-icon' />
                        <NavLink className='menu-magazine' to='/store'>스토어</NavLink>
                        <FiBookOpen className='menu-icon' />
                        <NavLink className='menu-magazine' to='/magazine/magazineList'>매거진</NavLink>
                    </Nav>
                </Navbar>
            </div>
        </div>
    )
}

export default Menu