import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Button, Form} from 'react-bootstrap'
import Pagination from 'react-js-pagination';
import "../common/Pagination.css"

const Comm_coment = ({post_id,post}) => {
  const [myUid,setMyuid]= useState('');
  const [contents, setContents] = useState('');
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal]= useState(0);
  const size=3;
 
 

  const getComent = async() => {
    
    const res=await axios(`/coment/c_list.json?page=${page}&size=${size}&post_id=${post_id}`);
    const user_id=await axios(`/coment/read_id?uid=${sessionStorage.getItem("uid")}`);
    setMyuid(user_id.data);

    console.log("coments",res.data);
    console.log("uid",user_id.data);
    let data=res.data.c_list.map(r=>r && {...r, ellipsis:true, view:true, text:r.contents});
  setList(data);
    
   setTotal(res.data.c_total);

    
  }

  useEffect(()=>{
    getComent();
}, [page ]);
 
 
 
//댓글 등록 
    const onRegister = async() => {

        if(contents===""){
            alert("리뷰내용을 작성하세요!");
        }else{
            
            const data={post_id,user_id:myUid, uid:sessionStorage.getItem("uid"), contents}
            await axios.post("/coment/insert", data);
            setContents("");
             getComent();
        }
    }
 
    const onClickLogin = () => {
        sessionStorage.setItem("target", `/shop/info/${post_id}`);
        window.location.href="/login";
    }

    const onClickBody = (comment_id) => {
        const data=list.map(r=>r.comment_id===comment_id ? {...r, ellipsis:!r.ellipsis} : r);
        setList(data);
    }

    const onDelete = async(comment_id)=> {
        if(window.confirm(`${comment_id}번 댓글을 삭제하실래요?`)) {
            await axios.post(`/coment/delete/`, {comment_id});
            getComent();
        }
    }

    const onClickUpdate = (comment_id)=> {
        const data=list.map(r=>r.comment_id===comment_id ? {...r, view:false} : r);
        setList(data);
    }

    const onClickCancel = (comment_id) => {
        const data=list.map(r=>r.comment_id===comment_id ? {...r, view:true, contents:r.text} : r);
        setList(data);
    }

    const onChangeBody = (e, comment_id) => {
        const data=list.map(r=>r.comment_id===comment_id ? {...r, contents:e.target.value} : r);
        setList(data);
    }

    const onClickSave = async(comment_id, contents, text)=>{
        if(contents===text){
            onClickCancel(comment_id);
        }else{
            if(window.confirm(`${comment_id}번 리뷰를 수정하실래요?`)){
                //리뷰수정
                await axios.post("/coment/update", {comment_id, contents});
                alert("수정완료!");
                getComent();
            }
        }
    }



 

  return (

  
        <div> 
          <div> <h4 style={{"font-weight":"bold"}}>댓글수:{total}건</h4></div>
             {sessionStorage.getItem("uid") ?
                <div>
                    <Form.Control onChange={(e)=>setContents(e.target.value)} value={contents}
                        as="textarea" rows={5} placeholder='내용을 입력하세요.'/>
                    <div className='text-end mt-2'>
                        <Button onClick={onRegister}
                            className='btn-sm px-5'>등록</Button>
                    </div>    
                </div>
                :    
                <div className='mb-5'>
                    <Button className='w-100' onClick={onClickLogin}>로그인</Button>
                </div>    
            }
            
         
            <hr/>
            <div>
                {list.map(r=>
                    <div key={r.comment_id}>
                        <div>
                            <small>{r.reg_date}</small>
                            <small className='ms-2'>({r.uid}({r.nickname}))</small>
                        </div>
                        {r.view ? 
                        //댓글
                        <>
                            <div onClick={()=>onClickBody(r.comment_id)} 
                                className={r.ellipsis && 'ellipsis2'} style={{cursor:'pointer'}}>
                                {r.text}
                            </div>    
                            {sessionStorage.getItem("uid")===r.uid && 
                                <div className='text-end'>
                                    <Button onClick={()=>onClickUpdate(r.comment_id)}
                                        variant='success btn-sm'>수정</Button>
                                    <Button onClick={()=>onDelete(r.comment_id)}
                                        variant='danger btn-sm ms-2'>삭제</Button>
                                </div>        
                            }
                        </>
                        :
                        //댓글수정   
                        <div>
                            <Form.Control onChange={(e)=>onChangeBody(e, r.comment_id)}
                                as="textarea" rows="5" value={r.contents}/>
                            <div className='text-end mt-2'>
                                <Button onClick={()=>onClickSave(r.comment_id, r.contents, r.text)}
                                    variant='primary btn-sm'>저장</Button>
                                <Button onClick={()=>onClickCancel(r.comment_id)}
                                    variant='secondary btn-sm ms-2'>취소</Button>
                            </div>    
                        </div>    
                        }
                        <hr/>
                    </div>
                )}
            </div>
          

    </div>
  )
}

export default Comm_coment