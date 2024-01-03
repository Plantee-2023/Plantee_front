import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import DiaryTag from './DiaryTag'
import Calendar from 'react-calendar'
import moment from 'moment'
import 'react-calendar/dist/Calendar.css';



const DiaryCalendar = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <div className='mt-3'>
                <Container>
                    <DiaryTag />
                </Container>
            </div>
            <div className='plant_wrap'>
                <div className='plant_contents'>
                    <div className='mt-5'>
                        <h1>캘린더</h1>
                    </div>
                    <div className="text-gray-500 mt-5">
                        {moment(value).format("YYYY년 MM월 DD일")}
                    </div>
                    <div className='mt-5 justify-content-center'>
                        <Calendar onChange={onChange} value={value}></Calendar>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiaryCalendar