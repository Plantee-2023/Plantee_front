import React from 'react'
import { Col, Row, Tab, Nav, Card } from 'react-bootstrap'
import '../Main.css'
import Update from '../mypage/Update'
import PasswordChange from '../mypage/PasswordChange'
import UserDelete from '../mypage/UserDelete'
import FavoriteList from '../mypage/FavoriteList'
import Cart from '../mypage/Cart'
import Order from '../mypage/Order'
import Cancel from '../mypage/Cancel'
import Post from '../mypage/Post'
import Comment from '../mypage/Comment'
import Favorite from '../mypage/Favorite'

const MyPage = () => {
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <Tab.Container id="left-tabs-example" defaultActiveKey="a">
                    <Row>
                        <Col sm={2}>
                            <Card className='mypage-list'>
                                <div className='mypage-title'>{sessionStorage.getItem("uid")}님</div>
                                <img className='mypage-img' src='/image/logo.png' width={30} height={20} />
                                <Nav className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link className='mypage-disabled' disabled>회원정보</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="1" className='mypage-item'>정보 수정</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="2" className='mypage-item'>비밀번호 변경</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="3" className='mypage-item'>회원 탈퇴</Nav.Link>
                                    </Nav.Item>
                                    <hr />
                                    <Nav.Item>
                                        <Nav.Link className='mypage-disabled' disabled>관심 상품</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="4" className='mypage-item'>찜리스트</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="5" className='mypage-item'>장바구니</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='mypage-disabled' disabled>구매 내역</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="6" className='mypage-item'>주문 / 배송조회</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="7" className='mypage-item'>취소/ 반품 / 교환</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className='mypage-disabled' disabled>나의 활동</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="8" className='mypage-item'>게시글</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="9" className='mypage-item'>댓글</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="10" className='mypage-item'>좋아요</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="1"><Update /></Tab.Pane>
                                <Tab.Pane eventKey="2"><PasswordChange /></Tab.Pane>
                                <Tab.Pane eventKey="3"><UserDelete /></Tab.Pane>
                                <Tab.Pane eventKey="4"><FavoriteList /></Tab.Pane>
                                <Tab.Pane eventKey="5"><Cart /></Tab.Pane>
                                <Tab.Pane eventKey="6"><Order /></Tab.Pane>
                                <Tab.Pane eventKey="7"><Cancel /></Tab.Pane>
                                <Tab.Pane eventKey="8"><Post /></Tab.Pane>
                                <Tab.Pane eventKey="9"><Comment /></Tab.Pane>
                                <Tab.Pane eventKey="10"><Favorite /></Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    )
}

export default MyPage