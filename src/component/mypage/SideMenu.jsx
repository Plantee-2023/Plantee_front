import React from 'react'
import { Link } from 'react-router-dom'

const SideMenu = () => {
    return (
    <div className='mypage_sidebar_wrap'>
            <div className="mypage_sidebar_box">
                <ol className='mypage_sidebar_ol'>
                    <li className='user_section'>
                        <img className='user_img' src='/image/userimage_01.jpg'/>
                        <div className='user_info'>
                            <img className='user_grade' src='/image/user/user_grade_03.png'/>
                            <h3 className='user_nickname'>{sessionStorage.getItem("uid")}님</h3>
                        </div>
                    </li>
                    <li className='account_menagement'>
                        <h3 className='mypage_account'>회원정보</h3>
                        <ol>
                            <Link to=''>정보수정</Link>
                            <Link to='userpassword'>비밀번호 변경</Link>
                            <Link to='userwithdrawal'>회원 탈퇴</Link>
                        </ol>
                    </li>

                    <li className='wish_menagement'>
                        <h3 className='mypage_account'>관심상품</h3>
                        <ol>
                            <Link to='productlike'>좋아요 리스트</Link>
                            <Link to='productcart'>장바구니</Link>
                            <Link to='productpurchase'>구매내역</Link>
                            <Link to='productorder'>주문/배송조회</Link>
                            <Link to='productcancel'>취소/반품/교환</Link>
                        </ol>
                    </li>

                    <li className='activities_menagement'>
                        <h3 className='mypage_account'>나의 활동</h3>
                        <ol>
                            <Link to='activitiespost'>게시글</Link>
                            <Link to='activitiescomment'>댓글</Link>
                            <Link to='activitieslike'>좋아요</Link>
                        </ol>
                    </li>
                </ol>
            </div>
        </div>
  )
}

export default SideMenu