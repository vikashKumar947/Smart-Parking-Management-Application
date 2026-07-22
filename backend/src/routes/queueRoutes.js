const express = require("express");

const router = express.Router();

const {
  enqueue,
  dequeue,
  getQueue,
} = require("../controllers/queueController");

router.post("/enqueue", enqueue);

router.post("/dequeue", dequeue);

router.get("/", getQueue);

module.exports = router;
