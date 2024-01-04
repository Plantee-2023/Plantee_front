import React, { useRef, useState, useEffect } from 'react'
import { Card, Form, InputGroup, Button, Spinner } from 'react-bootstrap'
import './MyPage.css'

const Update = () => {
    const img_ref = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    });

    if (loading) return <div className='text-center'><Spinner /></div>
    return (
        <div>
            <Card className='update-card'>
                <h1 className='update-title'>정보 수정</h1>
                <div className='update-img'>
                    <img src='http://via.placeholder.com/150x150' onClick={() => img_ref.current.click()} style={{ cursor: 'pointer' }} width={300} height={300} />
                    <input type='file' ref={img_ref} style={{ display: 'none' }} />
                    <br />
                    <Button className='update-img-btn'>이미지 수정</Button>
                </div>
                <InputGroup className='join-input'>
                    <InputGroup.Text className='update-text'>이름</InputGroup.Text>
                    <Form.Control name='uname' type='text' />
                </InputGroup>
                <InputGroup className='join-input'>
                    <InputGroup.Text className='update-text'>아이디</InputGroup.Text>
                    <Form.Control name='uid' type='text' />
                </InputGroup>
                <InputGroup className='join-input'>
                    <InputGroup.Text className='update-text'>비밀번호</InputGroup.Text>
                    <Form.Control name='upass' type='password' />
                </InputGroup>
                <InputGroup className='join-input'>
                    <InputGroup.Text className='update-text'>비밀번호 확인</InputGroup.Text>
                    <Form.Control type='password' />
                </InputGroup>
                <InputGroup className='join-input'>
                    <InputGroup.Text className='update-text'>연락처</InputGroup.Text>
                    <Form.Control name='phone' type='text' />
                </InputGroup>
                <InputGroup className='join-address'>
                    <InputGroup.Text className='update-text'>주소</InputGroup.Text>
                    <Form.Control name='address1' type='text' />
                    <button className='update-btn'>검색</button>
                </InputGroup>
                <Form.Control name='address2' className='join-input' type='text' placeholder='상세주소' />
                <Form className='join-check'>
                    <Form.Check label="꽃집 사장님"></Form.Check>
                </Form>
                <InputGroup className='join-input'>
                    <InputGroup.Text className='update-text'>사업자 등록증</InputGroup.Text>
                    <Form.Control />
                    <button className='update-btn'>파일 검색</button>
                </InputGroup>
            </Card>
            <div className='text-center'>
                <button className='mt-4 join-add'>회원가입</button>
            </div>
        </div>
    )
}

export default Update