import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useParams, useNavigate, NavLink } from 'react-router-dom';
import { Spinner, Row, Col, Button, Tabs, Tab, Alert, Card, Badge } from 'react-bootstrap';
import Parser from 'html-react-parser';
import { BoxContext } from '../common/BoxContext';
import "./Store.css";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import StoreReviewList from "./StoreReviewList";
import StoreQuestionList from "./StoreQuestionList";
import DeliveryService from './DeliveryService';
import BtnToTop from '../common/BtnToTop';
import StoreBuyNow from './StoreBuyNow';

const StoreRead = () => {

    const navi = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);

    const { store_id } = useParams();
    const [store, setStore] = useState({
        store_id: "", title: "", price: "", stock: "",
        contents: "", image: "", level: "", tag: "",
        reg_date: "", mdfy_date: "", nickname: "", like_cnt: "", plant_id: "", recipe_id: "", post_id: ""
    })

    const { title, fmtprice, stock, contents, image, level, tag, uid, reg_date, mdfy_date, like_cnt,
        type, care_level, leaf, flowers, fruits, indoor, poisonous_pet, cuisine, price } = store;

    let [form, setForm] = useState({ store_id: store_id, uid: sessionStorage.getItem('uid') });


    const [fmtTotalPrice , setFmtTotalPrice] = useState("");
    const [qnt, setQnt] = useState(1);

    const getStore = async () => {
        setLoading(true);
        const res = await axios.get(`/store/read/${store_id}`);
        // console.log(res.data)
        setStore(res.data);
        setFmtTotalPrice(res.data.fmtprice);
        setLoading(false);
    }

    // 장바구니 클릭
    const onClickCart = async () => {
        if (sessionStorage.getItem("uid") === null) {
            setBox({ show: true, message: "로그인 사용자만 이용 가능한 서비스 입니다. 로그인 후 진행해주세요." })
            sessionStorage.setItem("target", location.pathname);
            navi("/users/loginPage");
        } else if (sessionStorage.getItem("uid")) {
            const res = { uid: sessionStorage.getItem("uid"), store_id: store_id, qnt: qnt }
            await axios.post("/cart/insert", res)
            setBox({
                show: true,
                message: "상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?",
                action: () => {
                    navi("/users/mypage/productcart")
                }
            })
        }
    }

    // 바로구매 클릭
    const onClickBuyNow = () => {
        if (sessionStorage.getItem("uid") === null) {
            setBox({ show: true, message: "로그인 사용자만 이용 가능한 서비스 입니다. 로그인 후 진행해주세요." })
            sessionStorage.setItem("target", location.pathname);
            navi("/users/loginPage");
        } else if (sessionStorage.getItem("uid")) {
            navi("/users/mypage/productcart?show=order")
        }
    }

    // 판매자의 판매글 삭제
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

    // 좋아용 추가
    const onClickHeart = async () => {
        if (!sessionStorage.getItem("uid")) {
            setBox({ show: true, message: "로그인 사용자만 이용 가능한 서비스 입니다. 로그인 후 진행해주세요." })
            sessionStorage.setItem("target", location.pathname);
            navi("/users/loginPage");
        } else {
            const res = { uid: sessionStorage.getItem("uid"), store_id }
            await axios(`/store/insert/like`, res);
            alert("조아용 추가!")
            getStore();
        }
    }

    // 좋아요 삭제
    const onClickHeartDelete = async () => {
        await axios(`/store/delete/like?store_id=${store_id}&uid=${sessionStorage.getItem("uid")}`);
        alert("조아용 취소!")
        getStore();
    }

    {/* 텍스트 변환 */ }
    const getCareLevelText = (care_level) => {
        switch (care_level) {
            case '1':
                return '초보자용';
            case '2':
                return '중급자용';
            default:
                return '상급자용';
        }
    };

    const getIndoorText = (indoor) => {
        switch (indoor) {
            case 'y':
                return '실내용';
            default:
                return '실외용';
        }
    }

    const onChangeQnt = (e) => {
        setQnt(Number(e.target.value));
        setFmtTotalPrice((Number(price)*Number(e.target.value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
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
                                        <Card.Img variant="top" src={image} />
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
                                        <ul className='store_items'>
                                            {type && <li className='store_item'># {type}</li>}
                                            {care_level && <li className='store_item'># {getCareLevelText(care_level)}</li>}
                                            {indoor && <li className='store_item'># {getIndoorText(indoor)}</li>}
                                            {leaf === 'y' && <li className='store_item'># 잎이 있는</li>}
                                            {flowers === 'y' && <li className='store_item'># 꽃이 있는</li>}
                                            {fruits === 'y' && <li className='store_item'># 열매가 있는</li>}
                                            {poisonous_pet === 'n' && <li className='store_item'># 반려안전</li>}
                                            {cuisine === 'y' && <li className='store_item'># 식용가능</li>}
                                        </ul>
                                        <h1 className='store_maintitle'>{title}</h1>
                                    </div>
                                </section>
                                
                                <section className='store_simpleinfo_section'>
                                    <Row className='plant_items'>
                                        <Col className='store_subtitle ms-2'>{fmtprice}원</Col>
                                        <Col className='text-end'>
                                            {/* <FaHeart color="#ff0000" size="2rem" />{like_cnt} FaRegHeart */}
                                            <span>
                                                {like_cnt === 0 ?
                                                    <FaRegHeart onClick={onClickHeart} />
                                                    :
                                                    <FaHeart  color="#ff0000" onClick={onClickHeartDelete} />
                                                }
                                                <small>{like_cnt}</small>
                                            </span>
                                        </Col>
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
                                            <Col><input type='number' defaultValue={1} onChange={onChangeQnt}/></Col>
                                            <Col className='text-end me-2'>총 {fmtTotalPrice}원</Col>
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
                                            <button className='store_filterbtn' onClick={onClickBuyNow}>바로구매</button>
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
                        {/* 여기서 보내는 props는 판매글쓴이에 대한 정보 */}
                        <Tab eventKey="info" title="상세정보">
                            {Parser(contents)}
                        </Tab>
                        <Tab eventKey="review" title="상품리뷰">
                            <StoreReviewList uid={uid} />
                        </Tab>
                        <Tab eventKey="qna" title="상품문의">
                            <StoreQuestionList uid={uid} />
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