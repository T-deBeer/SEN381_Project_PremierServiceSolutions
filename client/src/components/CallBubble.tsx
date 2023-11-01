import Call from "../data-layer/data-classes/Call";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function CallBubble({ callInfo }: { callInfo: Call }) {
  return (
    <div className="d-flex flex-column w-25 align-items-center ">
      <button className="btn rounded-4 bg-dark-subtle w-50 d-flex flex-row justify-content-center p-2 h-100 call-info-hover">
        {callInfo.HandledTime != null ? (
          <FontAwesomeIcon icon={faPhone} color="red" />
        ) : (
          <FontAwesomeIcon
            icon={faPhone}
            color="green"
            className="fs-1 text-center"
          />
        )}
      </button>
      <div>
        {callInfo.HandledTime != null ? (
          <div className="d-flex flex-column align-items-center">
            {callInfo.CallType}
            <h5>
              Logged:{" "}
              {callInfo.LoggedTime.toLocaleTimeString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </h5>
            <h5>
              Handled:{" "}
              {callInfo.HandledTime.toLocaleTimeString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </h5>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center">
            {callInfo.CallType}
            <h5>
              Logged:{" "}
              {callInfo.LoggedTime.toLocaleTimeString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </h5>
            <h5>Currently Open</h5>
          </div>
        )}
      </div>
    </div>
  );
}
