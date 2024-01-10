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


const StoreUpdate = ({ match, history }) => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);
    const [form, setForm] = useState("");
    const [img, setImg] = useState('');

    const { store_id } = useParams();
    const [store, setStore] = useState({
        title: "", price: "", stock: "", contents: "", image: "", level: "", tag: "", mdfy_date: "", file: null, text: ""
    })

    const { title, price, stock, contents, image, level, tag, uid, reg_date, mdfy_date, like_cnt, toggle, text } = store;

    const getStore = async () => {
        setLoading(true);
        const res = await axios.get(`/store/read/${store_id}`);
        setForm({
            ...res.data,
            contents: res.data.contents
        });
        //setImg("/upload/plantee/" + res.data.image);
        setLoading(false);
    }

    const onClickSave = () => {
        setForm({ ...form, contents: text })
    }

    const onClickCancel = () => {
        setForm({ ...form, text: contents })
        navi("/store");
    }

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onChangeContents = (e) => {
        setForm({
            ...form,
            contents: e
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm("글 수정을 완료하시겠습니까?")) {
            await axios.post(`/store/update`, form);
            alert("수정완료!");
            navi("/store");
        }
    }


    useEffect(() => { getStore(); }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
        
            <div className='store_wrap'>
                <div className='store_contents'>
                    <div className='store_layout'>
                        <section className='details_info_section'>

                            <section className='details_title_section'>
                                <div className='detail_logo'>Plantee<img src='/image/carelevel_icon.png' /></div>
                            </section>

                            <section className='insert_simpleinfo_section'>
                                <form className='insert_textarea' onSubmit={onSubmit}>
                                    <div className='insert_title'>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text>글제목</InputGroup.Text>
                                            <Form.Control name='title' value={title} onChange={onChange} />
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text>가격</InputGroup.Text>
                                            <Form.Control name='title' value={price} type='number' onChange={onChange} />
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text>재고</InputGroup.Text>
                                            <Form.Control name='title' value={stock} type='number' onChange={onChange} />
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text>난이도</InputGroup.Text>
                                            <Form.Control name='title' value={level} type='number' onChange={onChange} />
                                        </InputGroup>
                                        <InputGroup className='mb-3'>
                                            <InputGroup.Text>태그</InputGroup.Text>
                                            <Form.Control name='title' value={tag} onChange={onChange} />
                                        </InputGroup>
                                    </div>

                                    <CKEditor config={{ ckfinder: { uploadUrl: '/store/ckupload' } }}
                                        editor={ClassicEditor}
                                        data=""
                                        onChange={(event, editor) => { onChangeContents(editor.getData()); }}
                                        onReady={(editor) => { }} />

                                    {/* <StoreEditor form={form} setForm={setForm}  /> */}
                                    <div className='plantinsert_section'>
                                        <div className='plantinsert_btngroup'>
                                            <button className='insert_submit' onClick={onClickSave}>등록하기</button>
                                            <button className='insert_cancel' onClick={onClickCancel}>취소하기</button>
                                        </div>
                                    </div>
                                </form>


                            </section>

                        </section>

                    </div>
                </div>
            </div>

        </>
    )
}

export default StoreUpdate