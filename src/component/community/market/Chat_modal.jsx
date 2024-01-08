 
import React, { useEffect, useState, useRef } from 'react'
import { Row, Col, Card, Form,Button,Modal } from 'react-bootstrap'
import moment from 'moment'
import { app } from '../../../firebaseInit'
import { getDatabase, push, set, ref, onValue, remove } from 'firebase/database'

const Chat_modal = ({post,box,setBox}) => {
    const uid=sessionStorage.getItem("uid");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //const email = sessionStorage.getItem('email');
    
    const db = getDatabase(app);
    const ref_bottom = useRef(null); 
    const [text, setText] = useState(''); 
    const [messages, setMessages] = useState([]); 

    const onSend = async (e) => {
        e.preventDefault(); 
        const key = push(ref(db, 'chat')).key; 
        const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'); 
        await set(ref(db, `chat/${key}`), 
        { date: date, uid:uid , text: text }); 
        setText('');
    }


    const getMessages = () => {
        onValue(ref(db, 'chat'), (snapshot) => {
            let rows = []; 
            snapshot.forEach(row => {
                rows.push({ key: row.key, ...row.val() });
            }); setMessages(rows);
        });
    }
    const onDelete = async (e, key) => {
        e.preventDefault(); if (!window.confirm(key + '번 메시지를 삭제하실래요?')) return; await remove(ref(db, `chat/${key}`));
    }


    useEffect(() => {
        getMessages();
    }, []); 
    
    //useEffect(() => {
      //  ref_bottom.current.scrollIntoView({ behavior: 'smooth' });
    //}); 
    


    


    return (
        <>

<Button variant="primary" onClick={handleShow}>
               대화하기
            </Button>


        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>

            <Modal.Header closeButton>
                <Modal.Title>  {post.uid}님과  대화하기 </Modal.Title>
            </Modal.Header>



            <Modal.Body>
                <Card className='p-3'>
                <Row className='my-5 justify-content-center'>
          
            <Col md={12}>



                <Card>
                    <div className='wrap'>
                        {messages.map(msg =>
                            <div key={msg.key}>
                                {msg.uid===post.uid || msg.uid===sessionStorage.getItem("uid")?
                                <>
                                <div className={msg.uid === uid ? 'chat ch2' : 'chat ch1'}>
                                    {msg.uid !== uid &&
                                        <div className='icon'>
                                            <img src='https://via.placeholder.com/50x50' /><div className='sender'>{msg.uid}</div>
                                        </div>
                                    }
                                
                                    <div className='textbox'>
                                        <div>
                                            {msg.text}
                                            {msg.uid === uid && <a href="#" onClick={(e) => onDelete(e, msg.key)}>x</a>}
                                        </div>
                                        <div className='date'>{msg.date}</div> 
                                    </div>
                                </div>
                                </>: null }
                            </div> 

                           
                        )} 
                        <div ref={ref_bottom}></div>
                    </div>
                    <Form onSubmit={onSend}>
                        <Form.Control size='lg' style={{ border: '1px solid gray', outline: 'none', margin: '10px' ,padding: '10px', fontSize: '0.8rem', width: '95%' }}
                            onChange={(e) => setText(e.target.value)} value={text} placeholder='메시지'  />
                    </Form>
                </Card>
            </Col>
        </Row>
                </Card>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default Chat_modal