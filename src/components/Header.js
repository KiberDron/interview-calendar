import React from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 10vh;
  & .add-icon {
    fill: #ff3131;
    cursor: pointer;
    font-size: 1.7rem;
  }
`;

const Heading = styled.h2`
  font-weight: normal;
`;

function Header({ events, setEvents }) {
  function addEvent() {
    const event = prompt("Enter event time:\nYYYY-MM-DD hh:mm:ss");
    if (event) {
      localStorage.setItem("events", JSON.stringify([...events, event]));
      setEvents([...events, event]);
    }
  }

  return (
    <StyledHeader>
      <Heading>Interview Calendar</Heading>
      <AddIcon className="add-icon" onClick={addEvent} />
    </StyledHeader>
  );
}

export default Header;
