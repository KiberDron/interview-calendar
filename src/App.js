import React, { useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import Header from './components/Header';
import Dates from './components/Dates';
import Main from './components/Main';
import Footer from './components/Footer';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }
`

const AppWrapper = styled.div`
  max-width: 740px;
  height: 100vh;
  margin: 0 auto;
`

function App() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  const weekMap = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 }

  function countCurrentWeek() {
    const week = []
    const date = new Date();
    const dayOfWeek = weekMap[date.getDay()]
    date.setDate(date.getDate() - dayOfWeek)
    let dd = String(date.getDate()).padStart(2, '0');

    for (let i = 0; i < 7; i++) {
      week.push(Number(dd))
      date.setDate(date.getDate() + 1)
      dd = String(date.getDate()).padStart(2, '0');
    }

    return week
  }

  const [currentWeek, setCurrentWeek] = useState(countCurrentWeek());
  const [currentMonth, setCurrentMonth] = useState(mm);
  const [currentYear, setCurrentYear] = useState(yyyy);

  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);

  const [showDelete, setShowDelete] = useState(false);
  console.log(events)
  console.log(localStorage)

  const [choosenEvent, setChoosenEvent] = useState(0);

  const [eventsMap, setEventsMap] = useState({});

  return (
    <AppWrapper>
      <GlobalStyle />
      <Header
        events={events}
        setEvents={setEvents}
      />
      <Dates
        today={today}
        currentWeek={currentWeek}
        currentMonth={currentMonth}
        currentYear={currentYear}
        setCurrentWeek={setCurrentWeek}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
        setChoosenEvent={setChoosenEvent}
        setShowDelete={setShowDelete}
      />
      <Main
        events={events}
        setEvents={setEvents}
        currentWeek={currentWeek}
        currentMonth={currentMonth}
        currentYear={currentYear}
        setShowDelete={setShowDelete}
        choosenEvent={choosenEvent}
        setChoosenEvent={setChoosenEvent}
        eventsMap={eventsMap}
        setEventsMap={setEventsMap}
      />
      <Footer
        events={events}
        setEvents={setEvents}
        countCurrentWeek={countCurrentWeek}
        month={mm}
        year={yyyy}
        setCurrentWeek={setCurrentWeek}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        choosenEvent={choosenEvent}
        setChoosenEvent={setChoosenEvent}
        eventsMap={eventsMap}
        setEventsMap={setEventsMap}
      />
    </AppWrapper>
  );
}

export default App;
