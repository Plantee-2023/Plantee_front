import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Magazine from './Magazine';
import Main from './Main';


const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/magazine' element={<Magazine />} />
        </Routes>
    )
}

export default RouterPage