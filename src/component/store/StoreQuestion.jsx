import React from 'react'
import { Spinner, Row, Col, Card } from 'react-bootstrap'
import "./Store.css";
import BtnToTop from '../common/BtnToTop';

const StoreQuestion = () => {
    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>

                    {/* 상단 */}
                    <div className='text-center'>
                        <button className='btn_common py-2'>문의하기</button>
                    </div>

                    {/* 하단 */}
                    <div className='comment_contents'>

                        <div>
                            <Row>
                                <Col>dd</Col>
                                <Col>dd</Col>
                                <hr />
                            </Row>
                        </div>

                    </div>

                </div>
            </div>

            <BtnToTop />
        </>
    )
}

export default StoreQuestion