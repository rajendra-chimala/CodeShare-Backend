const express = require("express");
const DBModel = require("../Model/Schema");
const { addCodes, getCodeById } = require("../Controllers/controller");

const router = express.Router();

router.get("/all-codes", (req, res) => {
  DBModel.find({})
    .then((codes) => {
      res.status(200).json(codes);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch codes" });
    });
});

router.post("/add-code", addCodes);
router.get("/get-code/:id", getCodeById);

module.exports = router;
