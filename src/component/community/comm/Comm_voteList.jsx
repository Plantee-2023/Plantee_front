 
import { Col,Card,InputGroup, FormControl } from 'react-bootstrap'
import React, { useState } from 'react'

const Comm_voteList = ({vote,setVote}) => {

    const [inputValue, setInputValue] = useState({
        vote_1: '',
    vote_2: '',
    vote_3: ''});

   
    const onChangeContent = (e) => {
        setVote({
            ...vote,
            [e.target.name]:e.target.value
        });
    }
    


    return (
        <div className='text-center'>
             
            <Col xs={6} md={4} lg={4}  >
<Card   style={{padding:"10px"}}  >
    


            <InputGroup className="mb-2">
                <InputGroup.Text>투표1</InputGroup.Text>
                <FormControl name="vote_1" value={inputValue.vote_1} onChange={(e) => onChangeContent( )} placeholder="투표1을 입력하세요"/>
            </InputGroup>


             <InputGroup className="mb-2">
                <InputGroup.Text>투표2</InputGroup.Text>
                <FormControl value={inputValue.vote_2} onChange={(e) => onChangeContent( )}
                  name="vote_2" placeholder="투표2을 입력하세요"/>
            </InputGroup>

            <InputGroup className="mb-2">
                <InputGroup.Text>투표3</InputGroup.Text>
                <FormControl value={inputValue.vote_3} onChange={(e) => onChangeContent( )}
               name="vote_3"  placeholder="투표3을 입력하세요"/>
            </InputGroup>
            </Card>
            </Col>

        </div>
    )
}

export default Comm_voteList;