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
      include: [
        {
          model: Contract,
          include: [ContractType, ContractStatus, Client],
        },
      ],
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

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const clientAuth = await Client.findOne({
      include: [
        ClientType,
        {
          model: ClientAuthentication,
          where: {
            Email: email,
          },
        },
      ],
    });
    const employee = await Employee.findOne({ where: { Email: email } });

    if (clientAuth) {
      const isClientPasswordValid = await bcrypt.compare(
        password,
        clientAuth.ClientAuthentication.Password
      );
      if (isClientPasswordValid) {
        res.status(200).json({
          message: "Login successful",
          username: clientAuth.FirstName + " " + clientAuth.LastName,
          role: "Client",
        });
      } else {
        res.status(401).json({ error: "Incorrect email or password" });
      }
    } else if (employee) {
      const isEmployeePasswordValid = await bcrypt.compare(
        password,
        employee.Password
      );
      if (isEmployeePasswordValid) {
        res.status(200).json({
          message: "Login successful",
          username: employee.FirstName + " " + employee.LastName,
          role: employee.JobTitle,
        });
      } else {
        res.status(401).json({ error: "Incorrect email or password" });
      }
    } else {
      console.log("Incorrect email or password");
      res.status(401).json({ error: "Incorrect email or password" });
    }
  } catch (err) {
    console.error("Error while logging in", err);
    res.status(500).json({ error: "Error retrieving data" });
  }
});

module.exports = router;
