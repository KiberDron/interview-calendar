import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ModalAddEvent = ({ show, onHide, events, setEvents }) => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const addEvent = () => {
    if (date && name) {
      localStorage.setItem(
        "events",
        JSON.stringify({ ...events, [date.slice(0, 14)]: name })
      );
      setEvents({ ...events, [date.slice(0, 14)]: name });
      setDate("");
      setName("");
      onHide();
    } else {
      alert("Заполните все поля!");
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setDate("");
        setName("");
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Новое событие
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Формат YYYY-MM-DD hh:mm:ss</h6>
        <Form>
          <Form.Control
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Введите дату и время"
          />
          <br />
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название события"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={addEvent}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddEvent;
