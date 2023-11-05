const request = require("supertest");
const app = require("../server");

//Test to ensure that the server is running
test("GET /get/data returns a 200 status code", async () => {
  const response = await request(app).get("/api/get/data");
  expect(response.status).toBe(200);
});

//Test to ensure that the server can communicate with the database
test("GET /getget/clients returns a 200 status code", async () => {
  const response = await request(app).get("/api/get/clients");
  expect(response.status).toBe(200);
});
