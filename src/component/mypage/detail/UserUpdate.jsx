import React, { useRef, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Card, Form, InputGroup, Button, Spinner } from 'react-bootstrap'
import { BoxContext } from '../../common/BoxContext';
import { useNavigate } from 'react-router-dom';
import ModalPostCode from '../../common/ModalPostCode'
import { ref, getDownloadURL, getStorage, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; //랜덤 식별자를 생성해주는 라이브러리

const UserUpdate = () => {
    const navi = useNavigate();
    const img_ref = useRef(null);
    const [users, setUsers] = useState('');
    const [attachment, setAttachment] = useState();
    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);
    const [user, setUser] = useState({
        nickname: '',
        image: '',
        phone: '',
        address1: '',
        address2: '',
    })

    const { uid, nickname, image, phone, address1, address2 } = user;

    const onFileChange = (e) => {
        // 업로드 된 file
        const files = e.target.files;
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

    const onChange = async(e) => {
        const storage = getStorage();
        const fileRef = ref(storage, 'users/' + uuidv4());

        try {
            // 이미지를 Firebase Storage에 업로드
            await uploadString(fileRef, attachment, 'data_url');

            // 업로드한 이미지 URL 가져오기
            const downloadURL = await getDownloadURL(fileRef);
            console.log(downloadURL);

            // 이미지 URL을 insertDiary에 설정
            setUser({
                ...user,
                [e.target.name]: e.target.value,
                image: downloadURL
            });
            console.log(user);
        } catch (error) {
            console.error("이미지 업로드 중 오류:a", error);
            alert("이미지 업로드 중 오류가 발생했습니다.");
        }

    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const storage = getStorage();
        const fileRef = ref(storage, 'users/' + uuidv4());
        // 이미지를 firebase storage에 업로드
        const response = await uploadString(fileRef, attachment, 'data_url');
        // 업로드한 이미지 url 가져오기
        const downloadURL = await getDownloadURL(fileRef);
        //console.log(downloadURL)
        setBox({
            show: true,
            message: "회원 정보를 수정하시겠습니까?",
            action: async () => {
                try {
                    const res = await axios.post('/users/update', user);
                    console.log(res.data)
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
                        navi(`/`);
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

    const getList = async () => {
        setLoading(true);
        try {
            const res = await axios(`/users/read.json/${sessionStorage.getItem("uid")}`);
            console.log(res.data)
            setUsers(res.data);
            //console.log(users)
        } catch (error) {
            setBox({
                show: true,
                message: `${error.message}`
            })
        }
        setLoading(false);
    }

    useEffect(() => {
        getList();
    }, []);


    if (loading) return <div className='text-center'><Spinner /></div>

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Card className='update-card p-5'>
                    <h1 className='all-title'>정보 수정</h1>
                    <div style={{ marginLeft: "400px", marginTop: "30px", marginBottom: "50px" }}>
                        <img value={image} name="image" src={attachment || 'http://via.placeholder.com/150x150'} onClick={() => img_ref.current.click()} style={{ cursor: 'pointer' }} width={300} height={300} />
                        <input accept='image/jpg' onChange={onFileChange} type='file' ref={img_ref} style={{ display: 'none' }} />
                        <br />
                    </div>
                    <InputGroup className='update-input'>
                        <InputGroup.Text className='update-text'>닉네임</InputGroup.Text>
                        <Form.Control value={nickname} name='nickname' type='text' onChange={onChange} />
                    </InputGroup>
                    <InputGroup className='update-input'>
                        <InputGroup.Text className='update-text'>연락처</InputGroup.Text>
                        <Form.Control value={phone} name='phone' type='text' onChange={onChange} />
                    </InputGroup>
                    <InputGroup className='update-address'>
                        <InputGroup.Text className='update-text'>주소</InputGroup.Text>
                        <Form.Control value={address1} name='address1' type='text' onChange={onChange} />
                        <ModalPostCode user={user} setUser={setUser} />
                    </InputGroup>
                    <Form.Control value={address2} name='address2' className='update-address' type='text' placeholder='상세주소' onChange={onChange} />
                    <Form className='update-check'>
                        <Form.Check label="꽃집 사장님"></Form.Check>
                    </Form>
                    <InputGroup className='update-input'>
                        <InputGroup.Text className='update-text'>사업자 등록증</InputGroup.Text>
                        <Form.Control />
                        <button className='update-btn'>파일 검색</button>
                    </InputGroup>
                </Card>
                <Button className='mt-4 update-btn' type='submit'>정보수정</Button>
            </form>
        </div >
    )
}

export default UserUpdate