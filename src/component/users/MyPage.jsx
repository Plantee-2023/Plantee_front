import React from 'react'
import { Col, Row, Tab, Nav, Card } from 'react-bootstrap'
import '../Main.css'
import Update from './Update'

const MyPage = () => {
    return (
        <div>
            <Tab.Container id="left-tabs-example">
                <Row>
                    <Col sm={2}>
                    <Card className='mypage-list'>
                            <div className='mypage-title'>uid님</div>
                            <img className='mypage-img' src='/image/logo.png' width={30} height={20}/>
                            <Nav className="flex-column" >
                            <Nav.Item>
                                    <Nav.Link className='mypage-disabled' disabled>회원정보</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="a" className='mypage-item'>정보 수정</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="b"  className='mypage-item'>비밀번호 변경</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="c" className='mypage-item'>회원 탈퇴</Nav.Link>
                                </Nav.Item>
                                <hr/>
                                <Nav.Item>
                                    <Nav.Link className='mypage-disabled' disabled>관심 상품</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="1" className='mypage-item'>좋아요 리스트</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="2" className='mypage-item'>장바구니</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className='mypage-disabled' disabled>구매 내역</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="3" className='mypage-item'>주문 / 배송조회</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="4" className='mypage-item'>취소/ 반품 / 교환</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className='mypage-disabled' disabled>나의 활동</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="5" className='mypage-item'>게시글</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="6" className='mypage-item'>댓글</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="7" className='mypage-item'>좋아요</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="1">1</Tab.Pane>
                            <Tab.Pane eventKey="2">2</Tab.Pane>
                            <Tab.Pane eventKey="3">3</Tab.Pane>
                            <Tab.Pane eventKey="4">4</Tab.Pane>
                            <Tab.Pane eventKey="5">5</Tab.Pane>
                            <Tab.Pane eventKey="6">6</Tab.Pane>
                            <Tab.Pane eventKey="7">7</Tab.Pane>
                            <Tab.Pane eventKey="a"><Update/></Tab.Pane>
                            <Tab.Pane eventKey="b">b</Tab.Pane>
                            <Tab.Pane eventKey="c">c</Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default MyPage