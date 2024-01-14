import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { Spinner, InputGroup, Form } from 'react-bootstrap';
import { BoxContext } from '../common/BoxContext';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { app } from '../../firebaseInit'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import "./Store.css";
import Parser from 'html-react-parser';

const StoreInsert = () => {
    const navi = useNavigate();
    const location = useLocation();
    const storedata = location.state;

    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);

    const [store, setStore] = useState([]);

    const db = getStorage(app);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "", price: "", stock: "", contents: "", image: "", level: "", tag: "", mdfy_date: ""
    })

    const { user_id, title, price, stock, contents, image, level, tag, reg_date, mdfy_date, category } = form;

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

    const onClickSave = async () => {
        if (form.contents === "") {
            alert("내용을 입력해주세요.");
        } else {
            if (window.confirm("저장하시겠습니까?")) {
                const data = { ...form, uid: sessionStorage.getItem("uid"), category: 5 };
                await axios.post("/store/insert", data);
                navi("/store");
            }
        }
    }

    const onClickCancel = () => {
        navi("/store");
    }

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>
                    <div className='store_layout'>

                        <section className='store_img_section'>
                            <div className='store_img'>
                                <img src='/image/plant01.jpg' />
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