import React, { useRef } from 'react'
import { Button, InputGroup, Form, Dropdown, DropdownButton } from 'react-bootstrap'
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const DiaryInsert = () => {
    const img_ref = useRef(null);

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
                                <Form.Control name='uname' type='text' />
                            </InputGroup>
                            <InputGroup className='diary-input'>
                                <InputGroup.Text className='diary-text'>식물 종류</InputGroup.Text>
                                <Form.Select className='select_box'>
                                    <option>화분 선택 (*옵션)</option>
                                    <option>스투키</option>
                                    <option>알로에</option>
                                    <option>선인장</option>
                                </Form.Select>
                            </InputGroup>
                            <InputGroup className='diary-input'>
                                <InputGroup.Text className='diary-text'>분류</InputGroup.Text>
                                <Form.Control name='uname' type='text' />
                                <InputGroup.Text className='diary-text'>난이도</InputGroup.Text>
                                <Form.Control name='uname' type='text' />
                            </InputGroup>
                            <InputGroup className='diary-input'>
                                <InputGroup.Text className='diary-text'>물 주기</InputGroup.Text>
                                <Form.Control name='uname' type='text' />
                                <InputGroup.Text className='diary-text'>햇빛 주기</InputGroup.Text>
                                <Form.Control name='uname' type='text' />
                            </InputGroup>
                            <InputGroup className='diary-input'>
                                <InputGroup.Text className='diary-text'>등록일</InputGroup.Text>
                                <Form.Control name='uname' type='text' />
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