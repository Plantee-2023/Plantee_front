import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner, Row, Col, Card, Form } from 'react-bootstrap'
import "./Store.css";
import { BoxContext } from '../common/BoxContext';
import BtnToTop from '../common/BtnToTop';

const StoreReview = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);

    const { store_id } = useParams();

    const [reviews, setReviews] = useState([]);
    const [total, setTotal] = useState(0);
    const [stars, setStars] = useState("");
    const [starAvg, setStarAvg] = useState(0);

    const getReview = async () => {
        setLoading(true);
        const res = await axios.get(`/store/review/${store_id}`);
        //console.log(res);
        let list = res.data.reviewList;
        let total = res.data.reviewCount;
        let starAvg = res.data.starsCount;

        const starOne = "⭐";
        let totalStars = "";
        //각각의 별점 가져오는
        list.forEach(review => {
            for (let i = 0; i < review.stars; i++) {
                totalStars += starOne;
            }
            setStars(totalStars);
            review.totalStars = totalStars;
            totalStars = "";
        });
        //상단 별점 평균



        setReviews(list);
        setTotal(total);
        setStarAvg(starAvg);
        setLoading(false);
    }

    //리뷰작성버튼클릭
    const onClickReviewWrite = (store_id) => {
        if (sessionStorage.getItem("uid")) {

        } else {
            setBox({ show: true, message: "로그인 사용자만 이용 가능한 서비스 입니다. 로그인 후 진행해주세요." })
            navi("/users/loginPage");
        }
    }


    useEffect(() => { getReview(); }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>

                    {/* 상단 */}

                    <Row className='m-3'>
                        <Col>
                            <Row>총 {total}건의 평점</Row>
                            <Row>
                                <div>{starAvg} | 5</div>
                            </Row>
                        </Col>
                        <Col rowSpan="2" className='text-end'>
                            <button className='btn_common' onClick={() => onClickReviewWrite(store_id)}>리뷰 작성하기</button>
                        </Col>
                    </Row>


                    {/* 하단 */}
                    <div className='comment_contents'>

                        {sessionStorage.getItem("uid") &&

                            <div>

                                <Form.Control as="textarea" rows={5} />
                                <div className='text-end'>
                                    <button className='store_filterbtn_clear'>취소</button>
                                    <button className='store_filterbtn'>등록</button>
                                </div>
                            </div>

                        }

                        {reviews.map(r =>
                            <div key={r.reg_date}>
                                <Row>
                                    <Col xs={2} lg={2} style={{ verticalAlign: "center" }}>
                                        <Row style={{ fontWeight: "600" }}>{r.uid}</Row>
                                        <Row>{r.totalStars} | {r.stars}</Row>
                                    </Col>
                                    <Col>
                                        <Row className='small' style={{ color: "#adadad" }}>{r.reg_date}</Row>
                                        <Row>{r.contents}</Row>
                                    </Col>
                                    <hr />
                                </Row>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <BtnToTop />
        </>
    )
}

export default StoreReview