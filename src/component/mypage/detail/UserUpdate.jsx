import React, { useRef, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Card, Form, InputGroup, Button, Spinner } from 'react-bootstrap'
import '../MyPage.css'
import { BoxContext } from '../../common/BoxContext';
import { useNavigate } from 'react-router-dom';
import ModalPostCode from '../../common/ModalPostCode';

const UserUpdate = () => {
    const navi = useNavigate();
    const { box, setBox } = useContext(BoxContext);
    const img_ref = useRef(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        nickname: '',
        photo: '',
        phone: '',
        address1: '',
        address2: '',
        reg_date: '',
        file:null,
        uid:'',
        post_id:''
    })

    const { nickname, image, phone, address1, address2, reg_date, file, uid, post_id } = user;
    const getList = async () => {
        setLoading(true);
        const res = await axios.get(`/users/read.json/${sessionStorage.getItem("uid")}`);
        console.log(res.data)
        setUsers(res.data.list);
        setLoading(false);
    }
    useEffect(() => {
        getList();
    }, []);

    const onFileChange = (e) => {
        setUsers({
            ...user,
            image: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        });
    }

    const onChange = (e) => {
        setUsers({
            ...user,
            [e.target.name]: e.target.value
        });
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
                    await axios.post('/users/upload', formData);
                    setBox({
                        show: true,
                        message: "사진이 저장되었습니다."
                    })
                }
            })
        }
    }

    const onUpdate = async (e) => {
        e.preventDefault();
        setBox({
            show: true,
            message: "수정 하시겠습니까?",
            action: async() => {
                const res = await axios.post('/users/update', user);
                if (res.data == 0) {
                    setBox({
                        show: true,
                        message: "수정에 성공했습니다."
                    })
                    navi(`/`);
                } else {
                    setBox({
                        show: true,
                        message: "수정에 실패했습니다."
                    })
                }
            }
        })
    }
    if (loading) return <div className='text-center'><Spinner /></div>

    return (
        <div>
            <Card className='update-card p-5'>
                <h1 className='all-title'>정보 수정</h1>
                <div className='update_img'>
                    <img name="image" src={image || 'http://via.placeholder.com/150x150'} onClick={() => img_ref.current.click()} style={{ cursor: 'pointer' }} width={300} height={300} />
                    <input onChange={onFileChange} type='file' ref={img_ref} style={{ display: 'none' }} />
                    <br />
                    <Button className='update-img-btn' onClick={onUpdatePhoto}>이미지 수정</Button>
                </div>
                <InputGroup className='update-input'>
                    <InputGroup.Text className='update-text'>닉네임</InputGroup.Text>
                    <Form.Control onChange={onChange} value={nickname} name='nickname' type='text' />
                </InputGroup>
                <InputGroup className='update-input'>
                    <InputGroup.Text className='update-text'>연락처</InputGroup.Text>
                    <Form.Control onChange={onChange} value={phone} name='phone' type='text' />
                </InputGroup>
                <InputGroup className='update-address'>
                    <InputGroup.Text className='update-text'>주소</InputGroup.Text>
                    <Form.Control value={address1} name='address1' type='text' />
                    <ModalPostCode onChange={onChange} user={user} setUser={setUser} />
                </InputGroup>
                <Form.Control onChange={onChange} value={address2} name='address2' className='join-input' type='text' placeholder='상세주소' />
                <Form className='update-check'>
                    <Form.Check label="꽃집 사장님"></Form.Check>
                </Form>
                <InputGroup className='update-input'>
                    <InputGroup.Text className='update-text'>사업자 등록증</InputGroup.Text>
                    <Form.Control />
                    <button className='update-btn'>파일 검색</button>
                </InputGroup>
            </Card>
            <div className='text-center'>
                <button className='mt-4 update-btn' onClick={onUpdate}>정보수정</button>
            </div>
        </div>
    )
}

export default UserUpdate