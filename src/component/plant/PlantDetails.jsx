import React from 'react'

const PlantDetails = () => {
  return (
    <div className='details_wrap'>
      <div className='details_contents'>
        <div className='details_layout'>
          <section className='details_img_section'>
            <div className='details_img'>
              <img src='/image/plant01.jpg'/>
            </div>
          </section>

          <div className='details_info_layout'>
            <section className='details_info_section'>
              <section className='details_title_section'>
                <div className='details_title'>
                  <h1 className='details_maintitle'>다육이</h1>
                </div>
              </section>
              <section className='details_simpleinfo_section'>
                <ul className='plant_items'>
                  <li className='plant_item'>다육</li>
                  <li className='plant_item'>초보자용</li>
                </ul>
                <p className='plant_info_text'>
                건조하고 따뜻한 아프리카에서 온 스투키는 강한 생명력을 가지고있어 식물을 처음 키우는 초보자들에게 많이 추천하는 식물이에요.
                사실 ‘스투키’라는 식물은 우리가 키우는 스투키와는 다른 식물이에요. 국내에서 유통되는 스투키의 대부분은 ‘실린드리카’라는 식물이랍니다.
                스투키와 비슷하게 생겼지만 성장 속도가 빨라서 성장 속도가 느린 스투키 대신 유통되고 있어요. 밤에 산소를 내뿜어 침실에 적합한 식물로 인기가 좋지만,
                독성이 있어서 반려동물과 어린아이가 먹지 않도록 조심해야 합니다.
                </p>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlantDetails