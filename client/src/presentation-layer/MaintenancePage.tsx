import { FormEvent, ReactNode, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar, { SidebarProps } from "../components/Sidebar";
import { useUser } from "../data-layer/context-classes/UserContext";
import MaintenanceJob from "../data-layer/data-classes/MaintenanceJob";
import DataHandler from "../data-layer/database-call/DataHandler";
import CustomPagination from "../components/CustomPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Contract from "../data-layer/data-classes/Contract";
import ServiceAgreement from "../data-layer/data-classes/ServiceAgreement";

export default function MaintenancePage() {
  const handler = new DataHandler();
  const { user } = useUser();
  const [jobs, setJobs] = useState<MaintenanceJob[]>([]);
  const [changings, setChangings] = useState(true);
  const [sideBarData, setSidebarData] = useState<SidebarProps>({
    showButtons: false,
    tabContent1: <p>Summary</p>,
    tabContent2: <p>Staff</p>,
    tabContent3: <p>Client</p>,
  });
  const [clientName, setClientName] = useState("");
  const [clientSurname, setClientSurname] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientType, setClientType] = useState("");
  const [currentJob, setcurrentJob] = useState<MaintenanceJob | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [agreements, setAgreements] = useState<ServiceAgreement[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageContract, setCurrentPageContract] = useState(1);
  const [selectedContract, setSelectedContract] = useState("");
  const [selectedContractEdit, setSelectedContractEdit] = useState("");
  const [selectedAgreement, setSelectedAgreement] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [createContractDescription, setCreateContractDescription] =
    useState("");
  const [contractType, setContractType] = useState("");
  const [signDate, setSignDate] = useState(
    new Date().toLocaleDateString("en-US")
  );
  const [expiryDate, setExpiryDate] = useState(
    new Date().toLocaleDateString("en-US")
  );
  const [dateHasError, setDateHasError] = useState(false);
  const [createContractStatus, setCreateContractStatus] = useState("");
  const [editSelectedContract, setEditSelectedContract] = useState("");
  const [editContractStatus, setEditContractStatus] = useState("");
  const [editContractType, setEditContractType] = useState("");
  const [editContractDescription, setEditContractDescription] = useState("");
  const itemsPerPage = 5;

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
    setLoading(true);

    let maintenanceJobs = await handler.GetJobs();
    let contracts = await handler.GetContracts();

    setContracts(contracts);
    setJobs(maintenanceJobs.filter((x) => x.Active == 1));

    setLoading(false);
  }

  async function LoadData(ID: string) {
    setLoading(true);

    let job = jobs?.filter((x) => x.JobID == ID)[0];
    setcurrentJob(job);

    setClientName(job.Client.ClientName);
    setClientSurname(job.Client.ClientSurname);
    setClientEmail(job.Client.ClientEmail);
    setClientType(job.Client.ClientType);

    let agreements = await handler.GetAgreementsByID(job.Client.ClientID);
    setAgreements(agreements);

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
      </div>
    );

    let data = {
      showButtons: false,
      tabContent1: tab1Content,
      tabContent2: tab2Content,
      tabContent3: tab3Content,
    };

    setSidebarData(data);
    setLoading(false);
  }

  async function RejectRequest() {
    setLoading(true);
    await handler.JobRejected(
      currentJob?.JobID,
      currentJob?.Client.ClientEmail
    );
    setChangings(!changings);
    setLoading(false);
  }

  //UPDATE A CLIENT
  async function HandleUpdateClient(e: any) {
    e.preventDefault();

    let type = 0;
    switch (clientType) {
      case "Single Person":
        type = 1;
        break;
      case "Large Business":
        type = 2;
        break;
      case "Small Business":
        type = 3;
        break;
    }

    await handler.UpdateClient(
      currentJob?.JobID,
      currentJob?.Client.ClientID,
      clientName,
      clientSurname,
      clientEmail,
      type
    );
    setcurrentJob(null);
    setChangings(!changings);
    window.location.reload();
  }

  //UPDATE A SERVICE AGREEMENT
  async function HandleUpdateServiceAgreement(e: any) {
    e.preventDefault();
    await handler.UpdateAgreement(
      currentJob?.JobID,
      currentJob?.Client.ClientEmail,
      descriptionEdit,
      selectedContractEdit,
      selectedAgreement
    );
    setcurrentJob(null);
    setChangings(!changings);

    window.location.reload();
  }

  //CREATE A SERVICE AGREEMENT
  async function HandleCreateServiceAgreement(e: any) {
    e.preventDefault();
    await handler.CreateAgreement(
      currentJob?.JobID,
      currentJob?.Client.ClientEmail,
      description,
      selectedContract
    );
    setChangings(!changings);
    setcurrentJob(null);

    window.location.reload();
  }

  //CREATE A CONTRACT
  async function HandleCreateContract(e: any) {
    e.preventDefault();
    let type;
    switch (contractType) {
      case "Standard Service":
        type = 1;
        break;
      case "Premium Service":
        type = 2;
        break;
      case "Basic Maintenance":
        type = 3;
        break;
      case "Corporate Service":
        type = 4;
        break;
      case "Custom Contract":
        type = 5;
        break;
    }

    let status;
    switch (createContractStatus) {
      case "Active":
        status = 1;
        break;
      case "Pending Renewal":
        status = 2;
        break;
      case "Expired":
        status = 3;
        break;
      case "Cancelled":
        status = 4;
        break;
      case "Suspended":
        status = 5;
        break;
      case "Terminated":
        status = 6;
        break;
    }

    await handler.CreateContract(
      currentJob?.JobID,
      currentJob?.Client.ClientID,
      currentJob?.Client.ClientEmail,
      type,
      status,
      createContractDescription,
      signDate,
      expiryDate
    );
    setcurrentJob(null);
    setChangings(!changings);
    window.location.reload();
  }
  //UPDATE AN EXSISTING CONTRACT
  async function HandleUpdateContract(e: any) {
    e.preventDefault();
    let type;
    switch (editContractType) {
      case "Standard Service":
        type = 1;
        break;
      case "Premium Service":
        type = 2;
        break;
      case "Basic Maintenance":
        type = 3;
        break;
      case "Corporate Service":
        type = 4;
        break;
      case "Custom Contract":
        type = 5;
        break;
    }

    let status;
    switch (editContractStatus) {
      case "Active":
        status = 1;
        break;
      case "Pending Renewal":
        status = 2;
        break;
      case "Expired":
        status = 3;
        break;
      case "Cancelled":
        status = 4;
        break;
      case "Suspended":
        status = 5;
        break;
      case "Terminated":
        status = 6;
        break;
    }

    await handler.UpdateContract(
      currentJob?.JobID,
      currentJob?.Client.ClientID,
      currentJob?.Client.ClientEmail,
      type,
      status,
      editContractDescription,
      editSelectedContract
    );
    setcurrentJob(null);
    setChangings(!changings);
    window.location.reload();
  }
  useEffect(() => {
    LoadJobs();
  }, [changings]);

  useEffect(() => {
    if (!currentJob) {
      setSidebarData({
        showButtons: false,
        tabContent1: <p>Summary</p>,
        tabContent2: <p>Staff</p>,
        tabContent3: <p>Client</p>,
      });
    }
  }, [currentJob]);

  useEffect(() => {
    if (new Date(signDate) >= new Date(expiryDate)) {
      setDateHasError(true);
    } else {
      setDateHasError(false);
    }
  }, [expiryDate, signDate]);

  useEffect(() => {
    let agreement = agreements.filter(
      (x) => x.AgreementID === selectedAgreement
    )[0];

    if (agreement) {
      setSelectedContractEdit(agreement.LinkedContract.ContractID);
    }
  }, [selectedAgreement]);

  useEffect(() => {
    let contract = contracts.filter(
      (x) => x.ContractID === editSelectedContract
    )[0];

    if (contract) {
      setEditContractStatus(contract.ContractStatus);
      setEditContractType(contract.ContractType);
    }
  }, [editSelectedContract]);

  return (
    <div
      className={
        isLoading == true ? "vh-100 bg-dark-subtle opacity-50" : "vh-100"
      }
    >
      {isLoading == true ? (
        <div className="position-absolute top-50 start-50 z-1">
          <FontAwesomeIcon icon={faSpinner} spin size="10x" />
        </div>
      ) : (
        <></>
      )}
      {/*Client maintenance modal*/}
      <div
        className="modal fade"
        id="clientRequestModal"
        role="dialog"
        aria-labelledby="clientRequestModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header bg-dark">
              <h5
                className="modal-title text-white"
                id="clientRequestModalLabel"
              >
                Client Maintenance
              </h5>
              <button
                type="button"
                className="btn-close bg-dark-subtle"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link text-dark active"
                    href="#edit"
                    data-toggle="tab"
                  >
                    Edit Client Details
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-dark"
                    href="#create"
                    data-toggle="tab"
                  >
                    Create SLA
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-dark"
                    href="#update"
                    data-toggle="tab"
                  >
                    Update SLAs
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                {/* Edit Client */}
                <div
                  className="tab-pane fade show active"
                  id="edit"
                  role="tabpanel"
                  aria-labelledby="edit-tab"
                >
                  <form
                    id="updateClientForm"
                    onSubmit={(e) => HandleUpdateClient(e)}
                  >
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="surname" className="form-label">
                        Surname:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="surname"
                        id="surname"
                        value={clientSurname}
                        onChange={(e) => setClientSurname(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="clientType" className="form-label">
                        Client Type:
                      </label>
                      <select
                        className="form-select"
                        name="clientType"
                        id="clientType"
                        value={clientType}
                        onChange={(e) => setClientType(e.target.value)}
                        required
                      >
                        <option value="">Select Client Type</option>
                        <option value="Single Person">Single Person</option>
                        <option value="Large Business">Large Business</option>
                        <option value="Small Business">Small Business</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-dark">
                      Update Client
                    </button>
                  </form>
                </div>
                {/* Create SLA */}
                <div
                  className="tab-pane fade show"
                  id="create"
                  role="tabpanel"
                  aria-labelledby="create-tab"
                >
                  <form
                    id="createServiceAgreementForm"
                    onSubmit={(e) => HandleCreateServiceAgreement(e)}
                  >
                    <div className="mb-3">
                      <label htmlFor="contract" className="form-label">
                        Select Contract:
                      </label>
                      <select
                        className="form-select"
                        name="contract"
                        id="contract"
                        value={selectedContract}
                        onChange={(e) => setSelectedContract(e.target.value)}
                        required
                      >
                        <option value="">Select Contract</option>
                        {contracts
                          .filter(
                            (x) =>
                              x.LinkedClient.ClientID ==
                              currentJob?.Client.ClientID
                          )
                          .map((contract) => (
                            <option
                              key={contract.ContractID}
                              value={contract.ContractID}
                            >
                              {contract.ContractType} - {contract.ContractID}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description:
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-dark">
                      Create Service Agreement
                    </button>
                  </form>
                </div>
                {/* Update SLA */}
                <div
                  className="tab-pane fade show"
                  id="update"
                  role="tabpanel"
                  aria-labelledby="update-tab"
                >
                  <form
                    id="updateServiceAgreementForm"
                    onSubmit={(e) => HandleUpdateServiceAgreement(e)}
                  >
                    <div className="mb-3">
                      <label htmlFor="SLA" className="form-label">
                        Select Agreement:
                      </label>
                      <select
                        className="form-select"
                        name="SLA"
                        id="SLA"
                        value={selectedAgreement}
                        onChange={(e) => setSelectedAgreement(e.target.value)}
                        required
                      >
                        <option value="">Select Agreement</option>
                        {agreements.map((agreementData) => (
                          <option
                            key={agreementData.AgreementID}
                            value={agreementData.AgreementID}
                          >
                            {agreementData.AgreementID} -{" "}
                            {agreementData.LinkedContract.ContractType}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contractEdit" className="form-label">
                        Edit Linked Contract:
                      </label>
                      <select
                        className="form-select"
                        name="contractEdit"
                        id="contractEdit"
                        value={selectedContractEdit}
                        onChange={(e) =>
                          setSelectedContractEdit(e.target.value)
                        }
                        required
                      >
                        <option value="">Select Contract</option>
                        {contracts
                          .filter(
                            (x) =>
                              x.LinkedClient.ClientID ==
                              currentJob?.Client.ClientID
                          )
                          .map((contract) => (
                            <option
                              key={contract.ContractID}
                              value={contract.ContractID}
                            >
                              {contract.ContractType} - {contract.ContractID}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description:
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        rows={4}
                        value={descriptionEdit}
                        onChange={(e) => setDescriptionEdit(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-dark">
                      Update Service Agreement
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Client maintenance modal ENDS*/}
      {/*Contract maintenance modal*/}
      <div
        className="modal fade"
        id="contractRequestModal"
        role="dialog"
        aria-labelledby="contractRequestModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header bg-dark">
              <h5
                className="modal-title text-white"
                id="contractRequestModalLabel"
              >
                Contract Maintenance
              </h5>
              <button
                type="button"
                className="btn-close bg-dark-subtle"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link text-dark active"
                    href="#createContract"
                    data-toggle="tab"
                  >
                    Create a Contract
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-dark"
                    href="#updateContract"
                    data-toggle="tab"
                  >
                    Edit a Contract
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                {/* Create a Contract*/}
                <div
                  className="tab-pane fade show active"
                  id="createContract"
                  role="tabpanel"
                  aria-labelledby="create-tab"
                >
                  <form
                    id="createContractForm"
                    onSubmit={(e) => HandleCreateContract(e)}
                  >
                    <div className="mb-3">
                      <label htmlFor="contractType" className="form-label">
                        Contract Type:
                      </label>
                      <select
                        className="form-select"
                        name="contractType"
                        id="contractType"
                        value={contractType}
                        onChange={(e) => setContractType(e.target.value)}
                        required
                      >
                        <option value="">Contract Type</option>
                        <option value="Standard Service">
                          Standard Service
                        </option>
                        <option value="Premium Service">Premium Service</option>
                        <option value="Basic Maintenance">
                          Basic Maintenance
                        </option>
                        <option value="Corporate Service">
                          Corporate Service
                        </option>
                        <option value="Custom Contract">Custom Contract</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contractType" className="form-label">
                        Contract Status:
                      </label>
                      <select
                        className="form-select"
                        name="contractStatus"
                        id="contractStatus"
                        value={createContractStatus}
                        onChange={(e) =>
                          setCreateContractStatus(e.target.value)
                        }
                        required
                      >
                        <option value="">Select Contract Status</option>

                        <option value="Active">Active</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Terminated">Terminated</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="creatContractDescription"
                        className="form-label"
                      >
                        Contract Description:
                      </label>
                      <textarea
                        className="form-control"
                        name="creatContractDescription"
                        id="creatContractDescription"
                        rows={4}
                        value={createContractDescription}
                        onChange={(e) =>
                          setCreateContractDescription(e.target.value)
                        }
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signDate" className="form-label">
                        Sign Date:
                      </label>
                      {dateHasError ? (
                        <div className="p-1 text-danger-emphasis bg-danger-subtle border border-danger rounded-3">
                          The sign date has to be before the expiry date.
                        </div>
                      ) : (
                        <></>
                      )}
                      <input
                        type="date"
                        className="form-control"
                        name="signDate"
                        id="signDate"
                        value={new Date(signDate).toISOString().split("T")[0]}
                        onChange={(e) =>
                          setSignDate(
                            new Date(e.target.value).toLocaleDateString("en-US")
                          )
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="expiryDate" className="form-label">
                        Expiry Date:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="expiryDate"
                        id="expiryDate"
                        value={new Date(expiryDate).toISOString().split("T")[0]}
                        onChange={(e) =>
                          setExpiryDate(
                            new Date(e.target.value).toLocaleDateString("en-US")
                          )
                        }
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-dark"
                      disabled={dateHasError}
                    >
                      Create Contract
                    </button>
                  </form>
                </div>
                {/* Update Contract*/}
                <div
                  className="tab-pane fade show"
                  id="updateContract"
                  role="tabpanel"
                  aria-labelledby="updateContract-tab"
                >
                  <form
                    id="updateContractForm"
                    onSubmit={(e) => HandleUpdateContract(e)}
                  >
                    <div className="mb-3">
                      <label htmlFor="contract" className="form-label">
                        Select Contract:
                      </label>
                      <select
                        className="form-select"
                        name="contract"
                        id="contract"
                        value={editSelectedContract}
                        onChange={(e) =>
                          setEditSelectedContract(e.target.value)
                        }
                        required
                      >
                        <option value="">Select Contract</option>
                        {contracts
                          .filter(
                            (x) =>
                              x.LinkedClient.ClientID ==
                              currentJob?.Client.ClientID
                          )
                          .map((contract) => (
                            <option
                              key={contract.ContractID}
                              value={contract.ContractID}
                            >
                              {contract.ContractType} - {contract.ContractID}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contractType" className="form-label">
                        Contract Status:
                      </label>
                      <select
                        className="form-select"
                        name="contractStatus"
                        id="contractStatus"
                        value={editContractStatus}
                        onChange={(e) => setEditContractStatus(e.target.value)}
                        required
                      >
                        <option value="">Select Contract Status</option>

                        <option value="Active">Active</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Terminated">Terminated</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contractType" className="form-label">
                        Contract Type:
                      </label>
                      <select
                        className="form-select"
                        name="contractType"
                        id="contractType"
                        value={editContractType}
                        onChange={(e) => setEditContractType(e.target.value)}
                        required
                      >
                        <option value="">Contract Type</option>
                        <option value="Standard Service">
                          Standard Service
                        </option>
                        <option value="Premium Service">Premium Service</option>
                        <option value="Basic Maintenance">
                          Basic Maintenance
                        </option>
                        <option value="Corporate Service">
                          Corporate Service
                        </option>
                        <option value="Custom Contract">Custom Contract</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description:
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        rows={4}
                        value={editContractDescription}
                        onChange={(e) =>
                          setEditContractDescription(e.target.value)
                        }
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-dark">
                      Update Contract
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Contract maintenance modal ENDS*/}
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
              <form id="cancelJobForm" onSubmit={RejectRequest}>
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
                  <tr key={job.jobID} onClick={() => LoadData(job.JobID)}>
                    <td>
                      {job.Client.ClientName} {job.Client.ClientSurname}
                    </td>
                    <td className="text-wrap">{job.Description}</td>
                    <td>
                      <button
                        className="btn btn-outline-light btn-sm"
                        data-bs-target="#clientRequestModal"
                        data-bs-toggle="modal"
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
                        data-bs-target="#contractRequestModal"
                        data-bs-toggle="modal"
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
