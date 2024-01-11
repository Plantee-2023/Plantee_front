import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Spinner, Row, Col, Form, Button, Card } from 'react-bootstrap'
import "./Store.css";
import { BoxContext } from '../common/BoxContext';
import BtnToTop from '../common/BtnToTop';

const StoreQuestion = ({ uid }) => {
    const navi = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);

    const { store_id } = useParams();

    const [question, setQuestion] = useState([]);
    const [total, setTotal] = useState(0);

    const getQuestion = async () => {
        setLoading(true);
        const res = await axios.get(`/store/question/${store_id}`);
        console.log(res);
        let question = res.data.questionList;
        let answer = res.data.answerList;
        for (let i = 0; i < question.length; i++) {
            answer.forEach(function (a) {
                if (uid === a.uid && question[i].comment_id === a.upper_id) {
                    question[i].answer = a;
                }
            });
        }
        let total = res.data.questionCount;
        setQuestion(question);
        setTotal(total);
        setLoading(false);
    }

    // //리뷰작성버튼클릭
    // const onClickReviewWrite = (store_id) => {
    //     if (sessionStorage.getItem("uid")) {
    //         return (
    //             <div>
    //                 <Form.Control as="textarea" rows={5} className='mt-4' />
    //                 <div className='text-end mt-4'>
    //                     <button className='store_filterbtn_clean'>취소</button>
    //                     <button className='store_filterbtn'>등록</button>
    //                 </div>
    //             </div>)
    //     } else {
    //         setBox({ show: true, message: "로그인 사용자만 이용 가능한 서비스 입니다. 로그인 후 진행해주세요." })
    //         sessionStorage.setItem("target", location.pathname);
    //         navi("/users/loginPage");
    //     }
    // }

    useEffect(() => { getQuestion(); }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>

                    {/* 상단 */}
                    <Card className='mb-5'>
                        <Row className='m-4'>
                            <Col>
                                <Row>총 {total}건의 문의</Row>
                                <Row>상품에 대한 궁금하신 내용을 문의해주세요!</Row>
                            </Col>
                            <Col rowSpan="2" className='text-end'>
                                <button className='btn_common' >상품 문의하기</button>
                            </Col>
                            <div className='mt-4'>
                                {total === 0 && <div className='select_box p-4 text-center' style={{ background: "#adadad2b" }}> 문의내역이 없습니다. </div>}
                            </div>
                        </Row>
                        {sessionStorage.getItem("uid") === uid ||
                            <div className='m-4'>
                                <Form.Control as="textarea" rows={5} className='mt-4' />
                                <div className='text-end mt-4'>
                                    <button className='store_filterbtn_clean me-3'>취소</button>
                                    <button className='store_filterbtn'>등록</button>
                                </div>
                            </div>
                        }
                    </Card>

                    {/* 하단 */}
                    <div className='comment_contents'>
                        {question.map(q =>
                            <>
                                <div key={q.comment_id}>
                                    <Row>
                                        <Col>
                                            <Row className='mb-3'>
                                                <hr />
                                                <div className='small' style={{ color: "#adadad" }}><span style={{ color: "#000000" }}>{q.uid}</span> | {q.reg_date}</div>
                                                <Row>{q.contents}</Row>

                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                {typeof (q.answer) != 'undefined' ?
                                    <div key={q.answer.comment_id}>
                                        <Row>
                                            <Col>
                                                <Row className='mb-3'>
                                                    <div className="p-3" style={{ background: "#adadad2b" }}>
                                                        <div className='ms-3'>
                                                            <div className='small' style={{ color: "#adadad" }}><span style={{ color: "green" }}>판매자</span> | {q.answer.reg_date}</div>
                                                            <Row>{q.answer.contents}</Row>
                                                            <div className='text-end'>
                                                                {uid === sessionStorage.getItem("uid") && <button className='store_filterbtn_clean'>수정하기</button>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                    :
                                    <>
                                        {sessionStorage.getItem("uid") != uid && sessionStorage.getItem("uid") != "admin" ?
                                            <></> : 
                                            <div className='text-end'>
                                                <button className='store_filterbtn_clicked'>답변하기</button>
                                            </div>
                                        }
                                    </>
                                }
                            </>
                        )}
                    </div>

                </div>
            </div>

            <BtnToTop />
        </>
    )
}

export default StoreQuestion