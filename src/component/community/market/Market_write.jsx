 

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
 
import { Col, Card, FormControl, Form, InputGroup,  Pagination,  ProgressBar, Row, NavLink, Image, Button } from 'react-bootstrap'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Comm_plant from '../Comm_plant';
import Comm_editor from '../Comm_editor';

const Market_write = () => {
 
  const [selectedValue, setSelectedValue] = useState('');
  const [form, setForm] = useState("");
  const priceRef = useRef(null);
  const ref_file = useRef(null);
  const [src, setSrc] = useState('http://via.placeholder.com/200x200');
  const [file, setFile] = useState(null);

   
  const { title, price,  contents, category  } = form;


  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;
    
    // '무료나눔'이 선택되었을 때
    if (selectedOption === "0") {
      // price 알림상자 표시
      alert('무료나눔을 선택하셨습니다.');
      
      // 인풋 상자에 0으로 설정
      priceRef.current.value = 0;
    }
    
    // 선택된 값을 상태에 저장
    setSelectedValue(selectedOption);
  };



   

  const onChange = (e) => {
    setForm({
        ...form,
       
        [e.target.name]: e.target.value
        
    });
}



 
const onClickSave = async () => {
  if (form.contents === "") {
      alert("내용을 입력해주세요.");
  } else {
      if (window.confirm("저장하시겠습니까?")) {
          const data = 
          {  contents: form.contents ,  uid: sessionStorage.getItem("uid"),
            category: 4,
          title:form.title, 
          price:form.price };
          console.log(data);
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

           

              <form name="frm">

              <InputGroup className="mb-2">
              <Form.Select name="trade" value={selectedValue}  onChange={handleDropdownChange}>
                  <option value="0">무료나눔</option>
                  <option value="1">거래</option>
                 

                  </Form.Select  >

                  <Form.Select name="tradeoption" value={selectedValue} disabled={selectedValue === '0'} >
                  <option value="0">삽니다</option>
                  <option value="1">팝니다</option>
                 

                  </Form.Select  >

                  </InputGroup>
                  <InputGroup className="mb-2">
                  <InputGroup.Text>상품</InputGroup.Text>
                <FormControl name='title' value={form.title} onChange={onChange}
                  placeholder="제목"

                />

              </InputGroup>

              <InputGroup className="mb-2">
              <InputGroup.Text>가격</InputGroup.Text>
                <FormControl type="number" name="price" ref={priceRef}  onChange={onChange}
                
                  placeholder="가격"

                />
              </InputGroup>

              </form>
              




            </h4>
            <Row>

              <Col className='px-3 text-start' >
                <h5  > </h5>


              </Col>
            </Row>
            <Row>
              <Col>
                <hr />


                <Comm_editor   form={form} setForm={setForm}  />


              </Col>
            </Row>
            <div className='mt-2'>
            <Comm_plant />
            </div>
          </Card>
       

          <div className='text-start'>
         
         
          </div>




          
          <div className='text-end mt-2'>

            <Button className='me-2' vaiant='success'  onClick={onClickSave} >등록</Button>
            <Button className='text-end' vaiant='secondary'>취소</Button>
          </div>
        </Col>
      </Row>

    </div>

  )
}

export default Market_write