import React from 'react'
import {Table, Button, Form} from 'react-bootstrap' 

const Order = () => {
    return (
        <div>
            <h1 className='all-title'>주문 / 배송조회</h1>
            <Table className='cart-table' hover striped bordered>
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
        </div>
    )
}

export default Order