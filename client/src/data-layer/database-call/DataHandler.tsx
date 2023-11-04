import axios from "axios";
import ServiceClient from "../data-classes/ServiceClient";
import Call from "../data-classes/Call";
import ServiceRequest from "../data-classes/ServiceRequest";
import Staff from "../data-classes/Staff";
import MaintenanceJob from "../data-classes/MaintenanceJob";
import Contract from "../data-classes/Contract";

export default class DataHandler {
  RejectCall(id: string, email: string) {
    axios.post("api/get/reject-call", { CallID: id, Email: email});
  }
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

        const call = new Call(
          client,
          callData.CallAttachment.Attachment,
          callData.Type
        );
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

        const call = new Call(
          client,
          callData.CallAttachment.Attachment,
          callData.Type
        );
        call.CallID = callData.GUID;
        call.LoggedTime = new Date(callData.Start);
        if (callData.End) {
          call.HandledTime = new Date(callData.End);
        } else {
          call.HandledTime = null;
        }

        return call;
      });

      return calls.slice().sort((a: Call, b: Call) => {
        if (a.HandledTime === null && b.HandledTime !== null) {
          return -1;
        } else if (a.HandledTime !== null && b.HandledTime === null) {
          return 1;
        } else {
          return a.LoggedTime.getTime() - b.LoggedTime.getTime();
        }
      });
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
                  staffData.FirstName,
                  staffData.LastName,
                  staffData.Email,
                  staffData.Password,
                  staffData.JobTitle
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
                  staffData.FirstName,
                  staffData.LastName,
                  staffData.Email,
                  staffData.Password,
                  staffData.JobTitle
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
  async GetClientRequestsByID(
    id: string | undefined
  ): Promise<ServiceRequest[]> {
    try {
      const response = await axios.get(`/api/get/requests-by-id/client/${id}`);
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
                  staffData.FirstName,
                  staffData.LastName,
                  staffData.Email,
                  staffData.Password,
                  staffData.JobTitle
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

          if (serviceRequest.Active) {
            return serviceRequest;
          }
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
  async GetJobsByID(id: string | undefined): Promise<MaintenanceJob[]> {
    try {
      const response = await axios.get(`api/get/jobs-by-id/${id}`);
      const data = response.data;

      // Map the received data to MaintenanceJob objects
      const jobs: MaintenanceJob[] = data.map((jobData: any) => {
        // Assuming jobData contains the necessary properties
        return new MaintenanceJob(
          jobData.GUID,
          new ServiceClient(
            jobData.Client.GUID,
            jobData.Client.FirstName,
            jobData.Client.LastName,
            jobData.Client.ClientAuthentication.Email,
            jobData.Client.ClientAuthentication.Passowrd,
            jobData.Client.ClientType.Type
          ),
          null,
          jobData.Description,
          1,
          jobData.MaintenanceType
        );
      });
      return jobs;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  async GetJobs(): Promise<MaintenanceJob[]> {
    try {
      const response = await axios.get("api/get/jobs");
      const data = response.data;
      // Map the received data to MaintenanceJob objects
      const jobs: MaintenanceJob[] = data.map((jobData: any) => {
        // Assuming jobData contains the necessary properties
        return new MaintenanceJob(
          jobData.GUID,
          new ServiceClient(
            jobData.Client.GUID,
            jobData.Client.FirstName,
            jobData.Client.LastName,
            jobData.Client.ClientAuthentication.Email,
            jobData.Client.ClientAuthentication.Passowrd,
            jobData.Client.ClientType.Type
          ),
          null,
          jobData.Description,
          1,
          jobData.MaintenanceType
        );
      });
      console.log(jobs);
      return jobs;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  async CreateCall(
    id: string | undefined,
    type: string,
    description: string,
    file: FileList | null
  ) {
    if (!id) {
      id = "";
    }
    try {
      const formData = new FormData();

      formData.append("id", id);
      formData.append("type", type);
      formData.append("description", description);

      if (file) {
        formData.append("file", file[0]);
      }
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const response = await fetch("/api/get/calls-add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Call created successfully");
      } else {
        console.error("Error creating a new call");
      }
    } catch (error) {
      console.error("Error creating a new call:", error);
      throw error;
    }
  }
  async CreateMaintenanceJob(call: Call, type: string) {
    await axios.post(`/api/get/create-job/${type}`, {
      call: JSON.stringify(call),
    });
  }
  async MarkCallHandled(id: string) {
    await axios.post(`/api/get/call-handle/${id}`);
  }
  async CreateServiceRequest(call: Call) {
    await axios.post(`/api/get/create-service-request`, {
      call: JSON.stringify(call),
    });
  }

  async GetClientEmails() {
    let response = await axios.get(`/api/get/client-emails`);
    let emails = response.data.map((data: any) => {
      return data.Email;
    });

    return emails;
  }

  async CreateClient(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    axios.post(`/api/get/create-client`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
  }
}
