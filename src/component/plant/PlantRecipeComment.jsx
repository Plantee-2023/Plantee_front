import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BoxContext } from '../common/BoxContext';


const PlantRecipeComment = ({ recipe_id }) => {
  const navi = useNavigate();
  const location = useLocation();
  const { box, setBox } = useContext(BoxContext);
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState('');
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [recipeid, setRecipeid] = useState(recipe_id);

  const getList = async () => {
    setLoading(true);
    const res = await axios.get(`/recipe/review/${recipe_id}`);
    let data = res.data.reviewlist.map(r => r && { ...r, ellipsis: true, view: true, text: r.contents });
    setList(data);
    setTotal(res.data.reviewtotal);
    setLoading(false);
  }

  useEffect(() => {
    getList();
  }, []);

  const onClickSave = async () => {
    //console.log(content);
    if (contents === "") {
      alert("내용을 작성해주세요!");
    } else {
      const userUid = sessionStorage.getItem('uid');

      if (userUid) {
        const data = { recipe_id, uid: sessionStorage.getItem('uid'), contents }
        setContents(''); // await를 추가하여 상태 업데이트를 기다림
        await axios.post("/recipe/review/insert", data); // await를 추가하여 axios.post가 완료될 때까지 기다림
        console.log(data);
        getList();
      } else {
        setBox({ show: true, message: "로그인 사용자만 이용 가능한 서비스 입니다. 로그인 후 진행해주세요." })
        sessionStorage.setItem("target", location.pathname);
        navi("/users/loginPage");
      }
    }
  };

  const onDelete = async (comment_id) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      await axios.post(`/recipe/delete/${comment_id}`);
      getList();
    }
  }

  const onClickCancel = (comment_id) => {
    const data = list.map(r => r.comment_id === comment_id ? { ...r, view: true, contents: r.text } : r);
    setList(data);
  }

  const onClickUpdate = (comment_id) => {
    const data = list.map((r) =>
      r.comment_id === comment_id
        ? { ...r, editMode: !r.editMode } // 편집 모드를 토글합니다.
        : r
    );
    setList(data);
  };
  const onChangeContent = (e, comment_id) => {
    const data = list.map(r => r.comment_id === comment_id ? { ...r, contents: e.target.value } : r);
    setList(data);
  }

  const onClickUpdateSave = async (comment_id, contents, text) => {
    if (contents === text) {
      onClickCancel(comment_id);
    } else {
      if (window.confirm('리뷰를 수정하시겠습니까?')) {
        //리뷰수정
        await axios.post("/recipe/review/update", { comment_id, contents });
        alert("수정완료!");
        getList();
      }
    }
  }

  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>

  return (
    <>
      <div className='plantrecipe_comment_wrap'>
        <div className='plantrecipe_comment_contents'>
          <div className='plantrecipe_comment_section'>
            <div className='plantrecipe_comment_count'>
              <span>댓글 ({total})</span>
              <div className='plantrecipe_comment_comment'>
                <Form.Control onChange={(e) => setContents(e.target.value)} value={contents} as="textarea" placeholder='댓글 내용을 입력해주세요.' />
                <button onClick={onClickSave} type='submit'>등록</button>
              </div>
            </div>
            {list.map((r) => (
              <div key={r.comment_id} className='plantrecipe_comment_map'>
                <div className='plantrecipe_comment_info'>
                  <div className='plantrecipe_comment_user'>
                    <div className='plantrecipe_comment_userimage'>
                      <img className='plantrecipe_comment_img' src='/image/userimage_01.jpg' />
                    </div>
                    <div className='plantrecipe_comment_usernickname'>
                      <p>{r.nickname}</p>
                    </div>
                  </div>
                  <div className='plantrecipe_comment_date'>
                    <p>{r.reg_date}</p>
                  </div>
                </div>
                <div className='plantrecipe_comment_textcon'>
                  {r.editMode ? (
                    //편집 모드인 경우
                    <Form.Control onChange={(e) => onChangeContent(e, r.comment_id)} value={r.contents} as='textarea' placeholder='내용을 입력해주세요.' />
                  ) : (
                    //편집 모드가 아닌 경우
                    <p>{r.contents}</p>
                  )}
                </div>
                <div className='plantrecipe_comment_iconbtn'>
                  <div className='plantrecipe_comment_icon'>
                    <p>♥️ {r.like_cnt}</p>
                  </div>
                  {sessionStorage.getItem('uid') === r.uid && (
                    <div className='plantrecipe_comment_btn'>
                      {r.editMode ? (
                        //편집 모드인 경우
                        <>
                          <button className='plantrecipe_comment_update' onClick={() => onClickUpdateSave(r.comment_id, r.contents, r.text)}>저장</button>
                          <button className='plantrecipe_comment_delete' onClick={() => onClickCancel(r.comment_id)}>취소</button>
                        </>
                      ) : (
                        //편집 모드가 아닌 경우
                        <>
                          <button className='plantrecipe_comment_update' onClick={() => onClickUpdate(r.comment_id)}>수정</button>
                          <button className='plantrecipe_comment_delete' onClick={() => onDelete(r.comment_id)}>삭제</button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlantRecipeComment