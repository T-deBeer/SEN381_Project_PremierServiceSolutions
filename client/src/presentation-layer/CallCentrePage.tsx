import Avatar from "react-avatar";
import { useUser } from "../data-layer/context-classes/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CallCentrePage() {
  const { user } = useUser();
  return (
    <div className="vh-100">
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

      <div className="d-flex flex-row p-2 flex-wrap">
        {/* Side Bar Seciton */}
        <div className="w-25 overflow-y-scroll overflow-x-auto">
          <h3>Open Calls</h3>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Call #1
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">Call Details Appear Here</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Call #2
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">Call Details Appear Here</div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Call #3
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">Call Details Appear Here</div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Seciton */}
        <div className="flex-grow-1 d-flex flex-column align-items-center gap-4">
          {/* CURRENT */}
          <div className="w-75 bg-dark-subtle rounded-4 p-3">
            <h2>Current Job</h2>
            <p>Job Description</p>
            <div className="d-flex flex-row gap-3">
              <button className="btn btn-dark btn-sm">Contact Client</button>
              <button className="btn btn-danger btn-sm">Reject Call</button>
            </div>
          </div>
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
                <a href="#" className="btn btn-dark btn-sm w-100">
                  LOG SUPPORT CALL
                </a>
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
                <a href="#" className="btn btn-dark btn-sm w-100">
                  LOG SERVICE REQUEST
                </a>
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
                <a href="#" className="btn btn-dark btn-sm w-100">
                  LOG CONTRACT MAINTENANCE
                </a>
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
                <a href="#" className="btn btn-dark btn-sm w-100">
                  LOG CLIENT MAINTENANCE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
