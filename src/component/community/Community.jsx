 
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { InputGroup, Table,FormControl, Button,Pagination, Row, NavLink, Col } from 'react-bootstrap'
 


const Community = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);


  const getPost = async() => {
    setLoading(true);
    const result = await axios.get(`/comm/list.json?start=0&size=10`);
    //console.log(result.data);
    //const result1 = await axios.get('/posts/total');
    //console.log(result1.data.total);
    setPosts(result.data);
   // setLast(Math.ceil(result1.data.total/5));
    setLoading(false);
}

useEffect(()=>{
  getPost();
}, [ ]);


  return (
 
    <div className='my-5' style={{width:"50%", margin:"600px"}}>
      <div className='text-center'>
        <Row className='justify-content-center'>
     
        <h1 text-center mb-5>커뮤니티</h1>
   
        <div className='text-end mb-2'> <Button >삭제</Button></div>
      
       </Row>
     
     
        <Table className='comm-table'striped bordered hover>
          
            <thead>
                <tr>
                <th><input type="checkbox"/></th>
                    <th>No</th>
                    <th>구분</th>
                    <th>제목</th>
                    <th>닉네임(ID)</th>
                    <th>추천</th>
                    <th>조회</th>
                    <th>날짜</th>

                </tr>
            </thead>
            <tbody>
            {posts.map(post=>
                <tr key={post.id}>
                <td><input type="checkbox"/></td>
                <td>{post.id}</td>
                <td>{post.filter}</td>
                <td>
                <div>
                                    <a href="http://localhost:3000/comm/read">{post.title}</a>
                                    
                                </div>
                                </td>
                <td>{post.user_id}</td>
                <td>{post.like_cnt}</td>
                <td>{post.view_cnt}</td>
                <td>{post.red_date}</td>
                </tr>

            )}
            </tbody>
           
        </Table>
    
        <div className='text-end mb-2' >  <a  className='btn btn-success' href="http://localhost:3000/comm/write">글쓰기</a> </div>
 

        
        <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"
           
        /><Button variant='success'>검색</Button>
    
      </InputGroup>

 
      <Pagination  >
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
    </div>
  
    </div>
  )
}

export default Community