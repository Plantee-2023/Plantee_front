import React from 'react'
import { Card, InputGroup, Form, Button } from 'react-bootstrap'
import './MyPage.css'

const PasswordChange = () => {
    return (
        <div>
            <Card className='password-card'>
                <h1 className='password-title'>비밀번호 변경</h1>
                <form>
                    <InputGroup className='password-group'>
                        <InputGroup.Text className='password-text'>현재 비밀번호</InputGroup.Text>
                        <Form.Control />
                    </InputGroup>
                    <InputGroup className='password-group'>
                        <InputGroup.Text className='password-text'>새로운 비밀번호</InputGroup.Text>
                        <Form.Control />
                    </InputGroup>
                    <InputGroup className='password-group'>
                        <InputGroup.Text className='password-text'>새 비밀번호 확인</InputGroup.Text>
                        <Form.Control />
                    </InputGroup>
                    <div className="text-center">
                        <Button className='password-btn' type="submit">비밀번호 변경</Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default PasswordChange