import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Form, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';

const PlantUpdate = () => {

  const [loading, setLoading] = useState(false);
  const navi = useNavigate();
  const {plant_id} = useParams();
  const [form, setForm] = useState({
    plant_id: '', common_name: '', image: '', contents: '', watering: '', sunlight: '', care_level: '', leaf: '',
    flowers: '', fruits: '', type: '', indoor: '', poisonous_pet: '', cuisine: ''
  });

  const { common_name, image, contents, watering, sunlight, care_level, leaf, flowers, fruits, type, indoor, poisonous_pet, cuisine } = form;

  const getPlant = async () => {
    setLoading(true);
    const res = await axios.get(`/plant/read/${plant_id}`);
    setForm(res.data);
    setLoading(false);
  }

  useEffect(() => {
    getPlant();
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(window.confirm("수정하시겠습니까?")) {
      const res = await axios.post("/plant/update", form);
      if(res.data === 0) {
        alert("수정 실패!");
      }else {
        alert("수정 완료!");
        navi(`/plant/read/${plant_id}`);
      }
    }
  }

  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>

  return (
    <div className='details_wrap'>
      <div className='details_contents'>
        <div className='details_layout'>
          <section className='details_img_section'>
            <div className='details_img'>
              <img src='/image/plant01.jpg'/>
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
                    <InputGroup.Text className='insert_inputgrouptext'>반려동물 안전</InputGroup.Text>
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
                      <button className='insert_submit' type='submit'>등록하기</button>
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