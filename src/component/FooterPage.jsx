import React from 'react'

const FooterPage = () => {
  if (window.location.pathname === '/plant/test') return null;
  return (
    <div className='footerpage_wrap'>
      <hr />
      <div className='footerpage_contents'>
        <div className='footerpage_text'>
          <h5 className='footerpage_title'> Plantee </h5>
          <h6> Final Project 2023 </h6>
          <h6> 김병무 김한나 김민지 권은지 김아름 </h6>
        </div>
      </div>
    </div>
  )
}

export default FooterPage