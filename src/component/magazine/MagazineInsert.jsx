import axios from 'axios'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { Button, Card, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { BoxContext } from '../common/BoxContext'
import { app } from '../../firebaseConfig'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'


const MagazineInsert = () => {
    const db = getFirestore(app);
    const storage = getStorage(app);
    const [file, setFile] = useState(null);
    const [filename, setFileName] = useState('https:via.placeholder.com/200x200');

    const { setBox } = useContext(BoxContext);
    const img_ref = useRef(null);
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        contents: '',
        title: '',
        image: '',
        uid: 'admin',
        magazine_num : ''
    });
    const { contents, title, image, uid, magazine_num } = form;

    const onUpdate = async () => {
        if (!window.confirm('사진을 등록하시겠습니까?')) return;
        try {
            if (file) {
                const snapshot = await uploadBytes(ref(storage, `/magazine/${Date.now()}.jpg`), file);
                const url = await getDownloadURL(snapshot.ref);
                await setDoc(doc(db, 'user', uid), { ...form, image: url });
            } else {
                await setDoc(doc(db, 'user', uid), { ...form });
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const onChangeFile = (e) => {
        setFileName(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const getMagazine = async () => {
        setLoading(true);
        try {
            const result = await getDoc(doc(db, 'user', uid));
            setForm(result.data());
            setFileName(result.data().image ? result.data().image : 'https:via.placeholder.com/200x200');
            setLoading(false);
        } catch (error) {
            alert(error.message);
        }
    }

    

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
                const data = { ...form, user_id: 1, category: 7, nickname: 'admin' }
                const res = await axios.post(`/magazine/insert`, data);
                if (res.data === 0) {
                    setBox({
                        show: true,
                        message: "등록을 실패 하였습니다."
                    });
                } else {
                    setBox({
                        show: true,
                        message: "매거진이 등록 되었습니다."
                    });
                    navi(`/magazine/magazineList`);
                }
            }
        })
    }

    useEffect(() => {
        getMagazine();
    }, [])

    // const onChangeFile = (e) => {
    //     setForm({
    //         ...form,
    //         image: URL.createObjectURL(e.target.files[0]),
    //         file: e.target.files[0]
    //     })
    // }
    // const onUpdatePhoto = async () => {
    //     if (!file) {
    //         setBox({
    //             show: true,
    //             message: "사진을 선택해주세요."
    //         })
    //     } else {
    //         setBox({
    //             show: true,
    //             message: "사진을 저장하시겠습니까?",
    //             action: async () => {
    //                 const formData = new FormData();
    //                 formData.append("file", file);
    //                 formData.append("uid", uid);
    //                 await axios.post(`/magazine/image`, formData);
    //                 alert("사진 등록!")
    //             }
    //         })
    //     }
    // }
    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <Card className='insert-card'>
                    <Form.Control onChange={onChange} name='magazine_num' placeholder='번호' className='insert-text' style={{width:100}} />
                    <Form.Control onChange={onChange} name='title' placeholder='제목을 입력해주세요.' className='insert-text' />
                    <form encType='multipart/form-data' className='insert-img'>
                        <img name='image' src={filename || 'http://via.placeholder.com/150x150'} onClick={() => img_ref.current.click()} width={300} height={300} style={{ cursor: 'pointer' }} />
                        <input onChange={onChangeFile} type='file' ref={img_ref} style={{ display: 'none' }} />
                        <br />
                        <Button onClick={onUpdate} className='insert-img-btn'>이미지 등록</Button>
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