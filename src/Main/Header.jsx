import React from 'react'
import { Button, InputGroup } from 'react-bootstrap'
import './Header.css';

const Header = () => {
    return (
        <div className='display'>
            <InputGroup className='center'>
                <input type='search'/>
                <Button></Button>
            </InputGroup>
        </div>
    )
}

export default Header