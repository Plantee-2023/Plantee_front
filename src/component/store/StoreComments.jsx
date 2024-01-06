import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Spinner, Row, Col, Card } from 'react-bootstrap'
import "./Store.css";
import BtnToTop from '../common/BtnToTop';

const StoreComments = () => {
    const [loading, setLoading] = useState(false);

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
        //let starAvg = res.data.starsCount;

        //각각의 별점 가져오는
        const starOne = "⭐";
        let totalStars = "";
        list.forEach(review => {
            for (let i = 0; i < review.stars; i++) {
                totalStars += starOne;
            }
            setStars(totalStars);
            review.totalStars = totalStars;
            totalStars = "";
        });

        setReviews(list);
        setTotal(total);
        //setStarAvg(starAvg);
        setLoading(false);
    }

    const convertStar = async () => {
        setLoading(true);
        const res = await axios.get(`/store/review/${store_id}`);
        let starAvg = res.data.starsCount;
        setStarAvg(starAvg);
        if (starAvg === 4) { return "⭐⭐⭐⭐" }
    }


    useEffect(() => { getReview(); convertStar(); }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>

                    {/* 상단 */}
                    <Card>
                        <Row className='m-3'>
                            <Col>
                                <Row>총 {total}건의 평점</Row>
                                <Row>
                                    <div>{starAvg} | 5</div>
                                </Row>
                            </Col>
                            <Col rowSpan="2" className='text-end'>
                                <button className='btn_common'>리뷰 작성하기</button>
                            </Col>
                        </Row>
                    </Card>

                    {/* 하단 */}
                    <div className='comment_contents'>
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

export default StoreComments