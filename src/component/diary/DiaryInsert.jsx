import React, { useRef } from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap'

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
                                <Form.Control name='uname' type='text' />
                            </InputGroup>
                            <InputGroup className='diary-input'>
                                <InputGroup.Text className='diary-text'>물 주기</InputGroup.Text>
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