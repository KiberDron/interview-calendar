import React from 'react';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 13fr 87fr;
  grid-template-rows: 1fr;
  height: 66vh;
  overflow-y: auto;
`

const TimeBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 27%;
  margin: 4.9vh 0;
  color: #C3C3C3;
  @media (max-width: 425px) {
    font-size: 0.8rem;
  }
`

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(24, 6vh);
  gap: 2px;
  background-color: #F3F3F3;
`

const Cell = styled.div`
  background-color: white;
  background-color: ${props => props.isEvent ? "#EBECFF" : ""};
  border: ${props => props.isEvent ? "2px solid white" : ""};
  cursor: ${props => props.isEvent ? "pointer" : ""};
  background-color: ${props => props.choosen ? "#B3B7FF" : ""};
`

function Main({
  events,
  currentWeek,
  currentMonth,
  currentYear,
  setShowDelete,
  choosenEvent,
  setChoosenEvent,
  eventsMap,
  setEventsMap
}) {
  const cells = []
  for (let i = 1; i <= 168; i++) {
    cells.push(i)
  }

  const hours = []
  for (let i = 1; i <= 23; i++) {
    const hour = i > 9 ? `${i}:00` : `0${i}:00`
    hours.push(hour)
  }

  function checkEventInCell(cell) {
    const dayOfTheWeek = cell % 7 ? cell % 7 - 1 : 6
    let hour = cell % 7 ? Math.floor(cell / 7) : Math.floor(cell / 7) - 1
    if (hour < 10) {
      hour = `0${hour}`
    }
    const pattern = `^${currentYear}-${currentMonth}-${currentWeek[dayOfTheWeek]} ${hour}:`
    const re = new RegExp(pattern)
    for (const event of events) {
      if (re.test(event)){
        return [true, event]
      }
    }
    return [false, null]
  };

  function CellClickHandler(cell) {
    const checkResult = checkEventInCell(cell)
    if (checkResult[0]) {
      setShowDelete(true)
      setChoosenEvent(cell)
      setEventsMap({...eventsMap, [cell]: checkResult[1]})
    } else {
      setShowDelete(false)
      setChoosenEvent(0)
    }
  }

  return (
    <MainWrapper>
      <TimeBar>
        {hours.map(hour =>
          <span key={hour}>{hour}</span>
        )}
      </TimeBar>
      <GridWrapper>
        {cells.map(cell =>
          <Cell
            key={cell}
            id={cell}
            isEvent={checkEventInCell(cell)[0]}
            onClick={() => CellClickHandler(cell)}
            choosen={cell === choosenEvent ? true : false}
          />
        )}
      </GridWrapper>
    </MainWrapper>
  );
}

export default Main;
