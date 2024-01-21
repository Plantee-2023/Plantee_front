import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Spinner, Table, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { BoxContext } from '../../common/BoxContext';
import StoreBuyNow from '../../store/StoreBuyNow';

const ProductCart = () => {
    const [loading, setLoading] = useState(false);
    const { box, setBox } = useContext(BoxContext);

    const navi = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const search = new URLSearchParams(location.search);
    const show = search.get("show") ? search.get("show") : "cart";

    const [carts, setCarts] = useState([]);

    const [total, setTotal] = useState(0);
    const [sum, setSum] = useState(0);
    const [count, setCount] = useState(0); //체크 된 체크박스 갯수

    const [sumprice, setSumprice] = useState(0);
    const [sumqnt, setSumqnt] = useState(0);


    // 장바구니 목록
    const getCart = async () => {
        setLoading(true);
        const res = await axios(`/cart/list.json/${sessionStorage.getItem("uid")}`);
        let list = res.data.list;
        list = list.map(cart => cart && { ...cart, checked: true })
        setCarts(list);

        let sum1 = 0;
        let sum2 = 0;
        list.forEach(book => {
            sum1 += book.sum;
            sum2 += book.qnt;
        })
        setSumprice(sum1);
        setSumqnt(sum2)

        setTotal(res.data.total);
        setSum(res.data.sum);

        setLoading(false);
    }

    // 장바구니 수량 변경
    const onChangeQnt = (cart_id, e) => {
        const list = carts.map(cart => cart.cart_id === cart_id ? { ...cart, qnt: e.target.value } : cart);
        setCarts(list);
    }

    // 장바구니 수량 변경 저장
    const onUpdateQnt = (title, cart_id, qnt) => {
        setBox({
            show: true, message: `${title}의 수량을 ${qnt}개로 변경하시겠습니까?`,
            action: async () => {
                await axios.post("/cart/update/qnt", { cart_id, qnt });
                getCart();
            }
        })
    }

    // 체크박스 전체 바꾸기
    const onChangeAll = (e) => {
        const list = carts.map(cart => cart && { ...cart, checked: e.target.checked });
        setCarts(list);
    }

    // 체크박스 각각 바꾸기
    const onChangeSingle = (e, cart_id) => {
        const list = carts.map(cart => cart.cart_id === cart_id ? { ...cart, checked: e.target.checked } : cart);
        setCarts(list);
    }

    // 장바구니 삭제
    const onDeleteCart = (cart_id) => {
        setBox({
            show: true, message: `삭제하시겠습니까?`,
            action: async () => {
                await axios.post(`/cart/delete/${cart_id}`)
                getCart();
            }
        })
    }

    // 체크한거 삭제
    const onDeleteChecked = (cart_id) => {
        if (count === 0) {
            setBox({ show: true, message: "삭제할 상품을 선택하세요." });
        } else {
            setBox({
                show: true,
                message: `${count}개의 장바구니를 삭제하시겠습니까?`,
                action: async () => {
                    for (const cart of carts) {
                        if (cart.checked) {
                            await axios.post(`/cart/delete/${cart.cart_id}`);
                        }
                        getCart();
                    }
                }
            })
        }
    }

    // 구매하기 페이지로 넘어감
    const onClickOrder = () => {
        if (count === 0) {
            setBox({ show: true, message: "주문할 상품을 선택하세요." })
        } else {
            navi(`${pathname}?show=order`)
        }
    }

    useEffect(() => { getCart(); }, [])

    useEffect(() => { let count = 0; carts.forEach(cart => cart.checked && count++); setCount(count); }, [carts])

    if (loading) return <div className='text-center my-5'><Spinner animation="border" variant="success" /></div>
    return (
        <>
            {show === "cart" &&
                <div id="main_wrap">
                    <h1 className='all-title'>장바구니</h1>

                    <Button className='cart-cancel-btn' onClick={() => onDeleteChecked(carts.cart_id)}>선택삭제</Button>
                    <Table striped bordered>
                        <thead className='text-center'>
                            <tr>
                                <th><Form.Check onChange={onChangeAll} checked={carts.length === count} /></th>
                                <th>상품명</th>
                                <th>수량</th>
                                <th>상품금액</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {carts.map(cart =>
                                <tr key={cart.cart_id}>
                                    <td><Form.Check onChange={(e) => onChangeSingle(e, cart.cart_id)} checked={cart.checked} /></td>
                                    <td>{cart.title}</td>
                                    <td className='text-end'>
                                        <input onChange={(e) => onChangeQnt(cart.cart_id, e)}
                                            value={cart.qnt} size={2} type='number' />개
                                        <button onClick={(e) => onUpdateQnt(cart.title, cart.cart_id, cart.qnt)}>변경</button>
                                    </td>
                                    <td>{cart.fmtsum}원</td>
                                    <td>
                                        <Button className='cart-btn-cancel btn-sm' onClick={() => onDeleteCart(cart.cart_id)}>삭제</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    <Alert>
                        <Row>
                            <Col>총 주문 수 : {total}개</Col>
                            <Col className='text-end'>총 주문 금액 : {sum}원</Col>
                        </Row>
                    </Alert>

                    <Button className='cart-order-btn' onClick={onClickOrder}>주문하기</Button>

                </div>
            }

            {show === "order" && <StoreBuyNow carts={carts} />}

        </>
    )
}

export default ProductCart