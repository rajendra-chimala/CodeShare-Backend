const express = require("express");
const DBModel = require("../Model/Schema");

const addCodes = async (req, res) => {
  const newCode = new DBModel(req.body);

  if (!newCode.codeId || !newCode.codeText) {
    return res
      .status(400)
      .json({ error: "Code ID and Code Text are required" });
  }

  if (newCode.codeText.length > 5000) {
    return res
      .status(400)
      .json({ error: "Code Text exceeds maximum length of 5000 characters" });
  }

  if (newCode.codeId.length > 100) {
    return res
      .status(400)
      .json({ error: "Code ID exceeds maximum length of 100 characters" });
  }

  const isExist = await DBModel.findOne({ codeId: newCode.codeId }).then(
    (existingCode) => {
      return existingCode !== null;
    }
  );

  if (isExist) {
    return res.status(400).json({ error: "Code ID already exists" });
  }

  newCode
    .save()
    .then(() => {
      res.status(201).json({ message: "Code added successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to add code" });
    });
};

const getCodeById = (req, res) => {
  const codeId = req.params.id;

  DBModel.findOne({ codeId })
    .then((code) => {
      if (!code) {
        return res.status(404).json({ error: "Code not found" });
      }
      res.status(200).json(code);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch code" });
    });
};

module.exports = {
  addCodes,
  getCodeById,
};
