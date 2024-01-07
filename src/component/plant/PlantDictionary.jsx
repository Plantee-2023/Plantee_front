import React, { useEffect, useState } from 'react';
import './Plant.css';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

const PlantDictionary = () => {

  const [loading, setLoading] = useState(false);
  const [activeBtn, setActiveBtn] = useState(null);
  const [plants, setplants] = useState([]);
  const [total, setTotal] = useState(0);

  const toggleSection = (btnName) => {
    setActiveBtn(activeBtn === btnName ? null : btnName);
  };

  const resetFilters = () => {
    setActiveBtn(null);
  };

  const getList = async () => {
      setLoading(true)
      const res = await axios.get(`/plant/list.json`);
      setplants(res.data.list)
      setTotal(res.data.total)
      setLoading(false);
  }

  useEffect(() =>{
    getList();
  }, []);

  const renderFilterSection = (btnName) => {
    if (activeBtn === btnName) {
      return (
        <div className='second_filter_section'>
          <div className='filter_division'></div>
          <ul className='filter_list'>
            <button className='filter_btn' type='button'>잎</button>
            <button className='filter_btn' type='button'>꽃</button>
            <button className='filter_btn' type='button'>열매</button>
            <button className='filter_btn' type='button'>다육</button>
            <button className='filter_btn' type='button'>실내</button>
            <button className='filter_btn' type='button'>실외</button>
            <button className='filter_btn' type='button'>반려안전</button>
            <button className='filter_btn' type='button'>식용</button>
          </ul>
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>

  return (
    <div className='plant_wrap'>
      <div className='plant_contents'>
        <div className='first_filter_section'>
          <ul className='filter_list'>
            <button className='filter_reset_btn' type='button'><img src='/image/reset_icon.png' onClick={resetFilters} /></button>
            <button className={`filter_btn ${activeBtn === '초보자용' ? 'active' : ''}`} type='button' onClick={() => toggleSection('초보자용')}>초보자용</button>
            <button className={`filter_btn ${activeBtn === '중급자용' ? 'active' : ''}`} type='button' onClick={() => toggleSection('중급자용')}>중급자용</button>
            <button className={`filter_btn ${activeBtn === '상급자용' ? 'active' : ''}`} type='button' onClick={() => toggleSection('상급자용')}>상급자용</button>
          </ul>
        </div>

        {renderFilterSection('초보자용')}
        {renderFilterSection('중급자용')}
        {renderFilterSection('상급자용')}

        <div className='plant_data'>
          <div className='plant_layout'>
            <div className='plant_total'>
            <span>총 식물 데이터 : <strong>{total}</strong> </span>
            </div>
            <div className='plant_filter'>
              <button>인기순</button>
              <span>|</span>
              <button>최신순</button>
            </div>
          </div>
        </div>
        <div className='plant_list'>
          <ul className='plant_list_items'>
            {plants.map(p =>
              <div className='plant_list_item'>
                <a href={`/plant/read/${p.plant_id}`}>
                  <div className='plant_image'>
                    <img src='/image/plant01.jpg'/>
                  </div>
                  <div className='plant_title'>
                    <h3>{p.common_name}</h3>
                  </div>
                </a>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PlantDictionary