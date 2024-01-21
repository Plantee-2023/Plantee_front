import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { app } from '../../../firebaseInit'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { Link } from 'react-router-dom';
import { Col, Card, FormControl, Form, InputGroup, Pagination, ProgressBar, Row, NavLink, Image, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Comm_plant from '../Comm_plant';
import Comm_voteList from './Comm_voteList';

const Comm_Write = () => {
  const [isChecked, setChecked] = useState(false);
  const [vote, setVote] = useState({ res: '', res2: '', res3: '' });
  const db = getStorage(app);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');
  const [form, setForm] = useState({
    user_id: '', title: '', category: 3, contents: '', filter: '', image: '' , plant_id:'', link:'', store_id:'',plant_title:''
  });

  const onChangeContents = (data) => {
    setForm({
      ...form,
      title: form.title,
      contents: data
    });
  }

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked); // 현재 값의 반대로 변경
  };

  const handleChangeVote = (vote) => {
    setVote({
      res: vote.res,
      res2: vote.res2,
      res3: vote.res3
    }); // Component2에서 전달받은 값을 상태에 저장
  };

  const onClickSave = async () => {
    if (form.contents === "") {
      alert("내용을 입력해주세요.");
    } else {
      if (window.confirm("저장하시겠습니까?")) {
        const data = {
          ...form, filter: selectedValue,
          contents: form.contents, uid: sessionStorage.getItem("uid"),
          category: 3,
          title: form.title
        };
        console.log(data);
        await axios.post("/comm/insert", data);
        alert("저장을 완료했습니다.");
        handleGoBack();
      }
    }
  }

  const onClickVoteSave = async () => {
    if (vote.res === "" || vote.res2 === "" || vote.res3 === "") {
      alert(form,
        "내용을 입력해주세요.");
      console.log(vote)
    } else {
      if (window.confirm("저장하시겠습니까?")) {

        const data = {
          ...form, filter: selectedValue,
          contents: form.contents, uid: sessionStorage.getItem("uid"),
          category: 3,
          title: form.title
        };

        const data2 = {
          title: form.title,
          res: vote.res,
          res2: vote.res2,
          res3: vote.res3
        };
        console.log(data);
        console.log(data2);
        await axios.post("/comm/insert", data);
        await new Promise(resolve => setTimeout(resolve, 10000));
        await axios.post("/comm/vote_insert", data2);
        alert("저장을 완료했습니다.");
        handleGoBack();
      }
    }
  }

  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    // 선택된 값을 상태에 저장
    setSelectedValue(selectedOption);
  };

  const onSave = async (plant) => {
    if (window.confirm("상품을 등록하실래요?")) {
      await axios.post("/comm/insert_plant", plant);
      alert("식물 등록완료!");
    }
  }

  return (
    <div className='community_wrap'>
      <div className='community_contents'>
        <h1 className='community_title'>게시글 작성</h1>
        <div className='text-start mb-2'>
          <a className='btn btn-success' style={{ color: "white" }} href='/comm'>목록</a>
        </div>
        <Row className='justify-content-center'>
          <Col xs lg={15}>
            <Card className='p-5'>
              <h4 className="text-center" style={{ "font-weight": "bold" }}>
                <div className='text-start'>
                  <input name="ck_vote" type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/> 투표
                </div>
                <InputGroup className="mb-2">
                  <InputGroup.Text>선택</InputGroup.Text>
                  <Form.Select name="filter" value={selectedValue} onChange={handleDropdownChange} >
                    <option value="0">식물자랑</option>
                    <option value="1">질문</option>
                  </Form.Select  >
                </InputGroup>
                <InputGroup className="mb-2">
                  <InputGroup.Text>제목</InputGroup.Text>
                  <FormControl name='title'
                    value={form.title} onChange={onChange}
                    placeholder="제목"/>
                </InputGroup>
              </h4>
              <Row>
                <Col className='px-3 text-start'>
                </Col>
              </Row>
              <Row>
                <Col>
                  {isChecked &&
                    <>
                      <Comm_voteList vote={vote} setVote={handleChangeVote} />
                      <br/>
                    </>
                  }
                  <>
                    <CKEditor config={{ ckfinder: { uploadUrl: '/comm/ckupload' } }}
                      editor={ClassicEditor}
                      data={form.contents}
                      onChange={(event, editor) => { onChangeContents(editor.getData()); }} />
                  </>
                </Col>
              </Row>
              <div className='mt-2'>
                <Comm_plant form={form} setForm={setForm}/>
              </div>
            </Card>
            <div className='text-start'>
            </div>
            <div className='text-end mt-2'>
              {!isChecked ?
                <>
                  <Button className='me-2' vaiant='success' onClick={onClickSave}>등록</Button>
                </>
                :
                <>  <Button className='me-2' vaiant='success' onClick={onClickVoteSave}>투표등록</Button>
                </>}
              <Button className='text-end' vaiant='secondary'>취소</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Comm_Write