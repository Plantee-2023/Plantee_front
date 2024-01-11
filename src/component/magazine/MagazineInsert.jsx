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
        image: ''
    });
    const { contents, title, image } = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const getMagazine = async () => {
        setLoading(true);
        const res = await axios.get(`/magazine/read/` + post_id);
        setMagazine(res.data);
        setLoading(false);
    }

    const onInsert = async (e) => {
        e.preventDefault();
        setBox({
            show: true,
            message: '새로운 매거진을 등록 하시겠습니까?',
            action: async () => {
                const res = await axios.post(`/magazine/insert`); 
                if(res.data === 0){
                    alert('등록 실패!');
                }else{
                    alert('등록 성공!');
                    navi(`/main/magazineList`);
                }
            }
        })
    }
    useEffect(() => {
        getMagazine();
    }, [])
    if (loading) return <div className='text-center'><Spinner size='lg' /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <Card className='insert-card'>
                    <Form.Control onChange={onChange} name='title' placeholder='제목을 입력해주세요.' className='insert-text' />
                    <div className='insert-img'>
                        <img name='image' src='http://via.placeholder.com/150x150' onClick={() => img_ref.current.click()} width={300} height={300} style={{ cursor: 'pointer' }} />
                        <input type='file' ref={img_ref} style={{ display: 'none' }} />
                        <br />
                        <Button className='insert-img-btn'>이미지 등록</Button>
                    </div>
                    <Form.Control name='contents' placeholder='내용을 입력해주세요.' as="textarea" rows={10} className='insert-text' />
                </Card>
                <Button onClick={onInsert} className='insert-btn1 btn-lg'>등록</Button>
                <Button className='insert-btn2 btn-lg'>취소</Button>
            </div>
        </div>
    )
}

export default MagazineInsert