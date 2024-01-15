import axios from 'axios';
import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserWithdrawal = () => {
  const navi = useNavigate();
  const { user_id } = useParams();

  const onClickDelete = async (user_id) => {
    if (window.confirm(`${user_id}을 삭제하시겠습니까?`)) {
        console.log(user_id);
        await axios.post(`/users/delete/${user_id}`);
        navi(`/`);
    }
}

  return (
    <div id="main_wrap">
      <h1 className="all-title">회원 탈퇴</h1>
      <div className="text-center">
          <Button className='delete-btn' type="submit" onClick={()=>onClickDelete(user_id)}>탈퇴 신청</Button>
      </div>
    </div>
  )
}

export default UserWithdrawal