 

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { app } from '../../../firebaseInit'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { Link } from 'react-router-dom';
import { Col, Card, FormControl, Form, InputGroup,  Pagination,  ProgressBar, Row, NavLink, Image, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Comm_plant from '../Comm_plant';

const Comm_Write = () => {
  const db = getStorage(app);
  const [file, setFile] = useState(null);
 const navigate = useNavigate();
 const [selectedValue, setSelectedValue] = useState('');
  const [form, setForm] = useState({
    user_id: 5, title: '', category:3, contents: '', filter:'', image:''
  });

  const onChangeContents = (data) => {
    setForm({
        ...form,
        title:form.title,
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
  if (form.contents === "" ) {
      alert("내용을 입력해주세요.");
  } else {
      if (window.confirm("저장하시겠습니까?")) {
      
                  const data = { ...form, filter:selectedValue,
                    contents: form.contents ,  uid: sessionStorage.getItem("uid"),
            category:3,
          title:form.title
                     
         };
          //console.log(data);
          await axios.post("/comm/insert", data);
          alert("저장을 완료했습니다.");
          handleGoBack ();
      }
  }
}


 
const handleDropdownChange = (event) => {
  const selectedOption = event.target.value;
 
  
  // 선택된 값을 상태에 저장
  setSelectedValue(selectedOption);
};





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
                <InputGroup.Text>선택</InputGroup.Text>
              <Form.Select name="filter" value={selectedValue} onChange={handleDropdownChange} >
                  <option value="0">식물자랑</option>
                  <option value="1">Q&A</option>
                 
                 

                  </Form.Select  >
                  </InputGroup>
                  <InputGroup className="mb-2">
                  <InputGroup.Text>제목</InputGroup.Text>
                <FormControl name='title' 
                value={form.title} onChange={onChange}
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