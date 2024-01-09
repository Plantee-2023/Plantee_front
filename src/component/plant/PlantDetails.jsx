import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';

const PlantDetails = () => {

  const [loading, setLoading] = useState(false);

  const { plant_id } = useParams();

  const [plant, setPlant] = useState({
    plant_id: '', common_name: '', image: '', contents: '', watering: '', sunlight: '', care_level: '', leaf: '',
    flowers: '', fruits: '', type: '', indoor: '', poisonous_pet: '', cuisine: ''
  });

  const { common_name, image, contents, watering, sunlight, care_level, leaf, flowers, fruits, type, indoor, poisonous_pet, cuisine } = plant;

  const getPlant = async () => {
    setLoading(true);
    const res = await axios.get(`/plant/read/${plant_id}`);
    setPlant(res.data);
    setLoading(false);
  };

  {/* 텍스트 변환 */}
  const getCareLevelText = (care_level) => {
    switch(care_level) {
      case '1':
        return '초보자용';
      case '2':
        return '중급자용';
      default:
        return '상급자용';
    }
  };

  const getIndoorText = (indoor) => {
    switch(indoor) {
      case 'y':
        return '실내용';
      default:
        return '실외용';
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
              <img src='/image/plant01.jpg'/>
            </div>
          </section>
          <div className='details_info_layout'>
            <section className='details_info_section'>
              <section className='details_title_section'>
                <div className='detail_logo'>Plantee<img src='/image/carelevel_icon.png'/></div>
                <div className='details_title'>
                  <h1 className='details_maintitle'>{common_name}</h1>
                </div>
              </section>
              <section className='details_simpleinfo_section'>
                <ul className='plant_items'>
                  {type && <li className='plant_item'># {type}</li>}
                  {care_level && <li className='plant_item'># {getCareLevelText(care_level)}</li>}
                  {indoor && <li className='plant_item'># {getIndoorText(indoor)}</li>}
                  {leaf === 'y' && <li className='plant_item'># 잎이 있는</li>}
                  {flowers === 'y' && <li className='plant_item'># 꽃이 있는</li>}
                  {fruits === 'y' && <li className='plant_item'># 열매가 있는</li>}
                  {poisonous_pet === 'n' && <li className='plant_item'># 반려안전</li>}
                  {cuisine === 'y' && <li className='plant_item'># 식용가능</li>}
                </ul>
                <section className='details_detailinfo_section'>
                  <div className='detailinfo_group'>
                    <ul className='detailinfo_items'>
                      <li className='detailinfo_item'>
                        <img src='/image/water_icon.png'/>
                        <p className='detailinfo_item_content'>물</p>
                        <p>{watering}일 주기</p>
                      </li>
                      <li className='detailinfo_item'>
                        <img src='/image/sun_icon.png'/>
                        <p className='detailinfo_item_content'>햇빛</p>
                        <p>{sunlight}시간 정도</p>
                      </li>
                    </ul>
                  </div>
                </section>
                <p className='plant_info_text'>{contents}</p>
              </section>
              {/* 관리자 */}
                {sessionStorage.getItem('uid') === 'admin' &&
                    <div className='update_btnarea'>
                      <NavLink to={`/plant/update/${plant_id}`}>
                        <button className='update_submit'>수정하기</button>
                      </NavLink>
                    </div>
                }
            </section>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default PlantDetails