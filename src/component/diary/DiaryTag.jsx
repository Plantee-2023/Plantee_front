import React from 'react'

const DiaryTag = () => {
    
    return (
        <div className='diary_wrap'>
            <div className='diary_contents mt-5'>
                <button className='diary_btn'><a href='/diary/main'>나의 식물</a></button>
                <button className='diary_btn'><a href='/diary/calendar'>스케줄</a></button>
                <button className='diary_btn'><a href='/diary/list'>앨범</a></button>
            </div>
        </div>
    )
}

export default DiaryTag