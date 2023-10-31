import axios from "axios";
import ServiceClient from "../data-classes/ServiceClient";
import Call from "../data-classes/Call";
import ServiceRequest from "../data-classes/ServiceRequest";
import Staff from "../data-classes/Staff";

export default class DataHandler {
  async GetCalls(): Promise<Call[]> {
    try {
      const response = await axios.get("/api/get/calls");
      const callsData = response.data;

      const calls: Call[] = callsData.map((callData: any) => {
        const client = new ServiceClient(
          callData.ClientID,
          callData.Client.FirstName,
          callData.Client.LastName,
          callData.Client.ClientAuthentication.Email,
          callData.Client.ClientAuthentication.Password,
          callData.Client.ClientType.Type
        );

        const call = new Call(client, callData.CallAttachment.Attachment);
        call.CallID = callData.GUID;
        call.LoggedTime = new Date(callData.Start);
        if (callData.End) {
          call.HandledTime = new Date(callData.End);
        } else {
          call.HandledTime = null;
        }

        return call;
      });

      return calls
        .slice()
        .sort(
          (a: Call, b: Call) => a.LoggedTime.getTime() - b.LoggedTime.getTime()
        );
    } catch (error) {
      console.error("Error getting calls:", error);
      throw error;
    }
  }
  async GetCallsByID(id: string | undefined): Promise<Call[]> {
    try {
      const response = await axios.get(`/api/get/calls-by-id/${id}`);
      const callsData = response.data;

      const calls: Call[] = callsData.map((callData: any) => {
        const client = new ServiceClient(
          callData.ClientID,
          callData.Client.FirstName,
          callData.Client.LastName,
          callData.Client.ClientAuthentication.Email,
          callData.Client.ClientAuthentication.Password,
          callData.Client.ClientType.Type
        );

        const call = new Call(client, callData.CallAttachment.Attachment);
        call.CallID = callData.GUID;
        call.LoggedTime = new Date(callData.Start);
        if (callData.End) {
          call.HandledTime = new Date(callData.End);
        } else {
          call.HandledTime = null;
        }

        return call;
      });

      return calls
        .slice()
        .sort(
          (a: Call, b: Call) => a.LoggedTime.getTime() - b.LoggedTime.getTime()
        );
    } catch (error) {
      console.error("Error getting calls:", error);
      throw error;
    }
  }
  async GetServiceRequests(): Promise<ServiceRequest[]> {
    try {
      const response = await axios.get("/api/get/requests");
      const requestsData = response.data;

      const serviceRequests: ServiceRequest[] = requestsData.map(
        (requestData: any) => {
          const clientData = requestData.Client;

          const client = new ServiceClient(
            requestData.ClientID,
            clientData.FirstName,
            clientData.LastName,
            clientData.ClientAuthentication.Email,
            clientData.ClientAuthentication.Password,
            clientData.ClientType.Type
          );

          const staffData = requestData.Employee;
          const staff =
            staffData != null
              ? new Staff(
                  staffData.StaffName,
                  staffData.StaffSurname,
                  staffData.Email,
                  staffData.Password,
                  staffData.StaffType
                )
              : null;

          const serviceRequest = new ServiceRequest(
            client,
            requestData.Priority,
            staff,
            new Date(requestData.RequestDate),
            new Date(requestData.FulfillmentDate),
            requestData.Active,
            requestData.Sku
          );

          serviceRequest.RequestID = requestData.ID;

          return serviceRequest;
        }
      );

      return serviceRequests
        .slice()
        .sort(
          (a: ServiceRequest, b: ServiceRequest) =>
            a.RequestTime.getTime() - b.RequestTime.getTime()
        );
    } catch (error) {
      console.error("Error getting service requests:", error);
      throw error;
    }
  }
  async GetServiceRequestsByID(
    id: string | undefined
  ): Promise<ServiceRequest[]> {
    try {
      const response = await axios.get(`/api/get/requests-by-id/${id}`);
      const requestsData = response.data;

      const serviceRequests: ServiceRequest[] = requestsData.map(
        (requestData: any) => {
          const clientData = requestData.Client;

          const client = new ServiceClient(
            requestData.ClientID,
            clientData.FirstName,
            clientData.LastName,
            clientData.ClientAuthentication.Email,
            clientData.ClientAuthentication.Password,
            clientData.ClientType.Type
          );

          const staffData = requestData.Employee;
          const staff =
            staffData != null
              ? new Staff(
                  staffData.StaffName,
                  staffData.StaffSurname,
                  staffData.Email,
                  staffData.Password,
                  staffData.StaffType
                )
              : null;

          const serviceRequest = new ServiceRequest(
            client,
            requestData.Priority,
            staff,
            new Date(requestData.RequestDate),
            new Date(requestData.FulfillmentDate),
            requestData.Active,
            requestData.Sku
          );

          serviceRequest.RequestID = requestData.ID;

          return serviceRequest;
        }
      );

      return serviceRequests
        .slice()
        .sort(
          (a: ServiceRequest, b: ServiceRequest) =>
            a.RequestTime.getTime() - b.RequestTime.getTime()
        );
    } catch (error) {
      console.error("Error getting service requests:", error);
      throw error;
    }
  }
  async GetWorkers(): Promise<Staff[]> {
    try {
      const response = await axios.get("api/get/workers");
      const data = response.data;

      const serviceWorkers = data.map((item: any) => {
        const staff = new Staff(
          item.FirstName,
          item.LastName,
          item.Email,
          item.Password,
          item.JobTitle
        );
        staff.StaffID = item.GUID;
        return staff;
      });

      return serviceWorkers;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  async MarkRequestInactive(id: string) {
    try {
      const response = await axios.post("api/get/requests/active", {
        id: id,
        active: 0,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error marking request inactive:", error);
    }
  }
  async AttemptLogin(email: string, password: string) {
    try {
      const response = await axios.post("/api/get/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful");
        let user = response.data;
        return user; // Return the JSON data
      }

      // Handle other status codes if needed
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }
  async AssignRequest(requestID: string | undefined, workerID: string) {
    await axios
      .post("api/get/requests/assign", {
        id: requestID,
        employee: workerID,
      })
      .then((res) => {
        console.error(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}
