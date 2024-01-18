import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import axios from "axios";
import DiaryTag from "./DiaryTag";
import { Link } from 'react-router-dom';
import Diary from "../diary/Diary.css";
import BtnToTop from "../common/BtnToTop";

const cx = classNames.bind(Diary);
const localizer = momentLocalizer(moment);

const DiaryCalendar = () => {
    const [list, setList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const getList = async () => {
        try {
            const res = await axios.get(`/diary/list.json/${sessionStorage.getItem("uid")}`);
            setList(res.data);
        } catch (error) {
            console.error('Error fetching list:', error);
        }
    }

    useEffect(() => {
        getList();
    }, []);

    const today = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        day: new Date().getDay(),
    };

    const week = ["일", "월", "화", "수", "목", "금", "토"];

    const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate();

    const handleDateButtonClick = useCallback((date) => {
        setSelectedDate(date);
        const eventsOnSelectedDate = list
            .filter((item) => {
                const itemDate = new Date(item.reg_date);
                return (
                    itemDate.getFullYear() === date.getFullYear() &&
                    itemDate.getMonth() === date.getMonth() &&
                    itemDate.getDate() === date.getDate()
                );
            })
            .map((item) => ({
                title: item.title,
                start: new Date(item.reg_date),
                end: new Date(item.reg_date),
            }));
        setSelectedDateEvents(eventsOnSelectedDate);
    }, [list]);

    const handleNextMonthButtonClick = () => {
        const nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
        const nextYear = selectedMonth === 12 ? selectedYear + 1 : selectedYear;

        setSelectedYear(nextYear);
        setSelectedMonth(nextMonth);
    };

    const handlePrevMonthButtonClick = () => {
        const prevMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
        const prevYear = selectedMonth === 1 ? selectedYear - 1 : selectedYear;

        setSelectedYear(prevYear);
        setSelectedMonth(prevMonth);
    };

    const handleTodayButtonClick = () => {
        const today = new Date();

        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth() + 1);
    };

    const returnDay = useCallback(() => {
        let dayArr = [];

        for (const nowDay of week) {
            const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
            if (week[day] === nowDay) {
                for (let i = 0; i < dateTotalCount; i++) {
                    const currentDate = new Date(selectedYear, selectedMonth - 1, i + 1);
                    const eventsOnDay = list
                        .filter((item) => {
                            const itemDate = new Date(item.reg_date);
                            return (
                                itemDate.getFullYear() === currentDate.getFullYear() &&
                                itemDate.getMonth() === currentDate.getMonth() &&
                                itemDate.getDate() === currentDate.getDate()
                            );
                        })
                        .map((item) => ({
                            title: item.title,
                            start: new Date(item.reg_date),
                            end: new Date(item.reg_date),
                        }));

                    dayArr.push(
                        <div
                            key={i + 1}
                            className={cx(
                                {
                                    today:
                                        today.year === selectedYear &&
                                        today.month === selectedMonth &&
                                        today.date === i + 1,
                                },
                                { weekday: true },
                                {
                                    sunday:
                                        new Date(
                                            selectedYear,
                                            selectedMonth - 1,
                                            i + 1
                                        ).getDay() === 0,
                                },
                                {
                                    saturday:
                                        new Date(
                                            selectedYear,
                                            selectedMonth - 1,
                                            i + 1
                                        ).getDay() === 6,
                                }
                            )}
                        >
                            <div className={cx('day-number')}>{i + 1}</div>
                            <div className={cx('event-container')}>
                                {eventsOnDay.map((event, index) => (
                                    <div key={index} className={cx('event')}>
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                            {eventsOnDay.length > 0 && (
                                <img src="/image/icon-sprout.png"
                                    className={cx('date-button')}
                                    onClick={() => handleDateButtonClick(currentDate)}
                                    width={30}
                                    height={30}
                                >
                                </img>
                            )}
                        </div>
                    );
                }
            } else {
                dayArr.push(<div className="weekday" key={nowDay}></div>);
            }
        }

        return dayArr;
    }, [selectedYear, selectedMonth, dateTotalCount, today, list, handleDateButtonClick]);

    return (
        <div className="diary_wrap">
            <div className="diary_contents">
                <div className='mt-3'>
                    <Container>
                        <DiaryTag />
                    </Container>
                </div>
                <div className="text-center mt-5">
                    <h1><b>스케줄</b></h1>
                </div>
                <div className='text-end mt-3'>
                    <Link to={`/diary/insert`}>
                        <img src='/image/icon-add.png' className='diary-img-insert' />
                        <span className='diary-insert-size'><b><u>등록하기</u></b></span>
                    </Link>
                </div>
                <div className="diary">
                    <div className="title">
                        <div className="pagination">
                            <button onClick={handlePrevMonthButtonClick}>◀︎</button>
                            <h3>
                                {selectedYear}년 {selectedMonth}월
                            </h3>
                            <button onClick={handleNextMonthButtonClick}>▶︎</button>
                            <button onClick={handleTodayButtonClick}>Today</button>
                        </div>
                    </div>
                    <div className="week">
                        {week.map((day) => (
                            <div
                                key={day}
                                className={cx(
                                    { weekday: true },
                                    { sunday: day === "일" },
                                    { saturday: day === "토" }
                                )}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="date">{returnDay()}</div>
                </div>
            </div>
            {selectedDate && (
                <div className="selected-date-events">
                    {/* <h4>Selected Date: {moment(selectedDate).format("YYYY-MM-DD")}</h4> */}
                    <h4 className="text-center mb-4">{moment(selectedDate).format("YYYY-MM-DD")} 날짜에 함께 한 반려식물</h4>
                    {selectedDateEvents.map((event, index) => (
                        <div key={index} className={cx('selected-event')}>
                            {event.title}
                            {list
                                .filter(d => moment(d.reg_date).isSame(selectedDate, 'day'))
                                .map((d, index) => (
                                    <div className="diary_detail">
                                        <Link to={`/diary/read/${d.diary_id}`}>
                                            <Card className="calendar_card" key={index}>
                                                <div>
                                                    <Card.Body>
                                                        <Row>
                                                            <Col md={3}>
                                                                <img src={d.image} width={150} height={150} />
                                                            </Col>
                                                            <Col className="mt-3">
                                                                <h3><span style={{ color: "green" }}>✔</span> {d.plant_name}</h3>
                                                                <h5>
                                                                    {' '}{' '}
                                                                    함께 한 날 {d.date_now}일
                                                                </h5>
                                                                <p>
                                                                    물 주는 날 D-{d.date_water}일 남았습니다!
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </div>
                                            </Card>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            )}
            <BtnToTop />
        </div>
    );
};

export default DiaryCalendar;
