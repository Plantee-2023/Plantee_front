import React from 'react'
import {Card, InputGroup, Form} from 'react-bootstrap'

const LoginPage = () => {
    return (
        <div className='login'>
            <Card className='login-card'>
                <h3 className='login-text'>로그인</h3>
                <InputGroup className='login-input'>
                    <InputGroup.Text>아이디</InputGroup.Text>
                    <Form.Control />
                </InputGroup>
                <InputGroup className='login-input'>
                    <InputGroup.Text>비밀번호</InputGroup.Text>
                    <Form.Control type='password'/>
                </InputGroup>
                <button className='login-btn'>로그인</button>
            </Card>
        </div>
    )
}

export default LoginPage