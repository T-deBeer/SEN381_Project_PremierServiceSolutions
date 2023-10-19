import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import WelcomeDiv from "../components/WelcomeDiv";

export default function LandingPage() {
return (
    <div className="ServiceDeptPage">
        <Navbar />
        <h2 className="mt-3">Unassigned Service Requests</h2>
            <table className="table table-dark table-hover">
        <thead>
                <tr>
                <th>#</th>
                <th>First</th>
                <th>Last</th>
                <th>Summary</th>
                <th>Assign Request</th>
                <th>Reject Call</th>
                </tr>
        </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>I have a problem with my solutions, it's dated for some repairs and I would like to request a service for it.</td>
                    <td><a href="#" className="btn btn-primary">Assign Request</a></td>
                    <td><a href="#" className="btn btn-danger">Reject Call</a></td>
                </tr>

                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>My computer is not turning on.</td>
                    <td><a href="#" className="btn btn-primary">Assign Request</a></td>
                    <td><a href="#" className="btn btn-danger">Reject Call</a></td>
            </tr>
                <tr>
                <td>3</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>I need help with my printer.</td>
                <td><a href="#" className="btn btn-primary">Assign Request</a></td>
                <td><a href="#" className="btn btn-danger">Reject Call</a></td>
            </tr>
            </tbody>
        </table>

        <h2 className="mt-3">Assigned Service Requests</h2>
            <table className="table table-dark table-hover">
            <thead>
        <tr>
          <th>#</th>
          <th>First</th>
          <th>Last</th>
          <th>Summary</th>
          <th>Assigned To</th>
          <th>Re-assign Request</th>
          <th>Cancel Job</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>I have a problem with my solutions, it's dated for some repairs and I would like to request a service for it.</td>
          <td>John Smith</td>
          <td><a href="#" className="btn btn-primary">Assign Request</a></td>
          <td><a href="#" className="btn btn-danger">Cancel Job</a></td>
        </tr>
        </tbody>
         </table>
        <Footer /> 
    </div>
    );
}

