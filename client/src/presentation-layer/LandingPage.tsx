import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WelcomeDiv from "../components/WelcomeDiv";
import { useUser } from "../data-layer/context-classes/UserContext";

export default function LandingPage() {
  const { user, login, signOut: signOut } = useUser();
  return (
    <div className="vh-100">
      <Navbar />
      <WelcomeDiv text={"Welcome to Premier Service Solutions"} />
      <div className="container-fluid py-3 w-50">
        <div className="">
          <p className="text-dark fs-3 fw-bolder">Who we are?</p>
          <p className="text-justify">
            Premier Service Solutions is a leading equipment maintenance
            provider. We offer service contracts to our clients, ensuring their
            equipment is maintained at agreed levels. Clients can easily request
            maintenance through our dedicated Service Centre. Our efficient
            system assigns jobs to our skilled technical staff, who perform
            maintenance tasks at the client's location. We manage the entire
            incident lifecycle, from the initial call to scheduling, execution,
            and eventual closure. Our comprehensive system includes escalation
            procedures to address any issues effectively. With our management
            functions, we can monitor work, take appropriate executive action,
            and measure the performance of our employees across all departments.
            Client satisfaction is our utmost priority, and our system allows us
            to closely monitor, track, and measure the performance of all
            actions. We also ensure exceptional situations are promptly
            identified and presented to the appropriate users for swift action.
          </p>
        </div>
        <div className="d-flex flex-row justify-content-center mt-5">
          <a className="btn btn-dark w-50" type="button" href="/login">
            GET STARTED
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
