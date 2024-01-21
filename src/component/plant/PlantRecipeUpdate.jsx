import React, { useState, useEffect, useRef } from 'react';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { ref, getDownloadURL, uploadBytes, getStorage, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; //랜덤 식별자를 생성해주는 라이브러리

const PlantRecipeUpdate = () => {
  const { recipe_id } = useParams();
  const navi = useNavigate();
  const array = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [attachment, setAttachment] = useState();
  const img_ref = useRef(null);

  const getRecipeUpdate = async () => {
    setLoading(true);
    const res = await axios.get(`/recipe/read/${recipe_id}`);
    let initialClicked = Array.from({ length: 5 }, (_, i) => i < res.data.level);
    setForm({
      ...res.data,
      level: res.data.level,
    });
    setClicked(initialClicked);
    setLoading(false);
  };

  const { title, description, level, image } = form;

  const onFileChange = (evt) => {
    // 업로드 된 file
    const files = evt.target.files;
    const theFile = files[0];

    // FileReader 생성
    const reader = new FileReader();

    // file 업로드가 완료되면 실행
    reader.onloadend = (finishedEvent) => {
      // 업로드한 이미지 URL 저장
      const result = finishedEvent.currentTarget.result;
      setAttachment(result);
    };
    // 파일 정보를 읽기
    reader.readAsDataURL(theFile);
  };

  const handleStarClick = (index) => {
    setClicked((prevClicked) => {
      let clickStates = [...prevClicked];
      for (let i = 0; i < 5; i++) {
        clickStates[i] = i <= index;
      }
      return clickStates;
    });

    // 난이도 업데이트
    setForm((prevForm) => ({
      ...prevForm,
      level: index + 1,
    }));
  };

  const onChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const storage = getStorage();
    const fileRef = ref(storage, 'plant/' + uuidv4());

    // 이미지를 firebase storage에 업로드
    const response = await uploadString(fileRef, attachment, 'data_url');

    // 업로드한 이미지 url 가져오기
    const downloadURL = await getDownloadURL(fileRef);
    //console.log(downloadURL)

    if (window.confirm("수정하시겠습니까?")) {
      const updateForm = {
        ...form,
        image: downloadURL
      };
      try {
        const res = await axios.post("/recipe/update", updateForm);

        if (res.data === 0) {
          alert("등록 실패!");
        } else {
          alert("수정 완료");
          navi(`/recipe/read/${recipe_id}`);
        }
      } catch (error) {
        console.error("등록 에러 : ", error);
        alert("등록 중 오류가 발생했습니다.")
      }
    }
  }

  useEffect(() => {
    getRecipeUpdate();
  }, []);

  if (loading) return (<div className='text-center my-5'><Spinner animation="border" variant="success" /></div>);

  return (
    <>
      <div className='mainbanner_section'>
        <img className='banner_img' src="/image/header/Recipe.png" />
      </div>
      <div className='recipe_wrap'>
        <div className='recipe_contents'>
          <div className='recipe_contentitem_section'>
            <div className='recipe_readcontents_grid'>
              <div className='recipe_image_section'>
                <form onSubmit={onSubmit}>
                  <img className='recipe_image' src={attachment || image} style={{ cursor: 'pointer' }} value={image} onClick={() => img_ref.current.click()} />
                  <input accept="image/*" type="file" onChange={onFileChange} style={{ display: 'none' }} ref={img_ref} />
                </form>
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
    </>
  );
};

export default PlantRecipeUpdate;