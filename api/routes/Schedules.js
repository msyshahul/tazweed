const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedule");
const Seller = require("../models/Seller");

//get all
router.get("/", (request, response) => {
  try {
    Schedule.find({})
      .populate("seller")
      .then((res) => {
        response.send(res);
      })
      .catch((err) => console.log(err));
  } catch (exeption) {
    response.status(500).send({ Error: exeption });
  }
});

//get all
router.get("/seller/:id", (request, response) => {
  const sellerId = request.params.id;
  try {
    Schedule.find({ seller: sellerId })
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
  const scheduleId = request.params.id;
  Schedule.findById(scheduleId)
    .populate("seller")
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
  const schedule = new Schedule({
    title: body.title,
    seller: body.sellerId,
  });
  schedule
    .save()
    .then((res) => {
      Seller.findByIdAndUpdate(body.sellerId, {
        $addToSet: { schedules: res.id },
      })
        .then((res) => {
          console.log("schedule added..");
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

//update
router.put("/:id", (request, response) => {
  const scheduleId = request.params.id;
  const data = request.body;
  console.log(scheduleId, data);
  Schedule.findByIdAndUpdate(scheduleId, data)
    .then((res) => {
      Schedule.findById(scheduleId)
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
  const scheduleId = request.params.id;
  Schedule.findByIdAndDelete(scheduleId)
    .then((res) => {
      console.log(res);
      Seller.findByIdAndUpdate(res.seller, {
        $pull: { schedules: scheduleId },
      }).then((res2) => {
        response.send(res);
      });
    })
    .catch((err) => {
      console.log(err);
      response.send(err);
    });
});
module.exports = router;
