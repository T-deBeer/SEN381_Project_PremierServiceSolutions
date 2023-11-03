import Avatar from "react-avatar";
import { useUser } from "../data-layer/context-classes/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DataHandler from "../data-layer/database-call/DataHandler";
import { useEffect, useState } from "react";
import Call from "../data-layer/data-classes/Call";
import SupportCall from "../business-layer/call-centre/SupportCall";
import { CallContext } from "../business-layer/call-centre/CallContext";
import ServiceRequestCall from "../business-layer/call-centre/ServiceRequestCall";
import ClientDetailChangeCall from "../business-layer/call-centre/ClientDetailChangeCall";
import ContractCancelationCall from "../business-layer/call-centre/ContractCancellationCall";
import CallBubble from "../components/CallBubble";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { socket } from "../data-layer/context-classes/Socket";

export default function CallCentrePage() {
  const { user } = useUser();
  const [calls, setCalls] = useState<Call[]>();
  const [currentCall, setCurrentCall] = useState<Call | null>();
  const [handled, setHandled] = useState(false);
  const [logOption, setLogOption] = useState("");
  const handler = new DataHandler();
  const [currentMessage, setCurrentMessage] = useState<string>();
  const [messages, setMessages] = useState<string[]>([]);

  async function LoadCalls() {
    let calls: Call[] = await handler.GetCalls();
    setCalls(calls.filter((x) => x.HandledTime == null));
  }
  async function LoadCallInfo(id: string) {
    setCurrentCall(calls?.filter((x) => x.CallID === id)[0]);
  }

  useEffect(() => {
    LoadCalls();
  }, [handled]);

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
    // Define the event handler function
    const handleReceiveMessage = (messageData: any) => {
      console.log(messageData);
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

  function LogCall(callType: string): void {
    let callContext: CallContext | null = null;
    //alert(`Call ${callType}`);
    switch (callType) {
      case "support":
        callContext = new CallContext(new SupportCall());
        break;
      case "service-request":
        callContext = new CallContext(new ServiceRequestCall());
        break;
      case "client":
        callContext = new CallContext(new ClientDetailChangeCall());
        break;
      case "contract":
        callContext = new CallContext(new ContractCancelationCall());
        break;
      default:
        console.error("Unknown call type:", callType);
        return;
    }

    if (currentCall != null && callContext != null) {
      callContext.Handle(currentCall);
      setHandled(!handled);
      setCurrentCall(null);
    }
  }

  return (
    <div className="">
      {/*Create a new call Modal*/}
      <div
        className="modal fade"
        id="maintenanceJobModal"
        role="dialog"
        aria-labelledby="maintenanceJobModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5
                className="modal-title text-white"
                id="maintenanceJobModalLabel"
              >
                New maintenance job
              </h5>
              <button
                type="button"
                className="btn-close bg-dark-subtle"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="maintenanceJobForm" onSubmit={() => LogCall(logOption)}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Job Description:
                  </label>
                  <textarea
                    className="form-control textarea mb-3"
                    name="description"
                    id="description"
                    cols={30}
                    rows={10}
                    placeholder="Type a description for this job..."
                    required
                  ></textarea>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center mt-5">
                  <button type="submit" className="btn btn-dark w-50">
                    Create Job
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
                    className="form-control "
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

      <div className="welcome-div  p-2 d-flex flex-row justify-content-between align-items-end">
        <div className="d-flex flex-row align-items-center">
          <Avatar name={user?.username} className="rounded-circle" />
          <h3 className="text-white fw-bolder mx-1">{user?.username}</h3>
          <div
            className="rounded-circle bg-success"
            style={{ width: "25px", height: "25px" }}
          ></div>
        </div>
        <div className="align-self-center d-flex flex-row gap-3">
          <button type="button" className="btn btn-success btn-lg">
            Set Active
          </button>
          <button type="button" className="btn btn-danger btn-lg">
            Set Inactive
          </button>
        </div>
      </div>

      <div className="d-flex flex-row p-2 flex-wrap h-50">
        {/* Side Bar Seciton */}
        <div className="w-25 h-50">
          <h3>Open Calls</h3>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              {calls?.map((call, index) => (
                <div
                  className="accordion-item"
                  key={index}
                  onClick={() => {
                    LoadCallInfo(call.CallID);
                  }}
                >
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse-${index}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse-${index}`}
                    >
                      Call #{index + 1}
                      <sup className="badge text-bg-dark mx-2">
                        {call.LoggedTime.toLocaleTimeString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: false,
                        })}
                      </sup>
                    </button>
                  </h2>
                  <div
                    id={`flush-collapse-${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <p>Call ID: {call.CallID}</p>
                      <p>
                        Client Name: {call.CallClient.ClientName}{" "}
                        {call.CallClient.ClientSurname}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Main Seciton */}
        <div className="flex-grow-1 d-flex flex-column align-items-center gap-4">
          {/* CURRENT */}
          {currentCall ? (
            <div className="w-75 bg-dark-subtle rounded-4 p-3">
              <h2>
                Job for {currentCall.CallClient.ClientName}{" "}
                {currentCall.CallClient.ClientSurname}
              </h2>
              <a
                href={`data:application/pdf;base64, ${currentCall.CallAttachments}`}
                download="Call.pdf"
              >
                Download call PDF
              </a>

              <div className="d-flex flex-row gap-3">
                <button
                  className="btn btn-dark btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#chatModal"
                  onClick={() => joinCall(currentCall.CallID)}
                >
                  Contact Client
                </button>
                <button className="btn btn-danger btn-sm">Reject Call</button>
              </div>
            </div>
          ) : (
            <></>
          )}

          {/* CARDS */}
          <div className="d-flex flex-row gap-3 flex-wrap">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="https://images.unsplash.com/photo-1553775282-20af80779df7?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">SUPPORT CALL</h5>
                <p className="card-text">
                  Client is requesting support within a current system that is
                  in place, <b>no</b> maintenance personal required with the
                  support.
                </p>
                <button
                  onClick={() => LogCall("support")}
                  className="btn btn-dark btn-sm w-100"
                >
                  LOG SUPPORT CALL
                </button>
              </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="https://images.unsplash.com/photo-1604754742629-3e5728249d73?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">SERVICE REQUEST</h5>
                <p className="card-text">
                  Client is requesting a service to one of their solutions
                  maintenance personal is required to do the service.
                </p>
                <button
                  onClick={() => LogCall("service-request")}
                  className="btn btn-dark btn-sm w-100"
                >
                  LOG SERVICE REQUEST
                </button>
              </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">CONTRACT MAINTENANCE</h5>
                <p className="card-text">
                  Client is requesint maintenance or changes to either their
                  contract or Service License Agreement(SLA).
                </p>
                <button
                  onClick={() => setLogOption("contract")}
                  data-bs-toggle="modal"
                  data-bs-target="#maintenanceJobModal"
                  className="btn btn-dark btn-sm w-100"
                >
                  LOG CONTRACT MAINTENANCE
                </button>
              </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?auto=format&fit=crop&q=80&w=2096&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="card-img-top img-fluid"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">CLIENT MAINTENANCE</h5>
                <p className="card-text">
                  Client is requesting maintenance to be done on their account
                  e.g. their details have changed or they have faulty
                  information on the system.
                </p>
                <button
                  onClick={() => setLogOption("client")}
                  className="btn btn-dark btn-sm w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#maintenanceJobModal"
                >
                  LOG CLIENT MAINTENANCE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
