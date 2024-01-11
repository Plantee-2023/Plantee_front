import { Outlet } from 'react-router-dom'
import './MyPage.css'
import SideMenu from './SideMenu'

const MyPage = () => {
    return (
        <div className='allmypage_wrap'>
            <div className='allmypage_contents'>
                <div className='mypage_wrap'>
                    <SideMenu/>
                    
                    <div className='mypage_contents'>
                        <Outlet/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default MyPage