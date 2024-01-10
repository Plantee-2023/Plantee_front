import React, { useRef, useEffect, useState } from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const DiaryInsert = () => {
    const img_ref = useRef(null);
    const navi = useNavigate();
    const [plants, setplants] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const getList = async () => {
        const res = await axios.get(`/plant/list.json`);
        setplants(res.data.list);
        console.log(plants);
        // sessionStorage에서 'plant_id' 키에 해당하는 값을 가져옵니다.
        var plantId = sessionStorage.getItem('plant_id');

        // 가져온 값을 출력하거나 다른 작업에 활용할 수 있습니다.
        console.log("plant_id의 값:", plantId);
    }
   
    const handleChange = (event) => {
        const selectedOption = event.target.value;
        console.log(selectedOption); // 선택한 값 가져오기
        setSelectedValue(selectedOption);

    };

    const getLevel = (care_level) => {
        switch (care_level) {
            case '1':
                return '초보자용';
            case '2':
                return '중급자용';
            default:
                return '상급자용';
        }
    };

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
                                <Form.Select className='select_box' name="location" onChange={handleChange} value={selectedValue}>
                                    {plants.map(p =>
                                        <option name="" value={p.plant_id} className='text-center'>{p.common_name}</option>
                                    )}
                                </Form.Select>
                            </InputGroup>
                            {plants.map(p => {
                                // p.plant_id와 selectedValue가 같은지 확인하고 같을 때만 해당 정보를 표시합니다.
                                if (p.plant_id == selectedValue) {
                                    return (
                                        <>
                                            <InputGroup className='diary-input'>
                                                <InputGroup.Text className='diary-text'>분류</InputGroup.Text>
                                                <Form.Control type='text' readOnly placeholder={p.type} className='text-center'/>
                                                <InputGroup.Text className='diary-text'>난이도</InputGroup.Text>
                                                <Form.Control type='text' readOnly placeholder={getLevel(p.care_level)} className='text-center'/>
                                            </InputGroup>
                                            <InputGroup className='diary-input'>
                                                <InputGroup.Text className='diary-text'>물 주기</InputGroup.Text>
                                                <Form.Control type='text' readOnly placeholder={p.watering} className='text-center'/>
                                                <InputGroup.Text className='diary-text'>햇빛 주기</InputGroup.Text>
                                                <Form.Control type='text' readOnly placeholder={p.sunlight} className='text-center'/>
                                            </InputGroup>
                                        </>
                                    );
                                } else {
                                    return null; // p.plant_id와 selectedValue가 다를 때는 아무것도 렌더링하지 않습니다.
                                }
                            })}
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