import React, { useState, useEffect } from 'react'
import "../Main.css"

const BtnToTop = () => {

    const [showBtn, setShowBtn] = useState(false);

    const MoveToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const ShowBtnClick = () => {

            setShowBtn(true)

        }
        window.addEventListener("scroll", ShowBtnClick)
        return () => {
            window.removeEventListener("scroll", ShowBtnClick)
        }
    }, [])

    return (
        <>
            {showBtn &&
                <div>
                    <button className="btn_top" onClick={MoveToTop} type='button'> ↑ </button>
                </div>
            }
        </>
    )
}

export default BtnToTop