import { useEffect, useState } from "react";
import CallBubble from "../components/CallBubble";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WelcomeDiv from "../components/WelcomeDiv";
import { useUser } from "../data-layer/context-classes/UserContext";
import Call from "../data-layer/data-classes/Call";
import DataHandler from "../data-layer/database-call/DataHandler";

export default function ClientPage() {
  const { user } = useUser();
  const [calls, setCalls] = useState<Call[]>();
  const [callGroups, setSetCallGroups] = useState<any[]>([]);

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
  }, []);

  return (
    <div className="vh-100 d-flex flex-column">
      <Navbar />

      <div className="welcome-div d-flex flex-column justify-content-center align-items-center gap-3">
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
        <button className="btn btn-dark w-25">Start new call</button>
      </div>

      <div id="carouselExample" className="carousel slide h-25 p-5">
        <div className="carousel-inner">
          {callGroups.map((group, index) => (
            <div key={index} className="carousel-item active">
              <div className="d-flex flex-row justify-content-center align-self-center">
                {group.map((callInfo: Call, callIndex: any) => (
                  <CallBubble callInfo={callInfo} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
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
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="welcome-div d-flex flex-column justify-content-center align-items-center gap-3 h-25 mb-5">
        <div className="form-floating w-25">
          <textarea
            className="form-control bg-dark-subtle opacity-7"
            placeholder="Enter your feedback message here..."
            id="floatingTextarea"
            rows={20}
          ></textarea>
          <label htmlFor="floatingTextarea">Feedback</label>
        </div>
        <button className="btn btn-dark w-25">Send Feedback Message</button>
      </div>

      <Footer />
    </div>
  );
}
