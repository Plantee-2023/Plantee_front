import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Spinner, Table, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { BoxContext } from '../../common/BoxContext';
import StoreBuyNow from '../../store/StoreBuyNow';

const ProductCart = () => {
  return (
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
            <Button className='cart-order-btn'>주문하기</Button>
            <Button className='cart-cancel-btn'>삭제</Button>
        </div>
  )
}

export default ProductCart