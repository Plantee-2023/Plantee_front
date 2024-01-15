import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { BoxContext } from '../common/BoxContext';


const PlantRecipeComment = ({uid}) => {
  const navi = useNavigate();
  const [loading, setLoading] = useState(false);
  const { recipe_id } = useParams();
  const [comments, setComments] = useState([]);
  const [total, setTotal] = useState(0);
  const { box, setBox } = useContext(BoxContext);

  const [form, setForm] = useState({
    contents: ''
  })

  const getComment = async () => {
    setLoading(true);
    const res = await axios.get(`/recipe/review/list.json?recipe_id=${recipe_id}`);
    //console.log(res);
    let list = res.data.reviewlist;

    setComments(list);
    setTotal(res.data.reviewtotal);
    setLoading(false);
  }

  const onClickCommentWrite = async () => {
    if(sessionStorage.getItem("uid")) {
      const res = await axios.post('/recipe/review/insert', {
        recipe_id,
        contents: form.contents, // 폼에서 입력받은 댓글 내용
        user_id:sessionStorage.getItem("user_id"),
        uid: sessionStorage.getItem("uid"),
        nickname: sessionStorage.getItem("nickname"), // 폼에서 입력받은 닉네임
      });
      console.log(res);
      

    if (res.data === 1) {
      // 댓글 등록 성공 시 댓글 목록 갱신
      getComment();
      // 폼 초기화
      setForm({ contents: '' });
    }}else {
      setBox({
        show: true,
        message: "로그인 사용자만 이용 가능한 서비스입니다. 로그인 후 진행해주세요."
      });
      navi("/users/loginPage");
    }
  }

  const onClickDelete = async(comment_id) => {
    setBox({
      show: true,
      message: '해당 댓글을 삭제하시겠습니까?',
      action: async() => {
        const res = await axios.post(`/recipe/review/delete/${comment_id}`);
        if(res.data === 1) {
          getComment();
        }else{
          setBox({
            show: true,
            message: "댓글 삭제 실패"
          });
        }
      }
    });
  }

  useEffect(()=> {
    getComment();
  }, [])
  
  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>

  return (
    <div className='plantrecipe_comment_wrap'>
      <div className='plantrecipe_comment_contents'>
        <div className='plantrecipe_comment_section'>
          <div className='plantrecipe_comment_count'>
            <span>댓글 ({total})</span>
            <div className='plantrecipe_comment_comment'>
              <Form.Control onChange={(e) => setForm({ ...form, contents: e.target.value })} value={form.contents} as="textarea" placeholder='댓글 내용을 입력해주세요.'/>
              <button onClick={() => onClickCommentWrite()} type='submit'>등록</button>
            </div>
          </div>
          {comments.map(c =>
          <div className='plantrecipe_comment_map'>
            <div className='plantrecipe_comment_info'>
              <div className='plantrecipe_comment_user'>
                <div className='plantrecipe_comment_userimage'>
                  <img className='plantrecipe_comment_img' src='/image/userimage_01.jpg'/>
                </div>
                <div className='plantrecipe_comment_usernickname'>
                  <p>{c.nickname}</p>
                </div>
              </div>
              <div className='plantrecipe_comment_date'>
                <p>{c.reg_date}</p>
              </div>
            </div>
            <div className='plantrecipe_comment_textcon'>
              <p>{c.contents}</p>
            </div>
            <div className='plantrecipe_comment_iconbtn'>
              <div className='plantrecipe_comment_icon'>
                <p>♥️ {c.like_cnt}</p>
              </div>
              <div className='plantrecipe_comment_btn'>
                <button className='plantrecipe_comment_update'>수정</button>
                <button className='plantrecipe_comment_delete' onClick={()=>onClickDelete(c.comment_id)}>삭제</button>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlantRecipeComment