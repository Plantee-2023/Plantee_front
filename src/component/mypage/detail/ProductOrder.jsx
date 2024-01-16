import React from 'react'
import { Table, Form } from 'react-bootstrap'
import '../MyPage.css'

const ProductOrder = () => {
    return (
        <div id="main_wrap">
            <h1 className='all-title'>주문 / 배송조회</h1>
            <Table hover striped bordered>
                <thead className='text-center'>
                    <tr>
                        <th><Form.Check /></th>
                        <th>주문번호</th>
                        <th>상품명</th>
                        <th>판매단가</th>
                        <th>수량</th>
                        <th>소계금액</th>
                        <th>주문현황</th>
                        <th>배송 / 구매확정</th>
                        <th>업체 / 증빙</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    <tr>
                        <td><Form.Check /></td>
                        <td>5411841981</td>
                        <td>뭐여 주문한건</td>
                        <td>100</td>
                        <td>1</td>
                        <td>100</td>
                        <td>배송중</td>
                        <td>확정</td>
                        <td>이건 뭐여</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ProductOrder