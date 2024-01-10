import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { Spinner, Row, Col, Button, Tabs, Tab, Alert, Card, Badge } from 'react-bootstrap';
import { BoxContext } from '../common/BoxContext';
import "./Store.css";
import { TiHeart } from "react-icons/ti";
import StoreReview from "./StoreReview";
import StoreQuestion from "./StoreQuestion";
import DeliveryService from './DeliveryService';
import BtnToTop from '../common/BtnToTop';

const StoreRead = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);

    const { store_id } = useParams();
    const [store, setStore] = useState({
        store_id: "", title: "", price: "", stock: "",
        contents: "", image: "", level: "", tag: "",
        reg_date: "", mdfy_date: "", nickname: "", like_cnt: "", plant_id: "", recipe_id: "", post_id: ""
    })

    const { title, price, stock, contents, image, level, tag, uid, reg_date, mdfy_date, like_cnt } = store;

    const getStore = async () => {
        setLoading(true);
        const res = await axios.get(`/store/read/${store_id}`);
        setStore(res.data);
        setLoading(false);
    }

    const onClickCart = async () => {
        await axios.post()
        if (window.confirm("장바구니로 이동하시겠습니까?")) {
            window.location.href = "/";
        } else {
            window.location.href = "/";
        }
    }

    const onDelete = () => {
        setBox({
            show: true,
            message: `[${title}] 글을 삭제하시겠습니까?`,
            action: async () => {
                await axios.get(`/store/delete/${store_id}`)
                setBox({ show: true, message: "해당 판매글을 삭제하였습니다." })
                navi(`/store`);
            }
        });
    }

    useEffect(() => { getStore(); }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>
                    <div className='store_layout'>

                        <section className='store_img_section'>
                            <div className='store_img'>
                                {sessionStorage.getItem("uid") === uid ?
                                    <>
                                        <Card.Img variant="top" src="http://via.placeholder.com/200x200" />
                                        <Card.ImgOverlay>
                                            <h5><Badge bg="success">내가 쓴 글</Badge></h5>
                                        </Card.ImgOverlay>
                                    </>
                                    :
                                    <img src="http://via.placeholder.com/200x200" />
                                }
                            </div>
                        </section>

                        <div className='store_info_layout'>
                            <section className='store_info_section'>
                                <section className='store_title_section'>
                                    <div className='store_title'>
                                        <button className='store_tag_badge mb-2'>{tag}</button>
                                        <h1 className='store_maintitle'>{title}</h1>
                                    </div>
                                </section>
                                <section className='store_simpleinfo_section'>
                                    <Row className='plant_items'>
                                        <Col className='store_subtitle ms-2'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Col>
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
                                    {sessionStorage.getItem("uid") === uid ?
                                        <>
                                            <NavLink to={`/store/update/${store_id}`}>
                                                <Button variant="secondary" className='me-4'>판매글 수정하기</Button>
                                            </NavLink>
                                            <Button variant="danger" onClick={() => onDelete()}>판매글 삭제하기</Button>
                                        </>
                                        :
                                        <>
                                            <button className='store_filterbtn me-3' onClick={onClickCart}>장바구니</button>
                                            <button className='store_filterbtn'>바로구매</button>
                                        </>
                                    }

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
                            <StoreReview uid={uid} />
                        </Tab>
                        <Tab eventKey="qna" title="상품문의">
                            <StoreQuestion uid={uid} />
                        </Tab>
                        <Tab eventKey="carry" title="배송/반품/교환">
                            <DeliveryService />
                        </Tab>
                    </Tabs>

                </div>
            </div>

            <BtnToTop />
        </>
    )
}

export default StoreRead