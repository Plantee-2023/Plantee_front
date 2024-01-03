import React from 'react'
import { Button } from 'react-bootstrap'

const DiaryInsert = () => {
    return (
        <div className='plant_wrap'>
            <div className='plant_contents'>
                <div className='text-center'>
                    <h1 className='mt-5'>나의 식물 등록하기</h1>
                    <div className='mt-5'>
                        <img src="http://via.placeholder.com/250x250" alt='plante' />
                        <div>
                            <input />
                            <Button>등록</Button>
                            <Button>등록</Button>
                            <Button>등록</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryInsert