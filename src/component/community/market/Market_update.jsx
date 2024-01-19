

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Card, FormControl, Form, InputGroup, Pagination, ProgressBar, Row, NavLink, Image, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Comm_plant from '../Comm_plant';

const Market_update = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');
  const [form, setForm] = useState("");
  const { post_id } = useParams();
  const [post, setPost] = useState('');
  const priceRef = useRef(null);
  
  /*const getPost = async () => {
    const res = await axios(`/comm/read.json/${post_id}`)
    console.log(res.data)
    setForm(res.data);
  }*/

  const { uid, title, contents, image, filter,post_origin} = form;


  const getPost = async () => {
  
    const res = await axios(`/comm/info/${post_id}?uid=${sessionStorage.getItem("uid")}`);
 console.log('res',res.data);

  setForm(res.data.read);
 
  console.log("레스",res)
 
 

   
}





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

  const handleDropdownChange2 = (event) => {
    const selectedOption2 = event.target.value;
 
    
    // 선택된 값을 상태에 저장
    setSelectedValue2(selectedOption2);
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





  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value;


    // 선택된 값을 상태에 저장
    setSelectedValue(selectedOption);
  };

  useEffect(() => {
    getPost();
  }, []);




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
              <Form.Select name="trade" value={selectedValue} disabled={selectedValue != '5'}  onChange={handleDropdownChange}>
                  <option value="5">무료나눔</option>
                  <option value="6">거래</option>
                 

                  </Form.Select  >

                  <Form.Select name="tradeoption" value={selectedValue2} disabled={selectedValue === '5'} onChange={handleDropdownChange2}>
                  <option value="7">삽니다</option>
                  <option value="8">팝니다</option>
                 

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
                <FormControl type="number" name="price" ref={priceRef} value={form.price} onChange={onChange} disabled={selectedValue === '5'}
                
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


                <CKEditor config={{ ckfinder: { uploadUrl: '/comm/ckupload' } }}
                  editor={ClassicEditor}
                  data={uid === sessionStorage.getItem("uid") &&form.contents }
                  onChange={(event, editor) => { onChangeContents(editor.getData()); }} />


              </Col>
            </Row>
            <div className='mt-2'>
              <Comm_plant form={form} setForm={setForm} />
            </div>
          </Card>


          <div className='text-start'>


          </div>





          <div className='text-end mt-2'>
            {uid === sessionStorage.getItem("uid") ?
              <>
                <Button className='me-2' vaiant='success' onClick={onClickSave }>등록</Button>
              </>
              :
              <>
                <Button className='me-2' vaiant='success'  >답변</Button>
              </>

            }
            <Button className='text-end' vaiant='secondary'>취소</Button>

          </div>
        </Col>
      </Row>

    </div>

  )
}

export default Market_update