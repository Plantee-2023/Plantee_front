import React from 'react'
import { Table, Form, Tab, Tabs } from 'react-bootstrap'

const ProductCancel = () => {
  return (
    <div id="main_wrap">
      <h1 className='all-title'>취소 / 반품 / 교환</h1>
      <Tabs defaultActiveKey="cancel" id="fill-tab-example" className="mb-3" fill>
          <Tab eventKey="cancel" title="취소/반품/교환 신청">
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
                          <th>판매자</th>
                      </tr>
                  </thead>
                  <tbody className='text-center'>
                      <tr>
                          <td><Form.Check /></td>
                          <td>16565165191</td>
                          <td>몰라아</td>
                          <td>100</td>
                          <td>1</td>
                          <td>100</td>
                          <td>준비중</td>
                          <td>누구야 판매자</td>
                      </tr>
                  </tbody>
              </Table>
          </Tab>
          <Tab eventKey="profile" title="취소처리 현황">
              <Table hover striped bordered>
                  <thead className='text-center'>
                      <tr>
                          <th>요청일</th>
                          <th>주문번호 / 상품명</th>
                          <th>판매단가</th>
                          <th>요청수량</th>
                          <th>환불예정금액</th>
                          <th>주문취소처리상태</th>
                          <th>주문현황</th>
                          <th>판매자</th>
                      </tr>
                  </thead>
                  <tbody className='text-center'>
                      <tr>
                          <td>2024/1/2</td>
                          <td>498465984981</td>
                          <td>100</td>
                          <td>1</td>
                          <td>100</td>
                          <td>취소완료</td>
                          <td>주문완료</td>
                          <td>누군디</td>
                      </tr>
                  </tbody>
              </Table>
          </Tab>
          <Tab eventKey="change" title="반품/교환처리 현황">
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
                          <td></td>
                      </tr>
                  </tbody>
              </Table>
          </Tab>
      </Tabs>
    </div>
  )
}

export default ProductCancel