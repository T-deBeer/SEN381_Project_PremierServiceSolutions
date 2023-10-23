import { useContext } from "react";
import { useUser } from "../data-layer/context-classes/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WelcomeDiv from "../components/WelcomeDiv";

export default function LoginPage() {
  const { user, login, signout } = useUser();

  function handleLogin() {
    login({ username: "Tiaan", role: "employee" });
    window.location.replace("/maintenance");
  }

  return (
    <div>
      <Navbar />
      <WelcomeDiv text={"Premier Service Solutions"} />
      <div className="d-flex flex-row justify-content-center align-items-center mt-5">
        <form
          className="bg-dark-subtle m-2 rounded-3 p-5 w-50"
          action="/login"
          method="post"
        >
          <h2 className="text-center">Log In</h2>
          <div className="form-floating mb-4 mt-5">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Username"
            />
            <label htmlFor="floatingName">
              Username<sup className="text-danger">*</sup>
            </label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              placeholder="Email"
            />
            <label htmlFor="email">
              Email<sup className="text-danger">*</sup>
            </label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              placeholder="Password"
            />
            <label htmlFor="password">
              Password<sup className="text-danger">*</sup>
            </label>
          </div>
          <div className="form-floating mb-2">
            <a href="/signup">Don't have an account? Create one</a>
          </div>
          <div className="d-flex flex-row justify-content-between">
            <button
              type="button"
              className="btn btn-outline-danger btn-lg"
              id="cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-outline-dark btn-lg"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
