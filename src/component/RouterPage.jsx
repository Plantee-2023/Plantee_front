import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Magazine from './main/Magazine';
import Main from './Main';
import Join from './users/Join'; 
import LoginPage from './users/LoginPage';
import Update from './users/Update';
import MagazineList from './main/MagazineList';
import DiaryMain from './diary/DiaryMain';
import Dictionary from './plant/Dictionary';
import MagazineInsert from './main/MagazineInsert';


const RouterPage = () => {
    return (
        <Routes>
            {/* 메인, 매거진 */}
            <Route path='/' element={<Main />} />
            <Route path='/main/magazine' element={<Magazine />} />
            <Route path='/main/magazineList' element={<MagazineList/>}/>
            <Route path='/main/magazineInsert' element={<MagazineInsert/>}/>

            {/* 회원 */}
            <Route path='/users/loginPage' element={<LoginPage />} />
            <Route path='/users/join' element={<Join />} />
            <Route path='/users/update' element={<Update />} />

            {/* 추천 */}
            <Route path='/plant/dictionary' element={<Dictionary />} />

            {/* 다이어리 */}
            <Route path='/diary/DiaryMain' element={<DiaryMain />} />
        </Routes>
    )
}

export default RouterPage