import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar, { SidebarProps } from "../components/Sidebar";
import { ReactNode, useEffect, useState } from "react";
import ServiceRequest from "../data-layer/data-classes/ServiceRequest";
import axios from "axios";
import Staff from "../data-layer/data-classes/Staff";
import ServiceClient from "../data-layer/data-classes/ServiceClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { SplitVendorChunkCache } from "vite";
import Sku from "../data-layer/data-classes/Sku";
import DataHandler from "../data-layer/database-call/DataHandler";
import CustomPagination from "../components/CustomPagination";

export default function ServiceDeptPage() {
  const handler = new DataHandler();
  const [unRequests, setUnRequests] = useState<ServiceRequest[]>([]);
  const [anRequests, setAnRequests] = useState<ServiceRequest[]>([]);
  const [workers, setWorkers] = useState<Staff[]>();
  const [selectedRequest, setSelectedRequest] = useState<string>();
  const [changes, setChanges] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [sideBarData, setSidebarData] = useState<SidebarProps>({
    showButtons: false,
    tabContent1: <p>Summary</p>,
    tabContent2: <p>Staff</p>,
    tabContent3: <p>Client</p>,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItemsUnassigned = unRequests?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  let currentItemsAssigned = anRequests?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  async function onPageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  async function LoadRequests() {
    let requests: ServiceRequest[] = await handler.GetServiceRequests();
    setUnRequests(requests.filter((request) => request.Staff == null));
    setAnRequests(requests.filter((request) => request.Staff != null));
    currentItemsUnassigned = unRequests?.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    currentItemsAssigned = anRequests?.slice(indexOfFirstItem, indexOfLastItem);
    console.log();
  }

  async function LoadWorkers() {
    let workers: Staff[] = await handler.GetWorkers();
    setWorkers(workers);
  }

  function LoadData(ID: number) {
    let request = anRequests?.filter((x) => x.RequestID == ID)[0];
    if (!request) {
      request = unRequests?.filter((x) => x.RequestID == ID)[0];
    }
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
          Fulfillment Date:{" "}
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

  async function changeEmp(e: any) {
    setLoading(true);
    e.preventDefault();
    const selectElement = document.getElementById(
      "worker"
    ) as HTMLSelectElement;
    const selectedValue = selectElement?.value;

    await handler.AssignRequest(selectedRequest, selectedValue);
    setChanges(!changes);
    setLoading(false);
    window.location.reload();
  }

  async function SetActive() {
    if (selectedRequest) {
      handler.MarkRequestInactive(selectedRequest);
    }

    setChanges(!changes);
    window.location.reload();
  }

  //Get data from the database
  useEffect(() => {
    setLoading(true);
    LoadRequests();
    LoadWorkers();
    setLoading(false);
  }, [changes]);

  return (
    <div
      className={
        isLoading == true ? "vh-100 bg-dark-subtle opacity-50" : "vh-100"
      }
    >
      {isLoading == true ? (
        <div className="position-absolute top-50 start-50 ">
          <FontAwesomeIcon icon={faSpinner} spin size="10x" />
        </div>
      ) : (
        <></>
      )}
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
              <form id="assignJobForm" onSubmit={(e) => changeEmp(e)}>
                <div className="form-group mb-3">
                  <label htmlFor="worker">Select Worker:</label>
                  <select
                    className="form-control"
                    id="worker"
                    name="worker"
                    required
                  >
                    {workers?.map((worker) => (
                      <option key={worker.StaffID} value={worker.StaffID}>
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
              <form id="cancelJobForm" onSubmit={SetActive}>
                <div className="form-group mb-3">
                  <label htmlFor="worker">
                    Are you sure you want to reject this request?
                  </label>
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
                  >
                    No
                  </button>
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
          <div className="h-75 d-flex flex-column">
            <h2>Unassigned Service Request</h2>
            <table
              className="table table-responsive table-dark rounded-3 table-hover"
              id="unassigned-table"
            >
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
                {currentItemsUnassigned?.map((request) => (
                  <tr onClick={() => LoadData(request.RequestID)}>
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
                      <button
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#cancelJobModal"
                        data-request={JSON.stringify(request)}
                        onClick={selectRequest}
                      >
                        Reject Job
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CustomPagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItems={unRequests.length}
              onPageChange={onPageChange}
            />
          </div>
          <div className="mb-1 h-75 d-flex flex-column">
            <h2>Assigned Service Request</h2>
            <table
              className="table table-responsive table-dark rounded-3 table-hover"
              id="assigned-table"
            >
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Worker</th>
                  <th>Re-Assign Request</th>
                  <th>Cancel Job</th>
                </tr>
              </thead>
              <tbody>
                {currentItemsAssigned?.map((request) => (
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
                        onClick={() =>
                          setSelectedRequest(request.RequestID.toString())
                        }
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
                        onClick={() =>
                          setSelectedRequest(request.RequestID.toString())
                        }
                      >
                        Cancel Job
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CustomPagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItems={anRequests.length}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
