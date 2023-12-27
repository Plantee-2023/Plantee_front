import React from 'react'
import './Menu.css';
import RouterPage from './RouterPage';
import { NavLink } from 'react-router-dom';


const Menu = () => {
    return (
        <div className='display'> 
            <ul className='nav recommend title'>
                <li className='nav-item'>
                    <a className='nav-link' href='/search'>추천</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/'>커뮤니티</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/'>스토어</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/'>마이페이지</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/'>로그인</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/'>로그아웃</a>
                </li>
                <li className='nav-item'>
                    <NavLink className='nav-link' href='/'>회원가입</NavLink>
                </li>
            </ul>
            <RouterPage/>
        </div>
    )
}

export default Menu