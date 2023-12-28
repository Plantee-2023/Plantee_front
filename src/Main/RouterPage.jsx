import React from 'react'
import { Route, Routes } from 'react-router-dom'

import DiaryMain from '../diary/DiaryMain'
import Main from './Main'

const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />}/>
            
            <Route path='/diary' element={<DiaryMain />} />
        </Routes>
    )
}

export default RouterPage

