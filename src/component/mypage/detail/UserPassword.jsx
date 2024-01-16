import React, { useContext, useEffect, useState } from 'react'
import { Card, Form, InputGroup, Button, Spinner } from 'react-bootstrap'
import axios from 'axios';
import { useParams } from 'react-router-dom';


const UserPassword = () => {
  const { uid } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upass, setUpass] = useState('');
  const [newpass, setNewpass] = useState('');
  const [confirmNewpass, setConfirmNewpass] = useState('');

  const getUser = async () => {
    setLoading(true);
    const res = await axios.get(`/users/read.json/${sessionStorage.getItem("uid")}`);
    console.log(user);
    setUser(res.data);
    setLoading(false);
  }

  const onChange = (e) => {
    e.preventDefault();
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (upass !== user.upass) {
      alert('현재 비밀번호가 일치하지 않습니다.');
      return;

    } else if (newpass === "") {
      alert('새로운 비밀번호를 입력바랍니다.');
      return;

    } else if (newpass !== confirmNewpass) {
      alert('새로운 비밀번호와 확인이 일치하지 않습니다.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/users/update', { newpass });
      alert('비밀번호가 성공적으로 변경되었습니다.');
      console.log(user);

    } catch (error) {
      console.error('Error updating password:', error);
      alert('비밀번호 업데이트 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
  return (
    <div id="main_wrap">
      <Card className='password-card p-5'>
        <h1 className='all-title'>비밀번호 변경</h1>
        <form>
          <InputGroup className='password-group'>
            <InputGroup.Text className='password-text'>현재 비밀번호</InputGroup.Text>
            <Form.Control type="password" name='upass' value={upass} onChange={(e) => setUpass(e.target.value)} />
          </InputGroup>
          <InputGroup className='password-group'>
            <InputGroup.Text className='password-text'>새로운 비밀번호</InputGroup.Text>
            <Form.Control type="password" name='newpass' value={newpass} onChange={(e) => setNewpass(e.target.value)} />
          </InputGroup>
          <InputGroup className='password-group'>
            <InputGroup.Text className='password-text'>새 비밀번호 확인</InputGroup.Text>
            <Form.Control type="password" name='confirmNewpass' value={confirmNewpass} onChange={(e) => setConfirmNewpass(e.target.value)} />
          </InputGroup>
          <div className="text-center">
            <Button className='password-btn' type="submit" onClick={onSubmit}>비밀번호 변경</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserPassword