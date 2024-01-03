import React from 'react'

const DiaryTag = () => {
    return (
        <div>
            <div className='plant_wrap'>
                <div className='plant_contents'>
                    <button className='filter_btn'><a href='/diary/diarymain'>나의 식물</a></button>
                    <button className='filter_btn'><a href='/diary/diarycalendar'>캘린더</a></button>
                    <button className='filter_btn'><a href='/diary/diarylist'>목록</a></button>
                </div>
            </div>
        </div>
    )
}

export default DiaryTag