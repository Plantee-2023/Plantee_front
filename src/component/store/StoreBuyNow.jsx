import React from 'react'
import { Spinner, Row, Col, Table, Card, Form, Button, Alert } from 'react-bootstrap'

const StoreBuyNow = () => {
    return (
        <>
            <Row>
                <Col>01. 주문 상품 확인</Col>
                <Table>
                    <thead className='text-center'>
                        <tr>
                            <th>상품명</th>
                            <th>수량</th>
                            <th>상품금액</th>
                            <th>즉시할인</th>
                            <th>소계금액</th>
                            <th>배송비</th>
                            <th>무이자할부</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        <tr>
                            <td>ㅇㄴㅁㅀㅁㅇㅎㄻㄴㅇㅎㄻㄴㅇㅎㅁㅇㄴ</td>
                            <td>2</td>
                            <td>100</td>
                            <td>10</td>
                            <td>90</td>
                            <td>2500</td>
                            <td>없음</td>

                        </tr>
                    </tbody>
                </Table>
                <Alert className='cart-alert'>
                    <div className='cart-price'>총 주문 금액 : </div>
                </Alert>
            </Row>

            <Row>
                <Col>
                    <div>02. 주문하시는 분</div>
                    <Card>dd</Card>
                </Col>
                <Col>
                    <div>03. 받으실 분</div>
                    <Card>dd</Card>
                </Col>
            </Row>

            <Row>
                <div>04. 결제정보 입력</div>
                <Col>
                    <Card>dd</Card>
                </Col>
                <Col>
                    <Card>dd</Card>
                </Col>
                <Col>
                    <Card>dd</Card>
                    <Row><button>결제하기</button></Row>
                    <Row><button>장바구니로 돌아가기</button></Row>
                </Col>
            </Row>

        </>
    )
}

export default StoreBuyNow