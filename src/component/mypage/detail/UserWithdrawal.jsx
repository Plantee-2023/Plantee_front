import React from 'react'
import { Button } from 'react-bootstrap'

const UserWithdrawal = () => {
  return (
    <div id="main_wrap">
      <h1 className="all-title">회원 탈퇴</h1>
      <div className="text-center">
          <Button className='delete-btn' type="submit">탈퇴 신청</Button>
      </div>
    </div>
  )
}

export default UserWithdrawal