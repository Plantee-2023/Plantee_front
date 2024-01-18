import React from 'react'
import { Table, Card } from 'react-bootstrap'
import '../MyPage.css'
const ActivitiesLike = () => {
	return (
		<div id="main_wrap">
			<Card>
				<h1 className='all-title'>좋아요</h1>
				<Table className='list' hover striped bordered>
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
			</Card>
		</div>
	)
}

export default ActivitiesLike