import React, { useState, useEffect, useRef } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { ref, getDownloadURL, uploadBytes, getStorage, uploadString} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; //랜덤 식별자를 생성해주는 라이브러리

const PlantRecipeInsert = ({recipe_id}) => {

  const navi = useNavigate();
  const array = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [attachment, setAttachment] = useState();
  const img_ref = useRef(null);
  
  const [form, setForm] = useState({
    recipe_id: '', title: '', description: '', image: '', level: '', reg_date: '', uid: sessionStorage.getItem('uid'), nickname: ''});

  const { title, description, image, level, uid, nickname } = form;

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

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    const storage = getStorage();
    const fileRef = ref(storage, 'recipe/' + uuidv4());

    // 이미지를 firebase storage에 업로드
    const response = await uploadString(fileRef, attachment, 'data_url');

    // 업로드한 이미지 url 가져오기
    const downloadURL = await getDownloadURL(fileRef);
    //console.log(downloadURL)

    if(window.confirm("레시피를 등록하시겠습니까?")){
      const updateForm = {
        recipe_id,
        uid : sessionStorage.getItem('uid'),
        nickname,
        title,
        description,
        level:clicked.filter(Boolean).length,
        image:downloadURL
      };

      try {
        // 서버에 업데이트된 form을 전송
        const res = await axios.post('/recipe/insert', updateForm);

        if(res.data === 0) {
          alert("등록 실패!");
        }else{
          alert("등록 완료");
          navi('/recipe');
        }
      } catch(error) {
        console.error("등록 에러 : ", error);
        alert("등록 중 오류가 발생했습니다.");
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

  useEffect(()=> {
    
  }, []);
  
  return (
    <div className='recipe_wrap'>
      <div className='recipe_contents'>
        <div className='recipe_contentitem_section'>
          <div className='recipe_readcontents_grid'>
            <div className='recipe_image_section'>
              <form onSubmit={onSubmit}>
                <img className='recipe_image' src={attachment || "http://via.placeholder.com/500x600"} style={{cursor:'pointer'}} value={image} onClick={() => img_ref.current.click()}/>
                <input accept="image/*" type="file" onChange={onFileChange} style={{display:'none'}} ref={img_ref}/>
              </form>
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