import React from 'react'
import { Table } from 'react-bootstrap'

const Post = () => {
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <h1 className='all-title'>게시글</h1>
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
        </div>
    )
}

export default Post