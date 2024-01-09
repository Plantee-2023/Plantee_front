import React from 'react'

const PlantRecipe = () => {
  return (
    <div className='recipe_wrap'>
      <div className='recipe_contents'>
        <div className='recipe_select_section'>
          <div className='recipe_filter'>
            <div className='recipe_select'>
              <a>최신순</a>
            </div>
            <div className='recipe_select'>
              <a>인기순</a>
            </div>
            <div className='recipe_select'>
              <a>난이도순</a>
            </div>
          </div>
          <div className='recipe_btn'>
            <button className='recipe_insert'>글쓰기</button>
          </div>
        </div>

        <div className='recipe_contents_section'>
          <div className='recipe_contents_grid'>
            <a href=''>
              <div className='recipe_content_item'>
                <img src='/image/recipe_01.jpg'/>
                <p className='recipe_title'>레시피 타이틀</p>
                <p className='recipe_writer'>작성자</p>
                  <div className='recipe_content_level'>
                    <span className='recipe_leve'>초급</span>
                </div>
              </div>
            </a>

            <a href=''>
              <div className='recipe_content_item'>
                <img src='/image/recipe_01.jpg'/>
                <p className='recipe_title'>레시피 타이틀</p>
                <p className='recipe_writer'>작성자</p>
                  <div className='recipe_content_level'>
                    <span className='recipe_leve'>초급</span>
                </div>
              </div>
            </a>

            <a href=''>
              <div className='recipe_content_item'>
                <img src='/image/recipe_01.jpg'/>
                <p className='recipe_title'>레시피 타이틀</p>
                <p className='recipe_writer'>작성자</p>
                  <div className='recipe_content_level'>
                    <span className='recipe_leve'>초급</span>
                </div>
              </div>
            </a>

            <a href=''>
              <div className='recipe_content_item'>
                <img src='/image/recipe_01.jpg'/>
                <p className='recipe_title'>레시피 타이틀</p>
                <p className='recipe_writer'>작성자</p>
                  <div className='recipe_content_level'>
                    <span className='recipe_leve'>초급</span>
                </div>
              </div>
            </a>

            <a href=''>
              <div className='recipe_content_item'>
                <img src='/image/recipe_01.jpg'/>
                <p className='recipe_title'>레시피 타이틀</p>
                <p className='recipe_writer'>작성자</p>
                  <div className='recipe_content_level'>
                    <span className='recipe_leve'>초급</span>
                </div>
              </div>
            </a>

            <a href=''>
              <div className='recipe_content_item'>
                <img src='/image/recipe_01.jpg'/>
                <p className='recipe_title'>레시피 타이틀</p>
                <p className='recipe_writer'>작성자</p>
                  <div className='recipe_content_level'>
                    <span className='recipe_leve'>초급</span>
                </div>
              </div>
            </a>

          </div>

        </div>

      </div>
    </div>
  )
}

export default PlantRecipe