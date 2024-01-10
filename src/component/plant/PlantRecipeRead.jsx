import React from 'react'

const PlantRecipeRead = () => {
  return (
    <div className='recipe_wrap'>
      <div className='recipe_contents'>
        <div className='recipe_contents_section'>
          <div className='recipe_readcontents_grid'>
            <div className='recipe_image_section'>
              <img className='recipe_image' src='/image/recipe_01.jpg'/>
            </div>
            <div className='recipe_title_section'>
              <p className='recipe_title'>레시피 제목</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PlantRecipeRead