
import { Col, Card, InputGroup, FormControl } from 'react-bootstrap'
import React, { useState } from 'react'

const Comm_voteList = ({ vote, setVote }) => {

 console.log("보뚜......",vote)
 

    const [inputValue, setInputValue] = useState({
        res: '',
        res2: '',
        res3: ''
    });


    const onChangeContent = (e) => {
        setVote({
            ...vote,
            [e.target.name]: e.target.value
        });
        setInputValue({
           ...inputValue,
            [e.target.name]: e.target.value
        });
    }

    console.log("인풋벨류......",inputValue)

    return (
        <div className='text-center'>

            <Col xs={6} md={4} lg={4}  >
                <Card style={{ padding: "10px" }}  >


                <form name="frm">
                    <InputGroup className="mb-2">
                        <InputGroup.Text>투표1</InputGroup.Text>
                        <FormControl
        name="res"
        value={  inputValue.res}
        onChange={(e) => {
            
            onChangeContent(e);
        }}
        placeholder="투표1을 입력하세요"
    />
</InputGroup>

                    <InputGroup className="mb-2">
                        <InputGroup.Text>투표2</InputGroup.Text>
                        <FormControl value={ inputValue.res2} onChange={(e) => onChangeContent(e)} name="res2" placeholder="투표2을 입력하세요" />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <InputGroup.Text>투표3</InputGroup.Text>
                        <FormControl value={   inputValue.res3} onChange={(e) => onChangeContent(e)} name="res3" placeholder="투표3을 입력하세요" />
                    </InputGroup>
                     </form>
                </Card>
            </Col>

        </div>
    )
}

export default Comm_voteList;