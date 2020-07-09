import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Home from "./Home";
import Schedules from "./Schedules";
import Appointments from "./Appointments";

const Dashboard = ({ setAdmin, admin }) => {
  console.log(admin);
  const sellerName = admin.sellerName;
  const sellerId = admin.sellerId;
  const handleSignout = () => {
    localStorage.removeItem("loggedAdmin");
    setAdmin("");
  };
  return (
    <div className="d-flex admin">
      {/* Side Nav Bar */}
      <div className="side-nav">
        <br />
        <h5>{sellerName} </h5>

        <br />
        <br />
        <br />
        <Nav defaultActiveKey="/seller/" className="flex-column">
          <Link to="/seller" className="text">
            <i className="fa fa-home"></i>
            <span>Home</span>
          </Link>
          <Link to="/seller/schedules" className="text">
            <i className="fa fa-calendar"></i>
            <span>Schedules</span>
          </Link>
          <Link to="/seller/appointments" className="text">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
            <span>Appointments</span>
          </Link>
          <Link to="/seller" className="text" onClick={handleSignout}>
            <i className="fa fa-sign-out"></i>
            <span>Sign out</span>
          </Link>
        </Nav>
      </div>

      {/* Router */}
      <div className="main" style={{ paddingTop: "100px" }}>
        <Switch>
          <Route exact path="/seller/" component={Home} />
          <Route exact path="/seller/appointments" component={Appointments} />
          <Route exact path="/seller/schedules" component={Schedules} />
        </Switch>
      </div>
    </div>
  );
};
export default Dashboard;
