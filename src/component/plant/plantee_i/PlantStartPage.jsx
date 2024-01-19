import React, { useState } from 'react'

const PlantStartPage = () => {

  const [page, setPage] = useState(0);

  const questionList = [
    {
      q: ['식물을 키워본 경험이 있나요?'],
      a: [{ type: 'care_level1', text: '아니요 처음이에요 ㅜㅠ' },
      { type: 'care_level2', text: '가끔식 식물을 돌보아 본 적이 있어요.' },
      { type: 'care_level3', text: '식물 친구들이 제 삶에 활기를 불어넣어 줘요! 🌿✨' }
      ]
    },

    {
      q: ['식물을 키울 곳은 어디인가요?'],
      a: [{ type: 'indoor', text: '작은 공간에서 식물 친구와 함께하고 싶어요.' },
      { type: 'outdoor', text: '밖에서 자유롭게 햇빛을 받으며 식물을 키우고 싶어요.' }]
    },

    {
      q: ['키우는 곳에 햇빛의 양은 어떤가요?'],
      a: [{ type: 'sunlight1', text: '거의 빛이 없는 공간이에요. 🌑' },
      { type: 'sunlight2', text: '약간의 햇빛이 드는 실내 공간이에요. ☁️' },
      { type: 'sunlight3', text: '햇빛이 잘 들어오는 공간이에요. 🌞✨' }
      ]
    },

    {
      q: ['어떤 종류의 식물을 키우고 싶은가요?'],
      a: [{ type: 'type1', text: '아름다운 잎 모양이나 색깔을 감상하고 싶어요.' },
      { type: 'type2', text: '예쁜 꽃이 피면 더 기쁠 것 같아요.' },
      { type: 'type3', text: '열매를 수확하면서 다양한 맛을 느끼고 싶어요.' },
      { type: 'type4', text: '작고 귀여운 다육식물을 키워보고 싶어요. 🌱💚' }
      ]
    },

    {q: ['🌱 테스트가 완료되었습니다. 결과를 확인하시겠습니까? 🌱']}
  ];

  const [platnList, setPlantList] = useState([
    {name:''}
  ])

  return (
    <div className='test_wrap'>
      <div className='test_content'>
        {page === 0 ?
          <div className='test_textarea'>
            <h1 className='test_maintitle'>🌱 식물 추천 테스트 🌱</h1>
            <p className='test_subtext'>어떤 식물을 키울지 모를땐!</p>
            <p className='test_subtext'>Plantee가 추천하는 식물을 어떠신가요?</p>
            <div>
              <img className='test_decoimg' src='/image/plant_ill.jpg' />
            </div>
            <div className='test_btnarea'>
              <button className='test_startbtn' onClick={() => setPage(1)}>시작하기</button>
            </div>
          </div>

          :page <= questionList.length?

          <div className='question_layout'>
            <div className='question_listcount'>
              <div>{page} / <strong>{questionList.length}</strong></div>
            </div>

            {questionList.map((val, idx) =>
            <>
              <div className='question_list'>
                질문리스트
              </div>
              <div>
                답변
              </div>
            </>
            )}
            
          </div>

          :

          <div>
            결과페이지
          </div>
        }
      </div>
    </div>
  )
}

export default PlantStartPage