import React, { useState } from 'react'

const PlantStartPage = () => {

  const [page, setPage] = useState(0);

  const questionList = [
    {
      q: ['식물을 키워본 경험이 있나요?'],
      a: [{ type: 'care_level1', text: '아니요 처음이에요 ㅜㅠ' },
      { type: 'care_level2', text: '식물 친구들이 제 삶에 활기를 불어넣어 줘요! 🌿✨' }]
    },

    {
      q: ['식물을 키울 곳은 어디인가요?'],
      a: [{ type: 'indoor', text: '작은 공간에서 식물 친구와 함께하고 싶어요.' },
      { type: 'outdoor', text: '밖에서 자유롭게 햇빛을 받으며 식물을 키우고 싶어요.' }]
    },

    {
      q: ['키우는 곳에 햇빛의 양은 어떤가요?'],
      a: [{ type: 'sunlight1', text: '거의 빛이 없는 공간이에요. 🌑' },,
      { type: 'sunlight2', text: '햇빛이 잘 들어오는 공간이에요. 🌞✨' }]
    },

    {
      q: ['어떤 종류의 식물을 키우고 싶은가요?'],
      a: [{ type: 'type1', text: '아름다운 잎 모양이나 꽃을 감상하고 싶어요.' },
      { type: 'type2', text: '작고 귀여운 다육식물을 키워보고 싶어요. 🌱💚' }]
    },

    {
      q: ['🌱 테스트가 완료되었습니다. 결과를 확인하시겠습니까? 🌱'],
      a: [{ type: '', text: '결과 보러 가기' }]
    }
  ];

  const [platnList, setPlantList] = useState([
    { name: 'care_level1', count: 0 }, { name: 'care_level2', count: 0 },
    { name: 'indoor', count: 0 }, { name: 'outdoor', count: 0 }, { name: 'sunlight1', count: 0 }, { name: 'sunlight2', count: 0 },
    { name: 'type1', count: 0 }, { name: 'type2', count: 0 },
  ]);

  const handleCkAnswer = (type, idx) => {
    let ls = platnList
    for (let i = 0; i < ls.length; i++) {
      if (ls[i].name === type) {
        ls[i].count = ls[i].count + 1
      }
    }

    setPlantList(ls);
    setPage(page + 1);

    if (idx + 1 === questionList.length) {
      // console.log('결과보기');
      setPlant();
    }
  };

  const [plantContents, setPlantContents] = useState([]);

  function setPlant() {
    let mc = [
      {plant: 'C1IS1T1', contents: ['/image/test/PlantTestResult_01.png']},
    ]

    let CareLevel =
      platnList.find(function(data){return data.name === 'care_level1'}).count >
      platnList.find(function(data){return data.name === 'care_level2'}).count ? 'care_level1' : 'care_level2'

    let CareArea =
    platnList.find(function(data){return data.name === 'indoor'}).count >
    platnList.find(function(data){return data.name === 'outdoor'}).count ? 'indoor' : 'outdoor'

    let Sunlight =
    platnList.find(function(data){return data.name === 'sunlight1'}).count >
    platnList.find(function(data){return data.name === 'sunlight2'}).count ? 'sunlight1' : 'sunlight2'

    let Type =
    platnList.find(function(data){return data.name === 'type1'}).count >
    platnList.find(function(data){return data.name === 'type2'}).count ? 'type1' : 'type2'

    let PlantTest = mc.find(val => val.plant === (CareLevel + CareArea + Sunlight + Type)) || mc[0];

    setPlantContents(PlantTest);
  }

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

          : page <= questionList.length ?

            <div className='question_layout'>
              <div className='question_listcount'>
                <div>{page} / <strong>{questionList.length}</strong></div>
              </div>

              {questionList.map((val, idx) =>
                <div className='qustion_list' key={idx} style={{ display: page === idx + 1 ? '' : 'none' }}>
                  <div className='question_qlist'>
                    {val.q.map((qval, qidx) =>
                      <div className='question_q' key={qidx}>
                        {qval}
                      </div>
                    )}
                  </div>
                  <div className='question_deco_section'>
                    <div className='question_image_section'>
                      <img className='qustion_image' src='/image/planttest_02.jpg' />
                    </div>
                  </div>
                  <div className='question_alist'>
                    {val.a && val.a.map((aval, aidx) =>
                      <div className='question_abox' key={aidx} onClick={() => handleCkAnswer(aval.type, idx)}>
                        <div className='question_text'>{aval.text}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            :

            <div className='question_layout'>
              <div className='qustion_list' style={{ display: '' }}>
                <div className='question_qlist'>
                </div>
                <div className='answer_layout'>
                  <div className='anwer_box'>
                    <div className='answer_title'>🌱 당신에게 추천하는 식물은? 🌱</div>
                    <img className='answer_image' src={plantContents.contents[0]} alt="Plant Image" />
                  </div>
                  {/* <div className='answer_recommendplant_layout'>
                    <div className='answer_recommendplant_title'>추천 식물</div>
                    <div className='answer_recommendplant_plant'></div>
                  </div> */}
                  <div className='question_resetlayout'>
                    <div v className='question_reset' onClick={()=>window.location.reload()}>
                      <p className='question_p'>다시하기</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default PlantStartPage