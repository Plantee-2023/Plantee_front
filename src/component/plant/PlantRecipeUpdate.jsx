import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const PlantRecipeInsert = () => {
  const { recipe_id } = useParams();
  const navi = useNavigate();
  const array = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    level: 0,
    uid: "",
    nickname: "",
  });

  const getRecipeUpdate = async () => {
    setLoading(true);
    const res = await axios.get(`/recipe/read/${recipe_id}`);

    // 기존 난이도를 기반으로 클릭된 상태 초기화
    let initialClicked = Array.from({ length: 5 }, (_, i) => i < res.data.level);
    
    setForm({
      ...res.data,
      level: res.data.level,
    });

    setClicked(initialClicked);
    setLoading(false);
  };

  const { title, description, level } = form;

  useEffect(() => {
    getRecipeUpdate();
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("수정하시겠습니까?")) {
      await axios.post("/recipe/update", form);
      alert("수정완료!");
      navi(`/recipe/read/${recipe_id}`);
    }
  };

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index;
    }
    setClicked(clickStates);

    // 난이도 업데이트
    setForm({
      ...form,
      level: index + 1,
    });
  };

  if (loading)
    return (
      <div className='text-center my-5'>
        <Spinner animation="border" variant="success" />
      </div>
    );

  return (
    <div className='recipe_wrap'>
      <div className='recipe_contents'>
        <div className='recipe_contentitem_section'>
          <div className='recipe_readcontents_grid'>
            <div className='recipe_image_section'>
              <img className='recipe_image' src='/image/recipe_01.jpg' alt='recipe' />
            </div>
            <div className='recipe_title_section'>
              <form className='recipe_insert_area' onSubmit={onSubmit}>
                <div className='recipe_insert_group'>
                  <div className='recipe_insert_title'>
                    <InputGroup>
                      <InputGroup.Text className='recipeinsert_inputgrouptext'>제목</InputGroup.Text>
                      <Form.Control value={title} name='title' onChange={onChange} />
                    </InputGroup>
                  </div>
                </div>
                <div className='recipe_insert_level'>
                  <div className='recipe_insert_leveltext_area'>
                    <p className='recipe_insert_level_text'>난이도</p>
                  </div>
                  <div className='recipe_insert_stars'>
                    {array.map((el) => (
                      <FaStar
                        key={el}
                        onClick={() => handleStarClick(el)}
                        className={clicked[el] && 'yellowStar'}
                        size="20"
                      />
                    ))}
                  </div>
                </div>
                <div className='recipe_insert_description'>
                  <InputGroup>
                    <Form.Control
                      className='recipe_insertdescription_text'
                      value={description}
                      name='description'
                      onChange={onChange}
                      as='textarea'
                    />
                  </InputGroup>
                </div>
                <div className='recipe_update_btnsection'>
                  <div className='recipe_updateinsert_btn'>
                    <button type='submit' className='recipeupdate_submit'>
                      저장하기
                    </button>
                    <NavLink to={`/recipe/read/${recipe_id}`}>
                      <button className='recipeupdate_cancel' onClick={() => getRecipeUpdate()}>
                        취소하기
                      </button>
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantRecipeInsert;