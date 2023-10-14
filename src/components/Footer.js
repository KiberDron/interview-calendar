import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background-color: #f6f6f6;
  border-top: 2px solid #f3f3f3;
  padding: 2.5vh 9.5%;
  & button {
    color: #ff3131;
    background-color: inherit;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

function Footer({
  countCurrentWeek,
  month,
  year,
  setCurrentWeek,
  setCurrentMonth,
  setCurrentYear,
}) {
  function goToCurrentWeek() {
    setCurrentWeek(countCurrentWeek());
    setCurrentMonth(month);
    setCurrentYear(year);
  }

  return (
    <FooterWrapper>
      <button onClick={goToCurrentWeek}>Today</button>
    </FooterWrapper>
  );
}

export default Footer;
