import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { BoxContext } from '../common/BoxContext';


const PlantRecipeComment = ({ uid }) => {
  const navi = useNavigate();
  const [loading, setLoading] = useState(false);
  const { recipe_id } = useParams();
  const [comments, setComments] = useState([]);
  const [total, setTotal] = useState(0);
  const { box, setBox } = useContext(BoxContext);

  let [form, setForm] = useState({
    recipe_id: recipe_id, uid: sessionStorage.getItem(uid), contents: '', category: 2
  });

  let { contents } = form;

  const getComment = async () => {
    setLoading(true);
    const res = await axios.get(`/recipe/review/list.json?recipe_id=${recipe_id}`);
    //console.log(res);
    let list = res.data.reviewlist;

    setComments(list);
    setTotal(res.data.reviewtotal);
    setLoading(false);
  }

  // 리뷰 내용 작성 이벤트리스너
  const onChangeContents = (e) => {
    console.log(e); // 디버깅용 로그
    if (e && e.target) {
      setForm({
        ...form,
        contents: e.target.value,
      });
    }
  }

  // 리뷰 작성 후 등록버튼 클릭
  const onClickSave = async () => {
    if (form.contents === "") {
      setBox({ show: true, message: "내용을 적어주세요." })
    } else {
      const data = { ...form, recipe_id: recipe_id }
      await axios.post("/recipe/review/insert", data);
      setBox({
        show: true, message: "리뷰 등록이 완료되었습니다.",
        action: async () => { window.location.reload(); }
      });
    }
  }

  // 리뷰 삭제
  const onDelete = (comment_id) => {
    // console.log(comment_id)
    setBox({
      show: true,
      message: "해당 리뷰를 삭제하시겠습니까?",
      action: async () => {
        await axios.get(`/recipe/review/delete/${comment_id}`)
        setBox({ show: true, message: "해당 리뷰를 삭제하였습니다." })
        window.location.reload();
      }
    });
  }

  useEffect(() => {
    getComment();
  }, []);

  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>

  return (
    <div className='plantrecipe_comment_wrap'>
      <div className='plantrecipe_comment_contents'>
        <div className='plantrecipe_comment_section'>
          <div className='plantrecipe_comment_count'>
            <span>댓글 ({total})</span>
            <div className='plantrecipe_comment_comment'>
              <Form.Control onChange={(e) => onChangeContents()} value={contents} as="textarea" placeholder='댓글 내용을 입력해주세요.' />
              <button onClick={() => onClickSave()} type='submit'>등록</button>
            </div>
          </div>
          {comments.map(c =>
            <div className='plantrecipe_comment_map'>
              <div className='plantrecipe_comment_info'>
                <div className='plantrecipe_comment_user'>
                  <div className='plantrecipe_comment_userimage'>
                    <img className='plantrecipe_comment_img' src='/image/userimage_01.jpg' />
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
                {(sessionStorage.getItem('uid') === c.uid || sessionStorage.getItem('uid') === 'admin') &&
                  <div className='plantrecipe_comment_btn'>
                    <button className='plantrecipe_comment_update'>수정</button>
                    <button className='plantrecipe_comment_delete' onClick={() => onDelete(c.comment_id)}>삭제</button>
                  </div>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlantRecipeComment