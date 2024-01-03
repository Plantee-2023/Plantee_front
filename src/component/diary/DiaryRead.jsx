import React from 'react'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

const DiaryRead = () => {
    return (
        <>
            <div>
                <h2>상세보기</h2>
                <div className='mt-5'>
                    <img src="http://via.placeholder.com/250x250" alt='plante' />
                    <h2 className='mt-5'><b>식물이름</b></h2>
                </div>
                <div className='mt-5 text-center'>
                </div>
                <div className='mt-5'>
                    <Card style={{ width: '40rem' }}>
                        <CardBody>
                            <h5>메모</h5>
                        </CardBody>
                    </Card>
                </div>
                <div className='mt-5'>
                    <Card>
                        <Card.Body>
                            <h2>스토어연결</h2>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default DiaryRead