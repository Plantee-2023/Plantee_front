import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { BoxContext } from '../common/BoxContext';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaStar } from 'react-icons/fa';
import { app } from '../../firebaseInit'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import "./Store.css";

const StoreReviewUpdate = ({ store_id, comment_id }) => {
    //console.log(contents);
    //const { store_id, comment_id } = props;

    const navi = useNavigate();
    const location = useLocation();
    const db = getStorage(app);

    const { box, setBox } = useContext(BoxContext);
    const [loading, setLoading] = useState(false);

    // 별점
    const array = [0, 1, 2, 3, 4];
    const [clicked, setClicked] = useState([false, false, false, false, false]);

    const [starIdx, setStarIdx] = useState(0);

    const [org_contents, setOrgContents] = useState("");

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
        setStarIdx(index + 1);
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
    };

    // 리뷰 작성 후 등록버튼 클릭
    const onClickRegister = async (e) => {

        e.preventDefault();
        if (starIdx === 0) {
            setBox({ show: true, message: "별점을 주셔야 리뷰 등록이 가능합니다." })
        } else {
            if (form.contents === "") {
                alert("내용을 적어주세요.");
            } else {
                form.stars = clicked.filter(Boolean).length;
                const data = { ...form, comment_id: comment_id };
                await axios.post("/store/comment/update", data);
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

    const getReviewOne = async () => {
        setLoading(true);
        const data = { store_id: store_id, comment_id: comment_id };
        const res = await axios.post(`/store/reviewOne`, data);
        setOrgContents(res.data.contents);
        onChangeContents(res.data.contents);
        handleStarClick(Number(res.data.stars) - 1);
        setLoading(false);
    }

    useEffect(() => { getReviewOne(); }, []);

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
                                data={org_contents}
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

export default StoreReviewUpdate