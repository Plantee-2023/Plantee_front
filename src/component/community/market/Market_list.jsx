import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { InputGroup, Table, FormControl, Button, Row, NavLink, Col } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import "../../common/Pagination.css"
import "../Community.css"

const Market_list = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const size = 10;
  const [cnt, setCnt] = useState(0);
  const [query, setQuery]=useState('');
  const [filter, setfilter]=useState('10');
  const category = 4;
  const [total, setTotal] = useState(0);
  const page = search.get("page") ? parseInt(search.get("page")) : 1;


  const getPost = async () => {
    setLoading(true);
    //const result = await axios.get(`/comm/list2.json?page=${page}&size=${size}`);
    const result = await axios.get(`/comm/filter_list.json?category=4&page=1&size=${size}&query=${query}&filter=${filter}`);
    console.log(result.data);
    //const result1 = await axios.get('/posts/total');
    //console.log(result1.data.total);

    let data = result.data.list.map(p => p && { ...p, checked: false, show: true });

    setPosts(data);
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
      if(post.uid===sessionStorage.getItem("uid")){
      if (post.checked) {
        const res = await axios.post('/comm/delete', { post_id: post.post_id });
        if (res.data === 1)
          count++;
      }
    alert(`${post.post_id}게시글이 삭제되었습니다.`);
    getPost();
      } if(post.uid!=sessionStorage.getItem("uid")) {
        alert(`${post.post_id} 타인의 게시글은 삭제할 수 없습니다.`);
      }
    }
  }

  const onChangeAll = (e) => {
    const data = posts.map(item => item && { ...item, checked: e.target.checked });
    setPosts(data);
  }

  const onChangeSingle = (e, post_id) => {
    const data = posts.map(item => item.post_id === post_id ? { ...item, checked: e.target.checked } : item);
    setPosts(data);
  }
  const onChangeFilter = async (e, filter) => {
    console.log(filter, category)
    const res = await axios.get(`/comm/filter_list.json?category=4&page=1&size=${size}&query=${query}&filter=${filter}`);
    let data = res.data.list.map(p => p && { ...p, checked: false });
    console.log(filter, category, res)
    setPosts(data);
    setTotal(res.data.total);
    setQuery("");
    //navi(`/comm?page=1&size=${size}&query=${query}$filter=${filter}`);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      alert("검색어를 입력하세요!");
    } else {
      getPost();
    }
  }

  useEffect(() => {
    getPost();
  }, [page]);

  useEffect(() => {
    let chk = 0;
    posts.forEach(item => {
      if (item.checked) chk++;
    });
    //console.log(chk);
    setCnt(chk);
  }, [posts]);

  return (

    <div className='community_wrap' >
      <div className='community_contents'>
        <Row className='market_list_row'>
          <h1 className='community_title mt-5'>거래 게시판</h1>
          <div className='community_filter_section'>
                <ul className='community_filter_list'>
                  <button className='community_filter_btn' type='button' onClick={(e) => onChangeFilter(e, '')}  >전체</button>
                  <button className='community_filter_btn' type='button'onClick={(e) => onChangeFilter(e, 5)}  >무료나눔</button>
                  <button className='community_filter_btn' type='button'  onClick={(e) => onChangeFilter(e,8)}>팝니다</button>
                  <button className='community_filter_btn' type='button' onClick={(e) => onChangeFilter(e, 7)} >삽니다</button>
                </ul>
                <div className='market_list_btnsection'> <button className='market_list_deletebtn' onClick={() => onClickDelete()}  >삭제</button></div>
          </div>
        </Row>
        <div className='comm_market_search'>
          <form>
            <InputGroup className='community_searchinputwrap'>
              <input onChange={(e) => setQuery(e.target.value)} type='search' className='community_searchinput' placeholder='검색어를 입력해주세요.' />
              <button className='community_searchbtn' type='submit' onClick={onSubmit}><img className='community_img' src='/image/search_icon.png' /></button>
            </InputGroup>
          </form>
        </div>
        <Table className='comm-table' striped bordered hover>
          <thead>
            <tr>
              <input type='checkbox' onChange={onChangeAll} checked={posts.length === cnt && posts.length != 0} />
              <th>No</th>
              <th>구분</th>
              <th>지역</th>
              <th>제목</th>
              <th>가격</th>
              <th>닉네임(ID)</th>
              <th>추천</th>
              <th>조회</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post =>
              <tr key={post.post_id}>
                  <>
                    <td><input onChange={(e) => onChangeSingle(e, post.post_id)} type='checkbox' checked={post.checked} /></td>
                    <td>{post.post_id}</td>
                    <td>
                    {post.filter === 5 && '무료나눔'}
                    {post.filter === 7 && '삽니다'}
                    {post.filter === 8 && '팝니다'}
                      </td>
                    <td>{post.user_address}</td>
                    <td>
                      <div>
                        <Link className='community_link' to={`/comm/market/read/${post.post_id}`}>
                          <div className='community_posttitle'>{post.title}</div>
                        </Link>
                      </div>
                    </td>
                    <td> <td>{post.price === 0 ? "무료" : post.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"} </td></td>
                    <td>{post.user_nickname}({post.uid})</td>
                    <td>{post.like_cnt}</td>
                    <td>{post.view_cnt}</td>
                    <td>{post.red_date}</td>
                  </>
              </tr>
            )}
          </tbody>
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

export default Market_list