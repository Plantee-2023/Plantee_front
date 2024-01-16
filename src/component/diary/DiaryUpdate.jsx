import React, { useRef, useEffect, useState, useContext } from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { BoxContext } from '../common/BoxContext';
import axios from 'axios';

const DiaryInsert = () => {
    const navi = useNavigate();
    const img_ref = useRef(null);
    const [plants, setplants] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const { box, setBox } = useContext(BoxContext);
    const { diary_id } = useParams();

    const [insertDiary, setinsertDiary] = useState("");

    // const [insertDiary, setinsertDiary] = useState({
    //     diary_id: "",plant_name:"", image: "", contents: "", reg_date: "", fmtdate: "", last_watering: "", watering: "",
    //     common_name: "", date_now: "", date_water: "", date_medicine: "", date_change: "", plant_id: ""
    // });

    const { plant_name, image, contents, reg_date, fmtdate, watering, common_name, date_now, date_water, date_medicine, date_change, plant_id } = insertDiary;

    const onChange = (e) => {
        setinsertDiary({
            ...insertDiary,
            [e.target.name]: e.target.value,
            plant_id: selectedValue,
        });
        console.log(insertDiary);
    }

    const onSubmit = () => {
        setBox({
            show: true,
            message: "새로운 식물을 수정하시겠습니까?",
            action: async () => {
                const res = await axios.post('/diary/update', insertDiary);
                if (res.data === 0) {
                    alert("수정 실패!");
                } else {
                    alert("수정 완료");
                    navi('/diary/main');
                }
            }
        });
    }

    const getList = async () => {
        const res = await axios.get(`/plant/list.json`);
        console.log(res.data.list)
        setplants(res.data.list);
        // console.log(plants);     
    }

    const getDiary = async () => {
        const res = await axios.get(`/diary/read/${diary_id}`);
        console.log(res.data)
        setinsertDiary(res.data);
        console.log(insertDiary);     
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
        getDiary();
    }, []);

    useEffect(() => {
        getList();
    }, []);


    return (
        <div className='plant_wrap'>
            <div className='plant_contents'>
                <div className='text-center'>
                    <h1 className='mt-5'>나의 식물 수정하기</h1>
                    <div className='mt-5'>
                        <img src="http://via.placeholder.com/250x250" onClick={() => img_ref.current.click()} style={{ cursor: 'pointer' }} onChange={onChange} name='image' value={image} />
                        <input type='file' ref={img_ref} style={{ display: 'none' }}  />
                        <br />
                        <Button className='diary-img-btn'>이미지 수정</Button>
                        <div>
                            <InputGroup className='diary-input'>
                                <InputGroup.Text className='diary-text'>식물 이름</InputGroup.Text>
                                <Form.Control type='text' name='plant_name' value={plant_name} onChange={onChange} />
                            </InputGroup>
                            <InputGroup className='diary-input'>
                                <InputGroup.Text className='diary-text'>식물 종류</InputGroup.Text>
                                <Form.Select className='select_box' name="location" onChange={handleChange} value={selectedValue}>
                                    {plants.map(p =>
                                        <option key={p.plant_id} value={p.plant_id} className='text-center'>{p.common_name}</option>
                                    )}
                                </Form.Select>
                                <Form.Control name="plant_id" value={selectedValue} placeholder={selectedValue} hidden />
                            </InputGroup>
                            {plants.map(p => {
                                // p.plant_id와 selectedValue가 같은지 확인하고 같을 때만 해당 정보를 표시합니다.
                                if (p.plant_id == selectedValue) {
                                    return (
                                        <div key={p.plant_id}>
                                            <InputGroup className='diary-input'>
                                                <InputGroup.Text className='diary-text'>분류</InputGroup.Text>
                                                <Form.Control type='text' readOnly placeholder={p.type} className='text-center' />
                                                <InputGroup.Text className='diary-text'>난이도</InputGroup.Text>
                                                <Form.Control type='text' readOnly placeholder={getLevel(p.care_level)} className='text-center' />
                                            </InputGroup>
                                            <InputGroup className='diary-input'>
                                                <InputGroup.Text className='diary-text'>물 주기</InputGroup.Text>
                                                <Form.Control type='text' readOnly placeholder={p.watering} className='text-center' />
                                                <InputGroup.Text className='diary-text'>햇빛 주기</InputGroup.Text>
                                                <Form.Control type='text' readOnly placeholder={p.sunlight} className='text-center' />
                                            </InputGroup>
                                        </div>
                                    );
                                } else {
                                    return null; // p.plant_id와 selectedValue가 다를 때는 아무것도 렌더링하지 않습니다.
                                }
                            })}
                            <InputGroup className='diary-input-memo'>
                                <Form.Control placeholder='메모장' name='contents' value={contents} onChange={onChange} />
                            </InputGroup>
                        </div>
                        <div className='text-center'>
                            <button className='mt-4 diary-add' onClick={() => onSubmit()}>수정</button>
                            <button className='mx-2 diary-add' onClick={() => navi("/diary/calendar")}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryInsert