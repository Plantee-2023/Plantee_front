import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { InputGroup, Table, FormControl, Button, Row, NavLink, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import "../../common/Pagination.css"
import "../Community.css"
import Comm_reply from './Comm_reply';

const Comm_list = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const location = useLocation();
  const [filter, setfilter] = useState('');
  const search = new URLSearchParams(location.search);
  const size = 5;
  const [cnt, setCnt] = useState(0);
  const category = 3;
  const [total, setTotal] = useState(0);
  const page = search.get("page") ? parseInt(search.get("page")) : 1;
  const [query, setQuery] = useState("");
  const key = 10;
  const [post_id, setPost_id] = useState(0);

  const getPost = async () => {
    setLoading(true);
    const result = await axios.get(`/comm/filter_list.json?category=3&page=1&size=${size}&query=${query}&filter=${filter}`);
    // const resultTotal = await axios.get('/comm/list_total',category);
    // console.log(query, page, size);
    console.log(result);
    //     setTotal(resultTotal.data);
    let data = result.data.list.map(p => p && { ...p, checked: false });
    setPosts(data);
    console.log(posts);
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
      if (post.uid === sessionStorage.getItem("uid")) {


        if (post.checked) {
          const res = await axios.post('/comm/delete', { post_id: post.post_id });
          if (res.data === 1)
            count++;
        }

        alert("게시글이 삭제되었습니다.");
        getPost();
      } if (post.uid != sessionStorage.getItem("uid")) {
        alert("본인 게시글만 삭제할 수 있습니다. ");
      }
    }
  }

  const onChangeAll = (e) => {
    const data = posts.map(item => item && { ...item, checked: e.target.checked });
    setPosts(data);
  }

  const onChangeFilter = async (e, filter) => {
    console.log(filter, category)
    const res = await axios.get(`/comm/filter_list.json?category=3&page=1&size=${size}&query=${query}&filter=${filter}`);
    let data = res.data.list.map(p => p && { ...p, checked: false });
    // console.log(data)
    setPosts(data);
    setTotal(res.data.total);
    setQuery("");
    //navi(`/comm?page=1&size=${size}&query=${query}$filter=${filter}`);
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
    if (query === "") {
      alert("검색어를 입력하세요!");
    } else {
      getPost();
    }
  }

  // e.preventDefault();
  // navi(`/comm?category=3&page=1&size=${size}&query=${query}${filter ? `&filter=${filter}` : ''}`);
  // }
  //navi(`/comm?page=${cpage}&size=${size}&query=${query}`)

  return (
    <div className='comm_wrap' >
      <div className='comm_contents'>
          <Row className='justify-content-center'>
            <h1 className='text-center mb-5'>커뮤니티</h1>
            <div className='first_filter_section'>
              <ul className='filter_list'>
                <button className='filter_btn' type='button' onClick={(e) => onChangeFilter(e, '')} >전체보기</button>
                <button className='filter_btn' type='button' onClick={(e) => onChangeFilter(e, 0)} >식물자랑</button>
                <button className='filter_btn' type='button' onClick={(e) => onChangeFilter(e, 1)} >Q&A</button>
              </ul>
            </div>
            <div className='plant_insert'><a href="http://localhost:3000/comm/write"><button>등록하기</button></a></div>
            <div className='text-end'>
              <form>
                <InputGroup className='comm_search_input_inputgroup'>
                  <input onChange={(e) => setQuery(e.target.value)} type='search' className='comm_search_input_textinput' placeholder='검색어를 입력해주세요.' />
                  <button className='comm_search_input_searchbtn' type='submit' onClick={onSubmit}><img src='/image/search_icon.png' /></button>
                </InputGroup>
              </form>
            </div>
            <div>
              {(sessionStorage.getItem('uid') === posts.user_uid || sessionStorage.getItem('uid') === 'admin') &&
                <div className='mb-2'> <Button onClick={() => onClickDelete()} >삭제</Button></div>
              }
            </div>
          </Row>
          <Table className='text-center' bordered hover>
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
            {posts.map(post =>
              <tbody>
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
                        <div className='comm_table_title'>{post.title}</div>
                      </Link>
                    </div>
                  </td>
                  <td>{post.user_address}</td>
                  <td>{post.user_nickname}({post.uid})</td>
                  <td>{post.like_cnt}</td>
                  <td>{post.view_cnt}</td>
                  <td>{post.red_date}</td>
                </tr>
                {post.post_id === 185 &&
                  <>
                    <Comm_reply post_id={post.post_id} />
                  </>
                }
              </tbody>
            )}

          </Table>
        </div>
      {total > size &&
        <Pagination
          activePage={page}
          itemsCountPerPage={size}
          totalItemsCount={total}
          pageRangeDisplayed={10}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={(cpage) => { navi(`/comm?page=${cpage}&size=${size}&query=${query}&filter=${filter}`) }} />
      }
    </div>
  )
}
//  const result = await axios.get(`/comm/list.json?page=${page}&size=${size}`);

export default Comm_list 