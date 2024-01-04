import React from 'react'
import { Card, Button } from 'react-bootstrap'
import './MyPage.css'
const UserDelete = () => {
    return (
        <div>
            <h1 className="all-title">회원 탈퇴</h1>
            <div className="text-center">
                <Button className='delete-btn' type="submit">탈퇴 신청</Button>
            </div>
        </div>
    )
}

export default UserDelete