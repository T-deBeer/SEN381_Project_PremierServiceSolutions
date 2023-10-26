import { useContext, useEffect, useState } from "react";
import { useUser } from "../data-layer/context-classes/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WelcomeDiv from "../components/WelcomeDiv";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { user, login, signout } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post("/api/get/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful");
        let user = response.data;
        login({ username: user.username, role: user.role, id: user.id });
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      setHasError("Incorrect email or password");
      console.error("Error while logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const navi = useNavigate();
  //   switch (user?.role) {
  //     case "Client":
  //       navi("/client");
  //       break;
  //     case "Service":
  //       navi("/service");
  //       break;
  //     case "Worker":
  //       navi("/employee");
  //       break;
  //   }
  // }, [user]);

  return (
    <div>
      <Navbar />
      <WelcomeDiv text={"Premier Service Solutions"} />
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        ) : (
          <></>
        )}

        <form
          className="bg-dark-subtle m-2 rounded-3 p-5 w-50"
          onSubmit={handleLogin} // Use onSubmit to trigger the login function
        >
          <h2 className="text-center mb-5">Log In</h2>
          {hasError != "" ? (
            <div className="p-1 text-danger-emphasis bg-danger-subtle border border-danger rounded-3">
              {hasError}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <button type="submit" className="btn btn-outline-dark btn-lg">
              Log In
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
