import React, { useEffect, useState, useContext, useRef } from 'react'
import axios from 'axios'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { BoxContext } from '../common/BoxContext';
import { Spinner, Card, Form, Button } from 'react-bootstrap'

const MagazineUpdate = () => {
    const { box, setBox } = useContext(BoxContext);
    const img_ref = useRef(null);
    const { post_id } = useParams();
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState({
        title: '',
        image: '',
        contents: '',
        file: null,
        uid: ''
    })
    const { title, image, contents, file, uid } = update;

    const onChange = (e) => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        //수정하기
        const res = await axios.post('/magazine/update', update);
        if (res.data === 0) {
            setBox({
                show: true,
                message: "수정을 실패하였습니다."
            })
        } else {
            setBox({
                show: true,
                message: "수정에 성공하였습니다."
            })
            navi(`/magazine/read/${post_id}`);
        }
    }

    const onUpdate = async (e) => {
        e.preventDefault();
        if (window.confirm("정보를 수정 하시겠습니까?")) {
            const res = await axios.post('/magazine/update', update);
            if (res.data == 0) {
                setBox({
                    show:true,
                    message:"수정에 실패했습니다."
                }) 
            } else {
                setBox({
                    show:true,
                    message:"수정에 성공했습니다."
                })
                navi(`/magazine/read/${post_id}`);
            }
        }
    }
    const onUpdatePhoto = async () => {
        if (!file) {
            setBox({
                show: true,
                message: "사진을 선택해주세요."
            })
        } else {
            setBox({
                show: true,
                message: "사진을 저장하시겠습니까?",
                action: async () => {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("uid", uid);
                    await axios.post('/users/update/photo', formData);
                }
            })
        }
    }

    const getUpdate = async () => {
        setLoading(true);
        const res = await axios.get(`/magazine/read/${post_id}`);
        setUpdate(res.data);
        setLoading(false);
    }
    useEffect(() => {
        getUpdate();
    }, [])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <h1 className='text-center mt-3 mb-3'>[{post_id}] 정보수정</h1>
                <Card className='insert-card'>
                    <Form.Control onChange={onChange} value={title} name='title' placeholder='제목을 입력해주세요.' className='insert-text' />
                    <div className='insert-img'>
                        <img name='image' src='http://via.placeholder.com/150x150' onClick={() => img_ref.current.click()} width={300} height={300} style={{ cursor: 'pointer' }} />
                        <input type='file' ref={img_ref} style={{ display: 'none' }} />
                        <br />
                        <Button onClick={onUpdatePhoto} className='insert-img-btn'>이미지 등록</Button>
                    </div>
                    <Form.Control onChange={onChange} value={contents} name='contents' placeholder='내용을 입력해주세요.' as="textarea" rows={10} className='insert-text' />
                </Card>
                <Button onClick={onUpdate} className='insert-btn1 btn-lg'>등록</Button>
                <Button type='reset' className='insert-btn2 btn-lg'>취소</Button>
            </div>
        </div>
    )
}

export default MagazineUpdate