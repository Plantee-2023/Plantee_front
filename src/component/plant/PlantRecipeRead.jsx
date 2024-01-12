import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { BoxContext } from '../common/BoxContext';

const PlantRecipeRead = () => {

  const [loading, setLoading] = useState(false);
  const { recipe_id } = useParams();
  const navi = useNavigate();
  const { box, setBox } = useContext(BoxContext);

  const [recipes, setrecipes] = useState({
    recipe_id: '', title: '', description: '', image: '', level: '', reg_date: '', nickname: ''});

  const {title, description, image, level, reg_date, nickname} = recipes;

  const getRecipes = async () => {
    setLoading(true);
    const res = await axios.get(`/recipe/read/${recipe_id}`);
    setrecipes(res.data);
    setLoading(false);
  }

  //Date 객체 사용해서 날짜 형식 변환
  const formattedDate = new Date(reg_date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  
  const onDelete = () => {
    setBox({
        show: true,
        message: `[${title}] 레시피를 삭제하시겠습니까?`,
        action: async () => {
            await axios.get(`/recipe/delete/${recipe_id}`)
            setBox({ show: true, message: "해당 레시피를 삭제하였습니다." })
            navi(`/recipe`);
        }
    });
  }

  useEffect(()=> {
    getRecipes();
  }, []);

  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>

  return (
    <div className='recipe_wrap'>
      <div className='recipe_contents'>
        <div className='recipe_contentitem_section'>
          <div className='recipe_readcontents_grid'>
            <div className='recipe_image_section'>
              <img className='recipe_image' src='/image/recipe_01.jpg'/>
            </div>
            <div className='recipe_title_section'>
              <div className='recipe_title_group'>
                <div className='recipe_maintitle'>
                  <h1 className='recipe_maintitle_title'>{title}<img src='/image/like_icon.png'/></h1>
                </div>
                <div className='recipe_mainwriter'>
                  <p className='recipe_mainwriter_writer'>{nickname}</p>
                </div>
              </div>
              <div className='recipe_writedate'>
                <p className='recipe_writedate_date'>{formattedDate}</p>
              </div>
              <div className='recipe_mainlevel'>
                <p className='recipe_mainlevel_level'>난이도 {level}</p>
              </div>
              <div className='recipe_maindescription'>
                <p className='recipe_maindescription_description'>
                  {description}
                </p>
              </div>
              <div className='recipeupdate_btnarea'>
              <NavLink to={`/recipe/update/${recipe_id}`}>
                <button className='recipeupdate_submit'>수정하기</button>
              </NavLink>
              <button className='recipedelete_submit' onClick={()=>onDelete()}>삭제하기</button>
            </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PlantRecipeRead