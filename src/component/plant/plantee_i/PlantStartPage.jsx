import React from 'react'

const PlantStartPage = () => {
  return (
    <div className='test_wrap'>
      <div className='test_content'>
        <div className='test_textarea'>
          <h1 className='test_maintitle'>🌱 식물 추천 테스트 🌱</h1>
          <p className='test_subtext'>어떤 식물을 키울지 모를땐!</p>
          <p className='test_subtext'>Plantee가 추천하는 식물을 어떠신가요?</p>
        </div>
        <div>
          <img className='test_decoimg' src='/image/plant_ill.jpg'/>
        </div>
        <div className='test_btnarea'>
          <button className='test_startbtn'>시작하기</button>
        </div>
      </div>
    </div>
  )
}

export default PlantStartPage