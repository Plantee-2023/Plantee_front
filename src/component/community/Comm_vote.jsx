import React, { useState } from 'react';
import CandidateList from './CandidateList';

const Comm_vote = () => {

    const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleVote = (candidate) => {
    setSelectedCandidate(candidate);
    // 여기에서 서버로 투표 정보를 보낼 수 있습니다.
  };
 

  return (
    <div>
    <h1>투표</h1>
    <CandidateList selectedCandidate={selectedCandidate} onVote={handleVote} />
    {selectedCandidate && <p>당신의 투표: {selectedCandidate}</p>}
  </div>
);
}

export default Comm_vote