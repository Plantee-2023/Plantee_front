import React from 'react'
import {Table} from 'react-bootstrap'
const Favorite = () => {
    return (
        <div>
            <h1 className='all-title'>좋아요</h1>
            <Table hover striped bordered>
                <thead className='text-center'>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Favorite