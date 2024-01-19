
import { Col, Card, InputGroup, FormControl } from 'react-bootstrap'
import React, { useState } from 'react'

const Comm_updatevoteList = ({ vote, setVote }) => {

   


    const onChange = (e) => {
        console.log("온체인지 함수 호출")
        setVote({
            ...vote,
            [e.target.name]: e.target.value
        });
    }


    return (
        <div className='text-center'>

            <Col xs={6} md={4} lg={4}  >
                <Card style={{ padding: "10px" }}  >


                    <form name="frm">
                        <InputGroup className="mb-2">
                            <InputGroup.Text>투표1</InputGroup.Text>
                            <FormControl
                                name="res"
                                value={vote.res}
                                onChange={onChange}
                                placeholder="투표1을 입력하세요"
                            />
                        </InputGroup>

                        <InputGroup className="mb-2">
                            <InputGroup.Text>투표2</InputGroup.Text>
                            <FormControl value={vote.res2} onChange={onChange} name="res2" placeholder="투표2을 입력하세요" />
                        </InputGroup>

                        <InputGroup className="mb-2">
                            <InputGroup.Text>투표3</InputGroup.Text>
                            <FormControl value={vote.res3} onChange={onChange} name="res3" placeholder="투표3을 입력하세요" />
                        </InputGroup>
                    </form>
                </Card>
            </Col>

        </div>
    )
}

export default Comm_updatevoteList;