import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './Main';
import Join from './users/Join';
import LoginPage from './users/LoginPage';
import MyPage from './users/MyPage';
import Magazine from './main/Magazine';
import MagazineList from './main/MagazineList';
import MagazineInsert from './main/MagazineInsert';
import StoreMain from './store/StoreMain';
import StoreRead from './store/StoreRead';
import Community from './community/Community';
import Comm_Read from './community/Comm_Read';
import Comm_Write from './community/Comm_Write';
import DiaryMain from './diary/DiaryMain';
import DiaryInsert from './diary/DiaryInsert';
import DiaryRead from './diary/DiaryRead';
import DiaryCalendar from './diary/DiaryCalendar';
import DiaryList from './diary/DiaryList';
import PlantDictionary from './plant/PlantDictionary';
import PlantDetails from './plant/PlantDetails';



const RouterPage = () => {
    return (
        <Routes>
            {/* 메인, 매거진 */}
            <Route path='/' element={<Main />} />
            <Route path='/main/magazine' element={<Magazine />} />
            <Route path='/main/magazineList' element={<MagazineList />} />

            {/* 로그인 */}
            <Route path='/main/magazineList' element={<MagazineList />} />
            <Route path='/main/magazineInsert' element={<MagazineInsert />} />

            {/* 회원 */}
            <Route path='/users/loginPage' element={<LoginPage />} />
            <Route path='/users/join' element={<Join />} />
            <Route path='/users/myPage' element={<MyPage />} />

            {/* 추천 */}
            <Route path='/plant/dictionary' element={<PlantDictionary />} />
            <Route path='/plant/details' element={<PlantDetails />} />

            {/* 커뮤니티 */}
            <Route path="/comm" element={<Community />} />
            <Route path="/comm/read" element={<Comm_Read />} />
            <Route path="/comm/write" element={<Comm_Write />} />
            <Route path="/comm/read/:post_id" element={<Comm_Read />} />

            {/* 스토어 */}
            <Route path='/store' element={<StoreMain />} />
            <Route path='/store/read/:store_id' element={<StoreRead />} />

            {/* 다이어리 */}
            <Route path='/diary/diarymain' element={<DiaryMain />} />
            <Route path='/diary/diarycalendar' element={<DiaryCalendar />} />
            <Route path='/diary/diarymain/insert' element={<DiaryInsert />} />
            <Route path='/diary/diarymain/read' element={<DiaryRead />} />
            <Route path='/diary/diarylist' element={<DiaryList />} />
        </Routes>
    )
}

export default RouterPage
