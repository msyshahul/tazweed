const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Buyer = require("../models/Buyer");
const Appointment = require("../models/Appointment");

//get all
router.get("/", (request, response) => {
  try {
    Buyer.find({})
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
  const buyerId = request.params.id;
  Buyer.findById(buyerId)
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
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  console.log(body, passwordHash);

  const buyer = new Buyer({
    name: body.name,
    loginId: body.loginId,
    email: body.email,
    passwordHash: passwordHash,
  });

  buyer
    .save()
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});

//update name and email
router.put("/:id", (request, response) => {
  const buyerId = request.params.id;
  const data = {
    name: request.body.name,
    email: request.body.email,
  };
  Buyer.findByIdAndUpdate(buyerId, data)
    .then((res) => {
      Buyer.findById(buyerId)
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

//password reset
router.put("/:id/password", async (request, response) => {
  const buyerId = request.params.id;
  const password = request.body.password;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  Buyer.findByIdAndUpdate(buyerId, { passwordHash })
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});

//delete
router.delete("/:id", (request, response) => {
  const buyerId = request.params.id;
  Appointment.deleteMany({ buyer: buyerId })
    .then(() => {
      Buyer.findByIdAndDelete(buyerId)
        .then((res) => {
          response.send(res);
        })
        .catch((err) => {
          response.send(err);
        });
    })
    .catch((err) => response.send(err));
});

module.exports = router;
