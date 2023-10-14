import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import ModalAddEvent from "./ModalAddEvent";

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
  font-size: 1.5em;
  margin: 0;
`;

function Header({ events, setEvents }) {
  const [addEventVisible, setAddEventVisible] = useState(false);

  return (
    <StyledHeader>
      <Heading>Interview Calendar</Heading>
      <AddIcon className="add-icon" onClick={() => setAddEventVisible(true)} />
      <ModalAddEvent
        show={addEventVisible}
        onHide={() => setAddEventVisible(false)}
        events={events}
        setEvents={setEvents}
      />
    </StyledHeader>
  );
}

export default Header;
