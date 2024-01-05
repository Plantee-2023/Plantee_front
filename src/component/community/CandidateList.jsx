import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const candidates = ['선택1', '선택2', '선택3'];

const CandidateList = ({selectedCandidate, onVote} ) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch('/comm/api/candidates')
      .then((response) => response.json())
      .then((data) => setCandidates(data));
  }, []);

  return (
    <div>
      <Card>
      <h2 className='text-center'>투표 제목</h2>
       
       <div className='text-center'>
        {candidates.map((candidate) => (
          <h5 key={candidate}>
            {candidate} : <span className='me-2'>내용</span>
            <input
              type="radio"
              id={candidate}
              name="candidate"
              value={candidate}
              checked={selectedCandidate === candidate}
              onChange={() => onVote(candidate)}
            />
            
          </h5>
        ))}
      </div>
      </Card>


      
    </div>
  );
 

   
}

export default CandidateList