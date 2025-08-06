const express = require("express");
const DBModel = require("../Model/Schema");

const addCodes = async (req, res) => {
  const { codeId, codeText } = req.body;

  if (!codeId || !codeText) {
    return res
      .status(400)
      .json({ error: "Code ID and Code Text are required" });
  }
  if (typeof codeId !== "string" || typeof codeText !== "string") {
    return res
      .status(400)
      .json({ error: "Code ID and Code Text must be strings" });
  }
  if (codeText.length > 5000) {
    return res
      .status(400)
      .json({ error: "Code Text exceeds maximum length of 5000 characters" });
  }

  if (codeId.length > 100) {
    return res
      .status(400)
      .json({ error: "Code ID exceeds maximum length of 100 characters" });
  }

  const isExist = await DBModel.findOne({ codeId: codeId }).then(
    (existingCode) => {
      return existingCode !== null;
    }
  );

  if (isExist) {
    return res.status(400).json({ error: "Code ID already exists" });
  }

  try {
    await DBModel.create({
      codeId: codeId,
      codeText: codeText,
    });

    res.status(201).json({ message: "Code added successfully" });
  } catch (error) {
    console.error("Error adding code:", error);
    res.status(500).json({ error: "Failed to add code" });
  }
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
