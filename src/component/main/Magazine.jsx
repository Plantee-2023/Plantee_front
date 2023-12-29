import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Magazine = () => {
    return (
        <div className='display magazine-page'>
            <Row>
                <Col lg={8} >
                    <h1 className='mt-5 mb-5 text-end'>얘는 무슨 식물이냐?</h1>
                </Col>
                <Col lg={2}>
                    <div className='magazine-marini'>조회수 : 0</div>
                </Col>
            </Row>
            <img src="/image/what1.jpg" width={900} height={600} />
            <h5 className='mt-5'>얘는 무슨 식물이냐?</h5>
        </div>
    )
}

export default Magazine