import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavDropdown, Navbar, Nav, Toast, CloseButton, ToastContainer, Card } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { LiaStoreAltSolid } from "react-icons/lia";
import { PiUserListBold, PiCookingPot } from "react-icons/pi";
import { GiTalk } from "react-icons/gi";
import { FiBookOpen } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { MdFavoriteBorder } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { BoxContext } from './common/BoxContext';

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

const HeaderPage = () => {
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
			<div className={y < 30 ? "menu_contents" : "menu_contents-fixed"}>
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
									<li><NavLink to='/users/mypage'>마이 페이지</NavLink></li>
									<li>
										<div onClick={toggleShowA} style={{ cursor: 'pointer' }} >{sessionStorage.getItem("uid")}님
											<ToastContainer position={'top-end'} className='menu-toast'>
												<Toast show={showA}>
													<CloseButton className='menu-close-btn' />
													<Toast.Body>
														<Card className='menu-card-card'>
															<div className="menu-card-text">마이페이지</div>
															<ul className='menu-margin'>
																<li>
																	<Card className='menu-card1'><a href='/diary/calendar'>
																		<img className='mypage_calander' src='/image/mypage_calendar_icon.png' /></a></Card>
																	<div className='menu-toast-text1'>캘린더</div>
																</li>
																<li>
																	<Card className='menu-card2'><a href='/recipe'>
																		<PiCookingPot className='menu-toast-icon' style={{ color: '#000000' }} /></a></Card>
																	<div className='menu-toast-text'>레시피</div>
																</li>
																<li>
																	<Card className='menu-card3'><a href='/mypage/mypagecomment'>
																		<TfiWrite className='menu-toast-icon' style={{ color: '#000000' }} /></a></Card>
																	<div className='menu-toast-text'>나의 글</div>
																</li>
																<li>
																	<Card className='menu-card4'><a href='/mypage/mypagefavorite'>
																		<MdFavoriteBorder className='menu-toast-icon' style={{ color: '#000000' }} /></a></Card>
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
			</div>
		</div>
	)
}

export default HeaderPage