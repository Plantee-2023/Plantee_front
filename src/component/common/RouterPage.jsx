import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Magazine from './Magazine';
import Main from './Main';
import Join from '../users/Join'; 
import LoginPage from '../users/LoginPage';
import Dictionary from '../plant/Dictionary';


const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/plant/dictionary' element={<Dictionary />} />
            <Route path='/magazine' element={<Magazine />} />
            <Route path='/users/loginPage' element={<LoginPage />} />
            <Route path='/users/join' element={<Join />} />
        </Routes>
    )
}

export default RouterPage