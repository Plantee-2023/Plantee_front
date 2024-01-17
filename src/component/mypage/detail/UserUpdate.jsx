import React, { useRef, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Card, Form, InputGroup, Button, Spinner } from 'react-bootstrap'
import { BoxContext } from '../../common/BoxContext';
import { useNavigate } from 'react-router-dom';

const UserUpdate = () => {
    const navi = useNavigate();
    const img_ref = useRef(null);
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);
    const [user, setUser] = useState({
        nickname: '',
        image: '',
        phone: '',
        address1: '',
        address2: '',
    })

    const { uid ,nickname, image, phone, address1, address2 } = user;

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
        //console.log(user);
    }

    const onSubmit = () => {
        setBox({
            show: true,
            message: "회원 정보를 수정하시겠습니까?",
            action: async () => {
                const res = await axios.post('/users/update', user);
                //console.log(res)
                if (res.data === 0) {
                    alert("수정 실패!");
                } else {
                    alert("수정 완료");
                    //navi('/');
                    console.log(users)
                    console.log(user)
                }
            }
        });
    }

    const getList = async () => {
        setLoading(true);
        const res = await axios.get(`/users/read.json/${sessionStorage.getItem("uid")}`);
        //console.log(res.data)
        setUsers(res.data);
        //console.log(users)
        setLoading(false);
    }

    useEffect(() => {
        getList();
    }, []);


    if (loading) return <div className='text-center'><Spinner /></div>

    return (
        <div>
            <Card className='update-card p-5'>
                <h1 className='all-title'>정보 수정</h1>
                <div className='update_img'>
                    <img src='http://via.placeholder.com/150x150' onClick={() => img_ref.current.click()} style={{ cursor: 'pointer' }} width={300} height={300} />
                    <input type='file' ref={img_ref} style={{ display: 'none' }} />
                    <br />
                    <Button className='update-img-btn'>이미지 수정</Button>
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
                    <button className='update-btn'>검색</button>
                </InputGroup>
                <Form.Control value={address2} name='address2' className='join-input' type='text' placeholder='상세주소' onChange={onChange} />
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
                <Button className='mt-4 update-btn' onClick={() => onSubmit()}>정보수정</Button>
                <Button className='mt-4 ms-3 update-btn' type='reset'>취소</Button>

            </div>
        </div>
    )
}

export default UserUpdate