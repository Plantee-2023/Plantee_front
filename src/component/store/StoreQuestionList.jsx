import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Spinner, Row, Col, Card, Form } from 'react-bootstrap'
import { BoxContext } from '../common/BoxContext';
import { app } from '../../firebaseInit'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import "./Store.css";
import Parser from 'html-react-parser';
import StoreQuestionInsert from './StoreQuestionInsert';

const StoreQuestionList = ({ uid }) => {
    // 여기서 uid는 글쓴이

    const navi = useNavigate();
    const location = useLocation();
    const { store_id } = useParams();
    const db = getStorage(app);

    const { box, setBox } = useContext(BoxContext);
    const [loading, setLoading] = useState(false);

    const [question, setQuestion] = useState([]);
    // const [answer, setAnswer]= useState("");
    const [total, setTotal] = useState(0);

    const [answerTarget, setAnswerTarget] = useState(0);

    const getQuestion = async () => {
        setLoading(true);
        const res = await axios.get(`/store/question/${store_id}`);
        // console.log(res);
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

    // 상단 문의하기 버튼은 로그인한 사용자만 사용 가능
    const onClickReviewWrite = () => {
        if (sessionStorage.getItem("uid") != "") {
            setBox({ show: true, message: "로그인 사용자만 이용 가능한 서비스 입니다. 로그인 후 진행해주세요." })
            sessionStorage.setItem("target", location.pathname);
            navi("/users/loginPage");
        }
    }

    const onClickAnswer = (comment_id) => {
        console.log(comment_id);
        setAnswerTarget(comment_id);
        // const question = question.map(q => q && { ...q, edit: true });
        // setQuestion(question);
    }

    // 문의 삭제
    const onDelete = (comment_id) => {
        // console.log(comment_id) 
        setBox({
            show: true,
            message: "해당 문의를 삭제하시겠습니까?",
            action: async () => {
                await axios.get(`/store/delete/comment/${comment_id}`)
                setBox({ show: true, message: "해당 문의를 삭제하였습니다." })
                window.location.reload();
            }
        });
    }
    
    const onClickCancel = () => {
        setAnswerTarget(0);
    }

    // 리뷰 내용
    let [form, setForm] = useState({ store_id: store_id, uid: sessionStorage.getItem('uid'), contents: '', stars: 0, category: 6 });
    let { contents, stars } = form;

    const onChangeContents = (e) => {
        setForm({
            ...form,
            contents: e.target.value,
        });
    }

    const onClickRegister = async (e) => {
        
        e.preventDefault();
        
        if (form.contents === "") {
            alert("내용을 적어주세요.");
        } else {
            const data = { ...form, upper_id: answerTarget};
            await axios.post("/store/comment/insert", data);
            setBox({ show: true, message: "문의답변 등록이 완료되었습니다.", action: async () => { window.location.reload(); } });
        }
    }

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
                                <Row>상품에 대한 궁금하신 내용을 문의해주세요! 문의글은 수정할 수 없습니다.</Row>
                            </Col>
                            <Col rowSpan="2" className='text-end'>
                                <button className='btn_common' onClick={() => onClickReviewWrite(store_id)}>상품 문의하기</button>
                            </Col>
                            <div className='mt-4'>
                                {total === 0 && <div className='select_box p-4 text-center' style={{ background: "#adadad2b" }}> 문의내역이 없습니다. </div>}
                            </div>
                        </Row>
                        {sessionStorage.getItem("uid") != null ? <StoreQuestionInsert store_id={store_id} /> : <></>}
                    </Card>

                    {/* 하단 */}
                    <div className='comment_contents'>
                        {question.map(q =>
                            <>
                                <div key={q.reg_date}>
                                    <Row>
                                        <Col>
                                            <Row className='mb-3'>
                                                <hr />
                                                <p className='small' style={{ color: "#adadad" }}><span style={{ color: "#000000" }}>{q.nickname}</span> | {q.reg_date}</p>
                                                <Row>
                                                    <div>{q.contents}</div>
                                                    <div className='text-end'>
                                                        {sessionStorage.getItem("uid") === q.uid &&
                                                            <div xs={2} lg={2} className='text-end'>
                                                                <button className='store_btn_clicked_sm' onClick={() => onDelete(q.comment_id)}>삭제</button>
                                                            </div>
                                                        }
                                                    </div>
                                                </Row>

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
                                                            <p className='small' style={{ color: "#adadad" }}><span style={{ color: "green" }}>판매자</span> | {q.answer.reg_date}</p>
                                                            <Row>{q.answer.contents}</Row>
                                                            <div className='text-end'>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                    :
                                    <>
                                        {sessionStorage.getItem("uid") != uid ?
                                            <></> :
                                                q.comment_id == answerTarget ? 
                                                <Row>
                                                    <Col>
                                                        <Row className='mb-3'>
                                                            <div className="p-3" style={{ background: "#adadad2b" }}>
                                                                <div className='ms-3'>
                                                                    <div className="store_editor">
                                                                        <Form.Control as="textarea" rows={3} onChange={onChangeContents} />
                                                                        {/* <Form.Control as="textarea" rows={3}/> */}
                                                                        <div className='text-end mt-4'>
                                                                            <button className='store_filterbtn_clean me-3' onClick={onClickCancel}>취소</button>
                                                                            <button className='store_filterbtn' onClick={onClickRegister}>등록</button>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </Row>
                                                    </Col>
                                                </Row> 
                                                :
                                                <>
                                                    <div className='text-end'>

                                                        <button className='store_filterbtn_clicked' onClick={() => onClickAnswer(q.comment_id)}>답변하기</button>
                                                        
                                                    </div>
                                                    
                                                </>
                                        }
                                    </>
                                }
                            </>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default StoreQuestionList