import React, { useContext, useEffect, useState } from 'react';
import { BoxContext } from '../common/BoxContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

const PlantRecipe = () => {

  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const { box, setBox } = useContext(BoxContext);
  const [recipe, setrecipe] = useState([]);
  const [total, setTotal] = useState(0);

  // 레시피 글쓰기 버튼 클릭 시
  const onClickInsertRecipe = () => {
    if (sessionStorage.getItem("uid")){
      navi('/recipe/insert');
    } else {
      setBox({ show: true, message: "로그인 사용자만 이용 가능한 서비스 입니다. 로그인 후 진행해주세요." })
            // sessionStorage.setItem("target", location.pathname);
            navi("/users/loginPage");
    }
  }

  const getList = async () => {
    setLoading(true)
    const res = await axios.get(`/recipe/list.json`);
    setrecipe(res.data.list)
    setTotal(res.data.total)
    setLoading(false);
  }

  useEffect(() =>{
    getList();
  }, []);

  {/* 텍스트 변환 */}
  const getCareLevelText = (care_level) => {
    switch(care_level) {
      case 1:
        return '초보자용';
      case 2:
        return '초보자용';
      case 3:
        return '중급자용';
      case 4:
        return '상급자용';
      default:
        return '상급자용';
    }
  };

  const onDelete = async () => {
    setBox({
      show: true,
      //message: `[${title}] 레시피를 삭제하시겠습니까?`,
      action: async () => {
        //await axios.get(`/plant/delete/${recipe_id}`)
        setBox({show: true, message: "해당 레시피를 삭제하였습니다."})
        navi('/recipe')
      }
    })
  }

  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>

  return (
    <div className='recipe_wrap'>
      <div className='recipe_contents'>
        <div className='recipe_select_section'>
          <div className='recipe_filter'>
            <div className='recipe_select'>
              <a>최신순</a>
            </div>
            <div className='recipe_select'>
              <a>인기순</a>
            </div>
            <div className='recipe_select'>
              <a>난이도순</a>
            </div>
          </div>
          <div className='recipe_btn'>
            <button className='recipe_insert' onClick={() => onClickInsertRecipe()}>글쓰기</button>
          </div>
        </div>

        <div className='recipe_total_section'>
          <span>총 레시피 수 : <strong>{total}</strong></span>
        </div>

        <div className='recipe_contents_section'>
          <div className='recipe_contents_grid'>
            {recipe.map(r => 
              <a href={`/recipe/read/${r.recipe_id}`}>
                <div className='recipe_content_item'>
                  <img src='/image/recipe_01.jpg'/>
                  <p className='recipe_title'>{r.title}</p>
                  <p className='recipe_writer'>{r.nickname}</p>
                    <div className='recipe_content_level'>
                      <span className='recipe_level'><img src='/image/recipe_level.png'/>{getCareLevelText(r.level)}</span>
                      <span className='recipe_like'><img src='/image/like_icon.png'/> 4</span>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlantRecipe