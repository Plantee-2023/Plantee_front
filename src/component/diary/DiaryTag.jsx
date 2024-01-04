import React from 'react'

const DiaryTag = () => {
    return (
        <div className='diary_wrap'>
            <div className='diary_contents'>
                <button className='diary_btn'><a href='/diary/diarymain'>나의 식물</a></button>
                <button className='diary_btn'><a href='/diary/diarycalendar'>캘린더</a></button>
                <button className='diary_btn'><a href='/diary/diarylist'>목록</a></button>
            </div>
        </div>
    )
}

export default DiaryTag