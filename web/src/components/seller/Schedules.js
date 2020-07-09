import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
import api from "../../config/api";

const AddSchedule = ({ addFlag, closeAdd, addHandler }) => {
  const [title, setTitle] = useState("");
  return (
    <Modal
      show={addFlag}
      onHide={closeAdd}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>Add Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Time Slot</Form.Label>
          <Form.Control
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className="box" onClick={closeAdd}>
          close
        </Button>
        <Button className="box secondary" onClick={() => addHandler(title)}>
          Add Schedule
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const EditSchedule = ({ editFlag, closeEdit, editHandler, schedule }) => {
  const [title, setTitle] = useState(schedule.title);
  const scheduleId = schedule.id;
  return (
    <Modal
      show={editFlag}
      onHide={closeEdit}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Schedule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className="box" onClick={closeEdit}>
          close
        </Button>
        <Button
          className="box secondary"
          onClick={() => editHandler(scheduleId, title)}
        >
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ScheduleItem = ({ schedule, fetchSchedule }) => {
  const [editFlag, setEditFlag] = useState(false);

  const closeEdit = () => {
    setEditFlag(false);
  };
  const openEdit = () => {
    setEditFlag(true);
  };
  const editHandler = (scheduleId, title) => {
    let content = { title };
    console.log(scheduleId, content);
    api.put(`/schedules/${scheduleId}`, content).then(() => {
      setEditFlag(false);
      fetchSchedule();
    });
  };
  return (
    <Col sm={12} md={6} lg={4} style={{ padding: "5px" }}>
      <Card style={{ marginBottom: "10px" }}>
        <Card.Body>
          <Card.Title>Time Slot : {schedule.title}</Card.Title>
          <Button style={{ marginRight: "10px" }} onClick={openEdit}>
            Edit
          </Button>
        </Card.Body>
      </Card>
      <EditSchedule
        editFlag={editFlag}
        closeEdit={closeEdit}
        editHandler={editHandler}
        schedule={schedule}
      />
    </Col>
  );
};

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [addFlag, setAddFlag] = useState(false);
  const sellerId = JSON.parse(localStorage.getItem("loggedAdmin")).sellerId;
  const fetchSchedules = async () => {
    let res = await api.get("/schedules/seller/" + sellerId);
    let schedules = res.data;
    setSchedules(schedules);
  };
  const openAdd = () => {
    setAddFlag(true);
  };
  const closeAdd = () => {
    setAddFlag(false);
  };

  const addHandler = (title) => {
    let content = { sellerId: sellerId, title: title };
    api.post("/schedules", content).then(() => {
      fetchSchedules();
    });
  };
  useEffect(() => {
    fetchSchedules();
  }, []);
  return (
    <>
      <Row>
        <Col sm={12} md={6} lg={6} style={{ padding: "5px" }}>
          <h3>Schedules</h3>
        </Col>
        <Col sm={12} md={6} lg={6} style={{ padding: "5px" }}>
          <Button onClick={openAdd} style={{ float: "right" }}>
            Add Schedule
          </Button>
        </Col>
      </Row>
      <Row>
        {schedules.length === 0 && <h2>Loading...</h2>}
        {schedules.length !== 0 &&
          schedules.map((schedule, index) => (
            <ScheduleItem
              key={index}
              schedule={schedule}
              fetchSchedule={fetchSchedules}
            />
          ))}
      </Row>
      <AddSchedule
        addFlag={addFlag}
        closeAdd={closeAdd}
        addHandler={addHandler}
      />
    </>
  );
};
export default Schedules;
