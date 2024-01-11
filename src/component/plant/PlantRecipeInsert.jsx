import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { HiStar } from "react-icons/hi2";
import axios from 'axios';

const PlantRecipeInsert = () => {

  const navi = useNavigate();
  const Array = [0, 1, 2, 3, 4];
  
  const [form, setForm] = useState({
    recipe_id: '', title: '', description: '', image: '', levle: '', reg_date: ''});

  const { recipe_id, title, description, image, levle, reg_date } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(window.confirm("레시피를 등록하시겠습니까?")){
      const res = await axios.post('/recipe/insert', form);
      if(res.data === 0) {
        alert("등록 실패!");
      }else{
        alert("등록 완료");
        navi('/recipe');
      }
    }
  }

  {/* 텍스트 변환 */}
  const getCookLevelText = (level) => {
    switch(level) {
      case '1':
        return '초급';
      case '2':
        return '초급';
      case '3':
        return '중급';
      case '4':
        return '중급';
      case '5':
          return '고급';
    }
  }

  return (
    <div className='recipe_wrap'>
      <div className='recipe_contents'>
        <div className='recipe_contentitem_section'>
          <div className='recipe_readcontents_grid'>
            <div className='recipe_image_section'>
              <img className='recipe_image' src='/image/recipe_01.jpg'/>
            </div>
            <div className='recipe_title_section'>
              <form className='recipe_insert_area' onSubmit={onSubmit}>
                <div className='recipe_insert_group'>
                  <div className='recipe_insert_title'>
                    <InputGroup>
                      <InputGroup.Text className='recipeinsert_inputgrouptext'>제목</InputGroup.Text>
                      <Form.Control value={title} name='title' onChange={onChange}/>
                    </InputGroup>
                  </div>
                </div>
                <div className='recipe_insert_level'>
                  <div className='recipe_insert_leveltext_area'>
                    <p className='recipe_insert_level_text'>난이도</p>
                  </div>
                  <div className='recipe_insert_stars'>
                    {Array.map((index) => (
                      <HiStar className='insert_star' key={index} size="20"></HiStar>
                    ))}
                  </div>
                </div>
                <div className='recipe_insert_description'>
                  <InputGroup>
                    <Form.Control className='recipe_insertdescription_text' value={description} name='description' onChange={onChange} as='textarea'/>
                  </InputGroup>
                </div>
                <div className='recipe_insert_btnsection'>
                  <div className='recipe_insert_btn'>
                    <button type='submit'>등록하기</button>
                  </div>
                </div>
              </form>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PlantRecipeInsert