import React from 'react'
import { Col, Card, Button, FormControl, InputGroup } from 'react-bootstrap'

const Comm_plant = () => {
  return (
    <div>
      <h4 style={{ "font-weight": "bold" }}>연관식물</h4>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"

        /><Button variant='success'>검색</Button>


      </InputGroup>
      <Col xs={6} md={4} lg={2} >
        <Card>
          <Card.Body>

            <img src="http://via.placeholder.com/170x250" width="100%" />

          </Card.Body>
          <Card.Footer className="text-end">식물이름</Card.Footer>

        </Card>
      </Col>
    </div>
  )
}

export default Comm_plant