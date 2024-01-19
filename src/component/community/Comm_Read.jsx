import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Card,FormControl, Button,Pagination,ProgressBar, Row, NavLink, Image } from 'react-bootstrap'
import Comm_coment from './Comm_coment'
 
import Comm_share from './Comm_share'
import { useParams } from 'react-router-dom'
import { FaRegThumbsUp } from "react-icons/fa";
import Chat_modal from './Chat_modal';
import CandidateList from './CandidateList';
import Comm_vote from './Comm_vote';


const Comm_Read = () => {

    const { post_id } = useParams();
    const [post, setPost] = useState('');
    const { title, red_date, contents,address,nickname,uid } = post;

    const getPost = async () => {
        const res = await axios(`/comm/read.json/${post_id}`)
        console.log(res.data)
        setPost(res.data);
    }

    useEffect(() => {
        getPost();
    }, []);

 


 


  return (
    <div className='my-5'>
            <h1 className='text-center mb-5'>게시글 상세</h1>
            <Row className='justify-content-center'>
                <Col xs lg={15}>
                <div className='text-start mb-2'>
            <a className='btn btn-success' style={{color:"white" }} href='/comm'   >목록</a>
            
            </div>
                    <Card className='p-5'>
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
                            <div className='text-center'>
                            {contents}
                            </div>
                            <br/>
                           
                            </Col>
                        </Row>

                        <div className='mx-auto' width="50%" style={{padding:"3px",width: '5%',borderStyle:"solid" ,borderWidth: '3px'}}>
                               
                               <FaRegThumbsUp style={{fontSize:"50px"}}/>
                               
                            </div>
                    </Card>


                    <div className='text-end mt-2'>
           
            <Comm_vote/>
            <Chat_modal />
            <Button className='ms-2 me-2' vaiant='success'>수정</Button>
            
            </div>
                </Col>
            </Row>
            <div className='text-start'>
             <h4 style={{"font-weight":"bold"}}>댓글 <span>총 : x건</span></h4> 


              
              
              </div>
              <Comm_coment/>
              
            
        </div>
 
  )
}

export default Comm_Read