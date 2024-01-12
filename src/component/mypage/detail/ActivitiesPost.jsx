import React from 'react'
import { Table } from 'react-bootstrap'
import '../MyPage.css'
const ActivitiesPost = () => {
    return (
        <div id="main_wrap">
            <h1 className='all-title'>게시글</h1>
            <Table hover striped bordered>
                <thead className='text-center'>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ActivitiesPost