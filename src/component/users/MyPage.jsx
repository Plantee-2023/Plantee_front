import React from 'react'
import { NavLink } from 'react-router-dom'

const MyPage = () => {
    return (
        <div>
            <NavLink className="btn" to="/users/update">정보수정</NavLink>
        </div>
    )
}

export default MyPage