import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container, Button, Tabs, Tab } from "react-bootstrap";
import api from "../../config/api";

const AppointmentItem = ({ appointment, fetchAppointments }) => {
  const acceptAppointment = async () => {
    let appointmentId = appointment.id;
    let data = { status: "accepted" };
    let res = await api.put("/appointments/" + appointmentId, data);
    if (res.status === 200) alert("Request has been accepted");
    fetchAppointments();
  };
  const rejectAppointment = async () => {
    let appointmentId = appointment.id;
    let data = { status: "rejected" };
    let res = await api.put("/appointments/" + appointmentId, data);
    if (res.status === 200) alert("Request has been rejected");
    fetchAppointments();
  };
  return (
    <Col sm={12} md={6} lg={4} style={{ padding: "5px" }}>
      <Card style={{ marginBottom: "10px" }}>
        <Card.Body>
          <Card.Title>{appointment.buyer.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {appointment.buyer.email}
          </Card.Subtitle>
          <Card.Text>
            Date: {appointment.date}
            <br />
            Schedule Time: {appointment.schedule}
            <br />
            Status: {appointment.status}
          </Card.Text>
          {appointment.status === "requested" && (
            <>
              <Button
                onClick={acceptAppointment}
                style={{ marginRight: "10px" }}
              >
                Accept
              </Button>
              <Button onClick={rejectAppointment}>Reject</Button>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

const Appointments = () => {
  const sellerId = JSON.parse(localStorage.getItem("loggedAdmin")).sellerId;
  const [appointments, setAppointments] = useState([]);
  const fetchAppointments = async () => {
    let res = await api.get("/appointments/seller/" + sellerId);
    let appointments = res.data;
    setAppointments(appointments);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
  return (
    <div>
      <h3>Appointments</h3>
      <br />
      {appointments.length === 0 && <h3>Loading Data....</h3>}
      <Tabs defaultActiveKey="requested" id="uncontrolled-tab-example">
        <Tab eventKey="requested" title="New">
          <br />

          <Row>
            {appointments.length !== 0 &&
              appointments
                .filter((appointment) => appointment.status === "requested")
                .map((appointment, index) => (
                  <AppointmentItem
                    key={index}
                    appointment={appointment}
                    fetchAppointments={fetchAppointments}
                  />
                ))}
          </Row>
        </Tab>
        <Tab eventKey="accepted" title="Accepted">
          <br />
          <Row>
            {appointments.length !== 0 &&
              appointments
                .filter((appointment) => appointment.status === "accepted")
                .map((appointment, index) => (
                  <AppointmentItem key={index} appointment={appointment} />
                ))}
          </Row>
        </Tab>
        <Tab eventKey="rejected" title="Rejected">
          <br />
          <Row>
            {appointments.length !== 0 &&
              appointments
                .filter((appointment) => appointment.status === "rejected")
                .map((appointment, index) => (
                  <AppointmentItem key={index} appointment={appointment} />
                ))}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
};
export default Appointments;
