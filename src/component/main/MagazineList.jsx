import React from 'react'
import {Table} from 'react-bootstrap'
import '../Main.css'

const MagazineList = () => {
    return (
        <div className='display'>
            <Table className='maga-table'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>이 식물은 무엇일까?</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default MagazineList