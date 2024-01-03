import React, { useRef,useState } from 'react'
import { Card, Form, InputGroup, Button, Spinner } from 'react-bootstrap'

const Update = () => {

    const img_ref = useRef(null);
    const [loading, setLoading] = useState(false);

    if (loading) return <div className='text-center'><Spinner/></div>
    return (
        <div className='add'>
            <Card className='mt-5'>
                <div className='join-img'>
                    <img src='http://via.placeholder.com/150x150' onClick={()=>img_ref.current.click()} style={{cursor:'pointer'}} width={300} height={300} />
                    <input type='file' ref={img_ref} style={{ display: 'none' }} />
                    <br />
                    <Button className='update-img-btn'>이미지 수정</Button>
                </div>
                <InputGroup className='join-input'>
                    <InputGroup.Text>이름</InputGroup.Text>
                    <Form.Control type='text' />
                </InputGroup>
                <InputGroup className='join-input'>
                    <InputGroup.Text>아이디</InputGroup.Text>
                    <Form.Control type='text' />
                </InputGroup>
                <InputGroup className='join-input'>
                    <InputGroup.Text>비밀번호</InputGroup.Text>
                    <Form.Control type='password' />
                </InputGroup>
                <InputGroup className='join-input'>
                    <InputGroup.Text>비밀번호 확인</InputGroup.Text>
                    <Form.Control type='password' />
                </InputGroup>
                <InputGroup className='join-input'>
                    <InputGroup.Text>연락처</InputGroup.Text>
                    <Form.Control type='text' />
                </InputGroup>
                <InputGroup className='join-address'>
                    <InputGroup.Text>주소</InputGroup.Text>
                    <Form.Control type='text' />
                    <button className='join-btn'>검색</button>
                </InputGroup>
                <Form className='join-check'>
                    <Form.Check label="꽃집 사장님"></Form.Check>
                </Form>
                <Form.Control className='join-input' type='text' placeholder='상세주소' />
                <InputGroup className='join-input'>
                    <InputGroup.Text>사업자 등록증</InputGroup.Text>
                    <Form.Control />
                    <button className='join-btn'>파일 검색</button>
                </InputGroup>
            </Card>
            <div className='text-center'>
                <button className='mt-4 join-add'>회원가입</button>
            </div>
        </div>
    )
}

export default Update