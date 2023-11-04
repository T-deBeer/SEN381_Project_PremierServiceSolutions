import Avatar from "react-avatar";
import { useUser } from "../data-layer/context-classes/UserContext";
import { ReactNode } from "react";

export interface SidebarProps {
  showButtons: boolean;
  tabContent1: ReactNode;
  tabContent2: ReactNode;
  tabContent3: ReactNode;
}

export default function Sidebar(props: SidebarProps) {
  const user = useUser();

  return (
    <div className="bg-dark rounded-3 d-flex flex-column align-items-center gap-5 h-100 p-1 mt-1 w-25">
      <div className="d-flex flex-column justify-content-center align-items-center gap-1 mt-2">
        <Avatar
          name={user.user?.username}
          className="img-fluid rounded-circle"
        />
        <p className="text-white text-center fs-4">{user.user?.username}</p>
        {props.showButtons ? (
          <button className="btn btn-outline-light">Edit</button>
        ) : (
          <></>
        )}
      </div>

      <div className="container mt-2">
        <ul className="nav nav-tabs text-white" id="myTabs" role="tablist">
          <li className="nav-item text-white">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Summary
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link "
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Staff
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="contact-tab"
              data-toggle="tab"
              href="#contact"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Client
            </a>
          </li>
        </ul>
        <div className="tab-content text-white" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {props.tabContent1}
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {props.tabContent2}
          </div>
          <div
            className="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            {props.tabContent3}
          </div>
        </div>
      </div>
      {props.showButtons ? (
        <button className="btn btn-outline-success w-75 mb-1 mt-3">
          Complete
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
