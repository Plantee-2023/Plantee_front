import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { Spinner, InputGroup, Form } from 'react-bootstrap';
import { BoxContext } from '../common/BoxContext';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Store.css";


const StoreUpdate = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);

    const { store_id } = useParams();
    const [store, setStore] = useState({
        store_id: "", title: "", price: "", stock: "",
        contents: "", image: "", level: "", tag: "",
        reg_date: "", mdfy_date: "", nickname: "", like_cnt: "", plant_id: "", recipe_id: "", post_id: ""
    })

    const { title, price, stock, contents, image, level, tag, uid, reg_date, mdfy_date, like_cnt } = store;

    const getStore = async () => {
        setLoading(true);
        const res = await axios.get(`/store/read/${store_id}`);
        setStore(res.data);
        setLoading(false);
    }

    useEffect(() => { getStore(); }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='store_wrap'>
                <div className='store_contents'>
                    <div className='store_layout'>

                        <h3 className='mb-3'>🌱 글 수정</h3>
                        <form className='update_form'>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>글제목</InputGroup.Text>
                                <Form.Control value={title} />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>가격</InputGroup.Text>
                                <Form.Control value={price} type='number' />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>재고</InputGroup.Text>
                                <Form.Control value={stock} type='number' />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>난이도</InputGroup.Text>
                                <Form.Control value={level} type='number' />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text>태그</InputGroup.Text>
                                <Form.Control value={tag} />
                            </InputGroup>

                            <div>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={contents}
                                    onInit={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log(data);
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div>

                        </form>

                        <div className='mt-4'>
                            <button className='store_filterbtn_clear me-3'>취소</button>
                            <button className='store_filterbtn_clicked'>저장</button>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreUpdate