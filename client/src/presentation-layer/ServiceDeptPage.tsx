import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar, { SidebarProps } from "../components/Sidebar";
import { ReactNode, useEffect, useState } from "react";
import ServiceRequest from "../data-layer/data-classes/ServiceRequest";
import axios from "axios";
import Staff from "../data-layer/data-classes/Staff";
import ServiceClient from "../data-layer/data-classes/ServiceClient";

export default function ServiceDeptPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>();
  const [workers, setWorkers] = useState<Staff[]>();
  var [selectedRequest, setSelectedRequest] = useState<string>();
  var [changings, setChangings] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sideBarData, setSidebarData] = useState<SidebarProps>({
    showButtons: false,
    tabContent1: <p>Tab 1 content</p>,
    tabContent2: <p>Tab 2 content</p>,
    tabContent3: <p>Tab 3 content</p>,
  });

  //Get all request from the database
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/get/requests")
      .then((response) => {
        var data = response.data;
        data = data.filter((request: ServiceRequest) => {
          return request.Active == 1;
        });
        const serviceRequests = data.map((item: any) => {
          const clientData = item.Client;
          const employeeData = item.Employee;
          const priority = item.Priority;
          const requestDate = new Date(item.RequestDate);
          const fulfillmentDate = new Date(item.FulfillmentDate);
          const active = item.Active;
          if (employeeData) {
            //Employee is assigned
            let request = new ServiceRequest(
              new ServiceClient(
                clientData.FirstName,
                clientData.LastName,
                clientData.ClientAuthentication.Email,
                clientData.ClientAuthentication.Password,
                clientData.ClientType.Type
              ),
              priority,
              new Staff(
                employeeData.FirstName,
                employeeData.LastName,
                employeeData.Email,
                employeeData.Password,
                employeeData.JobTitle
              ),
              requestDate,
              fulfillmentDate,
              active
            );

            request.RequestID = item.ID;
            return request;
          } else {
            //No employee assigned
            let request = new ServiceRequest(
              new ServiceClient(
                clientData.FirstName,
                clientData.LastName,
                clientData.ClientAuthentication.Email,
                clientData.ClientAuthentication.Password,
                clientData.ClientType.Type
              ),
              priority,
              null,
              requestDate,
              fulfillmentDate,
              active
            );

            request.RequestID = item.ID;
            return request;
          }
        });

        setRequests(serviceRequests);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setLoading(false);
  }, [changings]);

  //Get all workers from the database
  useEffect(() => {
    axios
      .get("api/get/workers")
      .then((response) => {
        let data = response.data;
        const serviceWorkers = data.map((item: any) => {
          let staff = new Staff(
            item.FirstName,
            item.LastName,
            item.Email,
            item.Password,
            item.JobTitle
          );
          staff.StaffID = item.GUID;
          return staff;
        });

        setWorkers(serviceWorkers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function LoadData(ID: number) {
    let request = requests?.filter((x) => x.RequestID == ID)[0];
    let requestClient = request?.RequestClient;
    let requestStaff = request?.Staff;

    const tab1Content: ReactNode = (
      <div className="p-2">
        <h6>Request ID: {request?.RequestID}</h6>
        <p>
          Client: {requestClient?.ClientName} {requestClient?.ClientSurname}
        </p>
        <p>
          Employee: {requestStaff?.StaffName} {requestStaff?.StaffSurname}
        </p>
        <p>Request Date: {request?.RequestTime.toLocaleDateString("en-us")}</p>
        <p>
          Fulfilment Date:{" "}
          {request?.FulfillmentDate.toLocaleDateString("en-us")}
        </p>
      </div>
    );

    const tab2Content: ReactNode = (
      <div className="p-2">
        <h6>
          Staff: {requestStaff?.StaffName} {requestStaff?.StaffSurname}
        </h6>
        <p>Email: {requestStaff?.Email}</p>
        <p>Type: {requestStaff?.StaffType}</p>
      </div>
    );

    const tab3Content: ReactNode = (
      <div className="p-2">
        <h6>
          Client: {requestClient?.ClientName} {requestClient?.ClientSurname}
        </h6>
        <p>Email: {requestClient?.ClientEmail}</p>
        <p>Type: {requestClient?.ClientType}</p>
        <p>Number of Contracts: {requestClient?.ClientContracts.length}</p>
      </div>
    );

    let data = {
      showButtons: false,
      tabContent1: tab1Content,
      tabContent2: tab2Content,
      tabContent3: tab3Content,
    };

    setSidebarData(data);
  }

  function selectRequest(event: any) {
    setSelectedRequest(
      JSON.parse(event.target.getAttribute("data-request")).RequestID
    );
  }

  async function changeEmp() {
    const selectElement = document.getElementById(
      "worker"
    ) as HTMLSelectElement;
    const selectedValue = selectElement?.value;

    await axios
      .post("api/get/requests/assign", {
        id: selectedRequest,
        employee: selectedValue,
      })
      .then((res) => {
        console.error(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setChangings(true);
    setChangings(false);
  }

  async function SetActive() {
    await axios
      .post("api/get/requests/active", {
        id: selectedRequest,
        active: 0,
      })
      .then((res) => {
        console.error(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setChangings(true);
    setChangings(false);
  }
  return (
    <div className={loading? "vh-100" : " vh-100 bg-dark-subtle"}>
      {/*Assign Job Modal*/}
      <div
        className="modal fade"
        id="assignJobModal"
        role="dialog"
        aria-labelledby="assignJobModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-white" id="assignJobModalLabel">
                Assign Job
              </h5>
              <button
                type="button"
                className="btn-close bg-dark-subtle"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="assignJobForm" onSubmit={changeEmp}>
                <div className="form-group mb-3">
                  <label htmlFor="worker">Select Worker:</label>
                  <select
                    className="form-control"
                    id="worker"
                    name="worker"
                    required
                  >
                    {workers?.map((worker) => (
                      <option
                        key={worker.StaffID}
                        value={worker.StaffID}
                        selected={false}
                      >
                        {worker.StaffName} {worker.StaffSurname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center mt-5">
                  <button type="submit" className="btn btn-dark w-50">
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*Assign Job Modal ENDS*/}

      {/*Cancel Job Modal*/}
      <div
        className="modal fade"
        id="cancelJobModal"
        role="dialog"
        aria-labelledby="cancelJobModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-white" id="cancelJobModalLabel">
                Cancel Job
              </h5>
              <button
                type="button"
                className="btn-close bg-dark-subtle"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="cancelJobForm"
              onSubmit={SetActive}
              >
                <div className="form-group mb-3">
                  <label htmlFor="worker">Are you sure you want to reject this request?</label>              
                </div>
                <div className="d-flex flex-row gap-3 justify-content-center">
                  <button type="submit" className="btn btn-outline-danger w-25">
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark w-25"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >No</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*Cancel Job Modal ENDS*/}                 

      <Navbar />

      <div className="d-flex flex-row gap-3 p-2 h-75">
        <Sidebar {...sideBarData} />

        <div className="flex-grow-1 h-75">
          <div className="mb-5">
            <h2>Unassigned Service Request</h2>
            <table className="table table-responsive table-dark rounded-3 table-hover">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Priority</th>
                  <th>Date Requested</th>
                  <th>Assign Request</th>
                  <th>Reject Request</th>
                </tr>
              </thead>
              <tbody>
                {requests
                  ?.filter((x) => x.Staff == null)
                  ?.map((request) => (
                    <tr>
                      <td>
                        {request.RequestClient.ClientName}{" "}
                        {request.RequestClient.ClientSurname}
                      </td>
                      <td>{request.Priority}</td>
                      <td>{request.RequestTime.toLocaleString()}</td>
                      <td>
                        <button
                          className="btn btn-outline-light btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#assignJobModal"
                          data-request={JSON.stringify(request)}
                          onClick={selectRequest}
                        >
                          Assign Job
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-outline-danger btn-sm">
                          Reject Job
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="mb-2">
            <h2>Assigned Service Request</h2>
            <table className="table table-responsive table-dark rounded-3 table-hover">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Worker</th>
                  <th>Re-Assign Request</th>
                  <th>Cancel Job</th>
                </tr>
              </thead>
              <tbody>
                {requests
                  ?.filter((x) => x.Staff != null)
                  ?.map((request) => (
                    <tr onClick={() => LoadData(request.RequestID)}>
                      <td>
                        {request.RequestClient.ClientName}{" "}
                        {request.RequestClient.ClientSurname}
                      </td>
                      <td>
                        {request.Staff?.StaffName} {request.Staff?.StaffSurname}
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-light btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#assignJobModal"
                          data-request={JSON.stringify(request)}
                          onClick={selectRequest}
                        >
                          Re-Assign Job
                        </button>
                      </td>
                      <td>
                        <button 
                        className="btn btn-outline-danger btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#cancelJobModal"
                          data-request={JSON.stringify(request)}
                          onClick={selectRequest}
                          >
                          Cancel Job
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
