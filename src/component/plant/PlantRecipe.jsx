import React, { useContext, useEffect, useState } from 'react';
import { BoxContext } from '../common/BoxContext';
import { useNavigate } from 'react-router-dom';
import { InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';

const PlantRecipe = () => {

  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const { box, setBox } = useContext(BoxContext);
  const [recipe, setrecipe] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareLevel, setSelectedCareLevel] = useState(null);

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
    setLoading(true);
    try {
      const res = await axios.get(`/recipe/list.json`);
  
      // 'admin' 사용자의 게시물을 맨 위로 올리기 위한 정렬
      const sortedList = res.data.list.sort((a, b) => {
        if (a.uid === 'admin' && b.uid !== 'admin') return -1; // admin의 게시물은 먼저 정렬
        if (a.uid !== 'admin' && b.uid === 'admin') return 1;  // admin의 게시물은 먼저 정렬
        return 0; // 다른 경우에는 순서를 변경하지 않음
      });
  
      setrecipe(sortedList);
      setTotal(res.data.total);
    } catch (error) {
      console.error('에러 : ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCareLevelFilter = (careLevel) => {
    setSelectedCareLevel((prevCareLevel) => (prevCareLevel === careLevel ? null : careLevel));
  };

  const filteredList = recipe.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
  
  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>

  return (
    <>
      <div className='mainbanner_section'>
        <img className='banner_img' src="/image/header/Recipe.png" />
      </div>
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
              <a type='button' onClick={() => handleCareLevelFilter(1)}>난이도순</a>
            </div>
          </div>
          <div className='recipe_btn'>
            <button className='recipe_insert' onClick={() => onClickInsertRecipe()}>글쓰기</button>
          </div>
        </div>
        <div className='plant_data'>
          <div className='plant_layout'>
            <div className='plant_total'>
              <span>총 레시피 수 : <strong>{total}</strong></span>
            </div>
            <div className='search_input_wrap'>
              <form>
                <InputGroup className='search_input_inputgroup'>
                  <input type='search' className='search_input_textinput' placeholder='검색어를 입력해주세요.' value={searchTerm} onChange={handleSearchChange}/>
                  <button className='search_input_searchbtn' type='submit'><img src='/image/search_icon.png' /></button>
                </InputGroup>
              </form>
            </div>
          </div>
        </div>
        <div className='recipe_contents_section'>
          <div className='recipe_contents_grid'>
            {filteredList.map(r => 
              <a href={`/recipe/read/${r.recipe_id}`}>
                <div className='recipe_content_item'>
                  <img src={r.image}/>
                  <p className='recipe_title'>{r.title}</p>
                  <p className='recipe_writer'>{r.nickname}</p>
                    <div className='recipe_content_level'>
                      <span className='recipe_level'><img src='/image/recipe_level.png'/>{getCareLevelText(r.level)}</span>
                      {/* <span className='recipe_like'><img src='/image/like_icon.png'/> 4</span> */}
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PlantRecipe