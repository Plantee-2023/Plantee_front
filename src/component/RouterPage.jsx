import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Join from './users/Join';
import LoginPage from './users/LoginPage';
import MyPage from './mypage/MyPage';
import UserUpdate from './mypage/detail/UserUpdate';
import UserPassword from './mypage/detail/UserPassword';
import UserWithdrawal from './mypage/detail/UserWithdrawal';
import ProductLike from './mypage/detail/ProductLike';
import ProductCart from './mypage/detail/ProductCart';
import ProductPurchase from './mypage/detail/ProductPurchase';
import ProductOrder from './mypage/detail/ProductOrder';
import ProductCancel from './mypage/detail/ProductCancel';
import ActivitiesPost from './mypage/detail/ActivitiesPost';
import ActivitesComment from './mypage/detail/ActivitesComment';
import ActivitiesLike from './mypage/detail/ActivitiesLike';
import MyPageFavorite from './mypage/MyPageFavorite'
import MyPageComment from './mypage/MyPageComment'
import Magazine from './magazine/Magazine';
import MagazineList from './magazine/MagazineList';
import MagazineInsert from './magazine/MagazineInsert';
import StoreMain from './store/StoreMain';
import StoreRead from './store/StoreRead';
import StoreUpdate from './store/StoreUpdate';
import StoreInsert from './store/StoreInsert';
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
import PlantInsert from './plant/PlantInsert';
import PlantUpdate from './plant/PlantUpdate';
import PlantTestStart from './plant/PlantTestStart';
import PlantRecipe from './plant/PlantRecipe';
import PlantRecipeRead from './plant/PlantRecipeRead';
import PlantRecipeInsert from './plant/PlantRecipeInsert';
import PlantRecipeUpdate from './plant/PlantRecipeUpdate';
import MagazineUpdate from './magazine/MagazineUpdate';
import StoreBuyNow from './store/StoreBuyNow';
import HomePage from './HomePage';
import MainBannerPage from './MainBannerPage';


const RouterPage = () => {
    return (
        <Routes>
            {/* 마이페이지 */}
            <Route path='/users/mypage' element={<MyPage/>}>
                <Route path='' element={<UserUpdate/>}/>
                <Route path='userupdate' element={<UserUpdate/>}/>
                <Route path='userpassword' element={<UserPassword/>}/>
                <Route path='userwithdrawal' element={<UserWithdrawal/>}/>

                <Route path='productlike' element={<ProductLike/>}/>
                <Route path='productcart' element={<ProductCart/>}/>
                <Route path='productpurchase' element={<ProductPurchase/>}/>
                <Route path='productorder' element={<ProductOrder/>}/>
                <Route path='productcancel' element={<ProductCancel/>}/>

                <Route path='activitiespost' element={<ActivitiesPost/>}/>
                <Route path='activitiescomment' element={<ActivitesComment/>}/>
                <Route path='activitieslike' element={<ActivitiesLike/>}/>
            </Route>

            {/* 메인, 매거진 */}
            <Route path='/' element={<HomePage />} />
            <Route path='/magazine/read/:post_id' element={<Magazine />} />
            <Route path='/magazine/magazineList' element={<MagazineList />} />
            <Route path='/magazine/magazineinsert' element={<MagazineInsert />} />
            <Route path='/magazine/update/:post_id' element={<MagazineUpdate />} />
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
            <Route path='/plant/test' element={<PlantTestStart/>} />
            <Route path='/recipe' element={<PlantRecipe/>} />
            <Route path='/recipe/insert' element={<PlantRecipeInsert/>} />
            <Route path='/recipe/read/:recipe_id' element={<PlantRecipeRead/>} />
            <Route path='/recipe/update/:recipe_id' element={<PlantRecipeUpdate />} />

            {/* 커뮤니티 */}
            <Route path="/comm" element={<Comm_list />} />
            <Route path="/comm/write" element={<Comm_write />} />
            <Route path="/comm/read/:post_id" element={<Comm_Read />} />

            {/* 나눔 */}
            <Route path="/comm/market" element={<Market_list/>} />
            <Route path="/comm/market/write" element={<Market_write />} />
            <Route path="/comm/market/read/:post_id" element={<Market_read />} />

            {/* 스토어 */}
            <Route path='/store' element={<StoreMain />} />
            <Route path='/store/read/:store_id' element={<StoreRead />} />
            <Route path='/store/update/:store_id' element={<StoreUpdate />} />
            <Route path='/store/insert' element={<StoreInsert />} />
            <Route path='/store/buynow' element={<StoreBuyNow />} />

            {/* 다이어리 */}
            <Route path='/diary/main' element={<DiaryMain />} />
            <Route path='/diary/calendar' element={<DiaryCalendar />} />
            <Route path='/diary/insert' element={<DiaryInsert />} />
            <Route path='/diary/update/:diary_id' element={<DiaryUpdate />} />
            <Route path='/diary/read/:diary_id' element={<DiaryRead />} />
            <Route path='/diary/list' element={<DiaryList />} />
        </Routes>
    )
}

export default RouterPage