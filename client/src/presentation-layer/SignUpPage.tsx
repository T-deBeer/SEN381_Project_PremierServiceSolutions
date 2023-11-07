import { useContext, useEffect, useState } from "react";
import { useUser } from "../data-layer/context-classes/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WelcomeDiv from "../components/WelcomeDiv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import DataHandler from "../data-layer/database-call/DataHandler";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const handler = new DataHandler();
  const navi = useNavigate();

  const { user, login, signout } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmails, setRegisteredEmails] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  useEffect(() => {
    if (password != confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    console.log();
    if (registeredEmails.includes(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [confirmPassword, email, password]);

  async function LoadRequired() {
    let emails = await handler.GetClientEmails();
    setRegisteredEmails(emails);
  }

  useEffect(() => {
    LoadRequired();
  }, []);

  async function HandleSignUp() {
    await handler.CreateClient(firstName, lastName, email, password);
    navi("/login");
  }

  function ClearForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError(false);
    setPasswordError(false);
  }

  return (
    <div>
      <Navbar />
      {isLoading ? <FontAwesomeIcon icon={faSpinner} spin size="3x" /> : <></>}
      <WelcomeDiv text={"Premier Service Solutions"} />
      <div className="d-flex flex-row justify-content-center align-items-center mt-5">
        <form
          className="bg-dark-subtle m-2 rounded-3 p-5 w-50"
          onSubmit={HandleSignUp}
        >
          <h2 className="text-center">Sign Up</h2>
          <div className="form-floating mb-4 mt-5">
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="Firstname"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
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
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />

            <label htmlFor="floatingName">
              Lastname<sup className="text-danger">*</sup>
            </label>
          </div>
          {emailError ? (
            <div className="p-1 text-danger-emphasis bg-danger-subtle border border-danger rounded-3">
              Email is already in use
            </div>
          ) : (
            <></>
          )}
          <div className="form-floating mb-4">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="email">
              Email<sup className="text-danger">*</sup>
            </label>
          </div>
          <div className="form-floating mb-4 d-flex flex-row">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className="btn btn-outline-dark "
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
            <label htmlFor="password">
              Password<sup className="text-danger">*</sup>
            </label>
          </div>
          {passwordError ? (
            <div className="p-1 text-danger-emphasis bg-danger-subtle border border-danger rounded-3">
              Passwords should be matching
            </div>
          ) : (
            <></>
          )}
          <div className="form-floating mb-4 d-flex flex-row">
            <input
              type={showConfPassword ? "text" : "password"}
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              required
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <button
              className="btn btn-outline-dark "
              type="button"
              onClick={() => setShowConfPassword(!showConfPassword)}
            >
              <FontAwesomeIcon icon={showConfPassword ? faEyeSlash : faEye} />
            </button>
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
              onClick={ClearForm}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="signUp"
              className="btn btn-outline-dark btn-lg"
              disabled={passwordError}
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
