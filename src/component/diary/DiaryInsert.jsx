import React, { useRef, useEffect, useState } from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const DiaryInsert = () => {
    const img_ref = useRef(null);
    const navi = useNavigate();
    const [plants, setplants] = useState([]);
    //const [p_value, setP_value] = useState("");

    //const [diary, setDiary] = useState({
    //    diary_id: "", user_id: "", image: "", contents: "", reg_date: "", last_watering: "", watering: "", common_name: "", date_now:"", date_water:"", date_medicine:"", date_change:"",
    //})

    // const { user_id, plant_name, image, contents, reg_date, fmtdate, waterdate, watering, common_name, date_now, date_water, date_medicine,date_change } = diary;

    const { plant_id } = useParams();

    const [plant, setPlant] = useState({
        plant_id: '', common_name: '', image: '', contents: '', watering: '', sunlight: '', care_level: '', leaf: '',
        flowers: '', fruits: '', type: '', indoor: '', poisonous_pet: '', cuisine: ''
      });
    
      const { common_name, image, contents, watering, sunlight, care_level, leaf, flowers, fruits, type, indoor, poisonous_pet, cuisine } = plant;

    const getList = async () => {
        const res = await axios.get(`/plant/list.json`);
        setplants(res.data.list);
        console.log(plant);
    }

    //const selectValue = ()=>{
    //    {value:{plant_id}}
    //}

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className='plant_wrap'>
            <div className='plant_contents'>
                <div className='text-center'>
                    <h1 className='mt-5'>나의 식물 등록하기</h1>
                    <div className='mt-5'>
                        <img src="http://via.placeholder.com/250x250" onClick={() => img_ref.current.click()} style={{ cursor: 'pointer' }} />
                        <input type='file' ref={img_ref} style={{ display: 'none' }} />
                        <br />
                        <Button className='diary-img-btn'>이미지 수정</Button>
                        <div>
                            <InputGroup className='diary-input'>
                                <InputGroup.Text className='diary-text'>식물 이름</InputGroup.Text>
                                <Form.Control type='text' />
                            </InputGroup>
                            <InputGroup className='diary-input'>
                                <InputGroup.Text className='diary-text'>식물 종류</InputGroup.Text>
                                <Form.Select className='select_box'>
                                    {plants.map(p =>
                                        <option value={p.plant_id} className='text-center'>{p.common_name}</option>
                                    )}
                                </Form.Select>
                            </InputGroup>
                            <InputGroup className='diary-input'>
                                <InputGroup.Text className='diary-text'>분류</InputGroup.Text>
                                <Form.Control type='text' readOnly />
                                <InputGroup.Text className='diary-text'>난이도</InputGroup.Text>
                                <Form.Control type='text' />
                            </InputGroup>
                            <InputGroup className='diary-input'>
                                <InputGroup.Text className='diary-text'>물 주기</InputGroup.Text>
                                <Form.Control type='text' />
                                <InputGroup.Text className='diary-text'>햇빛 주기</InputGroup.Text>
                                <Form.Control type='text' />
                            </InputGroup>

                            <InputGroup className='diary-input-memo'>
                                <Form.Control name='uname' type='text' placeholder='메모장' />
                            </InputGroup>
                        </div>
                        <div className='text-center'>
                            <button className='mt-4 diary-add'>등록</button>
                            <button className='mx-2 diary-add' type='reset'>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryInsert