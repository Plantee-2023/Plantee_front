import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { BoxContext } from '../common/BoxContext';
import { FaStar } from 'react-icons/fa';
import PlantRecipeComment from './PlantRecipeComment';

const PlantRecipeRead = () => {

  const [loading, setLoading] = useState(false);
  const { recipe_id } = useParams();
  const navi = useNavigate();
  const { box, setBox } = useContext(BoxContext);

  const [recipes, setrecipes] = useState({
    recipe_id: '', title: '', description: '', image: '', level: '', reg_date: '', nickname: '', mdfy_date:''});

  const {title, description, image, level, reg_date, nickname, mdfy_date} = recipes;

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

  //Date 객체 사용해서 날짜 형식 변환
  const formattedModifiedDate = new Date(mdfy_date).toLocaleDateString("ko-KR", {
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
              <img className='recipe_image' src={image}/>
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
                {mdfy_date ? (
                    <p className='recipe_writedate_date'>{formattedModifiedDate}</p>
                  ) : (
                    <p className='recipe_writedate_date'>{formattedDate}</p>
                  )}
              </div>
              <div className='recipe_mainlevel'>
                <span className='recipe_mainleveltext'>난이도</span> 
                {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={index < parseInt(level) ? 'yellowStar' : 'grayStar'} size="20"/>
                ))}
              </div>
              <div className='recipe_maindescription'>
                {/* <p className='recipe_maindescription_description'>
                  {description}
                </p> */}
                {description.split('\n').map((line) => {
                  return (
                  <span>{line}<br /></span>
                  );
                })}
              </div>

              {(sessionStorage.getItem('uid') === recipes.uid || sessionStorage.getItem('uid') === 'admin') &&
                <div className='recipeupdate_btnarea'>
                <NavLink to={`/recipe/update/${recipe_id}`}>
                  <button className='recipeupdate_submit'>수정하기</button>
                </NavLink>
                <button className='recipedelete_submit' onClick={()=>onDelete()}>삭제하기</button>
                </div>
              }
            </div>
            </div>
        </div>
        <PlantRecipeComment recipe_id={recipe_id}/>
      </div>
    </div>
  )
}

export default PlantRecipeRead