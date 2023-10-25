import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WelcomeDiv from "../components/WelcomeDiv";
import Sidebar, { SidebarProps }  from "../components/Sidebar";
import { useUser } from "../data-layer/context-classes/UserContext";

export default function LandingPage() {
    const { user } = useUser();
    let data: SidebarProps = {
      showButtons: false,
      tabContent1: <p>Tab 1 content</p>,
      tabContent2: <p>Tab 2 content</p>,
      tabContent3: <p>Tab 3 content</p>,
    };
    
    return (
      <div className="vh-100">
        <Navbar />
        
        <div className="d-flex flex-row gap-3 p-2 h-75">
          <Sidebar {...data} />
  
          <div className="flex-grow-1 h-75">
            <div className="mb-5">
              <h2>Unassigned Service Request</h2>
              <table className="table table-responsive table-dark rounded-3 hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Client</th>
                    <th>Priority</th>
                    <th>Date Requested</th>
                    <th className="">Assign Request</th>
                    <th>Reject Request</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <div className="mb-2">
              <h2>Assigned Service Request</h2>
              <table className="table table-responsive table-dark rounded-3 hover">
                <thead>
                  <tr>
                  <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Re-Assign Request</th>
                    <th>Cancel Job</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
  
        <Footer />
      </div>
    );
}
