const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

//get all by seller
router.get("/seller/:id", (request, response) => {
  const sellerId = request.params.id;
  try {
    Appointment.find({ seller: sellerId })
      .populate("buyer", ["name", "email"])
      .then((res) => {
        response.send(res);
      })
      .catch((err) => console.log(err));
  } catch (exeption) {
    response.status(500).send({ Error: exeption });
  }
});

//get all by buyer
router.get("/buyer/:id", (request, response) => {
  const buyerId = request.params.id;
  try {
    Appointment.find({ buyer: buyerId })
      .populate("seller", ["name", "email"])
      .then((res) => {
        response.send(res);
      })
      .catch((err) => console.log(err));
  } catch (exeption) {
    response.status(500).send({ Error: exeption });
  }
});

// get by id
router.get("/:id", (request, response) => {
  const appointmentId = request.params.id;
  Appointment.findById(appointmentId)
    .populate("buyer")
    .then((res) => {
      if (res) response.send(res);
      else response.send({});
    })
    .catch((exeption) => {
      response.status(500).send({ Error: exeption });
    });
});

// insert
router.post("/", async (request, response) => {
  const body = request.body;
  console.log(body);
  const appointment = new Appointment({
    date: body.date,
    schedule: body.schedule,
    status: "requested",
    buyer: body.buyer,
    seller: body.seller,
  });

  appointment
    .save()
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});

//update
router.put("/:id", (request, response) => {
  const appointmentId = request.params.id;
  const body = request.body;
  console.log(body);
  Appointment.findByIdAndUpdate(appointmentId, body)
    .then((res) => {
      Appointment.findById(appointmentId)
        .then((res) => {
          response.send(res);
        })
        .catch((err) => {
          response.send(err);
        });
    })
    .catch((err) => {
      response.send(err);
    });
});

//delete
router.delete("/:id", (request, response) => {
  const appointmentId = request.params.id;

  Appointment.findByIdAndDelete(appointmentId)
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});

module.exports = router;
