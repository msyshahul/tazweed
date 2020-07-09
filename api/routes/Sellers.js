const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");
const Schedule = require("../models/Schedule");

//get all
router.get("/", (request, response) => {
  try {
    Seller.find({})
      .populate("schedules")
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
  const sellerId = request.params.id;
  Seller.findById(sellerId)
    .populate("schedules")
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

  const seller = new Seller({
    name: body.name,
    loginId: body.loginId,
    email: body.email,
    passwordHash: passwordHash,
  });

  seller
    .save()
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});

// login
router.post("/login", async (request, response) => {
  const loginId = request.body.loginId;
  const password = request.body.password;

  try {
    let seller = await Seller.findOne({ loginId: loginId });
    console.log(seller);
    const passwordCorrect =
      seller === null
        ? false
        : await bcrypt.compare(password, seller.passwordHash);

    if (!(seller && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    const token = jwt.sign(loginId, "tazweed");
    response.header({ "auth-token": token }).status(200).send({
      "auth-token": token,
      sellerId: seller.id,
      sellerName: seller.name,
    });
  } catch (err) {
    response.send(err);
    console.log(err);
  }
});

//update name and email
router.put("/:id", (request, response) => {
  const sellerId = request.params.id;
  const data = {
    name: request.body.name,
    email: request.body.email,
  };
  Seller.findByIdAndUpdate(sellerId, data)
    .then((res) => {
      Seller.findById(sellerId)
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
  const sellerId = request.params.id;
  const password = request.body.password;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  Seller.findByIdAndUpdate(sellerId, { passwordHash })
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});

//delete
router.delete("/:id", (request, response) => {
  const sellerId = request.params.id;
  Schedule.deleteMany({ seller: sellerId })
    .then(() => {
      Seller.findByIdAndDelete(sellerId)
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
