 

import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Col, Card, FormControl, Form, InputGroup,  Pagination,  ProgressBar, Row, NavLink, Image, Button } from 'react-bootstrap'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 


const Comm_editor = ({form,setForm}) => {

    const onChangeContent = (data) => {
        setForm({
            ...form,
            contents: data
        });
    }
    
      const onClickSave = async () => {
        if (form.contents === "") {
            alert("내용을 입력해주세요.");
        } else {
            if (window.confirm("저장하시겠습니까?")) {
                const data = {  contents: form.contents };
                //console.log(data);
                await axios.post("/comm/insert", data);
                alert("저장을 완료했습니다.");
                 
            }
        }
    }

    const onChangeHtml = (e) => {
        setForm({
            ...form,
            html:e.target.value
        });
    }


    const onClickSaveHtml = async () => {
        if (form.html === "") {
            alert("내용을 입력해주세요.");
        } else {
            if (window.confirm("저장하시겠습니까?")) {
                const data = {   contents: form.html };
                //console.log(data);
                await axios.post("/comm/insert", data);
                alert("저장을 완료했습니다.");
                 
            }
        }
    }



  return (
    <>
           
            
                 
                    <CKEditor config={{ ckfinder: { uploadUrl: '/comm/ckupload'  } }}
                    editor={ClassicEditor}
                    data={form.contents}
                    onChange={(event, editor) => { onChangeContent(editor.getData()); }} />
           
              
           </>

    
  )
}

export default Comm_editor