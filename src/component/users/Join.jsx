import React from 'react'
import { Card, Form, InputGroup } from 'react-bootstrap'
import '../Main.css'

const Join = () => {
    return (
        <div className='add'>
            <Card className='mt-5'>
                <img src='/image/logo.png' width={300} height={300} className='join-img' />
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
                <Form className='join-check'>
                    <Form.Check label="꽃집 사장님"></Form.Check>
                </Form>
                <Form.Control className='join-input' type='text' placeholder='상세주소' />
                <InputGroup className='join-input'>
                    <InputGroup.Text>사업자 등록증</InputGroup.Text>
                    <Form.Control />
                    <button className='join-btn'>파일 검색</button>
                </InputGroup>
            </Card>
            <div className='text-center'>
                <button className='mt-4 join-add'>회원가입</button>
            </div>
        </div>
    )
}

export default Join