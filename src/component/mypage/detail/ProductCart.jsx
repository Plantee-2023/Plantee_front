import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Spinner, Table, Form, Button, Alert } from 'react-bootstrap'
import StoreBuyNow from '../../store/StoreBuyNow';

const ProductCart = () => {
    const [loading, setLoading] = useState(false);

    const navi = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const search = new URLSearchParams(location.search);
    const show = search.get("show") ? search.get("show") : "cart";

    const uid = sessionStorage.getItem("uid");
    const [cnt, setCnt] = useState(0);
    const [sum, setSum] = useState(1);
    const [checkSum, setCheckSum] = useState(0);
    const [isOrder, setIsOrder] = useState(false);


    const onClickOrder = () => {
        navi(`${pathname}?show=order`)
    }

    const getCart = async () => {
        setLoading(true);
        const res = await axios.get(`/cart/list?uid=${sessionStorage.getItem("uid")}`);

        let list = res.data.list;
        console.log(list)
        
        setLoading(false);
    }

    useEffect(() => { getCart(); }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            {show === "cart" &&
                <div id="main_wrap">
                    <h1 className='all-title'>장바구니</h1>
                    <Table hover striped bordered>
                        <thead className='text-center'>
                            <tr>
                                <th><Form.Check /></th>
                                <th>상품명</th>
                                <th>수량</th>
                                <th>상품금액</th>
                                <th>즉시할인</th>
                                <th>소계금액</th>
                                <th>배송비</th>
                                <th>무이자할부</th>
                                <th>주문 / 삭제</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            <tr>
                                <td><Form.Check /></td>
                                <td>ㅇㄴㅁㅀㅁㅇㅎㄻㄴㅇㅎㄻㄴㅇㅎㅁㅇㄴ</td>
                                <td>2</td>
                                <td>100</td>
                                <td>10</td>
                                <td>90</td>
                                <td>2500</td>
                                <td>없음</td>
                                <td>
                                    <Button className='cart-btn-order btn-sm'>주문</Button>
                                    <Button className='cart-btn-cancel btn-sm'>삭제</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Alert className='cart-alert'>
                        <div className='cart-price'>총 주문 금액 : </div>
                    </Alert>
                    <Button className='cart-order-btn' onClick={onClickOrder}>주문하기</Button>
                    <Button className='cart-cancel-btn'>삭제</Button>
                </div>
            }

            {show === "order" && <StoreBuyNow />}

        </>
    )
}

export default ProductCart