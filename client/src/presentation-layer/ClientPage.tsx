import { useEffect, useState } from "react";
import CallBubble from "../components/CallBubble";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WelcomeDiv from "../components/WelcomeDiv";
import { useUser } from "../data-layer/context-classes/UserContext";
import Call from "../data-layer/data-classes/Call";
import DataHandler from "../data-layer/database-call/DataHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { socket } from "../data-layer/context-classes/Socket";

export default function ClientPage() {
  const { user } = useUser();
  const [calls, setCalls] = useState<Call[]>();
  const [userID, setUserID] = useState<string>();
  const [callGroups, setSetCallGroups] = useState<any[]>([]);
  const [currentCall, setCurrentCall] = useState<Call | null>();
  const [currentMessage, setCurrentMessage] = useState<string>();
  const [messages, setMessages] = useState<string[]>([]);

  const handler = new DataHandler();

  async function LoadCalls() {
    let calls: Call[] = await handler.GetCallsByID(user?.id);
    setCalls(calls);

    let groups: any[] = [];
    for (let i = 0; i < calls.length; i += 3) {
      groups.push(calls.slice(i, i + 3));
    }

    setSetCallGroups(groups);
  }

  useEffect(() => {
    LoadCalls();
  }, [user]);

  async function CreateNewCall(e: any) {
    e.preventDefault();
    const form = document.getElementById("newCallForm") as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);
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
        window.location.reload();
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

  return (
    <div className="vh-100">
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

      <div className="welcome-div d-flex flex-column justify-content-center align-items-center gap-3 h-25">
        <h3 className="text-white">Welcome, {user?.username}</h3>
        <div className="form-floating w-25 ">
          <input
            type="text"
            className="form-control form-control-sm bg-dark-subtle opacity-7"
            id="search"
            name="search"
            placeholder="Search"
          />
          <label htmlFor="floatingSearch">Search</label>
        </div>
        <button
          className="btn btn-dark w-25"
          data-bs-toggle="modal"
          data-bs-target="#newCallModal"
        >
          Start new call
        </button>
      </div>

      <div id="carousel" className="carousel slide h-25 p-5">
        <div className="carousel-inner">
          {callGroups.map((group, index) => (
            <div
              key={index}
              className={index == 0 ? "carousel-item active" : "carousel-item"}
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

      <div className="welcome-div d-flex flex-column justify-content-center align-items-center gap-3 mb-1 p-3 h-25">
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
