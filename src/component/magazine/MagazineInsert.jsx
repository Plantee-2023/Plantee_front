import axios from 'axios'
import React, { useRef, useState, useContext } from 'react'
import { Button, Card, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { BoxContext } from '../common/BoxContext'
import { ref, getDownloadURL, getStorage, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; //랜덤 식별자를 생성해주는 라이브러리


const MagazineInsert = () => {
    const [attachment, setAttachment] = useState();
    const { setBox } = useContext(BoxContext);
    const img_ref = useRef(null);
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        contents: '',
        title: '',
        image: '',
        uid: 'admin',
        magazine_num: ''
    });
    const { contents, title, image, uid, magazine_num } = form;


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

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const storage = getStorage();
        const fileRef = ref(storage, 'magaznie/' + uuidv4());

        // 이미지를 firebase storage에 업로드
        const response = await uploadString(fileRef, attachment, 'data_url');

        // 업로드한 이미지 url 가져오기
        const downloadURL = await getDownloadURL(fileRef);
        //console.log(downloadURL)

        setBox({
            show: true,
            message: "매거진을 등록하시겠습니까?",
            action: async () => {
                try {
                    // 서버에 업데이트된 form을 전송
                    const data = { ...form, image: downloadURL, user_id: 1, category: 7, nickname: 'admin' }
                    const res = await axios.post(`/magazine/insert`, data);
                    if (res.data === 0) {
                        setBox({
                            show: true,
                            message: "등록을 실패하였습니다."
                        })
                    } else {
                        setBox({
                            show: true,
                            message: "등록이 완료되었습니다."
                        })
                        navi('/magazine/magazineList');
                    }
                } catch (error) {
                    console.error("등록 에러 : ", error);
                    setBox({
                        show: true,
                        message: "등록중 오류가 발생하였습니다."
                    })
                }
            }
        })
    }
    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <form onSubmit={onSubmit} className='insert-img'>
                    <Card className='insert-card'>
                        <Form.Control onChange={onChange} name='magazine_num' placeholder='번호' className='insert-text' style={{ width: 100 }} />
                        <Form.Control onChange={onChange} name='title' placeholder='제목을 입력해주세요.' className='insert-text' />
                        <div className='insert-img'>
                            <img value={image} name='image' src={attachment || 'http://via.placeholder.com/150x150'} onClick={() => img_ref.current.click()} width={300} height={300} style={{ cursor: 'pointer' }} />
                            <input onChange={onFileChange} type='file' ref={img_ref} style={{ display: 'none' }} />
                            <br />
                        </div>
                        <Form.Control onChange={onChange} name='contents' placeholder='내용을 입력해주세요.' as="textarea" rows={10} className='insert-text' />
                    </Card>
                    <Button type='submit' className='insert-btn1 btn-lg'>등록</Button>
                </form>
            </div>
        </div >
    )
}

export default MagazineInsert