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
import Community from './community/Community';
import Comm_Read from './community/Comm_Read';
import Comm_Write from './community/Comm_Write';



const RouterPage = () => {
    return (
        <Routes>
            {/* 메인 */}
            <Route path='/' element={<Main />} />
            <Route path='/plant/dictionary' element={<Dictionary />} />
            <Route path='/main/magazine' element={<Magazine />} />
            <Route path='/main/magazineList' element={<MagazineList/>}/>
            <Route path='/users/loginPage' element={<LoginPage />} />
            <Route path='/users/join' element={<Join />} />
            <Route path='/users/update' element={<Update />} />

            {/* 다이어리 */}
            <Route path='/diary/DiaryMain' element={<DiaryMain />} />

           {/* 커뮤니티 */}

            <Route path='/comm' element={<Community />} />
            <Route path='/comm/read' element={<Comm_Read />} />
            <Route path='/comm/write' element={<Comm_Write />} />
  

        </Routes>
    )
}

export default RouterPage