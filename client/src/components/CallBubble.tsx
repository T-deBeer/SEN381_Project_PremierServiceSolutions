import Call from "../data-layer/data-classes/Call";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
// This is a prefabrication of the Phone bubble seen in the client page.
export default function CallBubble({
  callInfo,
  ClickFunction,
}: {
  callInfo: Call;
  ClickFunction: () => void;
}) {
  return (
    <div className="d-flex flex-column w-25 align-items-center ">
      <div className="w-50">
        {callInfo.HandledTime != null ? (
          <button
            className="btn btn-outline-dark rounded-4 d-flex flex-row justify-content-center p-2 h-100 w-100"
            disabled
          >
            <FontAwesomeIcon
              icon={faPhone}
              color="red"
              className="fs-1 text-center call-info-hover"
            />
          </button>
        ) : (
          <button
            className="btn btn-outline-dark  rounded-4 d-flex flex-row justify-content-center p-2 h-100 w-100"
            data-bs-toggle="modal"
            data-bs-target="#chatModal"
            onClick={ClickFunction}
          >
            <FontAwesomeIcon
              icon={faPhone}
              color="green"
              className="fs-1 text-center"
            />
          </button>
        )}
      </div>
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
