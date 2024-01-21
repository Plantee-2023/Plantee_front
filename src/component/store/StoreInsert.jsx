import axios from 'axios';
import React, { useEffect, useState, useContext, useRef } from 'react'
import { useParams, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { Spinner, InputGroup, Form } from 'react-bootstrap';
import { BoxContext } from '../common/BoxContext';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import "./Store.css";
import Parser from 'html-react-parser';
import { ref, getDownloadURL, uploadBytes, getStorage, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; //랜덤 식별자를 생성해주는 라이브러리

const StoreInsert = () => {
    const navi = useNavigate();
    const location = useLocation();
    const storedata = location.state;

    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);

    const [store, setStore] = useState([]);

    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const [attachment, setAttachment] = useState();
    const img_ref = useRef(null);

    const [form, setForm] = useState({
        title: "", price: "", stock: "", contents: "", image: "", level: "", tag: "", mdfy_date: ""
    })

    const { user_id, title, price, stock, contents, image, level, tag, reg_date, mdfy_date, category } = form;

    const onFileChange = (evt) => {
        // 업로드 된 file
        const files = evt.target.files;
        const theFile = files[0];

        // FileReader 생성
        const reader = new FileReader();

        // file 업로드가 완료되면 실행
        reader.onloadend = (finishedEvent) => {
            // 업로드한 이미지 URL 저장
            const result = finishedEvent.currentTarget.result;
            setAttachment(result);
        };
        // 파일 정보를 읽기
        reader.readAsDataURL(theFile);
    };

    const onChangeContents = (e) => {
        setForm({
            ...form,
            contents: e
        });
    }

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickCancel = () => {
        navi("/store");
    }

    const onClickSave = async (e) => {
        e.preventDefault();
        const storage = getStorage();
        const fileRef = ref(storage, 'recipe/' + uuidv4());

        // 이미지를 firebase storage에 업로드
        const response = await uploadString(fileRef, attachment, 'data_url');

        // 업로드한 이미지 url 가져오기
        const downloadURL = await getDownloadURL(fileRef);
        //console.log(downloadURL)

        if (form.contents === "") {
            alert("내용을 입력해주세요.");
        } else {
            if (window.confirm("저장하시겠습니까?")) {
                const updateForm = {
                    ...form,
                    uid: sessionStorage.getItem("uid"),
                    category: 5,
                    image: downloadURL
                };
                try {
                    // 서버에 업데이트된 form 을 전송
                    const res = await axios.post(`/store/insert`, updateForm);

                    if (res.data === 0) {
                        alert('등록 실패');
                    } else {
                        alert("등록 완료!");
                        navi("/store");
                    }
                } catch (error) {
                    console.error("등록 에러 : ", error);
                    alert("등록 중 오류가 발생했습니다.");
                };
            };
        }
    }

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='mainbanner_section'>
                <img className='banner_img' src="/image/header/Calendar.png" />
            </div>
            <div className='store_wrap'>
                <div className='store_contents'>
                    <div className='store_layout'>

                        <section className='store_img_section'>
                            <div className='store_img'>
                                <form onSubmit={onClickSave}>
                                    <img className='recipe_image' src={attachment} style={{ cursor: 'pointer' }} value={image} onClick={() => img_ref.current.click()} />
                                    <input accept="image/*" type="file" onChange={onFileChange} style={{ display: 'none' }} ref={img_ref} />
                                </form>
                            </div>
                        </section>

                        <div className='store_info_layout'>

                            <section className='store_info_section'>

                                <section className='details_title_section'>
                                    <div className='detail_logo'>Plantee<img src='/image/carelevel_icon.png' /></div>
                                </section>

                                <form className='insert_textarea'>
                                    <div className='insert_title'>
                                        <InputGroup>
                                            <InputGroup.Text className='insert_inputgrouptext'>제목</InputGroup.Text>
                                            <Form.Control name='title' onChange={onChangeForm} placeholder="제목" />
                                        </InputGroup>
                                    </div>
                                    <div className='insert_info'>
                                        <InputGroup className='insert_inputgroup'>
                                            <InputGroup.Text className='insert_inputgrouptext'>가격</InputGroup.Text>
                                            <Form.Control name='price' onChange={onChangeForm} placeholder='*단위:(원)' />
                                        </InputGroup>
                                    </div>

                                    <div className='insert_info'>
                                        <InputGroup className='insert_inputgroup'>
                                            <InputGroup.Text className='insert_inputgrouptext'>재고</InputGroup.Text>
                                            <Form.Control name='stock' onChange={onChangeForm} placeholder='*단위:(개)' />
                                        </InputGroup>
                                    </div>

                                    <CKEditor config={{ placeholder: "내용을 입력하세요.", ckfinder: { uploadUrl: '/store/ckupload' } }}
                                        editor={ClassicEditor}
                                        data=""
                                        onChange={(event, editor) => { onChangeContents(editor.getData()); }}
                                        onReady={(editor) => { }} />

                                </form>

                                <div className='plantinsert_section'>
                                    <div className='plantinsert_btngroup'>
                                        <button className='insert_submit' onClick={onClickSave}>등록하기</button>
                                        <button className='insert_cancel' onClick={onClickCancel}>취소하기</button>
                                    </div>
                                </div>

                            </section>

                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreInsert