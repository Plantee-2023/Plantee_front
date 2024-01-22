import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavDropdown, Navbar, Nav, Toast, CloseButton, ToastContainer, Card, Row, Col, ProgressBar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { LiaStoreAltSolid } from "react-icons/lia";
import { PiUserListBold, PiCookingPot } from "react-icons/pi";
import { GiTalk } from "react-icons/gi";
import { FiBookOpen } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { BoxContext } from './common/BoxContext';
import axios from 'axios';

export const useScroll = () => {
  // 스크롤 위치 상태 초기화
  const [scrollTop, setScrollTop] = useState(0);

  //useEffect를 사용하여 scrollTop의 상태가 변할 때마다 스크롤 이벤트, 함수 실행
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollTop]);

  const handleScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const { scrollHeight, clientHeight } = document.documentElement;
    const scrollTop = winScroll / (scrollHeight - clientHeight);
    setScrollTop(scrollTop);
  };

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

const HeaderPage = () => {
  const { y } = useScroll();
  const [showA, setShowA] = useState(false);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false); // 네비바 고정
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

  useEffect(() => {
    if (y > 0) {
      setIsNavbarFixed(true);
    } else {
      setIsNavbarFixed(false);
    }
  }, [y]);

  const [list, setList] = useState({
   user_id:"", uid:"", level:""
})
const { user_id, uid, level } = list;
  const getList = async () => {
    const res = await axios.get(`/users/read.json/${sessionStorage.getItem("uid")}`);
    console.log(res.data);
    setList(res.data);
    // console.log(list);
  }

  useEffect(() => {
    getList();
  }, []);

  const getLevel = (level) => {
    switch (level) {
      case 1:
        return <img src='/image/user_icon/user_1.png' />;
      case 2:
        return <img src='/image/user_icon/user_2.png' />;
      case 3:
        return <img src='/image/user_icon/user_3.png' />;
      case 4:
        return <img src='/image/user_icon/user_4.png' />;
      default:
        return <img src='/image/user_icon/user_5.png' />;
    }
  };

  return (
    <div id='menu_wrap' className={isNavbarFixed ? 'fixed_navbar' : ''}>
      <div className={`menu_contents ${isNavbarFixed ? 'scrolling' : ''}`}>
        <div className='menu_header'>
          <div className='menu_left'>
            <div className='menu_left_img'>
              <h1 className='menu_logo'>
                <a href='/'><img src='/image/logo.png' /></a>
              </h1>
            </div>
            <div className='menu_left_nav'>
              <Navbar>
                <Nav>
                  <NavDropdown className='menu_navdropdown' title="식물정보">
                    <NavDropdown.Item href="/plant">식물백과</NavDropdown.Item>
                    <NavDropdown.Item href="/plant/test">식물 큐레이트</NavDropdown.Item>
                    <NavDropdown.Item href="/recipe">레시피</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown className='menu_navdropdown' title="커뮤니티">
                    <NavDropdown.Item href="/comm">자유게시판</NavDropdown.Item>
                    <NavDropdown.Item href="/comm/market">거래</NavDropdown.Item>
                  </NavDropdown>
                  <NavLink className='menu_navlink' to='/store'>스토어</NavLink>
                  <NavLink className='menu_navlink' to='/magazine/magazineList'>매거진</NavLink>
                </Nav>
              </Navbar>
            </div>
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
                  {sessionStorage.getItem('uid') === 'admin' ?
                    <>
                      <li><NavLink to='/users/adminpage'>회원관리</NavLink></li>
                      <li><NavLink onClick={onLogout}>로그아웃</NavLink></li>
                    </>
                    :
                    <>
                      {/* <li><NavLink to='/users/mypage'>마이 페이지</NavLink></li> */}
                      <li>
                        <div onClick={toggleShowA} style={{ cursor: 'pointer' }} >마이페이지
                          <ToastContainer position={'top-end'} className='menu-toast'>
                            <Toast show={showA}>
                              <CloseButton className='menu-close-btn' />
                              <Toast.Body>
                                <Row>
                                  <Col className='menu-id' >{sessionStorage.getItem("uid")}님</Col>
                                  <Col className='menu-mypage-btn'>
                                    <NavLink to={`/users/mypage`} style={{ backgroundColor: '#07955C', border: 'none', color: '#ffffff' }} className='btn btn-sm'><p className='header_userinfo_modal'>내 정보</p></NavLink>
                                  </Col>
                                </Row>
                                <Card className='menu-shadow'>
                                  <Row style={{ display: 'flex' }}>
                                    <Col className='text-center'>
                                      <div className='mt-2'>나의 활동 등급</div>
                                        <div className='menu_level_ing'>{getLevel(level)} </div>
                                      
                                    </Col>
                                    <Col style={{ borderLeft: 'solid 1px #DCDCDC' }}>
                                      <div className='mt-2 mb-2'>총 게시글 : 1개</div>
                                      <div>
                                        <Row >
                                          <Col>now</Col>
                                          <Col className='text-end me-3'>next</Col>
                                        </Row>
                                        <ProgressBar variant='success' className='me-3' now={35} />
                                      </div>
                                    </Col>
                                  </Row>
                                </Card>
                                <Card className='mt-2'>
                                  <ul className='menu-margin'>
                                    <li>
                                      <a href='/diary/calendar'><Card className='menu-card1'>
                                        <img className='mypage_calander' src='/image/mypage_calendar_icon.png' /></Card>
                                        <div className='menu-toast-text1'>캘린더</div>
                                      </a>
                                    </li>
                                    <li>
                                      <a href='/users/mypage/productcart'><Card className='menu-card2'>
                                      <img className='mypage_calander' src='/image/mypage_cart.png' /></Card>
                                        <div className='menu-toast-text'>장바구니</div>
                                      </a>
                                    </li>
                                    <li>
                                      <a href='/users/mypage/productpurchase'><Card className='menu-card3'>
                                      <img className='mypage_calander' src='/image/mypage_bill.png' /></Card>
                                        <div className='menu-toast-text'>구매내역</div>
                                      </a>
                                    </li>
                                    <li>
                                      <a href='/mypage/mypagefavorite'><Card className='menu-card4'>
                                        <MdFavoriteBorder className='menu-card-icon' /></Card>
                                        <div className='menu-toast-text'>나의활동</div>
                                      </a>
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
                </>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderPage