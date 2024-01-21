 

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