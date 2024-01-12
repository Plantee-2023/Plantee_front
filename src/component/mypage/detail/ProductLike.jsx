import React from 'react'
import { Form, Table } from 'react-bootstrap'

const ProductLike = () => {
  return (
    <div id="main_wrap">
      <h1 className='all-title'>좋아요 리스트</h1>
      <button className='favorite-list-delete-btn'>삭제</button>
      <Table className="all-table" hover striped bordered>
          <thead className='text-center'>
              <tr>
                  <th><Form.Check /></th>
                  <th>상품명</th>
                  <th>상품금액</th>
                  <th>할인금액</th>
                  <th>할인적용가</th>
                  <th>구매</th>
              </tr>
          </thead>
          <tbody className='text-center'>
              <tr>
                  <td><Form.Check /></td>
                  <td>캐논</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>구매???</td>
              </tr>
          </tbody>
      </Table>
    </div>
  )
}

export default ProductLike