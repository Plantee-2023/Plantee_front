import axios from 'axios';
import React, { useEffect, useState, useContext, useRef } from 'react'
import { useParams, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { Spinner, InputGroup, Form } from 'react-bootstrap';
import { BoxContext } from '../common/BoxContext';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { app } from '../../firebaseInit'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import "./Store.css";

const StoreUpdate = ({ match, history }) => {
    const navi = useNavigate();

    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);

    const db = getStorage(app);
    const ref_file = useRef(null);
    const [src, setSrc] = useState("http://via.placeholder.com/200x200")
    const [file, setFile] = useState(null);

    const [img, setImg] = useState('');
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
            [e.target.name]: e.target.value
        });
    }

    const onChangeContents = (e) => {
        setForm({
            ...form,
            contents: e
        });
    }

    const onChangeFile = (e) => {
        // setSrc(URL.createObjectURL(e.target.files[0]));
        // setFile(e.target.files[0]);

        setForm({
            ...form,
            image: URL.createObjectURL(e.target.files[0])
        });
    }

    const onSaveImage = async () => {
        if (!file) {
            alert("변경할 이미지 선택하세요.");
        } else {
            if (window.confirm("썸네일을 변경하시겠습니까?")) {
                //이미지저장 url호출
                const formData = new FormData();
                formData.append("file", file);
                formData.append("store_id", store_id);
                await axios.post("/store/ckupload", formData);
                alert("변경완료!");
                getStore();
                setSrc('http://via.placeholder.com/200x200');
                setFile(null);
            }
        }
    }

    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     if (window.confirm("글 수정을 완료하시겠습니까?")) {
    //         await axios.post(`/store/update`, form);
    //         alert("글 수정이 완료되었습니다.");
    //         navi(`/store/read/${store_id}`);
    //     }
    // }

    const onClickSave = async (e) => {
        e.preventDefault();
        if (window.confirm("글 수정을 완료하시겠습니까?")) {
            await axios.post(`/store/update`, form);
            alert("글 수정이 완료되었습니다.");
            navi(`/store/read/${store_id}`);
        }
    }

    const onClickCancel = () => {
        setBox({ show: true, message: "글 수정을 취소하시겠습니까?", action: async () => { navi("/store"); } })
    }


    useEffect(() => { getStore(); }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>

            <div className='store_wrap'>
                <div className='store_contents'>
                    <div className='store_layout'>

                        <section className='store_img_section'>
                            <div className='store_img'>
                                <img onClick={() => ref_file.current.click()}
                                    src={src} style={{ cursor: "pointer" }} />
                                <input ref={ref_file} type='file' onClick={onChangeFile} style={{ display: 'none' }} />
                                <button className='my-5 w-100' onClick={onSaveImage}>이미지 저장</button>
                            </div>
                        </section>


                        <div className='store_info_layout'>
                            <section className='store_info_section'>
                                <section className='details_title_section'>
                                    <div className='detail_logo'>Plantee<img src='/image/carelevel_icon.png' /></div>
                                </section>
                                <form className='insert_textarea'>
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


                                </form>
                            </section>

                            <CKEditor
                                config={{ ckfinder: { uploadUrl: '/store/ckupload' } }}
                                editor={ClassicEditor}
                                data={contents}
                                onChange={(event, editor) => { onChangeContents(editor.getData()); }}
                                onReady={(editor) => { }} />

                            <div className='plantinsert_section'>
                                <div className='plantinsert_btngroup'>
                                    <button className='insert_submit' onClick={onClickSave}>등록하기</button>
                                    <button className='insert_cancel' onClick={onClickCancel}>취소하기</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default StoreUpdate