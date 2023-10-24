const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Client = require("../models/Client");
const ClientType = require("../models/ClientType");
const ClientAuthentication = require("../models/ClientAuthentication");
const Employee = require("../models/Employee");
const MaintenanceJob = require("../models/MaintenanceJob");
const Contract = require("../models/Contract");
const ContractType = require("../models/ContractType");
const ContractStatus = require("../models/ContractStatus");

router.get("/clients", async (req, res) => {
  try {
    const client = await Client.findAll({
      include: [ClientType, ClientAuthentication],
    });

    res.json(client);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ error: "Error retrieving data" });
  }
});

router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.findAll();

    res.json(employees);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ error: "Error retrieving data" });
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await MaintenanceJob.findAll({
      include: [ContractType, Contract],
    });

    res.json(jobs);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ error: "Error retrieving data" });
  }
});

router.get("/contracts", async (req, res) => {
  try {
    const jobs = await Contract.findAll({
      include: [ContractType, ContractStatus, Client],
    });

    res.json(jobs);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ error: "Error retrieving data" });
  }
});

module.exports = router;
