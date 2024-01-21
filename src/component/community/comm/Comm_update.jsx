

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Card, FormControl, Form, InputGroup, Pagination, ProgressBar, Row, NavLink, Image, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Comm_plant from '../Comm_plant';

const Comm_Write = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');
  const [form, setForm] = useState("");
  const { post_id } = useParams();
  const [post, setPost] = useState('');

  const getPost = async () => {
    const res = await axios(`/comm/read.json/${post_id}`)
    console.log(res.data)
    setForm(res.data);
  }

  const { uid, title, contents, image, filter, post_origin } = form;


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
        //console.log(data);
        await axios.post("/comm/insert", data);
        alert("저장을 완료했습니다.");
        handleGoBack();
      }
    }
  }



  const onClickReplySave = async () => {
    if (form.contents === "") {
      alert("내용을 입력해주세요.");
    } else {
      if (window.confirm("저장하시겠습니까?")) {

        const data = {
          ...form, filter: selectedValue,
          contents: form.contents, uid: sessionStorage.getItem("uid"),
          category: 3,
          title: '[답변] ' + form.title,
          post_origin: post_id


        };
        //console.log(data);
        await axios.post("/comm/insert_reply", data);
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

  useEffect(() => {
    getPost();
  }, []);




  return (
    <>
      <div className='mainbanner_section'>
        <img className='banner_img' src="/image/header/Community.png" />
      </div>
      <div className='my-5'  >
        <div className='text-start mb-2'>
          <Button vaiant='success'>목록</Button>

        </div>
        <Row className='justify-content-center'>
          <Col xs lg={15}>
            <Card className='p-5'>
              <h4 className="text-center" style={{ "font-weight": "bold" }}>

                <div className='text-start'>
                  <input type="checkbox" /> 투표
                </div>


                <InputGroup className="mb-2">
                  <InputGroup.Text>선택</InputGroup.Text>
                  <Form.Select name="filter" value={filter} onChange={handleDropdownChange} >
                    <option value="0">식물자랑</option>
                    <option value="1">Q&A</option>



                  </Form.Select  >
                </InputGroup>
                <InputGroup className="mb-2">
                  <InputGroup.Text>제목</InputGroup.Text>
                  <FormControl name='title'
                    value={
                      uid === sessionStorage.getItem("uid") ? title : title
                    } onChange={onChange}
                    placeholder="제목"

                  />

                </InputGroup>






              </h4>
              <Row>

                <Col className='px-3 text-start' >
                  <h5  > </h5>


                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />


                  <CKEditor config={{ ckfinder: { uploadUrl: '/comm/ckupload' } }}
                    editor={ClassicEditor}
                    data={uid === sessionStorage.getItem("uid") ?
                      form.contents : ''}
                    onChange={(event, editor) => { onChangeContents(editor.getData()); }} />


                </Col>
              </Row>
              <div className='mt-2'>
                <Comm_plant />
              </div>
            </Card>


            <div className='text-start'>


            </div>





            <div className='text-end mt-2'>
              {uid === sessionStorage.getItem("uid") ?
                <>
                  <Button className='me-2' vaiant='success' onClick={onClickSave}>등록</Button>
                </>
                :
                <>
                  <Button className='me-2' vaiant='success' onClick={onClickReplySave}>답변</Button>
                </>

              }
              <Button className='text-end' vaiant='secondary'>취소</Button>

            </div>
          </Col>
        </Row>

      </div>
    </>
  )
}

export default Comm_Write