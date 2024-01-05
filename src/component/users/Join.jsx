import React, { useRef, useState, useEffect } from 'react'
import { Button, Card, Form, InputGroup, Spinner } from 'react-bootstrap'
import '../Main.css'

const Join = () => {
    const img_ref = useRef(null);
    const img1_ref = useRef(null);
    const [loading, setLoading] = useState(false);

    const getJoin = () => {
        setLoading(true);
        setLoading(false);
    }
    useEffect(() => {
        getJoin();
    });
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
                        <Form.Control type='text' />
                    </InputGroup>
                    <InputGroup className='join-input'>
                        <InputGroup.Text>아이디</InputGroup.Text>
                        <Form.Control type='text' />
                    </InputGroup>
                    <InputGroup className='join-input'>
                        <InputGroup.Text>비밀번호</InputGroup.Text>
                        <Form.Control type='password' />
                    </InputGroup>
                    <InputGroup className='join-input'>
                        <InputGroup.Text>비밀번호 확인</InputGroup.Text>
                        <Form.Control type='password' />
                    </InputGroup>
                    <InputGroup className='join-input'>
                        <InputGroup.Text>연락처</InputGroup.Text>
                        <Form.Control type='text' />
                    </InputGroup>
                    <InputGroup className='join-address'>
                        <InputGroup.Text>주소</InputGroup.Text>
                        <Form.Control type='text' />
                        <button className='join-btn'>검색</button>
                    </InputGroup>
                    <Form.Control className='join-input' type='text' placeholder='상세주소' />
                    <Form className='join-check'>
                        <Form.Check label="꽃집 사장님"></Form.Check>
                    </Form>
                    <InputGroup className='join-input'>
                        <InputGroup.Text>사업자 등록증</InputGroup.Text>
                        <input className='btn' type='file' ref={img1_ref} />
                    </InputGroup>
                </Card>
                <div className='text-center'>
                    <button className='mt-4 join-add'>회원가입</button>
                </div>
            </div>
        </div>
    )
}

export default Join