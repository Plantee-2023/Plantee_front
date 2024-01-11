
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { InputGroup, Table, FormControl, Button, Row, NavLink, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import "../../common/Pagination.css"
import "../Community.css"



const Comm_list = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const location = useLocation();
  const [filter, setfilter] = useState(0);
  const search = new URLSearchParams(location.search);
  const size = 5;
  const [cnt, setCnt] = useState(0);
  const category = 3;
  const [total, setTotal] = useState(0);
  const page = search.get("page") ? parseInt(search.get("page")) : 1;
  const [query, setQuery] = useState("");


  const getPost = async () => {
    setLoading(true);
    const result = await axios.get(`/comm/list.json?category=${category}&page=${page}&size=${size}&query=${query}`);
    // const resultTotal = await axios.get('/comm/list_total',category);
    console.log(query, page, size);
    console.log(result);
    //     setTotal(resultTotal.data);


    let data = result.data.list.map(p => p && { ...p, checked: false  });

    setPosts(data);
    setTotal(result.data.total);





    // setLast(Math.ceil(result1.data.total/5));
    setLoading(false);
  }


  const onDelete = async (post_id) => {
    if (window.confirm(`${post_id}번 상품을 삭제하시겠습니까?`)) {
      await axios.get(`/shop/delete?post_id=${post_id}`);
      // await axios.get(`/deleteFile?file=${shop.image}`);
      alert("게시글이 삭제되었습니다.");
      //  navi(`/shop/list?page=1&siez=${size}&query=${query}`);
    }
  }

  const onClickDelete = async () => {
    let count = 0;
    for (const post of posts) {
      if (post.checked) {
        const res = await axios.post('/comm/delete', { post_id: post.post_id });
        if (res.data === 1)
          count++;



      }

    }
    alert("게시글이 삭제되었습니다.");
    getPost();

  }

  const onChangeAll = (e) => {
    const data = posts.map(item => item && { ...item, checked: e.target.checked });
    setPosts(data);
  }

  const onChangeFilter = (e, filter) => {
    e.preventDefault();
     
    const data = posts.filter(item=>item.filter===filter);
    setTotal(data.length);
    setPosts(data);
    
    
  }

  const onChangeSingle = (e, post_id) => {
   
    const data = posts.map(item => item.post_id === post_id ? { ...item, checked: e.target.checked } : item);
    setPosts(data);
  }



  useEffect(() => {
    getPost();
  }, [location]);


 

  useEffect(() => {
    let chk = 0;
    posts.forEach(item => {
      if (item.checked) chk++;
    });
    //console.log(chk);
    setCnt(chk);
  }, [posts]);


  const onSubmit = (e) => {
    e.preventDefault();
    navi(`/comm?page=1&size=${size}&query=${query}`);
  }
  //navi(`/comm?page=${cpage}&size=${size}&query=${query}`)


  return (

    <div className='my-5' >
      <div className='text-center'>
        <Row className='justify-content-center'>

          <h1 text-center mb-5>커뮤니티</h1>

          <div className='plant_wrap'>
            <div className='plant_contents'>
              <div className='first_filter_section'>
                <ul className='filter_list'>

                  <button className='filter_btn' type='button' onClick={(e)=>onChangeFilter(e,0)} >식물자랑</button>
                  <button className='filter_btn' type='button' onClick={(e)=>onChangeFilter(e,1)} >Q&A</button>
                  <button className='filter_btn' type='button'  >전체보기</button>

                </ul>
              </div>
            </div>
          </div>


          <div className='text-end mb-2'> <Button onClick={() => onClickDelete()}  >삭제</Button></div>

        </Row>


        <Table className='comm-table' striped bordered hover>

          <thead>
            <tr>
              <input type='checkbox' onChange={onChangeAll} checked={posts.length === cnt && !posts.length === 0} />
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
                <td><input onChange={(e) => onChangeSingle(e, post.post_id)} type='checkbox' checked={post.checked} /></td>
                <td>{post.post_id}</td>
                <td>
                  {post.filter === 0 && '식물자랑'}
                  {post.filter === 1 && 'Q&A'}



                </td>
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






        <form >
          <InputGroup className='store_searchinputwrap'>
            <input onChange={(e) => setQuery(e.target.value)} type='search' className='store_searchinput' placeholder='검색어를 입력해주세요.' />
            <button className='store_searchbtn' type='submit' onClick={onSubmit}><img src='/image/search_icon.png' /></button>
          </InputGroup>
        </form>





      </div>

      {total > size &&
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={total}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(cpage) => { navi(`/comm?page=${cpage}&size=${size}&query=${query}`) }} />
      }
    </div>
  )
}
//  const result = await axios.get(`/comm/list.json?page=${page}&size=${size}`);

export default Comm_list 