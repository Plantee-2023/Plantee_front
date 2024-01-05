import React, { useRef, useState } from 'react'
import { Button, Card, Form, Spinner } from 'react-bootstrap'

const MagazineInsert = () => {
    const [loading, setLoading] = useState(false);
    const img_ref = useRef(null);

    if (loading) return <div className='text-center'><Spinner size='lg' /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <Card className='insert-card'>
                    <Form.Control placeholder='제목을 입력해주세요.' className='insert-text' />
                    <div className='insert-img'>
                        <img src='http://via.placeholder.com/150x150' onClick={() => img_ref.current.click()} width={300} height={300} style={{ cursor: 'pointer' }} />
                        <input type='file' ref={img_ref} style={{ display: 'none' }} />
                        <br />
                        <Button className='insert-img-btn'>이미지 등록</Button>
                    </div>
                    <Form.Control placeholder='내용을 입력해주세요.' as="textarea" rows={10} className='insert-text' />
                </Card>
                <Button className='insert-btn1 btn-lg'>등록</Button>
                <Button className='insert-btn2 btn-lg'>취소</Button>
            </div>
        </div>
    )
}

export default MagazineInsert