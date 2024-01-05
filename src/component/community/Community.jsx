
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { InputGroup, Table, FormControl, Button, Pagination, Row, NavLink, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';



const Community = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const size = 5;
  const [cnt,setCnt]=useState(0);
   
  const [total, setTotal] = useState(0);
  const page = search.get("page") ? parseInt(search.get("page")) : 1;


  const getPost = async () => {
    setLoading(true);
    const result = await axios.get(`/comm/list.json?page=${page}&size=${size}`);
    console.log(result.data);
    //const result1 = await axios.get('/posts/total');
    //console.log(result1.data.total);

    let data = result.data.list.map(p => p && { ...p, checked:false });
     
    setPosts(data);
 

 
    // setLast(Math.ceil(result1.data.total/5));
    setLoading(false);
  }


  const onDelete = async (post_id) => {
    if(window.confirm(`${post_id}번 상품을 삭제하시겠습니까?`)){
        await axios.get(`/shop/delete?post_id=${post_id}`);
       // await axios.get(`/deleteFile?file=${shop.image}`);
        alert("게시글이 삭제되었습니다.");
      //  navi(`/shop/list?page=1&siez=${size}&query=${query}`);
    }
}

const onClickDelete = async () => {
  let count=0;
  for(const post of posts){
    if(post.checked) {
  const res=await axios.post('/comm/delete', {post_id: post.post_id});
  if(res.data === 1) 
  count++;
    
    
     
  }
 
}
alert("게시글이 삭제되었습니다.");
getPost();

}

const onChangeAll = (e) => {
  const data = posts.map(item => item && {...item, checked:e.target.checked});
  setPosts(data);
}

const onChangeSingle = (e, post_id) => {
  const data = posts.map(item => item.post_id === post_id ? {...item, checked:e.target.checked} : item);
  setPosts(data);
}



  useEffect(() => {
    getPost();
  }, []);

  useEffect(()=>{
    let chk = 0;
    posts.forEach(item => {
        if(item.checked) chk++;
    });
    //console.log(chk);
    setCnt(chk);
},[posts]);

  return (

    <div className='my-5' >
      <div className='text-center'>
        <Row className='justify-content-center'>

          <h1 text-center mb-5>커뮤니티</h1>

         
          <div className='text-end mb-2'> <Button  onClick={()=>onClickDelete()}  >삭제</Button></div>

        </Row>


        <Table className='comm-table' striped bordered hover>

          <thead>
            <tr>
            <input type='checkbox' onChange={onChangeAll} checked={posts.length === cnt}/>
              <th>No</th>
              <th>구분</th>
              <th>제목</th>
              <th>지역</th>
              <th>닉네임(ID)</th>
              <th>추천</th>
              <th>조회</th>
              <th>날짜</th>

            </tr>
          </thead>
          <tbody>
            {posts.map(post =>
              <tr key={post.post_id}>
                <td><input onChange={(e)=>onChangeSingle(e, post.post_id)} type='checkbox' checked={post.checked}/></td>
                <td>{post.post_id}</td>
                <td>{post.category}</td>
                <td>
                  <div>
                  <Link to={`/comm/read/${post.post_id}`}>
                                    <div className='ellipsis'>{post.title}</div>
                                </Link>
                   

                  </div>
                </td>
                <td>{post.address}</td>
                <td>{post.nickname}({post.uid})</td>
                <td>{post.like_cnt}</td>
                <td>{post.view_cnt}</td>
                <td>{post.red_date}</td>


                

              </tr>
            



            )}
          </tbody>
          
        
        </Table>
        <div className='text-end mb-2' >  <a className='btn btn-success' href="http://localhost:3000/comm/write">글쓰기</a> </div>

        
  

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