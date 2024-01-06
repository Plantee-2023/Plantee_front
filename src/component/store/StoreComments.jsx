import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import "./Store.css";
import BtnToTop from '../common/BtnToTop';

const StoreComments = () => {


    



    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>

                    <Row>
                        <Col>
                            <Row>상품 총 평점</Row>
                            <Row>
                                <span>
                                    <>❤❤❤❤❤ / #.#</>
                                    <>/5</>
                                </span>
                            </Row>
                        </Col>
                        <Col rowSpan="2"><button className='btn_common'>리뷰 작성하기</button></Col>
                    </Row>

                    <div>
                        d
                    </div>

                </div>
            </div>

            <BtnToTop/>
        </>
    )
}

export default StoreComments