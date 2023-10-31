const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const axios = require("axios");
const { Sequelize, Op } = require("sequelize");

const Client = require("../models/Client");
const ClientType = require("../models/ClientType");
const ClientAuthentication = require("../models/ClientAuthentication");
const Employee = require("../models/Employee");
const MaintenanceJob = require("../models/MaintenanceJob");
const Contract = require("../models/Contract");
const ContractType = require("../models/ContractType");
const ContractStatus = require("../models/ContractStatus");
const ServiceRequest = require("../models/ServiceRequest");
const Sku = require("../models/SKU");
const Calls = require("../models/Calls");
const CallAttachment = require("../models/CallAttachment");

dotenv.config();

const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;

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

router.get("/workers", async (req, res) => {
  try {
    const employees = await Employee.findAll({ where: { JobTitle: "Worker" } });

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

router.get("/calls", async (req, res) => {
  try {
    const calls = await Calls.findAll({
      include: [
        CallAttachment,
        {
          model: Client,
          include: [ClientType, ClientAuthentication],
        },
      ],
    });

    res.json(calls);
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
    const employee = await Employee.findOne({
      where: {
        Email: {
          [Op.like]: email, // Case-insensitive search for email
        },
      },
    });

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
          id: clientAuth.GUID,
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
          id: employee.GUID,
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

router.get("/requests", async (req, res) => {
  try {
    const request = await ServiceRequest.findAll({
      include: [
        Employee,
        {
          model: Client,
          include: [ClientAuthentication, ClientType],
        },
        Sku,
      ],
      where: { Active: 1 },
    });
    res.json(request);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ error: "Error retrieving data" });
  }
});

router.get("/requests-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const request = await ServiceRequest.findAll({
      include: [
        Employee,
        {
          model: Client,
          include: [ClientAuthentication, ClientType],
        },
      ],
      where: { EmployeeID: id },
    });

    res.json(request);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ error: "Error retrieving data" });
  }
});

router.post("/requests/assign", async (req, res) => {
  try {
    const id = req.body.id;
    const emp = req.body.employee;

    const employee = await Employee.findOne({
      where: {
        GUID: emp,
      },
    });
    const employeeEmail = employee.Email;

    await ServiceRequest.update(
      { EmployeeID: emp },
      {
        where: {
          ID: id,
        },
      }
    );

    const emailData = {
      Recipients: { To: [employeeEmail] },

      Content: {
        Subject: `A Job has been Assigned [REQUEST ID: ${id}]`,
        From: "tdebeer.za@gmail.com",
        TemplateName: "jobAssignment",
      },
    };

    axios
      .post(apiUrl, emailData, {
        headers: {
          "X-ElasticEmail-Apikey": apiKey,
        },
      })
      .then((response) => {
        res.status(200).send("Email sent successfully");
        console.log("Email sent successfully");
      })
      .catch((error) => {
        res.status(500).send("Error sending email");
        console.error("Error sending email:", error);
      });
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ error: "Error retrieving data" });
  }
});

router.post("/requests/active", async (req, res) => {
  try {
    const id = req.body.id;
    const active = req.body.active;
    console.log(req.body);

    let request = await ServiceRequest.findOne({
      where: {
        ID: id,
      },
      include: [{ model: Client, include: [ClientAuthentication] }, Employee],
    });

    const clientEmail = request.Client.ClientAuthentication.Email;

    const clientEmailData = {
      Recipients: { To: [clientEmail] },

      Content: {
        Subject: `A Service Request Has Canceled [REQUEST ID: ${id}]`,
        From: "tdebeer.za@gmail.com",
        TemplateName: "jobRemoval",
      },
    };

    axios
      .post(apiUrl, clientEmailData, {
        headers: {
          "X-ElasticEmail-Apikey": apiKey,
        },
      })
      .then((response) => {
        console.log("Email sent successfully to client");
      })
      .catch((error) => {
        console.error("Error sending email to client:", error);
      });

    await ServiceRequest.update(
      { Active: active },
      {
        where: {
          ID: id,
        },
      }
    );

    if (request.EmployeeID) {
      const employeeEmail = request.Employee.Email;
      const emailData = {
        Recipients: { To: [employeeEmail] },

        Content: {
          Subject: `A Job Has Been Removed [REQUEST ID: ${id}]`,
          From: "tdebeer.za@gmail.com",
          TemplateName: "jobRemoval",
        },
      };

      axios
        .post(apiUrl, emailData, {
          headers: {
            "X-ElasticEmail-Apikey": apiKey,
          },
        })
        .then((response) => {
          console.log("Email sent successfully to employee");
        })
        .catch((error) => {
          console.error("Error sending email to employee:", error);
        });
    }
    res.status(200).send("Job cancelled");
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).json({ error: "Error retrieving data" });
  }
});
module.exports = router;
