import { useEffect, useState } from "react";
import CallBubble from "../components/CallBubble";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useUser } from "../data-layer/context-classes/UserContext";
import Call from "../data-layer/data-classes/Call";
import DataHandler from "../data-layer/database-call/DataHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { socket } from "../data-layer/context-classes/Socket";
import MaintenanceJob from "../data-layer/data-classes/MaintenanceJob";
import ServiceRequest from "../data-layer/data-classes/ServiceRequest";
import { Console } from "console";

export default function ClientPage() {
  const { user } = useUser();
  const [calls, setCalls] = useState<Call[]>();
  const [jobs, setJobs] = useState<MaintenanceJob[]>();
  const [requests, setRequests] = useState<ServiceRequest[]>();
  const [callGroups, setSetCallGroups] = useState<any[]>([]);
  const [currentCall, setCurrentCall] = useState<Call | null>();
  const [currentMessage, setCurrentMessage] = useState<string>();
  const [messages, setMessages] = useState<string[]>([]);
  const [changings, setChangings] = useState(false);
  const [search, setSearch] = useState<string>("");

  const handler = new DataHandler();

  async function LoadRequired() {
    let calls: Call[] = await handler.GetCallsByID(user?.id);
    let jobs: MaintenanceJob[] = await handler.GetJobsByID(user?.id);
    let requests: ServiceRequest[] = await handler.GetClientRequestsByID(
      user?.id
    );

    setCalls(calls);
    setJobs(jobs);
    setRequests(requests);

    let groups: any[] = [];
    for (let i = 0; i < calls.length; i += 3) {
      groups.push(calls.slice(i, i + 3));
    }

    setSetCallGroups(groups);
  }

  useEffect(() => {
    LoadRequired();
  }, [user, changings]);

  useEffect(() => {
    const query: string | undefined = search?.toLowerCase();

    if (query != "") {
      const filteredCalls = calls?.filter((call) => {
        const dateMatch =
          call.LoggedTime.getDate() == new Date(query).getDate();
        const monthMatch = call.LoggedTime.toLocaleDateString("en-us", {
          month: "long",
        })
          .toLowerCase()
          .includes(query);

        const idMatch = call.CallID.toString().toLowerCase().includes(query);

        return dateMatch || idMatch || monthMatch;
      });

      if (filteredCalls) {
        let groups: any[] = [];
        for (let i = 0; i < filteredCalls?.length; i += 3) {
          groups.push(filteredCalls.slice(i, i + 3));
        }

        setSetCallGroups(groups);
      }
    } else {
      if (calls) {
        let groups: any[] = [];
        for (let i = 0; i < calls.length; i += 3) {
          groups.push(calls?.slice(i, i + 3));
        }

        setSetCallGroups(groups);
      }
    }
  }, [search]);

  async function CreateNewCall(e: any) {
    e.preventDefault();
    const form = document.getElementById("newCallForm") as HTMLFormElement;
    if (form) {
      const typeInput = document.getElementById("type") as HTMLInputElement;
      const descriptionInput = document.getElementById(
        "description"
      ) as HTMLInputElement;
      const fileInput = document.getElementById("file") as HTMLInputElement;

      // Get values from the form elements
      const id = user?.id;
      const type = typeInput.value;
      const description = descriptionInput.value;
      const file = fileInput.files || null;
      try {
        const result = await handler.CreateCall(id, type, description, file);
        setChangings(!changings);
      } catch (error) {
        console.error("Error creating a new call:", error);
      }
    }
  }

  async function sendMessage() {
    if (currentMessage) {
      let messageData = {
        room: currentCall?.CallID,
        author: user?.username,
        message: currentMessage,
        time: new Date(Date.now()).toLocaleTimeString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }),
      };
      const messageInput = document.getElementById(
        "message"
      ) as HTMLInputElement;
      messageInput.value = "";
      setCurrentMessage("");

      // Add the user's own message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        `Me(${messageData.time}): ${messageData.message}`,
      ]);
      socket.emit("send-message", messageData);
    }
  }

  useEffect(() => {
    const handleReceiveMessage = (messageData: any) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${messageData.author}(${messageData.time}): ${messageData.message}`,
      ]);
    };

    // Bind the event handler
    socket.on("recieve-message", handleReceiveMessage);

    // Clean up the event handler when the component unmounts
    return () => {
      socket.off("recieve-message", handleReceiveMessage);
    };
  }, []);

  function joinCall(roomID: string) {
    socket.emit("join-room", roomID);
    setMessages([]);
  }

  return (
    <div>
      {/*Create a new call Modal*/}
      <div
        className="modal fade"
        id="newCallModal"
        role="dialog"
        aria-labelledby="newCallModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-white" id="newCallModalLabel">
                Create a new Call
              </h5>
              <button
                type="button"
                className="btn-close bg-dark-subtle"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="newCallForm" onSubmit={(e) => CreateNewCall(e)}>
                <div className="form-group mb-3">
                  <label htmlFor="type">Select a Call Type:</label>
                  <select
                    className="form-control"
                    id="type"
                    name="type"
                    required
                  >
                    <option value="support">Support Call</option>
                    <option value="client">Client Maintenance</option>
                    <option value="contract">Contract Maintenance</option>
                    <option value="service-request">Service Request</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <textarea
                    className="form-control textarea mb-3"
                    name="description"
                    id="description"
                    cols={30}
                    rows={10}
                    placeholder="Type an explanation for your call..."
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    Upload additional information(optional):
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="file"
                    name="file"
                    accept=".pdf"
                    multiple={false}
                  />
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center mt-5">
                  <button type="submit" className="btn btn-dark w-50">
                    Create Call
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*Create a new call ENDS*/}
      {/*live chat window Modal*/}
      <div
        className="modal fade"
        id="chatModal"
        role="dialog"
        aria-labelledby="chatModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-white" id="chatModalLabel">
                {currentCall?.CallClient.ClientName}{" "}
                {currentCall?.CallClient.ClientSurname}'s Live Chat
              </h5>
              <button
                type="button"
                className="btn-close bg-dark-subtle"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="chatForm">
                <div className="mb-3">
                  <label htmlFor="chat" className="form-label">
                    Chat:
                  </label>
                  <textarea
                    className="form-control textarea mb-3 overflow-y-scroll"
                    name="chat"
                    id="chat"
                    cols={30}
                    rows={10}
                    value={messages.join("\n")}
                    readOnly
                  ></textarea>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center mt-5">
                  <input
                    className="form-control"
                    type="text"
                    name="message"
                    id="message"
                    onChange={(e) => setCurrentMessage(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={sendMessage}
                  >
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      color="whitesmoke"
                      className="text-center call-info-hover"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*live chat window ENDS*/}

      <Navbar />

      <div className="welcome-div d-flex flex-column justify-content-center align-items-center gap-3  p-2">
        <h3 className="text-white">Welcome, {user?.username}</h3>
        <div className="form-floating w-25 ">
          <input
            type="text"
            className="form-control form-control-sm bg-dark-subtle opacity-7"
            id="search"
            name="search"
            placeholder="Search for call"
            onChange={(e: any) => setSearch(e.target.value)}
          />
          <label htmlFor="floatingSearch bg-dark-subtle opacity-7">
            Search for call
          </label>
        </div>
        <button
          className="btn btn-dark w-25"
          data-bs-toggle="modal"
          data-bs-target="#newCallModal"
        >
          Start new call
        </button>
      </div>
      <div className="p-1">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link text-dark active"
              aria-current="page"
              href="#calls"
              data-toggle="tab"
            >
              Calls
              <sup className="badge text-bg-danger mx-1 text-center">
                {calls?.filter((x) => x.HandledTime == null)?.length}
              </sup>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-dark"
              href="#maintenance"
              data-toggle="tab"
            >
              Maintenance Jobs
              <sup className="badge text-bg-danger mx-1 text-center">
                {jobs?.length}
              </sup>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-dark" href="#service" data-toggle="tab">
              Service Requests
              <sup className="badge text-bg-danger mx-1 text-center">
                {requests?.length}
              </sup>
            </a>
          </li>
        </ul>
        <div className="tab-content " id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="calls"
            role="tabpanel"
            aria-labelledby="calls-tab"
          >
            <div id="carousel" className="carousel slide h-25 p-5">
              <div className="carousel-inner">
                {callGroups.map((group, index) => (
                  <div
                    key={index}
                    className={
                      index == 0 ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <div className="d-flex flex-row justify-content-center align-self-center">
                      {group.map((callInfo: Call, callIndex: any) => (
                        <CallBubble
                          key={callIndex}
                          callInfo={callInfo}
                          ClickFunction={() => {
                            setCurrentCall(callInfo);
                            joinCall(callInfo.CallID);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div
            className="tab-pane fade show"
            id="maintenance"
            role="tabpanel"
            aria-labelledby="maintenance-tab"
          >
            <h6>Un-Completed Maintenance jobs </h6>
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              {jobs?.map((job, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse-${index}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse-${index}`}
                    >
                      Job ID: {job.JobID}
                    </button>
                  </h2>
                  <div
                    id={`flush-collapse-${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>Description: {job.Description}</p>
                      <p>Difficulty Rating: {job.DifficultyRating}</p>
                      <p>Type: {job.Type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="tab-pane fade show"
            id="service"
            role="tabpanel"
            aria-labelledby="service-tab"
          >
            <h6>Un-Completed Service Requests</h6>
            <div
              className="accordion accordion-flush"
              id="accordionFlushServiceRequests"
            >
              {requests?.map((request, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#service-request-collapse-${index}`}
                      aria-expanded="false"
                      aria-controls={`service-request-collapse-${index}`}
                    >
                      Request ID: {request.RequestID}
                    </button>
                  </h2>
                  <div
                    id={`service-request-collapse-${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushServiceRequests"
                  >
                    <div className="accordion-body">
                      <p>
                        Date Made:{" "}
                        {request.RequestTime.toLocaleDateString("en-us")}
                      </p>

                      {request.Staff ? (
                        <p>
                          Assigned Staff: {request.Staff.StaffName}{" "}
                          {request.Staff.StaffSurname}
                        </p>
                      ) : (
                        <p>Assigned Staff: No Staff Assigned Yet.</p>
                      )}
                      <p>Priority: {request.Priority}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="welcome-div d-flex flex-column justify-content-center align-items-center gap-3 mb-5 p-3 h-25">
        <textarea
          className="form-control textarea bg-dark-subtle w-25"
          name="feedback"
          id="feedback"
          cols={30}
          rows={10}
          placeholder="Type your feedback here..."
        ></textarea>
        <button className="btn btn-dark w-25">Send Feedback Message</button>
      </div>

      <Footer />
    </div>
  );
}
