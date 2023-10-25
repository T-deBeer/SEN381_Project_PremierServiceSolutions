import { ReactNode, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar, { SidebarProps } from "../components/Sidebar";
import { useUser } from "../data-layer/context-classes/UserContext";
import ServiceRequest from "../data-layer/data-classes/ServiceRequest";
import ServiceClient from "../data-layer/data-classes/ServiceClient";
import Staff from "../data-layer/data-classes/Staff";
import axios from "axios";

export default function EmployeePage() {
  const { user } = useUser();
  //alert(`/api/get/requests/${user?.id}`)
  const userID = user?.id;
  console.log(userID);
  const [requests, setRequests] = useState<ServiceRequest[]>();
  var [changings, setChangings] = useState(false);

  const [sideBarData, setSidebarData] = useState<SidebarProps>({
    showButtons: true,
    tabContent1: <p>Summary</p>,
    tabContent2: <p>Staff</p>,
    tabContent3: <p>Client</p>,
  });

  useEffect(() => {
    let url = `/api/get/requests?id=${userID}`;
    console.log(url);
    axios
      .get(url)
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
        console.log(serviceRequests);
        setRequests(serviceRequests);
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
      showButtons: true,
      tabContent1: tab1Content,
      tabContent2: tab2Content,
      tabContent3: tab3Content,
    };

    setSidebarData(data);
  }

  return (
    <div className="vh-100">
      <Navbar />
      <div className="d-flex flex-row gap-3 p-2 h-75">
        <Sidebar {...sideBarData} />

        <div className="flex-grow-1 h-75">
          <div className="mb-2">
            <h2>Your Jobs</h2>
            <table className="table table-responsive table-dark rounded-3 table-hover">
              <thead>
                <tr>
                  <th>Active</th>
                  <th>Client</th>
                  <th>Job Priority</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {requests?.map((request) => (
                  <tr onClick={() => LoadData(request.RequestID)}>
                    <td>{request.Active}</td>
                    <td>
                      {request.RequestClient.ClientName}{" "}
                      {request.RequestClient.ClientSurname}
                    </td>
                    <td>{request.Priority}</td>
                    <td>{request.RequestTime.toLocaleString("en-us")}</td>
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
