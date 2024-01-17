 

import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Col, Card, FormControl, Form, InputGroup,  Pagination,  ProgressBar, Row, NavLink, Image, Button } from 'react-bootstrap'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Comm_plant from './Comm_plant';

const Comm_Write = () => {
 

  const [form, setForm] = useState({
    user_id: 5, title: '테스트', category:1, contents: ''
  });

  const onChangeContents = (data) => {
    setForm({
        ...form,
         
        contents: data
    });
}

const onClickSave = async () => {
  if (form.contents === "" ) {
      alert("내용을 입력해주세요.");
  } else {
      if (window.confirm("저장하시겠습니까?")) {
                  const data = { ...form, contents: form.contents 
         };
          //console.log(data);
          await axios.post("/comm/insert", data);
          alert("저장을 완료했습니다.");
        
      }
  }
}

  return (
    <div className='my-5'  >
      <h1 className='text-center mb-5'>게시글 작성</h1>
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
                <select>
                  <option>자유</option>
                  <option>거래</option>
                  <option>리뷰</option>

                </select>
                <FormControl name='title'
                  placeholder="제목"

                />

              </InputGroup>

              <InputGroup className="mb-2">
                <FormControl
                  placeholder="가격"

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


                <CKEditor config={{ ckfinder: { uploadUrl: '/comm/ckupload'  } }}
                    editor={ClassicEditor}
                    data={form.contents}
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

            <Button className='me-2' vaiant='success'  onClick={onClickSave}>등록</Button>
            <Button className='text-end' vaiant='secondary'>취소</Button>
          </div>
        </Col>
      </Row>

    </div>

  )
}

export default Comm_Write