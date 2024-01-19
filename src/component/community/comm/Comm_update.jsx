 

import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react'

import { Col, Card, FormControl, Form, InputGroup,  Pagination,  ProgressBar, Row, NavLink, Image, Button } from 'react-bootstrap'
import Comm_updatevoteList from './Comm_updatevoteList';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Comm_plant from '../Comm_plant';
import { useParams ,useNavigate} from 'react-router-dom';

const Comm_Update = () => {
  const [vote, setVote] = useState({res: '', res2: '', res3: ''});
  const [selectedValue, setSelectedValue] = useState('');
    const [isChecked, setChecked] = useState(false);
    const {post_id } = useParams();
    const [form, setForm] = useState( {
      user_id: '', title: '', category: 3, contents: '', filter: '', image: '' , plant_id:'', link:'', store_id:'',plant_title:''
  
    });
    const ref_file = useRef(null);
    const [src, setSrc] = useState('http://via.placeholder.com/200x200');
    const [file, setFile] = useState(null);
    const navigate  = useNavigate();
    const {title}=form;
 
    
 
    const getPost = async () => {
  
          const res = await axios(`/comm/info/${post_id}?uid=${sessionStorage.getItem("uid")}`);
       console.log('res',res.data);
 
        setForm(res.data.read);

        if (res.data.show_vote.length > 0) {
        setVote(
          {res:res.data.show_vote[0].res  , res2: res.data.show_vote[0].res2, res3:res.data.show_vote[0].res3}

          
          );}
    
        setChecked(res.data.show_vote.length > 0 ? true : false);
        console.log("checked",isChecked);

         
    }

    const handleGoBack = () => {
      navigate(-1); // 이전 페이지로 이동
    };
 
    const onClickVoteSave = async () => {
      if (vote.res === ""||vote.res2=== "" ||vote.res3=== "" ) {
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
  
          const data2={
            vote_title: form.title,
            res:vote.res,
            res2:vote.res2,
            res3:vote.res3,
            post_id:post_id
          }
          console.log(data);
          console.log(data2);
          await axios.post("/comm/update", data);
  await new Promise(resolve=>setTimeout(resolve,1000));
   
          await axios.post("/comm/update_votes", data2);
  
          alert("저장을 완료했습니다.");
          window.location.href = "/comm";
        }
      }
    }
  

    
 

    const onChange = (e) => {
      setForm({
        ...form,
  
        [e.target.name]: e.target.value
  
      });
    }


    const handleCheckboxChange = () => {
      setChecked(!isChecked); // 현재 값의 반대로 변경
    };
  
  
    const handleDropdownChange = (event) => {
      const selectedOption = event.target.value;
  
  
      // 선택된 값을 상태에 저장
      setSelectedValue(selectedOption);
    };
  




  const onChangeContents = (data) => {
    setForm({
        ...form,
         
        contents: data
    });
}

useEffect(() => {
  getPost();
}, []);



const onClickReplySave = async () => {
  if (form.contents === "") {
    alert("내용을 입력해주세요.");
  } else {
    if (window.confirm("저장하시겠습니까?")) {

      const data = {
        ...form, filter: selectedValue,
        contents: form.contents, uid: sessionStorage.getItem("uid"),
        category: 3,
        title:'[답변] '+ form.title,
        post_origin:post_id
        

      };
      //console.log(data);
      await axios.post("/comm/insert_reply", data);
      alert("저장을 완료했습니다.");
      handleGoBack();
    }
  }
}
 

const onClickSave = async ( ) => {
  if (form.contents === "" ) {
      alert("내용을 입력해주세요.");
  } else {
      if (window.confirm("저장하시겠습니까?")) {
                  const data = { ...form, contents: form.contents, post_id:post_id
         };
          //console.log(data);
          await axios.post("/comm/update", data);
          alert("저장을 완료했습니다.");
          window.location.href = "/comm";
        
      }
  }
}
 
  return (
    <div className='my-5'  >
      <h1 className='text-center mb-5'>게시글 작성</h1>
      <div className='text-start mb-2'>
      <a className='btn btn-success' style={{ color: "white" }} href='/comm'   >목록</a>

      </div>



      <Row className='justify-content-center'>
        <Col xs lg={15}>
          <Card className='p-5'>
            <h4 className="text-center" style={{ "font-weight": "bold" }}>

            <div className='text-start'>
                <input name="ck_vote" type="checkbox"   checked={isChecked} onChange={handleCheckboxChange} /> 투표
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
              {!isChecked ?
                  <>

                    <CKEditor config={{ ckfinder: { uploadUrl: '/comm/ckupload' } }}
                      editor={ClassicEditor}
                      data={form.contents}
                      onChange={(event, editor) => { onChangeContents(editor.getData()); }} />

                  </>
                  :
                  <>

                    <Comm_updatevoteList vote={vote}setVote={setVote}/>
                  </>
                }
              </Col>
            </Row>
            <div className='mt-2'>
              <Comm_plant form={form} setForm={setForm} />
            </div>
          </Card>


          <div className='text-start'>


          </div>





          <div className='text-end mt-2'>
            {!isChecked ?
              <>
                <Button className='me-2' vaiant='success' onClick={onClickSave}>수정</Button>
              </>
              :
              <>  <Button className='me-2' vaiant='success' onClick={onClickVoteSave}>투표수정</Button>
              </>}
            <Button className='text-end' vaiant='secondary'>취소</Button>
          </div>
        </Col>
      </Row>

    </div>

  )
}

export default Comm_Update;