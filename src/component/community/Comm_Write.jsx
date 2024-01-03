import React, { useState } from 'react'

import { Col, Card, FormControl, Form, InputGroup,  Pagination,  ProgressBar, Row, NavLink, Image, Button } from 'react-bootstrap'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Comm_plant from './Comm_plant';
const Comm_Read = () => {

  const [form, setForm] = useState({
    id: '', title: '', content: '내용'
  });


  const onChageContent = (data) => {
    setForm({
      ...form, content: data
    });
  }


  return (
    <div className='my-5' style={{width:"50%", margin:"600px"}}>
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
                <FormControl
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


                <CKEditor config={{ ckfinder: { uploadUrl: '/book/ckupload' } }}
                  editor={ClassicEditor}
                  //data={ content }
                  onChange={(event, editor) => { onChageContent(editor.getData()); }} />


              </Col>
            </Row>
            <div className='mt-2'>
            <Comm_plant />
            </div>
          </Card>
       

          <div className='text-start'>
         
         
          </div>




          
          <div className='text-end mt-2'>

            <Button className='me-2' vaiant='success'>등록</Button>
            <Button className='text-end' vaiant='secondary'>취소</Button>
          </div>
        </Col>
      </Row>

    </div>

  )
}

export default Comm_Read