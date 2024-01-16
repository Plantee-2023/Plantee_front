import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { BoxContext } from '../common/BoxContext';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { app } from '../../firebaseInit'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import "./Store.css";

const StoreQuestionInsert = ({ store_id }) => {

    const navi = useNavigate();
    const location = useLocation();
    const db = getStorage(app);

    const { box, setBox } = useContext(BoxContext);

    // 문의 내용
    let [form, setForm] = useState({ store_id: store_id, uid: sessionStorage.getItem('uid'), contents: '', category: 6 });
    let { contents } = form;


    // 문의 내용 작성 이벤트리스너
    const onChangeContents = (e) => {
        setForm({
            ...form,
            contents: e
        });
    }

    // 문의 작성 후 등록버튼 클릭
    const onClickRegister = async (e) => {
        e.preventDefault();
        if (contents === "") {
            alert("내용을 적어주세요.");
        } else {
            const res = { uid: sessionStorage.getItem("uid"), contents }
            await axios.post("/store/comment/insert", form);
            setBox({ show: true, message: "문의 등록이 완료되었습니다.", action: async () => { window.location.reload(); } });
        }
    }

    // 문의 등록 취소
    const onClickCancel = () => {
        setBox({
            show: true,
            message: "문의 등록을 취소하시겠습니까?",
            action: async () => {
                window.location.reload();
            }
        })
    }

    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>
                    <div className='m-4'>

                        <div className="store_editor">
                            <Form.Control as="textarea" rows={5}
                                value={contents} onChange={(e) => onChangeContents(e.target.value)} />
                            <div className='text-end mt-4'>
                                <button className='store_filterbtn_clean me-3' onClick={onClickCancel}>취소</button>
                                <button className='store_filterbtn' onClick={onClickRegister}>등록</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default StoreQuestionInsert