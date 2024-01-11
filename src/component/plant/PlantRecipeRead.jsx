import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const PlantRecipeRead = () => {

  const [loading, setLoading] = useState(false);
  const { recipe_id } = useParams();
  const navi = useNavigate();

  const [recipes, setrecipes] = useState({
    recipe_id: '', title: '', description: '', image: '', level: '', reg_date: ''});

  const {title, description, image, level, reg_date} = recipes;

  const getRecipes = async () => {
    setLoading(true);
    const res = await axios.get(`/recipe/read/${recipe_id}`);
    setrecipes(res.data);
    setLoading(false);
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
                  <p className='recipe_mainwriter_writer'>작성자</p>
                </div>
              </div>
              <div className='recipe_writedate'>
                <p className='recipe_writedate_date'>{reg_date}</p>
              </div>
              <div className='recipe_mainlevel'>
                <p className='recipe_mainlevel_level'>난이도 {level}</p>
              </div>
              <div className='recipe_maindescription'>
                <p className='recipe_maindescription_description'>
                  {description}
                </p>
              </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PlantRecipeRead