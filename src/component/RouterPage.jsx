import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Magazine from './common/Magazine';
import Main from './Main';
import Join from './users/Join'; 
import LoginPage from './users/LoginPage';


const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/magazine' element={<Magazine />} />
            <Route path='/users/loginPage' element={<LoginPage />} />
            <Route path='/users/join' element={<Join />} />
        </Routes>
    )
}

export default RouterPage