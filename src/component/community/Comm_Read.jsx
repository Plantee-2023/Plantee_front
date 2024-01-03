import React from 'react'
 
import { Col, Card,FormControl, Button,Pagination,ProgressBar, Row, NavLink, Image } from 'react-bootstrap'
import Comm_coment from './Comm_coment'
import Comm_chat from './Comm_chat'
import Comm_share from './Comm_share'


const Comm_Read = () => {

 


  return (
    <div className='my-5' style={{width:"50%", margin:"600px"}}>
            <h1 className='text-center mb-5'>게시글 상세</h1>
            <Row className='justify-content-center'>
                <Col xs lg={15}>
                <div className='text-start mb-2'>
            <Button   vaiant='success'>목록</Button>
            
            </div>
                    <Card className='p-5'>
                      <h4 className="text-center" style={{"font-weight":"bold"}}>[지역] 여기는 제목 란입니다. </h4>
                        <Row>
                            <Col lg={3} xs={5} md={4} className='align-self-center'>
                                <div className='mt-1'>
                                <Image src="http://via.placeholder.com/171x180" roundedCircle />
                                
                                    
                                </div>
                                
                                    
                            </Col>
                            <Col className='px-3 text-start' >
                                <h5  > </h5>
                                <hr/> 

                                <div  >닉네임 : [아이콘 png] 홍길동(아이디)  </div>
                               
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
                            여기는 내용이 적히는 곳입니다.<br/>
                            <img src='/image/3.jpg' width={500} height={300} />
                            </Col>
                        </Row>

                        추천 아이콘 
                    </Card>


                    <div className='text-end mt-2'>
            <Button className='me-2' vaiant='success'>대화하기</Button>
            <Button className='me-2' vaiant='success'>수정</Button>
            <Button  className='text-end' vaiant='secondary'>취소</Button>
            </div>
                </Col>
            </Row>
            <div className='text-start'>
             <h4 style={{"font-weight":"bold"}}>댓글 <span>총 : x건</span></h4> 


              
              
              </div>
              <Comm_coment/>
              <Comm_chat/>
            
        </div>
 
  )
}

export default Comm_Read