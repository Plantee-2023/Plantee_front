import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './Main';
import Join from './users/Join';
import LoginPage from './users/LoginPage';
import MyPage from './users/MyPage';
import Magazine from './magazine/Magazine';
import MagazineList from './magazine/MagazineList';
import MagazineInsert from './magazine/MagazineInsert';
import StoreMain from './store/StoreMain';
import StoreRead from './store/StoreRead';
import StoreUpdate from './store/StoreUpdate';
import Comm_Read from './community/comm/Comm_Read';
import Comm_write from './community/comm/Comm_write';
import Comm_list from './community/comm/Comm_list';
import Market_write from './community/market/Market_write';
import Market_list from './community/market/Market_list';
import Market_read from './community/market/Market_read';
import DiaryMain from './diary/DiaryMain';
import DiaryInsert from './diary/DiaryInsert';
import DiaryUpdate from './diary/DiaryUpdate';
import DiaryRead from './diary/DiaryRead';
import DiaryCalendar from './diary/DiaryCalendar';
import DiaryList from './diary/DiaryList';
import PlantDictionary from './plant/PlantDictionary';
import PlantDetails from './plant/PlantDetails';
import MyPageFavorite from './mypage/MyPageFavorite'
import MyPageComment from './mypage/MyPageComment'
import PlantInsert from './plant/PlantInsert'
import PlantUpdate from './plant/PlantUpdate'
const RouterPage = () => {
    return (
        <Routes>
            {/* 메인, 매거진 */}
            <Route path='/' element={<Main />} />
            <Route path='/magazine/read/:post_id' element={<Magazine />} />
            <Route path='/magazine/magazineList' element={<MagazineList />} />
            <Route path='/magazine/insert' element={<MagazineInsert />} />
            <Route path='/mypage/mypagefavorite' element={<MyPageFavorite/>} />
            <Route path='/mypage/mypagecomment' element={<MyPageComment/>} />

            {/* 회원 */}
            <Route path='/users/loginPage' element={<LoginPage />} />
            <Route path='/users/join' element={<Join />} />
            <Route path='/users/myPage' element={<MyPage />} />

            {/* 추천 */}
            <Route path='/plant' element={<PlantDictionary />} />
            <Route path='/plant/insert' element={<PlantInsert />} />
            <Route path='/plant/read/:plant_id' element={<PlantDetails />} />
            <Route path='/plant/update/:plant_id' element={<PlantUpdate />} />

            {/* 커뮤니티 */}
            <Route path="/comm" element={<Comm_list />} />
            <Route path="/comm/write" element={<Comm_write />} />
            <Route path="/comm/read/:post_id" element={<Comm_Read />} />

            {/* 나눔 */}
            <Route path="/comm/market" element={<Market_list/>} />
            <Route path="/comm/market/write" element={<Market_write />} />
            <Route path="/comm/market/read/:post_id" element={<Market_read />} />

            {/* 스토어 */}
            <Route path='/store/main' element={<StoreMain />} />
            <Route path='/store/read/:store_id' element={<StoreRead />} />
            <Route path='/store/update/:store_id' element={<StoreUpdate />} />

            {/* 다이어리 */}
            <Route path='/diary/main' element={<DiaryMain />} />
            <Route path='/diary/calendar' element={<DiaryCalendar />} />
            <Route path='/diary/main/insert' element={<DiaryInsert />} />
            <Route path='/diary/main/update' element={<DiaryUpdate />} />
            <Route path='/diary/read/:diary_id' element={<DiaryRead />} />
            <Route path='/diary/list' element={<DiaryList />} />
        </Routes>
    )
}

export default RouterPage
