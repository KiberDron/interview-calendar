import React from "react";
import { Button, Modal } from "react-bootstrap";

const ModalSeeEvent = ({
  show,
  onHide,
  events,
  setEvents,
  choosenEvent,
  setChoosenEvent,
  eventsMap,
}) => {
  function countSecondHour(firstHour) {
    let secondHour = Number(firstHour) + 1;
    if (secondHour === 24) {
      secondHour = 0;
    }
    if (secondHour < 10) {
      secondHour = `0${secondHour}`;
    }
    return secondHour;
  }

  function filterObject(obj, callback) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, val]) => callback(key, val))
    );
  }

  function deleteEvent() {
    const eventToDelete = eventsMap[choosenEvent];
    localStorage.setItem(
      "events",
      JSON.stringify(
        filterObject(events, (key, val) => key !== eventToDelete[0])
      )
    );
    setEvents(filterObject(events, (key, val) => key !== eventToDelete[0]));
    setChoosenEvent(0);
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {eventsMap[choosenEvent] &&
            `${eventsMap[choosenEvent][0]}00-${countSecondHour(
              eventsMap[choosenEvent][0].slice(11, 13)
            )}:00`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{eventsMap[choosenEvent] && eventsMap[choosenEvent][1]}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={deleteEvent}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSeeEvent;
