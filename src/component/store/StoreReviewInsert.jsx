import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { BoxContext } from '../common/BoxContext';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaStar } from 'react-icons/fa';
import { app } from '../../firebaseInit'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import "./Store.css";

const StoreReviewInsert = ({ store_id }) => {

    const navi = useNavigate();
    const location = useLocation();
    const db = getStorage(app);

    const { box, setBox } = useContext(BoxContext);

    // 별점
    const array = [0, 1, 2, 3, 4];
    const [clicked, setClicked] = useState([false, false, false, false, false]);

    // 리뷰 내용
    let [form, setForm] = useState({ store_id: store_id, uid: sessionStorage.getItem('uid'), contents: '', stars: '', category: 5 });
    let { contents, stars } = form;


    // 리뷰 내용 작성 이벤트리스너
    const onChangeContents = (e) => {
        setForm({
            ...form,
            contents: e,
        });
    }

    // 리뷰 작성 중 별점 
    const handleStarClick = index => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
    };

    // 리뷰 작성 후 등록버튼 클릭
    const onClickRegister = async (e) => {
        e.preventDefault();
        if (form.stars.clicked === false) {
            setBox({ show: true, message: "별점을 주셔야 리뷰 등록이 가능합니다." })
        } else {
            if (form.contents === "") {
                alert("내용을 적어주세요.");
            } else {
                form.stars = clicked.filter(Boolean).length;
                const res = { uid: sessionStorage.getItem("uid"), contents, stars }
                await axios.post("/store/comments/insert", form);
                setBox({ show: true, message: "리뷰 등록이 완료되었습니다.", action: async () => { window.location.reload(); } });
            }
        }
    }

    // 리뷰 등록 취소
    const onClickCancel = () => {
        setBox({
            show: true,
            message: "리뷰 등록을 취소하시겠습니까?",
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

                        <hr />
                        <div className='mb-3'>
                            <span>별점 : </span>
                            <span className='store_insert_stars'>
                                {array.map((el) => (
                                    <FaStar key={el} onClick={() => handleStarClick(el)} value={stars}
                                        className={clicked[el] && 'yellowStar'} size="20" />
                                ))}
                            </span>
                        </div>

                        <div className="store_editor">
                            <CKEditor
                                config={{ placeholder: "내용을 입력하세요.", ckfinder: { uploadUrl: '/store/ckupload' } }}
                                editor={ClassicEditor}
                                data=""
                                onChange={(event, editor) => { onChangeContents(editor.getData()); }}
                                onReady={(editor) => { }} />
                        </div>

                        <div className='text-end mt-4'>
                            <button className='store_filterbtn_clean me-3' onClick={onClickCancel}>취소</button>
                            <button className='store_filterbtn' onClick={onClickRegister}>등록</button>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default StoreReviewInsert