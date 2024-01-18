import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { ref, getDownloadURL, uploadBytes, getStorage, uploadString} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; //랜덤 식별자를 생성해주는 라이브러리

const PlantUpdate = () => {

  const {plant_id} = useParams();
  const [form, setForm] = useState("");
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const [attachment, setAttachment] = useState();
  const img_ref = useRef(null);
  
  const getPlant = async () => {
    setLoading(true);
    const res = await axios.get(`/plant/read/${plant_id}`);
    setForm(res.data);
    setLoading(false);
  }

  const { common_name, image, contents, watering, sunlight, care_level, leaf, flowers, fruits, type, indoor, poisonous_pet, cuisine } = form;

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
    const fileRef = ref(storage, 'plant/' + uuidv4());

    // 이미지를 firebase storage에 업로드
    const response = await uploadString(fileRef, attachment, 'data_url');

    // 업로드한 이미지 url 가져오기
    const downloadURL = await getDownloadURL(fileRef);
    //console.log(downloadURL)

    if(window.confirm("수정하시겠습니까?")) {
      const updateForm = {
        ...form,
        image:downloadURL
      };
      try {
        const res = await axios.post("/plant/update", updateForm);

        if(res.data === 0) {
          alert("등록 실패!");
        }else{
          alert("수정 완료");
          navi(`/plant/read/${plant_id}`);
        }
      } catch(error) {
        console.error("등록 에러 : ", error);
        alert("등록 중 오류가 발생했습니다.")
      }
    }
  }

  useEffect(() => {
    getPlant();
  }, []);

  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>

  return (
    <div className='details_wrap'>
      <div className='details_contents'>
        <div className='details_layout'>
          <section className='details_img_section'>
            <div className='details_img'>
            <form onSubmit={onSubmit}>
                <img className='plant_image' src={attachment} style={{cursor:'pointer'}} value={image} onClick={() => img_ref.current.click()}/>
                <input accept="image/*" type="file" onChange={onFileChange} style={{display:'none'}} ref={img_ref}/>
              </form>
            </div>
          </section>
          <div className='details_info_layout'>
            <section className='details_info_section'>
              <section className='details_title_section'>
                <div className='detail_logo'>Plantee<img src='/image/carelevel_icon.png'/></div>
                
              </section>
              <section className='insert_simpleinfo_section'>
                <form className='insert_textarea' onSubmit={onSubmit}>
                  <div className='insert_title'>
                  <InputGroup>
                    <InputGroup.Text className='insert_inputgrouptext'>이름</InputGroup.Text>
                    <Form.Control value={common_name} name='common_name' onChange={onChange}/>
                  </InputGroup>
                  </div>

                  <div className='insert_info'>
                  <InputGroup>
                    <InputGroup.Text className='insert_inputgrouptext'>타입</InputGroup.Text>
                    <Form.Select value={type} name='type' onChange={onChange}>
                      <option value='잎'>잎을 감상하는</option>
                      <option value='꽃'>꽃을 감상하는</option>
                      <option value='열매'>열매를 감상하는</option>
                      <option value='다육'>다육</option>
                    </Form.Select>
                  </InputGroup>
                  </div>

                  <div className='insert_info'>
                  <InputGroup className='insert_inputgroup'>
                    <InputGroup.Text className='insert_inputgrouptext'>물 주기</InputGroup.Text>
                    <Form.Control placeholder='*단위:(일)' value={watering} name='watering' onChange={onChange}/>
                  </InputGroup>
                  </div>

                  <div className='insert_info'>
                  <InputGroup className='insert_inputgroup'>
                    <InputGroup.Text className='insert_inputgrouptext'>햇빛</InputGroup.Text>
                    <Form.Control placeholder='*단위:(시간)' value={sunlight} name='sunlight' onChange={onChange}/>
                  </InputGroup>
                  </div>

                  <div className='insert_info'>
                  <InputGroup className='insert_inputgroup'>
                    <InputGroup.Text className='insert_inputgrouptext'>난이도</InputGroup.Text>
                    <Form.Select value={care_level} name='care_level' onChange={onChange}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                    </Form.Select>
                  </InputGroup>
                  </div>

                  <div className='insert_info'>
                  <InputGroup className='insert_inputgroup'>
                    <InputGroup.Text className='insert_inputgrouptext'>잎의 유/무</InputGroup.Text>
                    <Form.Select value={leaf} name='leaf' onChange={onChange}>
                      <option value='y'>y</option>
                      <option value='n'>n</option>
                    </Form.Select>
                  </InputGroup>
                  </div>

                  <div className='insert_info'>
                  <InputGroup className='insert_inputgroup'>
                    <InputGroup.Text className='insert_inputgrouptext'>꽃의 유/무</InputGroup.Text>
                    <Form.Select value={flowers} name='flowers' onChange={onChange}>
                      <option value='y'>y</option>
                      <option value='n'>n</option>
                    </Form.Select>
                  </InputGroup>
                  </div>

                  <div className='insert_info'>
                  <InputGroup className='insert_inputgroup'>
                    <InputGroup.Text className='insert_inputgrouptext'>열매의 유/무</InputGroup.Text>
                    <Form.Select value={fruits} name='fruits' onChange={onChange}>
                      <option value='y'>y</option>
                      <option value='n'>n</option>
                    </Form.Select>
                  </InputGroup>
                  </div>

                  <div className='insert_info'>
                  <InputGroup className='insert_inputgroup'>
                    <InputGroup.Text className='insert_inputgrouptext'>실내/실외</InputGroup.Text>
                    <Form.Select value={indoor} name='indoor' onChange={onChange}>
                      <option value='y'>실내</option>
                      <option value='n'>실외</option>
                    </Form.Select>
                  </InputGroup>
                  </div>

                  <div className='insert_info'>
                  <InputGroup className='insert_inputgroup'>
                    <InputGroup.Text className='insert_inputgrouptext'>독성(반려안전)</InputGroup.Text>
                    <Form.Select value={poisonous_pet} name='poisonous_pet' onChange={onChange}>
                      <option value='y'>y</option>
                      <option value='n'>n</option>
                    </Form.Select>
                  </InputGroup>
                  </div>

                  <div className='insert_info'>
                  <InputGroup className='insert_inputgroup'>
                    <InputGroup.Text className='insert_inputgrouptext'>식용 가능</InputGroup.Text>
                    <Form.Select value={cuisine} name='cuisine' onChange={onChange}>
                      <option value='y'>y</option>
                      <option value='n'>n</option>
                    </Form.Select>
                  </InputGroup>
                  </div>

                  <div className='insert_contents'>
                  <InputGroup className='insert_inputgroup'>
                    <Form.Control className='insert_contents_form' value={contents} name='contents' onChange={onChange} as='textarea'/>
                  </InputGroup>
                  </div>
                  <div className='plantinsert_section'>
                    <div className='plantinsert_btngroup'>
                      <button className='insert_submit' type='submit'>저장하기</button>
                      <NavLink to={`/plant/read/${plant_id}`}>
                        <button className='insert_cancel' onClick={()=>getPlant()}>취소하기</button>
                      </NavLink>
                    </div>
                  </div>
                </form>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlantUpdate