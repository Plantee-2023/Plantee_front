import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Magazine from './main/Magazine';
import Main from './Main';
import Join from './users/Join'; 
import LoginPage from './users/LoginPage';
import Update from './users/Update';


const RouterPage = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/magazine' element={<Magazine />} />
            <Route path='/users/loginPage' element={<LoginPage />} />
            <Route path='/users/join' element={<Join />} />
            <Route path='/users/update' element={<Update />} />
        </Routes>
    )
}

export default RouterPage