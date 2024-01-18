import React, { useEffect, useState, useContext, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { BoxContext } from '../common/BoxContext';
import { Spinner, Card, Form, Button } from 'react-bootstrap'
import { app } from '../../firebaseConfig'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'



const MagazineUpdate = () => {
    const db = getFirestore(app);
    const storage = getStorage(app);
    const [file, setFile] = useState(null);
    const [filename, setFileName] = useState('https:via.placeholder.com/200x200');

    const { setBox } = useContext(BoxContext);
    const img_ref = useRef(null);
    const { magazine_num } = useParams();
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState({
        title: '',
        image: '',
        contents: '',
        uid: 'admin',
    })
    const { title, image, contents, uid } = update;

    const getUpdate = async () => {
        setLoading(true);
        const res = await axios.get(`/magazine/read/${magazine_num}`);
        setUpdate(res.data);
        setLoading(false);
    }
    useEffect(() => {
        getUpdate();
    }, [])

    const onChange = (e) => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        });
    }

    const onChangeFile = (e) => {
        setFileName(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    // const onFileChange = (e) => {
    //     setUpdate({
    //         ...update,
    //         image: URL.createObjectURL(e.target.files[0]),
    //         file: e.target.files[0]
    //     });
    // }

    const onUpdateImage = async () => {
        if (!window.confirm('사진을 등록하시겠습니까?')) return;
        try {
            if (file) {
                const snapshot = await uploadBytes(ref(storage, `/magazine/${Date.now()}.jpg`), file);
                const url = await getDownloadURL(snapshot.ref);
                await setDoc(doc(db, 'user', uid), { ...update, image: url });
            } else {
                await setDoc(doc(db, 'user', uid), { ...update });
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const onUpdate = async (e) => {
        e.preventDefault();
        setBox({
            show: true,
            message: "수정 하시겠습니까?",
            action: async () => {
                const result = await getDoc(doc(db, 'user', uid)); 
                setUpdate(result.data()); 
                setFileName(result.data().photo ? result.data().photo : 'https://via.placeholder.com/200x200');
                const data = { ...update, user_id: 1, category: 7, nickname: 'admin'}
                const res = await axios.post('/magazine/update', data);
                if (res.data === 0) {
                    setBox({
                        show: true,
                        message: "수정에 실패했습니다."
                    })
                } else {
                    setBox({
                        show: true,
                        message: "수정에 성공했습니다."
                    })
                    navi(`/magazine/read/${magazine_num}`);
                }
            }

        })
    }
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
    //                 await axios.post('/magazine/image', formData);
    //                 setBox({
    //                     show: true,
    //                     message: "사진이 저장되었습니다."
    //                 })
    //             }
    //         })
    //     }
    // }

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <h1 className='text-center mt-3 mb-3'>[{magazine_num}] 정보수정</h1>
                <Card className='insert-card'>
                    <Form.Control onChange={onChange} value={title} name='title' placeholder='제목을 입력해주세요.' className='insert-text' />
                    <form encType='multipart/form-data' method='post' className='insert-img'>
                        <img name='image' className='image' src={filename || 'http://via.placeholder.com/150x150'} onClick={() => img_ref.current.click()} width={300} height={300} style={{ cursor: 'pointer' }} />
                        <input accept='image/jpg' type='file' onChange={onChangeFile} ref={img_ref} style={{ display: 'none' }} />
                        <br />
                        <Button onClick={onUpdateImage} className='insert-img-btn'>이미지 등록</Button>
                    </form>
                    <Form.Control onChange={onChange} value={contents} name='contents' placeholder='내용을 입력해주세요.' as="textarea" rows={10} className='insert-text' />
                </Card>
                <Button onClick={onUpdate} className='insert-btn1 btn-lg'>등록</Button>
                <Button onClick={() => getUpdate()} type='reset' className='insert-btn2 btn-lg'>취소</Button>
            </div>
        </div>
    )
}

export default MagazineUpdate