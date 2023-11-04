import { ReactNode, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar, { SidebarProps } from "../components/Sidebar";
import { useUser } from "../data-layer/context-classes/UserContext";
import MaintenanceJob from "../data-layer/data-classes/MaintenanceJob";
import DataHandler from "../data-layer/database-call/DataHandler";
import CustomPagination from "../components/CustomPagination";

export default function MaintenancePage() {
  const handler = new DataHandler();
  const { user } = useUser();
  const [jobs, setJobs] = useState<MaintenanceJob[]>([]);
  const [changings, SetChangings] = useState<MaintenanceJob[]>([]);
  const [sideBarData, setSidebarData] = useState<SidebarProps>({
    showButtons: false,
    tabContent1: <p>Summary</p>,
    tabContent2: <p>Staff</p>,
    tabContent3: <p>Client</p>,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageContract, setCurrentPageContract] = useState(1);

  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = jobs
    .filter((x) => x.Type == "client")
    .slice(indexOfFirstItem, indexOfLastItem);
  let currentItemsContract = jobs
    .filter((x) => x.Type == "contract")
    .slice(indexOfFirstItem, indexOfLastItem);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  async function LoadJobs() {
    let maintenanceJobs = await handler.GetJobs();
    setJobs(maintenanceJobs);
  }

  useEffect(() => {
    LoadJobs();
  }, [changings]);

  function LoadData(ID: string) {
    let job = jobs?.filter((x) => x.JobID == ID)[0];
    let jobClient = job?.Client;

    const tab1Content: ReactNode = (
      <div className="p-2">
        <h6>Job ID: {job?.JobID}</h6>
        <p>
          Client: {jobClient?.ClientName} {jobClient?.ClientSurname}
        </p>
        <p className="tex-wrap">Description: {job.Description}</p>
        <p>Diffiiculty: {job.DifficultyRating}</p>
        <p>Job Type: {job.Type.toUpperCase()} MAINTENANCE</p>
      </div>
    );

    const tab2Content: ReactNode = (
      <div className="p-2">
        <h6>Staff: {user?.username}</h6>
      </div>
    );

    const tab3Content: ReactNode = (
      <div className="p-2">
        <h6>
          Client: {jobClient?.ClientName} {jobClient?.ClientSurname}
        </h6>
        <p>Email: {jobClient?.ClientEmail}</p>
        <p>Type: {jobClient?.ClientType}</p>
        <p>Number of Contracts: {jobClient?.ClientContracts.length}</p>
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

  return (
    <div className="vh-100">
      <Navbar />

      <div className="d-flex flex-row gap-3 p-2 h-75">
        <Sidebar {...sideBarData} />

        <div className="flex-grow-1 h-75">
          <div className="d-flex flex-column">
            <h2>Client Maintenance Request</h2>
            <table className="table table-responsive table-dark rounded-3 table-hover">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Request Description</th>
                  <th>Review Request</th>
                  <th>Reject Request</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((job: any) => (
                  <tr onClick={() => LoadData(job.JobID)}>
                    <td>
                      {job.Client.ClientName} {job.Client.ClientSurname}
                    </td>
                    <td className="text-wrap">{job.Description}</td>
                    <td>
                      <button
                        className="btn btn-outline-light btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#cancelJobModal"
                      >
                        Review Request
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#cancelJobModal"
                      >
                        Reject Request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CustomPagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItems={jobs.length}
              onPageChange={onPageChange}
            />
          </div>
          <div className="d-flex flex-column">
            <h2>Contract Maintenance Request</h2>
            <table className="table table-responsive table-dark rounded-3 table-hover">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Request Description</th>
                  <th>Review Request</th>
                  <th>Reject Request</th>
                </tr>
              </thead>
              <tbody>
                {currentItemsContract.map((job: any) => (
                  <tr onClick={() => LoadData(job.JobID)}>
                    <td>
                      {job.Client.ClientName} {job.Client.ClientSurname}
                    </td>
                    <td className="text-wrap">{job.Description}</td>
                    <td>
                      <button
                        className="btn btn-outline-light btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#cancelJobModal"
                      >
                        Review Request
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#cancelJobModal"
                      >
                        Reject Request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CustomPagination
              activePage={currentPageContract}
              itemsCountPerPage={itemsPerPage}
              totalItems={jobs.length}
              onPageChange={setCurrentPageContract}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
