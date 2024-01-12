import React, { useState, useEffect } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const PlantRecipeInsert = ({recipe_id}) => {

  const navi = useNavigate();
  const array = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  
  const [form, setForm] = useState({
    recipe_id: '', title: '', description: '', image: '', level: '', reg_date: '', uid: sessionStorage.getItem('uid'), nickname: ''});

  const { title, description, image, level, uid, nickname } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(window.confirm("레시피를 등록하시겠습니까?")){
      form.level = clicked.filter(Boolean).length;
      const res = {recipe_id, uid:sessionStorage.getItem('uid'), nickname, title, description, level}
      await axios.post('/recipe/insert', form);
      if(res.data === 0) {
        alert("등록 실패!");
      }else{
        alert("등록 완료");
        navi('/recipe');
      }
    }
  }

  const handleStarClick = index => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  
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
                  {array.map((el) => (
                    <FaStar key={el} onClick={() => handleStarClick(el)} value={level}
                      className={clicked[el] && 'yellowStar'} size="20"/>))}
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