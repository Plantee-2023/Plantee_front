import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Spinner, Row, Col, Badge, Tabs, Tab, Alert } from 'react-bootstrap';
import "./Store.css";
import { TiHeart } from "react-icons/ti";

const StoreRead = () => {
    const [loading, setLoading] = useState(false);
    const { store_id } = useParams();
    const [store, setStore] = useState({
        store_id: "", title: "", price: "", stock: "",
        contents: "", image: "", level: "", tag: "",
        reg_date: "", mdfy_date: "", nickname: "", like_cnt: "", plant_id: "", recipe_id: "", post_id: ""
    })

    const { title, price, stock, contents, image, level, tag, reg_date, mdfy_date, like_cnt } = store;

    const getStore = async () => {
        setLoading(true);
        const res = await axios.get(`/store/read/${store_id}`);
        setStore(res.data);
        setLoading(false);
    }

    useEffect(() => { getStore(); }, [])


    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='details_wrap'>
                <div className='details_contents'>
                    <div className='details_layout'>

                        <section className='details_img_section'>
                            <div className='details_img'>
                                <img src="http://via.placeholder.com/200x200" />
                            </div>
                        </section>

                        <div className='details_info_layout'>
                            <section className='details_info_section'>
                                <section className='details_title_section'>
                                    <div className='details_title'>
                                        <h1 className='details_maintitle'>{title}</h1>
                                        <h5><Badge>{tag}</Badge></h5>
                                    </div>
                                </section>
                                <section className='details_simpleinfo_section'>
                                    <Row className='plant_items'>
                                        <Col className='details_subtitle ms-4'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Col>
                                        <Col className='text-end'><TiHeart color="#ff0000" size="2rem" />{like_cnt}</Col>
                                    </Row>
                                    <hr />
                                    <div className='p-3'>
                                        <Row className='pb-3'>
                                            <select className='select_box'>
                                                <option>화분 선택 (*옵션)</option>
                                                <option>레몬래몽화분</option>
                                                <option>체리채리화분</option>
                                                <option>포도푸도화분</option>
                                                <option>멜론메롱화분</option>
                                            </select>
                                        </Row>
                                        <Row className='pb-3'>
                                            <select className='select_box'>
                                                <option>용품 선택 (*옵션)</option>
                                                <option>베스트셀러! 수분계</option>
                                                <option>스테디셀러! 모종삽</option>
                                            </select>
                                        </Row>
                                    </div>
                                </section>
                                <section>
                                    <Alert style={{ background: "#adadad2b", border: 'none' }}>
                                        <div className='details_subtitle pb-3'>수량선택</div>
                                        <Row>
                                            <Col><input type='number' defaultValue={1} /></Col>
                                            <Col className='text-end me-2'>총 ###,###원</Col>
                                        </Row>
                                    </Alert>
                                </section>
                                <section className='details_simpleinfo_section text-center pt-3'>
                                    <button className='store_filterbtn me-3'>장바구니</button>
                                    <button className='store_filterbtn'>바로구매</button>
                                </section>
                            </section>
                        </div>

                    </div>

                    <Tabs
                        defaultActiveKey="info"
                        id="fill-tab-example"
                        className="my-5 pt-5"
                        fill >

                        <Tab eventKey="info" title="상세정보">
                            {contents}
                        </Tab>
                        <Tab eventKey="review" title="상품리뷰">
                            {/* <ReviewPage pid={pid} /> */}
                            하이
                        </Tab>
                        <Tab eventKey="qna" title="상품문의">
                            하이
                        </Tab>
                        <Tab eventKey="carry" title="배송/환불">
                            하이
                        </Tab>
                    </Tabs>

                </div>
            </div>
        </>
    )
}

export default StoreRead