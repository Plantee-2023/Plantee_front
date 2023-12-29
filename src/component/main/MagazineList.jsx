import React from 'react'
import {Table} from 'react-bootstrap'
import '../Main.css'

const MagazineList = () => {
    return (
        <div className='magazini'>
            <table className='table magazine-table'>
                <thead className='text-center'>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>등록일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='text-center'>1</td>
                        <td><a href='/main/magazine' className='magazine-a'>얘는 무슨 식물이냐?</a></td>
                        <td className='text-center'>관리자</td>
                        <td className='text-center'>2023/12/29</td>
                        <td className='text-center'>0</td>
                    </tr>
                    <tr>
                        <td className='text-center'>2</td>
                        <td><a href='' className='magazine-a'>우리 토마토가 어디가 아픈건가요?</a></td>
                        <td className='text-center'>관리자</td>
                        <td className='text-center'>2023/12/28</td>
                        <td className='text-center'>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MagazineList