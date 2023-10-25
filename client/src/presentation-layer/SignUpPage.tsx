import { useContext } from "react";
import { useUser } from "../data-layer/context-classes/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WelcomeDiv from "../components/WelcomeDiv";

export default function LoginPage() {
  const { user, login, signout } = useUser();
  function handleLogin() {
    alert("Handle Sign up");
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
          <h2 className="text-center">Sign Up</h2>
          <div className="form-floating mb-4 mt-5">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="Firstname"
            />
            <label htmlFor="floatingName">
              Firstname<sup className="text-danger">*</sup>
            </label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder="Lastname"
            />
            <label htmlFor="floatingName">
              Lastname<sup className="text-danger">*</sup>
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
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              required
              placeholder="Confirm Password"
            />
            <label htmlFor="password">
              Confirm Password<sup className="text-danger">*</sup>
            </label>
          </div>
          <div className="form-floating mb-2">
            <a href="/login">Already have an account? Log in now</a>
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
