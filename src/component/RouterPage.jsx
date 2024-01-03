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
import StoreMain from './store/StoreMain';
import MagazineInsert from './main/MagazineInsert';
import MyPage from './users/MyPage';
import Community from './community/Community';
import Comm_Read from './community/Comm_Read';
import Comm_Write from './community/Comm_Write';



const RouterPage = () => {
    return (
        <Routes>
            {/* 메인, 매거진 */}
            <Route path='/' element={<Main />} />
            <Route path='/main/magazine' element={<Magazine />} />
            <Route path='/main/magazineList' element={<MagazineList />} />

            {/* 로그인 */}
            <Route path='/main/magazineList' element={<MagazineList/>}/>
            <Route path='/main/magazineInsert' element={<MagazineInsert/>}/>

            {/* 회원 */}
            <Route path='/users/loginPage' element={<LoginPage />} />
            <Route path='/users/join' element={<Join />} />
            <Route path='/users/update' element={<Update />} />
            <Route path='/users/myPage' element={<MyPage />} />

            {/* 추천 */}
            <Route path='/plant/dictionary' element={<Dictionary />} />

            {/* 스토어 */}
            <Route path='/store' element={<StoreMain />} />

            {/* 다이어리 */}
            <Route path='/diary/DiaryMain' element={<DiaryMain />} />

        </Routes>
    )
}

export default RouterPage