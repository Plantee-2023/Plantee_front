import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap'
import moment from 'moment'
import { app } from '../../firebaseInit'
import { getDatabase, push, set, ref, onValue, remove } from 'firebase/database'

const ChatPage = () => {
    const email = sessionStorage.getItem('email');
    const db = getDatabase(app);
    const ref_bottom = useRef(null); const [text, setText] = useState(''); const [messages, setMessages] = useState([]); const onSend = async (e) => {
        e.preventDefault(); const key = push(ref(db, 'chat')).key; const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'); await set(ref(db, `chat/${key}`), { date: date, email: email, text: text }); setText('');
    }
    const getMessages = () => {
        onValue(ref(db, 'chat'), (snapshot) => {
            let rows = []; snapshot.forEach(row => {
                rows.push({ key: row.key, ...row.val() });
            }); setMessages(rows);
        });
    }
    const onDelete = async (e, key) => {
        e.preventDefault(); if (!window.confirm(key + '번 메시지를 삭제하실래요?')) return; await remove(ref(db, `chat/${key}`));
    }

    
    useEffect(() => {
        getMessages();
    }, []); useEffect(() => {
        ref_bottom.current.scrollIntoView({ behavior: 'smooth' });
    }); 
    
    
    return (
        <Row className='my-5 justify-content-center'>
            채팅
            <Col md={6}>
                <Card>
                    <div className='wrap'>
                        {messages.map(msg =>
                            <div key={msg.key}>
                                <div className={msg.email === email ? 'chat ch2' : 'chat ch1'}>
                                    {msg.email !== email &&
                                        <div className='icon'>
                                            <img src='https://via.placeholder.com/50x50' /><div className='sender'>{msg.email}</div>
                                        </div>
                                    }
                                    <div className='textbox'>
                                        <div>
                                            {msg.text}
                                            {msg.email === email && <a href="#" onClick={(e) => onDelete(e, msg.key)}>x</a>}
                                        </div>
                                        <div className='date'>{msg.date}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={ref_bottom}></div>
                    </div>
                    <Form onSubmit={onSend}>
                        <Form.Control style={{ border: 'none', outline: 'none', padding: '10px', fontSize: '0.8rem', width: '100%' }}
                            onChange={(e) => setText(e.target.value)} value={text} placeholder='메시지' />
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}
export default ChatPage
