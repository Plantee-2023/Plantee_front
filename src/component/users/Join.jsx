import React, { useRef, useState, useEffect, useContext } from 'react'
import { Button, Card, Form, InputGroup, Spinner } from 'react-bootstrap'
import { BoxContext } from '../common/BoxContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../Main.css'

const Join = () => {
    const img_ref = useRef(null);
    const img1_ref = useRef(null);
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);

    const [user, setUser] = useState({
        uid: '', upass: '', uname: '', image: '', nickname: '', phone: '', address1: '', address2: '', seller_yn: ''
    });

    const { uid, upass, uname, phone, address1, address2, image, seller_yn, nickname } = user;


    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
            seller_yn: e.target.checked ? 'y' : 'n',
        });
    }

    const onSubmit = async () => {
        if(user.uname===""){
            alert("이름을 입력하세요")
        }else if(user.uid===""){
            alert("아이디를 입력하세요")
        }else if(user.upass===""){
            alert("비밀번호를 입력하세요")
        }else if (user.upass !== user['upass-check']) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }else if(user.phone===""){
            alert("연락처를 입력하세요")
        } else {
            setLoading(true);
            setBox({
                show: true,
                message: "회원 가입하시겠습니까?",
                action: async () => {
                    const res = await axios.post(`/users/insert`, user);
                    console.log(user)
                    if (res.data === 0) {
                        alert("등록 실패!");
                    } else {
                        alert("등록 완료");
                        navi('/');
                    }
                }
            });
            setLoading(false);
        }
    }

    if (loading) return <div className='text-center'><Spinner /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <div className='join-title'>회원가입</div>
                <Card className='join-card'>
                    <div className='join-img'>
                        <img src='http://via.placeholder.com/150x150' onClick={() => img_ref.current.click()} width={300} height={300} style={{ cursor: 'pointer' }} />
                        <input type='file' ref={img_ref} style={{ display: 'none' }} />
                        <br />
                        <Button className='join-img-btn'>이미지 저장</Button>
                    </div>
                    <InputGroup className='join-input'>
                        <InputGroup.Text>이름</InputGroup.Text>
                        <Form.Control name='uname' type='text' onChange={onChange} />
                    </InputGroup>
                    <InputGroup className='join-input'>
                        <InputGroup.Text>아이디</InputGroup.Text>
                        <Form.Control name='uid' type='text' onChange={onChange} />
                        <Button className='join-btn'>아이디 확인</Button>
                    </InputGroup>
                    <InputGroup className='join-input'>
                        <InputGroup.Text>비밀번호</InputGroup.Text>
                        <Form.Control name='upass' type='password' onChange={onChange} />
                    </InputGroup>
                    <InputGroup className='join-input'>
                        <InputGroup.Text>비밀번호 확인</InputGroup.Text>
                        <Form.Control name='upass-check' type='password' onChange={onChange} />
                    </InputGroup>
                    <InputGroup className='join-input'>
                        <InputGroup.Text>연락처</InputGroup.Text>
                        <Form.Control name='phone' type='text' onChange={onChange} />
                    </InputGroup>
                    <InputGroup className='join-address'>
                        <InputGroup.Text>주소</InputGroup.Text>
                        <Form.Control name='address1' type='text' onChange={onChange} />
                        <Button className='join-btn'>검색</Button>
                    </InputGroup>
                    <Form.Control name='address2' className='join-input' type='text' placeholder='상세주소' onChange={onChange} />
                    <Form className='join-check'>
                        <Form.Check label="꽃집 사장님" onChange={onChange}></Form.Check>
                    </Form>
                    <InputGroup className='join-input'>
                        <InputGroup.Text>사업자 등록증</InputGroup.Text>
                        <input className='btn' type='file' ref={img1_ref} onChange={onChange} />
                    </InputGroup>
                </Card>
                <div className='text-center'>
                    <button className='mt-4 join-add' onClick={() => onSubmit()}>회원가입</button>
                    <button className='mx-4 join-add' onClick={() => navi("/")}>취소</button>
                </div>
            </div>
        </div>
    )
}

export default Join