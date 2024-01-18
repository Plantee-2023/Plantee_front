import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BoxContext } from '../../common/BoxContext';

const UserWithdrawal = () => {
  const navi = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const { box, setBox } = useContext(BoxContext);

  const { user_id, uid, upass, uname, phone, address1, nickname } = user;

  const getUser = async () => {
    setLoading(true);
    const res = await axios.get(`/users/read.json/${sessionStorage.getItem("uid")}`);
    setUser(res.data);
    setLoading(false);
  }

  const onClickDelete = async (user_id) => {
    setLoading(true);
    setBox({
      show: true,
      message: `'${uid}'을 삭제하시겠습니까?`,
      action: async () => {
        const res = await axios.post(`/users/delete/${user_id}`);
        if (res.data === 0) {
          alert("삭제 실패");
        } else {
          alert("회원 탈퇴가 되었습니다.");
          sessionStorage.clear();
          navi("/");
        }
      }
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>

  return (
    <div id="main_wrap">
      <Card className='delete-card'>
        <h1 className="all-title mt-5">회원 탈퇴</h1>
        <div className="text-center mt-3 mb-3">
          <Button className='delete-btn' type="submit" onClick={() => onClickDelete(uid)}>탈퇴 신청</Button>
        </div>
      </Card>
    </div>
  )
}

export default UserWithdrawal