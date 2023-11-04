export default function Footer() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {/* <div className="fixed-bottom d-flex flex-row justify-content-center gap-3 mb-5">
        <p className="text-center text-black fs-6 fw-normal">
          Terms of Service
        </p>
        <p className="text-center text-black fs-6 fw-normal">Privacy Policy</p>
        <p className="text-center text-black fs-6 fw-normal ">Contact Us</p>
      </div> */}
      <div className="navbar fixed-bottom bg-dark">
        <div className="container-fluid text-center">
          <a className="navbar-brand text-white w-100" href="/">
            Premier Service Solutions &copy;
          </a>
        </div>
      </div>
    </div>
  );
}
