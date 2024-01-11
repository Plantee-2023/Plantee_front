import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Card,FormControl, Button,Pagination,ProgressBar, Row, NavLink, Image } from 'react-bootstrap'
import Comm_coment from '../Comm_coment'
import "../Community.css"
import Comm_share from '../Comm_share'
import { useParams    } from 'react-router-dom'
import { FaRegThumbsUp } from "react-icons/fa";
import Chat_modal from '../market/Chat_modal';
import CandidateList from '../CandidateList';
import Comm_vote from '../Comm_vote';
 

const Comm_Read = () => {
    
    const { post_id } = useParams();
    
    const [post, setPost] = useState('');
    const [rtotal, setRtotal] = useState(0);

    const { title, red_date, contents,address,nickname,uid,post_origin } = post;
   // const [rtotal, setRtotal] = useState(0);

    const getPost = async () => {
        const res = await axios(`/comm/read.json/${post_id}`)
        

        console.log(res.data);
        setPost(res.data);
        console.log("오리진",post_origin)

if(!post_origin===''){
        const reply_total = await axios(`/comm/reply_total/${post_origin}`)
        console.log("리플리",reply_total.data)

        //console.log(reply_total.data);
        setRtotal(reply_total.data)
    }
       
       
    }




    useEffect(() => {
        getPost();
    }, []);
 

    


 






 const onClickReply=(post_id)=>{
  window.location.href=`/comm/write/${post_id}`;
 

 }


  return (
    <div className='my-5'>
       
            <h1 className='text-center mb-5'>게시글 상세</h1>
            <Row className='justify-content-center'>
                <Col xs lg={15}>
                <div className='text-start mb-2'>
            <a className='btn btn-success' style={{color:"white" }} href='/comm'   >목록</a>
           
            </div>
                    <Card className='p-5'>
                    <div className='comm'> 커뮤니티 ＞ 식물자랑   </div>
                      <h4 className="text-center" style={{"font-weight":"bold"}}>[{address}] {title} </h4>
                        <Row>
                            <Col lg={3} xs={5} md={4} className='align-self-center'>
                                <div className='mt-1'>
                                <Image src="http://via.placeholder.com/171x180" roundedCircle />
                                
                                    
                                </div>
                                
                                    
                            </Col>
                            <Col className='px-3 text-start' >
                                <h5  > </h5>
                                <hr/> 

                                <div  >닉네임 : [아이콘 png] {nickname}({uid})  </div>
                               
                               <div  >작성일 : 2023.12.31 </div>
                               <div  >추천 :1 </div>
                                <hr/>
                                <div>
                                   
                                공유하기 : <p className='me-2'> <Comm_share/> </p> 
                 
 
                                </div>
                               
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <hr/>
                            <div className='text-center'dangerouslySetInnerHTML={{ __html:contents }}>
                             
 
                            </div>
                            <br/>
                           
                            </Col>
                        </Row>

                        <div className='mx-auto' width="50%" style={{padding:"3px",width: '5%',borderStyle:"solid" ,borderWidth: '3px'}}>
                               
                               <FaRegThumbsUp style={{fontSize:"50px"}}/>
                               
                            </div>
                    </Card>


                    <div className='text-end mt-2'>
           
          {sessionStorage.getItem("uid")===uid ?
          <> <Button className='ms-2 me-2' vaiant='success'>수정</Button>
          <Button className='ms-2 me-2' vaiant='success'>삭제</Button>
          </>
          :
          <>
                    <Button className='ms-2 me-2' vaiant='success' onClick={()=>onClickReply(post_id)}>답변</Button>
                    </>
        }
            </div>
                </Col>
            </Row>
            <div className='text-start'>
         


              
              
              </div>
              <Comm_coment  post_id={ post_id} post={post}/>
              
            
        </div>
 
  )
}

export default Comm_Read