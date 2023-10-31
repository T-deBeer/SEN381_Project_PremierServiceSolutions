import Call from "../data-layer/data-classes/Call";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function CallBubble({ callInfo }: { callInfo: Call }) {
  return (
    <div className="d-flex flex-column w-25 align-items-center ">
      <div className="rounded-4 bg-dark-subtle w-50 d-flex flex-row justify-content-center p-2 h-100">
        {callInfo.HandledTime != null ? (
          <FontAwesomeIcon icon={faPhone} color="red" />
        ) : (
          <FontAwesomeIcon
            icon={faPhone}
            color="green"
            className="fs-1 text-center"
          />
        )}
      </div>
      <div>
        {callInfo.HandledTime != null ? (
          <h5>
            Handled:
            {callInfo.HandledTime.toLocaleTimeString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </h5>
        ) : (
          <h5>
            Logged:
            {callInfo.LoggedTime.toLocaleTimeString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </h5>
        )}
      </div>
    </div>
  );
}
