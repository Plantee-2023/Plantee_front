import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row, Table, Form, Col, Card, Button, FormControl, InputGroup } from 'react-bootstrap'

const Comm_plant = () => {


  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [cnt, setCnt] = useState(0);

  const size=10;

  const getList = async() => {
    const encodedQuery = encodeURIComponent(query);
    const url = `/comm/search_list.json?page=${page}&size=${size}&query=${encodedQuery}`  ;
    const res=await axios.get(url) ;
    
    
  //  let data=res.data.list.map(s=>s && {...s, title:stripHtmlTags(s.title)});
   //  data=data.map(item=>item && {...item, checked:false});
   setList(res.data.list)
    console.log("plant",res);
    
}


useEffect(() => {
  getList();
}, []);


const onSubmit=()=>{
  //검색 
}


const onChangeSingle=()=>{
  //검색 
}

const onCheckedSave=()=>{
  //검색 
}

const onChangeAll=()=>{
  //검색 
}

const onSave =()=>{
  //저장 
}

  return (
    <div>

      {/*
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
  */}


<div className='my-5'>
  <hr/>
            <h1 className='text-center mb-5'>연관 식물 검색</h1>
            <Row className='mb-2'>
                <Col md={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup className='mb-3'>
                            <Form.Control onChange={(e)=>setQuery(e.target.value)}
                                placeholder='상품명, 제조사' value={query}/>
                            <Button type="submit" >검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col className='text-end'>
                    <Button onClick={onCheckedSave}>선택저장</Button>
                </Col>
            </Row>
            <Row className='mb-2'>
            {list.map(s=>
      
            <Col xs={6} md={4} lg={2} >
            
        <Card>

          <Card.Body>

            <img src="http://via.placeholder.com/170x250" width="100%" />

          </Card.Body>
          <Card.Footer className="text-end">{s.common_name}</Card.Footer>

        </Card>
 
        </Col>
   

)}
     </Row>
            {/*
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td><input type="checkbox" onChange={onChangeAll} checked={list.length===cnt}/></td>
                        <td>ID</td><td>이미지</td><td>제목</td>
                        <td>가격</td><td>제조사</td><td>상품등록</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(s=>
                    <tr key={s.plant_id}>
                        <td><input onChange={(e)=>onChangeSingle(e, s.productId)}
                            type="checkbox" checked={s.checked}/></td>
                        <td>{s.common_name}</td>
                        <td><img src={"http://via.placeholder.com/170x250"} width="50"/></td>
                        <td><div className='ellipsis'>{s.price}</div></td>
                       
                        <td><Button onClick={()=>onSave(s)}
                            className='btn-sm'>등록</Button></td>
                    </tr>
                    )}
                </tbody>
                </Table>
*/}
                </div>
    </div>
  )
}

export default Comm_plant