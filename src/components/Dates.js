import React from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const DatesWrapper = styled.div`
  background-color: #f6f6f6;
  height: 14vh;
  padding: 1vh 6% 1vh 18%;
`;

const WeekContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  & .day {
    font-size: 0.8rem;
    font-weight: bold;
    color: ${(props) => (props.checkMonth ? "" : "#777777")};
  }
  & .date {
    font-size: 1.2rem;
    color: ${(props) => (props.checkMonth ? "" : "#777777")};
    color: ${(props) => (props.check ? "white" : "")};
    background-color: ${(props) => (props.check ? "#FF3131" : "")};
    border-radius: ${(props) => (props.check ? "16px" : "")};
    outline: ${(props) => (props.check ? "7px solid #FF3131" : "")};
    width: 2ch;
    text-align: center;
  }
`;

const MonthContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5vh;
  & .arrow-back,
  & .arrow-forward {
    fill: #ff3131;
    cursor: pointer;
    font-size: 1.2rem;
  }
`;

function Dates({
  today,
  currentWeek,
  currentMonth,
  currentYear,
  setCurrentWeek,
  setCurrentMonth,
  setCurrentYear,
  setChoosenEvent,
}) {
  const daysOfTheWeek = ["M", "T", "W", "T", "F", "S", "S"];

  const monthMap = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  function checkIfToday(date) {
    const todayDate = Number(today.split("-")[2]);
    const todayMonth = today.split("-")[1];
    const todayYear = Number(today.split("-")[0]);
    if (
      date === todayDate &&
      currentMonth === todayMonth &&
      currentYear === todayYear
    ) {
      return true;
    } else {
      return false;
    }
  }

  function checkIfCurrentMonth(index) {
    const date = new Date(
      currentYear,
      Number(currentMonth) - 1,
      currentWeek[0]
    );
    const mmMonday = String(date.getMonth() + 1).padStart(2, "0");
    date.setDate(date.getDate() + index);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    return mmMonday === mm;
  }

  function changeWeek(direction) {
    const week = [];
    const date = new Date(
      currentYear,
      Number(currentMonth) - 1,
      currentWeek[0]
    );

    if (direction === "back") {
      date.setDate(date.getDate() - 7);
    } else if (direction === "forward") {
      date.setDate(date.getDate() + 7);
    }

    let dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    for (let i = 0; i < 7; i++) {
      week.push(Number(dd));
      date.setDate(date.getDate() + 1);
      dd = String(date.getDate()).padStart(2, "0");
    }

    setCurrentWeek(week);
    setCurrentMonth(mm);
    setCurrentYear(yyyy);
    setChoosenEvent(0);
  }

  return (
    <DatesWrapper>
      <WeekContainer>
        {currentWeek.map((date, index) => (
          <DateContainer
            key={date}
            check={checkIfToday(date)}
            checkMonth={checkIfCurrentMonth(index)}
          >
            <span className="day">{daysOfTheWeek[index]}</span>
            <div className={"date"}>{date}</div>
          </DateContainer>
        ))}
      </WeekContainer>
      <MonthContainer>
        <ArrowBackIosIcon
          className="arrow-back"
          onClick={() => changeWeek("back")}
        />
        <span>
          {monthMap[currentMonth]} {currentYear}
        </span>
        <ArrowForwardIosIcon
          className="arrow-forward"
          onClick={() => changeWeek("forward")}
        />
      </MonthContainer>
    </DatesWrapper>
  );
}

export default Dates;
