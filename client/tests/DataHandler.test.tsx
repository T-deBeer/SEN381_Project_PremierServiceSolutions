import axios from "axios";
import DataHandler from "../src/data-layer/database-call/DataHandler";
import MockAdapter from "axios-mock-adapter";
import Call from "../src/data-layer/data-classes/Call";
import App from "../src/app";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "../src/presentation-layer/LandingPage";

const dataHandler = new DataHandler();
const mock = new MockAdapter(axios);

describe("Data Handler Tests", () => {
  afterEach(() => {
    mock.reset(); // Reset the mock adapter after each test
  });

  it("GetCalls should make a GET request to /api/get/calls and return data", async () => {
    const callsData: Call[] = [];

    mock.onGet("/api/get/calls").reply(200, callsData);

    const calls = await dataHandler.GetCalls();

    expect(calls).not.toBeNull(); // Ensure that calls is not null
  });

  it("Should handle API request errors gracefully", async () => {
    // Mock a 404 error response for the GET request
    mock.onGet("/api/get/calls").reply(404);

    // Call the GetCalls function
    try {
      await dataHandler.GetCalls();
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.message).toContain("Request failed with status code 404");
    }
  });
});
