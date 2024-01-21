import axios from 'axios';
import React, { useEffect, useState, useContext, useRef } from 'react'
import { useParams, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { Spinner, InputGroup, Form } from 'react-bootstrap';
import { BoxContext } from '../common/BoxContext';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Store.css";
import { ref, getDownloadURL, uploadBytes, getStorage, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; //랜덤 식별자를 생성해주는 라이브러리

const StoreUpdate = ({ match, history }) => {
    const navi = useNavigate();

    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);

    const img_ref = useRef(null);
    const [attachment, setAttachment] = useState();
    const [form, setForm] = useState("");

    const { store_id } = useParams();
    const { title, price, stock, contents, image, level, tag, uid, reg_date, mdfy_date, like_cnt } = form;

    const getStore = async () => {
        setLoading(true);
        const res = await axios.get(`/store/read/${store_id}`);
        setForm(res.data)
        setLoading(false);
    }

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const onChangeContents = (e) => {
        setForm({
            ...form,
            contents: e
        });
    }

    const onChangeFile = (e) => {
        // 업로드 된 file
        const files = e.target.files;
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
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const storage = getStorage();
        const fileRef = ref(storage, 'store/' + uuidv4());

        // 이미지를 firebase storage에 업로드
        const response = await uploadString(fileRef, attachment, 'data_url');

        // 업로드한 이미지 url 가져오기
        const downloadURL = await getDownloadURL(fileRef);
        //console.log(downloadURL)

        if (window.confirm("글 수정을 완료하시겠습니까?")) {
            //이미지저장 url호출
            const updateForm = {
                ...form,
                store_id,
                image: downloadURL
            };

            try {
                const res = await axios.post(`/store/update`, updateForm);

                if (res.data === 0) {
                    alert("글 수정이 실패하였습니다.");
                } else {
                    alert("글 수정이 완료되었습니다.");
                    navi(`/store/read/${store_id}`)
                }
            } catch (error) {
                console.error("등록 에러 : ", error);
                alert("등록 중 오류가 발생했습니다.");
            }
        }
    }


    // const onClickSave = async (e) => {
    //     e.preventDefault();
    //     if (window.confirm("글 수정을 완료하시겠습니까?")) {
    //         await axios.post(`/store/update`, form);
    //         alert("글 수정이 완료되었습니다.");
    //         navi(`/store/read/${store_id}`);
    //     }
    // }

    const onClickCancel = () => {
        setBox({ show: true, message: "글 수정을 취소하시겠습니까?", action: async () => { navi("/store"); } })
    }


    useEffect(() => { getStore(); }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='mainbanner_section'>
                <img className='banner_img' src="/image/header/Store.png" />
            </div>
            <div className='store_wrap'>
                <div className='store_contents'>
                    <div className='store_layout'>
                        <section className='store_img_section'>
                            <form className='store_img' onSubmit={onSubmit}>
                                <img src={attachment || image} style={{ cursor: 'pointer' }} value={image} onClick={() => img_ref.current.click()} />
                                <input accept="image/*" type="file" onChange={onChangeFile} style={{ display: 'none' }} ref={img_ref} />
                            </form>
                        </section>


                        <div className='store_info_layout'>
                            <section className='store_info_section'>
                                <section className='details_title_section'>
                                    <div className='detail_logo'>Plantee<img src='/image/carelevel_icon.png' /></div>
                                </section>
                                <form className='insert_textarea' onSubmit={onSubmit}>
                                    <div className='insert_title'>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text>상품번호</InputGroup.Text>
                                            <Form.Control name='store_id' value={store_id} readOnly />
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text>글제목</InputGroup.Text>
                                            <Form.Control name='title' value={title} onChange={onChange} />
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text>가격</InputGroup.Text>
                                            <Form.Control name='price' value={price} type='number' onChange={onChange} />
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text>재고</InputGroup.Text>
                                            <Form.Control name='stock' value={stock} type='number' onChange={onChange} />
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text>난이도</InputGroup.Text>
                                            <Form.Control name='level' value={level} type='number' onChange={onChange} />
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text>태그</InputGroup.Text>
                                            <Form.Control name='tag' value={tag} onChange={onChange} />
                                        </InputGroup>
                                    </div>

                                    <CKEditor
                                        config={{ ckfinder: { uploadUrl: '/store/ckupload' } }}
                                        editor={ClassicEditor}
                                        data={contents}
                                        onChange={(event, editor) => { onChangeContents(editor.getData()); }}
                                        onReady={(editor) => { }} />

                                    <div className='plantinsert_section'>
                                        <div className='plantinsert_btngroup'>
                                            <button className='insert_submit' type='submit'>수정</button>
                                            <button className='insert_cancel' onClick={onClickCancel}>취소</button>
                                        </div>
                                    </div>
                                </form>
                            </section>


                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}


export default StoreUpdate