import React, { useState } from 'react'
import {Card, InputGroup, Form, Button, Spinner} from 'react-bootstrap'

const LoginPage = () => {
    const [loading , setLoading] = useState(false);

    if(loading) return <div className='text-center'><Spinner/></div>
    return (
        <div>
            <Card className='login-card'>
                <div className='login-title'>로그인</div>
                <InputGroup className='login-input'>
                    <InputGroup.Text>아이디</InputGroup.Text>
                    <Form.Control />
                </InputGroup>
                <InputGroup className='login-input'>
                    <InputGroup.Text>비밀번호</InputGroup.Text>
                    <Form.Control type='password'/>
                </InputGroup>
                <Form.Check className='login-check' label="로그인 상태 유지"/>
                <Button className='login-btn'>로그인</Button>
            </Card>
        </div>
    )
}

export default LoginPage