import axios from 'axios'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { Button, Card, Form, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { BoxContext } from '../common/BoxContext'

const MagazineInsert = () => {
    const { box, setBox } = useContext(BoxContext);
    const post_id = useParams();
    const img_ref = useRef(null);
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [magazine, setMagazine] = useState([]);
    const [form, setForm] = useState({
        contents: '',
        title: '',
        image: '',
        category:7,
        user_id:1,
        nickname:'admin',
        file:null,
        uid:'admin'
    });
    const {contents, title, image, category, user_id, nickname, file, uid} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const onInsert = async () => {
        setBox({
            show: true,
            message: '새로운 매거진을 등록 하시겠습니까?',
            action: async () => {
                const data = {...form}
                const res = await axios.post(`/magazine/insert`,data); 
                if(res.data === 0){
                    setBox({
                        show: true,
                        message: "등록을 실패 하였습니다."
                    });
                }else{
                    setBox({
                        show: true,
                        message: "매거진이 등록 되었습니다."
                    });
                    navi(`/magazine/magazineList`);
                }
            }
        })
    }
    
    const onChangeFile = (e) => {
        setForm({
            ...form,
            image: URL.createObjectURL(e.target.files[0]),
            file:e.target.files[0]
        })
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
                    await axios.post(`/magazine/image`, formData);
                    alert("사진 등록!")
                }
            })
        }
    }
    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <Card className='insert-card'>
                    <Form.Control onChange={onChange} name='title' placeholder='제목을 입력해주세요.' className='insert-text'/>
                    <form encType='multipart/form-data' className='insert-img'>
                        <img name='image' src={image ||'http://via.placeholder.com/150x150'} onClick={() => img_ref.current.click()} width={300} height={300} style={{ cursor: 'pointer' }} />
                        <input  onChange={onChangeFile} type='file' ref={img_ref} style={{ display: 'none' }}/>
                        <br />
                        <Button onClick={onUpdatePhoto} className='insert-img-btn'>이미지 등록</Button>
                    </form>
                    <Form.Control onChange={onChange} name='contents' placeholder='내용을 입력해주세요.' as="textarea" rows={10} className='insert-text' />
                </Card>
                <Button onClick={onInsert} className='insert-btn1 btn-lg'>등록</Button>
                <Button type='reset' className='insert-btn2 btn-lg'>취소</Button>
            </div>
        </div>
    )
}

export default MagazineInsert