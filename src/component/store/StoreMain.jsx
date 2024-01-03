import React, { useState } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown, InputGroup } from 'react-bootstrap';
import "./Store.css";

const StoreMain = () => {

    const [isClickPlant, setClickPlant] = useState(false);
    const [isClickGoods, setClickGoods] = useState(false);

    return (
        <>

            <div className='store_wrap'>
                <div className='store_contents'>



                    <div className='store_filterbtn_group'>
                        <button className='plant_filterbtn'>↺</button>
                        <button className='button_hide' onClick={() => { setClickPlant((e) => !e); }} >
                            <div className={`${!isClickPlant ? 'store_filterbtn' : 'store_filterbtn_clicked'}`} >
                                <div>식물</div>
                            </div>
                        </button>
                        <button className='button_hide' onClick={() => { setClickGoods((e) => !e); }} >
                            <div className={`${!isClickGoods ? 'store_filterbtn' : 'store_filterbtn_clicked'}`} >
                                <div>용품</div>
                            </div>
                        </button>

                    </div>


                    {isClickPlant && (
                        <>
                            <div className='store_filterbtn_group'>
                                <button className='store_filterbtn'>초보자용</button>
                                <button className='store_filterbtn'>중급자용</button>
                                <button className='store_filterbtn'>상급자용</button>
                            </div>
                        </>
                    )}
                    {isClickGoods && (
                        <>
                            <div className='store_filterbtn_group'>
                                <button className='store_filterbtn'>전체</button>
                                <button className='store_filterbtn'>화분</button>
                                <button className='store_filterbtn'>수분</button>
                            </div>
                        </>
                    )}


                    <div>
                        <Navbar bg="#ffffff" data-bs-theme="light" className='pt-3 pb-3'>
                            <Container fluid>
                                <Navbar.Collapse id="navbarScroll">
                                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
                                        <NavDropdown title="정렬" id="navbarScrollingDropdown">
                                            <NavDropdown.Item href="#action1">최신순</NavDropdown.Item>
                                            <NavDropdown.Item href="#action2">인기순</NavDropdown.Item>
                                            <NavDropdown.Item href="#action3">리뷰많은순</NavDropdown.Item>
                                            <NavDropdown.Item href="#action4">낮은가격순</NavDropdown.Item>
                                            <NavDropdown.Item href="#action5">높은가격순</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    <form>
                                        <InputGroup className='store_searchinputwrap'>
                                            <input type='search' className='store_searchinput' placeholder='검색어를 입력해주세요.' />
                                            <button className='store_searchbtn' type='submit'><img src='/image/search_icon.png' /></button>
                                        </InputGroup>
                                    </form>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>



                </div>
            </div>


        </>
    )
}

export default StoreMain