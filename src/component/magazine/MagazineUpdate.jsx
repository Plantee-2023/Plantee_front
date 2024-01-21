import React, { useEffect, useState, useContext, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { BoxContext } from '../common/BoxContext';
import { Spinner, Card, Form, Button } from 'react-bootstrap'
import { ref, getDownloadURL, uploadBytes, getStorage, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; //랜덤 식별자를 생성해주는 라이브러리



const MagazineUpdate = () => {
    const [attachment, setAttachment] = useState();
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

    const onFileChange = (evt) => {
        // 업로드 된 file
        const files = evt.target.files;
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
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const storage = getStorage();
        const fileRef = ref(storage, 'magazine/' + uuidv4());

        // 이미지를 firebase storage에 업로드
        const response = await uploadString(fileRef, attachment, 'data_url');

        // 업로드한 이미지 url 가져오기
        const downloadURL = await getDownloadURL(fileRef);
        //console.log(downloadURL)

        setBox({
            show: true,
            message: "매거진을 수정 하시겠습니까?",
            action: async () => {
                try {
                    const data = { ...update, image: downloadURL, user_id: 1, category: 7, nickname: 'admin' }
                    const res = await axios.post('/magazine/update', data);
                    if (res.data === 0) {
                        setBox({
                            show: true,
                            message: "수정을 실패하였습니다."
                        })
                    } else {
                        setBox({
                            show: true,
                            message: "수정이 완료되었습니다."
                        })
                        navi(`/magazine/read/${magazine_num}`);
                    }
                } catch (error) {
                    console.error("등록 에러 : ", error);
                    setBox({
                        show: true,
                        message: "수정 중 오류가 발생하였습니다."
                    })
                }
            }
        })
    }

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            <div className='mainbanner_section'>
                <img className='banner_img' src="/image/header/Magazine.png" />
            </div>
            <div id="main_wrap">
                <div className="main_contents">
                    <form onSubmit={onSubmit} className='insert-img'>
                        <h1 className='text-center mt-3 mb-3'>[{magazine_num}] 정보수정</h1>
                        <Card className='insert-card'>
                            <Form.Control onChange={onChange} value={title} name='title' placeholder='제목을 입력해주세요.' className='insert-text' />
                            <div className='insert-img'>
                                <img value={image} name='image' className='image' src={attachment || 'http://via.placeholder.com/150x150'} onClick={() => img_ref.current.click()} width={300} height={300} style={{ cursor: 'pointer' }} />
                                <input accept='image/jpg' type='file' onChange={onFileChange} ref={img_ref} style={{ display: 'none' }} />
                            </div>
                            <Form.Control onChange={onChange} value={contents} name='contents' placeholder='내용을 입력해주세요.' as="textarea" rows={10} className='insert-text' />
                        </Card>
                        <Button type='submit' className='insert-btn1 btn-lg'>등록</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MagazineUpdate