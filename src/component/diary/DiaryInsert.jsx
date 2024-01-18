import React, { useRef, useEffect, useState, useContext } from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { BoxContext } from '../common/BoxContext';
import axios from 'axios';
import { ref, getDownloadURL, uploadBytes, getStorage, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; //랜덤 식별자를 생성해주는 라이브러리

const DiaryInsert = () => {
    const [attachment, setAttachment] = useState();

    const navi = useNavigate();
    const img_ref = useRef(null);
    const [plants, setplants] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const { box, setBox } = useContext(BoxContext);

    const [insertDiary, setinsertDiary] = useState({
        diary_id: "", image: "", contents: "", reg_date: "", fmtdate: "", last_watering: "", watering: "",
        common_name: "", date_now: "", date_water: "", date_medicine: "", date_change: "", plant_id: "", uid: ""

    });

    const { plant_name, image, contents, reg_date, fmtdate, waterdate, watering, common_name, date_now, date_water, date_medicine, date_change, plant_id, uid } = insertDiary;

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
        setinsertDiary({
            ...insertDiary,
            [e.target.name]: e.target.value,
            plant_id: selectedValue,
            uid: sessionStorage.getItem('uid')
        });
        console.log(insertDiary);
    }

    const getList = async () => {
        const res = await axios.get(`/plant/list.json`);
        setplants(res.data.list);
        console.log(plants);
    }
    useEffect(() => {
        getList();
    }, []);

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


    const handleChange = (event) => {
        const selectedOption = event.target.value;
        console.log(selectedOption); // 선택한 값 가져오기
        setSelectedValue(selectedOption);
    };
    
    const onSubmit = async () => {
        const storage = getStorage();
        const fileRef = ref(storage, 'diary/' + uuidv4());

        // 이미지를 firebase storage에 업로드
        const response = await uploadString(fileRef, attachment, 'data_url');

        // 업로드한 이미지 url 가져오기
        const downloadURL = await getDownloadURL(fileRef);
        //console.log(downloadURL)

        if (window.confirm("레시피를 등록하시겠습니까?")) {
            const updateForm = {
                ...insertDiary,
                image: downloadURL
            };
            try {
                // 서버에 업데이트된 form을 전송
                const res = await axios.post('/diary/insert', updateForm);
                if (res.data === 0) {
                    alert("등록 실패!");
                } else {
                    alert("등록 완료");
                    navi('/diary/main');
                }
            } catch (error) {
                console.error("등록 에러 : ", error);
                alert("등록 중 오류가 발생했습니다.");
            }
        }
    }
    return (
        <div className='plant_wrap'>
            <div className='plant_contents'>
                <div className='text-center'>
                    <h1 className='mt-5'>나의 식물 등록하기</h1>
                    <div className='mt-5'>
                        <form onSubmit={onSubmit}>
                            <img src={attachment || "http://via.placeholder.com/250x250"} onClick={() => img_ref.current.click()} style={{ cursor: 'pointer' }} value={image} />
                            <input type='file' ref={img_ref} style={{ display: 'none' }} onChange={onFileChange} />
                            <br />
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
                                <button className='mt-4 diary-add' type='submit'>등록</button>
                                <button className='mx-2 diary-add' >취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DiaryInsert