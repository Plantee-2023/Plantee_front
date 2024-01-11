import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Spinner, Row, Col, Card, Form } from 'react-bootstrap'
import { BoxContext } from '../common/BoxContext';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { app } from '../../firebaseInit'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import "./Store.css";
import Parser from 'html-react-parser';

const StoreReview = ({ uid }) => {
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

    const [contents, setContents] = useState("");

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
        // console.log(uid)
        setReviews(list);
        // console.log(list)
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
    const onClickReviewWrite = (store_id) => {
        if (sessionStorage.getItem("uid") === "") {
            setBox({ show: true, message: "로그인 사용자만 이용 가능한 서비스 입니다. 로그인 후 진행해주세요." })
            sessionStorage.setItem("target", location.pathname);
            navi("/users/loginPage");
        }
    }

    // 리뷰 작성 후 등록버튼 클릭
    const onClickRegister = async () => {
        if (contents === "") {
            alert("내용을 적어주세요.");
        } else {

            // const res = await axios.post("/store/review/insert", {
            //     uid: sessionStorage.getItem("uid"), store_id, contents, stars: 3, category: 5
            // });
            // console.log(res);
            // setContents("");
            // getReview();

            // const res = await axios.post("/store/review/insert", {
            //     uid: sessionStorage.getItem("uid"), store_id, contents, stars: 3, category: 5
            // });
            // console.log(res);
            // try {
            //     getReview();
            //     setContents("");
            // } catch (e) {
            //     alert("리뷰 등록이 실패하였습니다.");
            // }
            // getReview();
            // setContents("");
        }
    }

    const onChangeContents = (e) => {
        setContents({
            contents: e
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
                        {sessionStorage.getItem("uid") != " " && sessionStorage.getItem("uid") != uid ?
                            <div className='m-4'>
                                <CKEditor config={{ placeholder: "내용을 입력하세요.", ckfinder: { uploadUrl: '/store/ckupload' } }}
                                    editor={ClassicEditor}
                                    data=""
                                    onChange={(event, editor) => { onChangeContents(editor.getData()); }}
                                    onReady={(editor) => { }} />
                                <div className='text-end mt-4'>
                                    <button className='store_filterbtn_clean me-3'>취소</button>
                                    <button className='store_filterbtn' onClick={onClickRegister}>등록</button>
                                </div>
                            </div> : <></>
                        }
                    </Card>

                    {/* 하단 */}
                    <div className='comment_contents'>

                        {reviews.map(r =>
                            <div key={r.reg_date}>
                                <Row className='p-2 mb-3'>
                                    <Col xs={2} lg={2} style={{ verticalAlign: "center" }}>
                                        <Row style={{ fontWeight: "600" }}>{r.uid}</Row>
                                        <Row>{r.totalStars} | {r.stars}</Row>
                                    </Col>
                                    <Col>
                                        <Row className='small' style={{ color: "#adadad" }}>{r.reg_date}</Row>
                                        <Row onChange={() => onChangeEllipsis(r.comment_id)}
                                            style={{ cursor: "point" }} className={r.ellipsis && "ellipsis"}> {r.contents} </Row>
                                    </Col>
                                    {sessionStorage.getItem("uid") === uid ?
                                        <></>
                                        :
                                        <Col xs={2} lg={2} className='text-end'>
                                            <button className='store_btn_clean_sm'>수정</button>
                                            <button className='store_btn_clicked_sm'>삭제</button>
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

export default StoreReview