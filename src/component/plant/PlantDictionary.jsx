import React, { useEffect, useState } from 'react';
import './Plant.css';
import { InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BtnToTop from '../common/BtnToTop';

const PlantDictionary = () => {

  const [loading, setLoading] = useState(false);
  const [plants, setplants] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCareLevel, setSelectedCareLevel] = useState(null);

  const getList = async () => {
    setLoading(true)
    const res = await axios.get(`/plant/list.json`);
    //console.log('API Response:', res.data);
    setplants(res.data.list)
    setTotal(res.data.total)
    setLoading(false);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCareLevelFilter = (careLevel) => {
    setSelectedCareLevel(careLevel);
  };

  const filteredList = plants.filter((item) => {
    const nameMatches = item.common_name.toLowerCase().includes(searchTerm.toLowerCase());
    const careLevelMatches = selectedCareLevel ? item.care_level == selectedCareLevel : true;
    return nameMatches && careLevelMatches;
  });

  useEffect(() => {
    getList();
  }, []);

  if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>

  return (
    <div className='plant_wrap'>
      <div className='plant_contents'>
        <div className='first_filter_section'>
          <div className='first_filter_between'>
            <ul className='filter_list'>
              <button className={`filter_reset_btn ${selectedCareLevel === null ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(null)}>
                <img src='/image/reset_icon.png' alt='reset icon' />
              </button>
              <button className={`filter_btn ${selectedCareLevel === 1 ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(1)}>
                초보자용
              </button>
              <button className={`filter_btn ${selectedCareLevel === 2 ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(2)}>
                중급자용
              </button>
              <button className={`filter_btn ${selectedCareLevel === 3 ? 'active' : ''}`} type='button' onClick={() => handleCareLevelFilter(3)}>
                상급자용
              </button>
            </ul>
          </div>
          <div className='plant_admin_insert'>
            {/* 관리자 */}
            {sessionStorage.getItem('uid') === 'admin' &&
              <div className='plant_insert'>
                <Link to="/plant/insert"><button>추가하기</button></Link>
              </div>
            }
          </div>
        </div>
        <div className='plant_data'>
          <div className='plant_layout'>
            <div className='plant_total'>
              <span>총 식물 데이터 : <strong>{total}</strong> </span>
            </div>
            <div className='search_input_wrap'>
              <form>
                <InputGroup className='search_input_inputgroup'>
                  <input type='search' className='search_input_textinput' placeholder='검색어를 입력해주세요.' value={searchTerm} onChange={handleSearchChange} />
                  <button className='search_input_searchbtn' type='submit'><img src='/image/search_icon.png' /></button>
                </InputGroup>
              </form>
            </div>
          </div>
        </div>



        <div className='plantlist_contents_section'>
          <div className='plantlist_contents_grid'>
            {filteredList.map(p =>
              <a href={`/plant/read/${p.plant_id}`}>
                <div className='plantlist_contents_item'>
                  <img src={p.image} />
                  <p className='plantlist_commonname'>{p.common_name}</p>
                </div>
              </a>
            )}
          </div>
        </div>
        <BtnToTop/>
      </div>
    </div>
  )
}

export default PlantDictionary