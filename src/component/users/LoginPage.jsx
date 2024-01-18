import axios from "axios";
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, InputGroup, Form, Button, Spinner } from 'react-bootstrap'
import '../../App.css'

const LoginPage = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        uid: "",
        upass: "",
    });

    const { uid, upass } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(form);
        const res = await axios.post("/users/login", form);
        // console.log(res.data);
        if (res.data === 0) {
            alert("아이디가 존재하지 않습니다.");
        } else if (res.data === 2) {
            alert("비밀번호가 일치하지 않습니다.");
        } else {
            sessionStorage.setItem("uid", uid);
            if (sessionStorage.getItem("target")) {
                navi(sessionStorage.getItem("target"));
            } else {
                navi("/");
            }
        }
    };

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <div id="main_wrap">
            <div className="main_contents">
                <Card className='login-card'>
                    <div className='login-title'>로그인</div>
                    <form onSubmit={onSubmit}>
                        <InputGroup className='login-input'>
                            <InputGroup.Text className="login-width">아이디</InputGroup.Text>
                            <Form.Control
                                placeholder="id"
                                name="uid"
                                value={uid}
                                onChange={onChange}
                            />
                        </InputGroup>
                        <InputGroup className='login-input'>
                            <InputGroup.Text className="login-width">비밀번호</InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="upass"
                                value={upass}
                                onChange={onChange}
                            />
                        </InputGroup>
                        <Form.Check className='login-check' label="로그인 상태 유지" />
                        <div className="text-center">
                            <Button className='login-btn' type="submit">로그인</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default LoginPage