import { ReactNode, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar, { SidebarProps } from "../components/Sidebar";
import { useUser } from "../data-layer/context-classes/UserContext";
import ServiceRequest from "../data-layer/data-classes/ServiceRequest";
import DataHandler from "../data-layer/database-call/DataHandler";
import CustomPagination from "../components/CustomPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmployeePage() {
  const { user } = useUser();
  const [userID, setUserID] = useState<string>();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest>();
  const [changings, setChangings] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handler = new DataHandler();

  const [sideBarData, setSidebarData] = useState<SidebarProps>({
    showButtons: true,
    tabContent1: <p>Summary</p>,
    tabContent2: <p>Staff</p>,
    tabContent3: <p>Client</p>,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = requests
    .filter((x) => x.Active == 1)
    ?.slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  async function CompleteRequest(e: any) {
    e.preventDefault();

    if (selectedRequest) {
      setLoading(true);
      await handler.CompleteServiceRequest(
        selectedRequest.RequestID,
        selectedRequest.RequestClient.ClientEmail
      );

      setChangings(!changings);
      setLoading(false);
      window.location.reload();
    } else {
      toast("Please select a request before trying to complete it.", {
        type: "error",
      });
    }
  }

  async function LoadRequests() {
    setLoading(true);
    let requests: ServiceRequest[] = await handler.GetServiceRequestsByID(
      user?.id
    );
    setRequests(requests.filter((x) => x.Active == 1));
    currentItems = requests
      .filter((x) => x.Active == 1)
      ?.slice(indexOfFirstItem, indexOfLastItem);

    setLoading(false);
  }

  function LoadData(ID: number) {
    let request = requests?.filter((x) => x.RequestID == ID)[0];

    setSelectedRequest(request);

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

  useEffect(() => {
    if (user) {
      LoadRequests();
    }
  }, [user, changings]);

  return (
    <div
      className={
        isLoading == true ? "vh-100 bg-dark-subtle opacity-50" : "vh-100"
      }
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      {isLoading == true ? (
        <div className="position-absolute top-50 start-50 ">
          <FontAwesomeIcon icon={faSpinner} spin size="10x" />
        </div>
      ) : (
        <></>
      )}
      {/*Complete Job Modal*/}
      <div
        className="modal fade"
        id="completeJobModal"
        role="dialog"
        aria-labelledby="completeJobModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-white" id="completeJobModalLabel">
                Complete Service Request
              </h5>
              <button
                type="button"
                className="btn-close bg-dark-subtle"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="completeJobForm" onSubmit={(e) => CompleteRequest(e)}>
                <div className="form-group mb-3">
                  <label htmlFor="worker">
                    Are you sure you want to complete this request?
                  </label>
                </div>
                <div className="d-flex flex-row gap-3 justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-outline-success w-25"
                  >
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
      {/*Complete Job Modal ENDS*/}
      <Navbar />
      <div className="d-flex flex-row gap-3 p-2 h-75">
        <Sidebar {...sideBarData} />

        <div className="flex-grow-1 h-75">
          <div className="mb-2 d-flex flex-column">
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
                {currentItems?.map((request) => (
                  <tr
                    key={request.RequestID}
                    onClick={() => LoadData(request.RequestID)}
                  >
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
            <CustomPagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItems={requests.length}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
