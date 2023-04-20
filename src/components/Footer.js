import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  background-color: #F6F6F6;
  border-top: 2px solid #F3F3F3;
  padding: 2.5vh 9.5%;
  & button {
    color: #FF3131;
    background-color: inherit;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }
`

function Footer({
  events,
  setEvents,
  countCurrentWeek,
  month,
  year,
  setCurrentWeek,
  setCurrentMonth,
  setCurrentYear,
  showDelete,
  setShowDelete,
  choosenEvent,
  setChoosenEvent,
  eventsMap
}) {
  function goToCurrentWeek() {
    setCurrentWeek(countCurrentWeek())
    setCurrentMonth(month)
    setCurrentYear(year)
  }

  function deleteEvent() {
    const eventToDelete = eventsMap[choosenEvent]
    localStorage.setItem('events', JSON.stringify(events.filter(event => event !== eventToDelete)))
    setEvents(events.filter(event => event !== eventToDelete))
    setChoosenEvent(0)
    setShowDelete(false)
  }

  return (
    <FooterWrapper>
      <button onClick={goToCurrentWeek}>Today</button>
      {showDelete && <button onClick={deleteEvent}>Delete</button>}
    </FooterWrapper>
  );
}

export default Footer;
