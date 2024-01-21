import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

const AdminPage = () => {
  const [list, setList] = useState([]);

  const getList = async () => {
    const res = await axios.get(`/users/list.json`);
    console.log(res.data);
    setList(res.data);
    // console.log(list);
  }

  useEffect(() => {
    getList();
  }, []);

  const getLevel = (level) => {
    switch (level) {
      case 1:
        return '새싹';
      case 2:
        return '줄기';
      case 3:
        return '꽃';
      case 4:
        return '나무';
      default:
        return '씨앗';
    }
  };
  return (
    <div className='plant_wrap'>
      <div className='plant_contents'>
        <h1 className='text-center'>회원관리</h1>
        <div className='homepage_tagbtn text-end'>
          <button className='homepage_btn'>변경하기</button>
        </div>
        <Table className='mt-5' bordered hover>
          <thead className='text-center'>
            <tr>
              <th>번호</th>
              <th>회원성함</th>
              <th>전화번호</th>
              <th>주소</th>
              <th>email</th>
              <th>가입날짜</th>
              <th>등급</th>
            </tr>
          </thead>
          <tbody>
            {list.map(u =>
              <tr key={u.user_id}>
                <td style={{ width: 50 }} className='text-center'>{u.user_id}</td>
                <td className='text-center'>{u.uname}</td>
                <td className='text-center'>{u.phone}</td>
                <td className='text-center'>{u.address1} {u.address2}</td>
                <td className='text-center'>{u.email}</td>
                <td className='text-center'>{u.fmtdate}</td>
                <td className='text-center'>{getLevel(u.level)} </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default AdminPage