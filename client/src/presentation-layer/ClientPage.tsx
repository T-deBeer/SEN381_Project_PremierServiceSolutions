import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WelcomeDiv from "../components/WelcomeDiv";
import { useUser } from "../data-layer/context-classes/UserContext";

export default function ClientPage() {
  const { user, login, signout } = useUser();
  if (user) {
    alert("reroute");
  }
  return (
    <div className="vh-100 d-flex flex-column">
      <Navbar />

      <div className="welcome-div d-flex flex-column justify-content-center align-items-center gap-3 mb-5">
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

      <div id="carouselExample" className="carousel slide mb-5">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div id="component" className="container-fluid py-3">
              <div className=" row align-items-center">
                <div className="pt-1 col-lg-12 row justify-content-center carousel-fade">
                  <div className="py-1 col-lg-4 row justify-content-center align-items-center">
                    <div className="bg-black bg-opacity-10 rounded-5 col-4 justify-content-center align-items-center">
                      <p className="text-center text-black fs-1 fw-normal font-family-Roboto col-12 m-0 px-3 py-2">
                        📞
                      </p>
                    </div>
                    <div className="col-12 row d-flex">
                      <p className="text-center text-black fs-6 fw-normal font-family-Roboto col-12 m-0 px-3 py-2">
                        Service Request
                      </p>
                      <p className="text-center text-black text-opacity-50 fs-6 fw-normal font-family-Roboto col-12 m-0 px-3 py-2">
                        Operator: Alfred Smith
                      </p>
                    </div>
                    <p className="text-center text-black fs-4 fw-medium font-family-Roboto col-12 m-0 px-3 py-2">
                      10:30 AM
                    </p>
                  </div>
                  <div className="py-1 col-lg-4 row justify-content-center align-items-center">
                    <div className="bg-black bg-opacity-10 rounded-5 col-4 justify-content-center align-items-center">
                      <p className="text-center text-black fs-1 fw-normal font-family-Roboto col-12 m-0 px-3 py-2">
                        📞
                      </p>
                    </div>
                    <div className="col-12 row d-flex">
                      <p className="text-center text-black fs-6 fw-normal font-family-Roboto col-12 m-0 px-3 py-2">
                        Service Request
                      </p>
                      <p className="text-center text-black text-opacity-50 fs-6 fw-normal font-family-Roboto col-12 m-0 px-3 py-2">
                        Operator: Alfred Smith
                      </p>
                    </div>
                    <p className="text-center text-black fs-4 fw-medium font-family-Roboto col-12 m-0 px-3 py-2">
                      11:45 AM
                    </p>
                  </div>
                  <div className="py-1 col-lg-4 row justify-content-center align-items-center">
                    <div className="bg-black bg-opacity-10 rounded-5 col-4 justify-content-center align-items-center">
                      <p className="text-center text-black fs-1 fw-normal font-family-Roboto col-12 m-0 px-3 py-2">
                        📞
                      </p>
                    </div>
                    <div className="col-12 row d-flex">
                      <p className="text-center text-black fs-6 fw-normal font-family-Roboto col-12 m-0 px-3 py-2">
                        Detail Change
                      </p>
                      <p className="text-center text-black text-opacity-50 fs-6 fw-normal font-family-Roboto col-12 m-0 px-3 py-2">
                        Operator: Alfred Smith
                      </p>
                    </div>
                    <p className="text-center text-black fs-4 fw-medium font-family-Roboto col-12 m-0 px-3 py-2">
                      1:15 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="..." className="d-block w-100" alt="..." />
          </div>
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

      <div className="welcome-div d-flex flex-column justify-content-center align-items-center gap-3 h-25">
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
