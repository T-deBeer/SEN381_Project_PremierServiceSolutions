import { useContext } from "react";
import { useUser } from "../data-layer/context-classes/UserContext";

export default function Navbar() {
  const { user, signOut: signout } = useUser();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark p-2"
      id="navigation"
    >
      <a className="navbar-brand" href="/">
        Premier Service Solutions
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        {user ? ( //If User is logged in
          <form
            className="d-flex gap-2 justify-content-end w-100 mx-1 my-2"
            role="search"
          >
            <button
              className="btn btn-sm btn-secondary"
              type="button"
              onClick={signout}
            >
              Sign Out
            </button>
          </form>
        ) : (
          //If user is not logged in
          <form
            className="d-flex gap-2 justify-content-end w-100 mx-1 my-2"
            role="search"
          >
            <a className="btn btn-sm btn-secondary" type="button" href="/login">
              Login
            </a>
            <a
              className="btn btn-sm btn-secondary"
              type="button"
              href="/signup"
            >
              Sign Up
            </a>
          </form>
        )}
      </div>
    </nav>
  );
}
