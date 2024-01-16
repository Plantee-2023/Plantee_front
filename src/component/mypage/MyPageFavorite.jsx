import React from 'react'
import {Table} from 'react-bootstrap'
const MyPageFavorite = () => {
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <h1 className='all-title'>좋아요 리스트</h1>
                <Table hover striped bordered>
                    <thead className='text-center'>
                        <tr>
                            <th>상품명</th>
                            <th>상품금액</th>
                            <th>할인금액</th>
                            <th>할인적용가</th>
                            <th>구매</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        <tr>
                            <td>메롱</td>
                            <td>10</td>
                            <td>10</td>
                            <td>10</td>
                            <td>구매???</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default MyPageFavorite