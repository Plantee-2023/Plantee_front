import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Spinner, Row, Col, Card, Form } from 'react-bootstrap'
import { BoxContext } from '../common/BoxContext';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaStar } from 'react-icons/fa';
import { app } from '../../firebaseInit'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import "./Store.css";
import Parser from 'html-react-parser';
import StoreReviewInsert from './StoreReviewInsert';

const StoreReviewList = ({ uid }) => {
    // 여기서 uid는 글쓴이

    const navi = useNavigate();
    const location = useLocation();
    const { store_id } = useParams();
    const db = getStorage(app);

    const { box, setBox } = useContext(BoxContext);
    const [loading, setLoading] = useState(false);

    const [reviews, setReviews] = useState([]);
    const [total, setTotal] = useState(0);
    const [stars, setStars] = useState("");
    const [starAvg, setStarAvg] = useState(0);

    const getReview = async () => {
        setLoading(true);
        const res = await axios.get(`/store/review/${store_id}`);
        let list = res.data.reviewList.map(r => r && { ...r, ellipsis: true });
        let total = res.data.reviewCount;
        let starAvg = res.data.starsCount;

        const starOne = "⭐";
        let totalStars = "";
        // 각 리뷰의 별점 가져오는
        list.forEach(review => {
            for (let i = 0; i < review.stars; i++) {
                totalStars += starOne;
            }
            setStars(totalStars);
            review.totalStars = totalStars;
            totalStars = "";
        });
        // console.log(list)
        setReviews(list);
        setTotal(total);
        setStarAvg(starAvg);
        setLoading(false);
    }

    // 리뷰 한 줄 넘으면 눌려서 전체보기
    const onChangeEllipsis = (comment_id) => {
        const list = list.map(r => r.comment_id === comment_id ? { ...r, ellipsis: !r.ellipsis } : r);
        setReviews(list);
    }

    // 상단 리뷰 작성하기 버튼은 로그인한 사용자만 사용 가능
    const onClickReviewWrite = () => {
        if (sessionStorage.getItem("uid") === "") {
            setBox({ show: true, message: "로그인 사용자만 이용 가능한 서비스 입니다. 로그인 후 진행해주세요." })
            sessionStorage.setItem("target", location.pathname);
            navi("/users/loginPage");
        }
    }

    // 리뷰 삭제
    const onDelete = (comment_id) => {
        // console.log(comment_id)
        setBox({
            show: true,
            message: "해당 리뷰를 삭제하시겠습니까?",
            action: async () => {
                await axios.get(`/store/delete/comment/${comment_id}`)
                setBox({ show: true, message: "해당 리뷰을 삭제하였습니다." })
                window.location.reload();
            }
        });
    }

    useEffect(() => { getReview(); }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>

                    {/* 상단 */}
                    <Card className='mb-5'>
                        <Row className='m-4'>
                            <Col>
                                <Row>총 {total}건의 평점</Row>
                                <Row>
                                    <div>{starAvg} | 5</div>
                                </Row>
                            </Col>
                            <Col rowSpan="2" className='text-end'>
                                <button className='btn_common' onClick={() => onClickReviewWrite(store_id)}>리뷰 작성하기</button>
                            </Col>
                            <div className='mt-4'>
                                {total === 0 && <div className='select_box p-4 text-center' style={{ background: "#adadad2b" }}> 이 상품의 첫 리뷰어가 되어주세요! </div>}
                            </div>
                        </Row>
                        {/* typeof (sessionStorage.getItem(uid)) != 'undefined' */}
                        {sessionStorage.getItem(uid) != "" && <StoreReviewInsert store_id={store_id} />}
                    </Card>

                    {/* 하단 */}
                    <div className='comment_contents'>

                        {reviews.map(r =>
                            <div key={r.reg_date}>
                                <Row className='p-2 mb-3'>
                                    <Col xs={2} lg={2} style={{ verticalAlign: "center" }}>
                                        <Row style={{ fontWeight: "600" }}>{r.nickname}</Row>
                                        <Row>{r.totalStars} | {r.stars}</Row>
                                    </Col>
                                    <Col>
                                        <Row className='small' style={{ color: "#adadad" }}><p>{r.reg_date}</p></Row>
                                        <Row onChange={() => onChangeEllipsis(r.comment_id)}
                                            style={{ cursor: "point" }} className={r.ellipsis && "ellipsis1"}>{Parser(r.contents)}</Row>
                                    </Col>
                                    {sessionStorage.getItem("uid") === r.uid &&
                                        <Col xs={2} lg={2} className='text-end'>
                                            <button className='store_btn_clean_sm me-2'>수정</button>
                                            <button className='store_btn_clicked_sm' onClick={() => onDelete(r.comment_id)}>삭제</button>
                                        </Col>
                                    }

                                    {/* 댓글 수정 */}
                                    {/* <Form.Control value={r.contents} rows={3} as="textarea" />
                                    <div className='text-end pt-3'>
                                        <button className='store_filterbtn_clean me-3'>취소</button>
                                        <button className='store_filterbtn'>수정</button>
                                    </div> */}

                                </Row>
                            </div>
                        )}


                    </div>

                </div>
            </div>

        </>
    )
}

export default StoreReviewList