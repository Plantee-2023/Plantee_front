import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Spinner, Row, Col, Table, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap'
import '../store/Store.css'
import { Select } from '@mui/material'

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
            <Row className='mb-5'>
                <Col className='store_subtitle' style={{ color: "#07955C" }}>01. 주문 상품 확인</Col>
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

                <Alert style={{ background: "#ddd", border: "none" }}>
                    <Row>
                        <Col>총 주문 수 : {total}개</Col>
                        <Col className='text-end'>총 주문 금액 : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Col>
                    </Row>
                </Alert>
            </Row>

            {/* 상품 관련 */}
            <Row className='mb-5'>
                <Col>
                    <div className='store_subtitle' style={{ color: "#07955C" }}>02. 주문하시는 분</div>
                    <Card className='p-3'>
                        <form>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text className='store_insert_inputgrouptext_buynow'>받는이</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text className='store_insert_inputgrouptext_buynow'>전화번호</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text className='store_insert_inputgrouptext_buynow'>주소</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <Form.Control placeholder='상세주소를 입력해주세요.' />
                            </InputGroup>
                        </form>
                    </Card>
                </Col>

                <Col>
                    <div className='store_subtitle' style={{ color: "#07955C" }}>03. 받으실 분</div>
                    <Card className='p-3'>
                        {/* <Form>
                            <Form.Check/> 기본 
                            <Form.Check/> 새로 입력
                        </Form> */}
                        <form>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text className='store_insert_inputgrouptext_buynow'>받는이</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text className='store_insert_inputgrouptext_buynow'>전화번호</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text className='store_insert_inputgrouptext_buynow'>주소</InputGroup.Text>
                                <Form.Control />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <Form.Control placeholder='상세주소를 입력해주세요.' />
                            </InputGroup>
                        </form>
                    </Card>
                </Col>
            </Row>

            <Row className='mb-5'>
                <div className='store_subtitle' style={{ color: "#07955C" }}>04. 결제정보 입력</div>
                <Col colSpan={2}>
                    <Card className='p-4'>
                        <td className='mb-2'> [무통장 입금] 110-242-443165 (신한은행) </td>
                        <td className='mb-2'> [예금주 명] PlanteeStore </td>
                        <td className='mb-2'> [입 금 액] {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 </td>

                        <td className='mb-2'> [입금하실 은행]
                            <select className='ms-2'>
                                <option placeholder='은행 선택'></option>
                                <option className='text-center'>신한은행</option>
                                <option className='text-center'>국민은행</option>
                                <option className='text-center'>기업은행</option>
                                <option className='text-center'>하나은행</option>
                                <option className='text-center'>우리은행</option>
                            </select>
                        </td>
                        <td className='mb-2' style={{ color: "#ddd" }}><input placeholder='입금주 명' /> (실제 입금하실 때의 이름을 적어주세요) </td>
                    </Card>
                </Col>

                <Col className='p-4'>
                    <Row><button className='store_filterbtn_clicked mb-3'>결제하기</button></Row>
                    <Row><button className='store_filterbtn_clean' onClick={onClickBtnCart}>장바구니로 돌아가기</button></Row>
                </Col>
            </Row>

        </>
    )
}

export default StoreBuyNow