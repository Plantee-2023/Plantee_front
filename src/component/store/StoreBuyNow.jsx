import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Spinner, Row, Col, Table, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap'
import '../store/Store.css'

const StoreBuyNow = ({ carts }) => {
    const navi = useNavigate();
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);

    const onClickBtnCart = () => {
        navi('/users/mypage/productcart')
    }

    useEffect(() => {
        const list = carts.filter(cart => cart.checked);
        setOrders(list);
        let sum = 0;
        let total = 0;
        list.forEach(cart => {
            sum += cart.sum;
            total += cart.qnt;
        })
        setTotal(total);
        setSum(sum);
    }, [])

    return (
        <>
            {/* 상품 관련 */}
            <Row>
                <Col>01. 주문 상품 확인</Col>
                <Table>
                    <thead className='text-center'>
                        <tr>
                            <th>상품명</th>
                            <th>수량</th>
                            <th>상품금액</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {carts.map(cart => cart.checked &&
                            <tr key={cart.cart_id}>
                                <td>{cart.title}</td>
                                <td>{cart.qnt}개</td>
                                <td>{cart.fmtsum}원</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <Alert>
                    <Row>
                        <Col>총 주문 수 : {total}개</Col>
                        <Col className='text-end'>총 주문 금액 : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Col>
                    </Row>
                </Alert>
            </Row>

            {/* 상품 관련 */}
            <Row>
                <Col>
                    <div>02. 주문하시는 분</div>
                    <Card className='p-3'>
                        <form>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>받는이</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>전화번호</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>주소</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <Form.Control placeholder='상세주소를 입력해주세요.' />
                            </InputGroup>
                        </form>
                    </Card>
                </Col>

                <Col>
                    <div>03. 받으실 분</div>
                    <Card className='p-3'>
                        <form>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>받는이</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>전화번호</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>주소</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <Form.Control placeholder='상세주소를 입력해주세요.' />
                            </InputGroup>
                        </form>
                    </Card>
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
                    <Row><button onClick={onClickBtnCart}>장바구니로 돌아가기</button></Row>
                </Col>
            </Row>

        </>
    )
}

export default StoreBuyNow