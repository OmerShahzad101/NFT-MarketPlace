import React from "react";
import { ENV } from "../../env";

const Dashboard = () => {
  return (
    <div className="mt-5 pt-5">
      <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
        <li>
          <a
            className="active"
            id="nav-home-tab"
            data-toggle="pill"
            href="#nav-home"
          >
            <h5 className="m-0">Create Collection</h5>
          </a>
        </li>
        <li>
          <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
            <h5 className="m-0">Create NFT</h5>
          </a>
        </li>
        <li>
          <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
            <h5 className="m-0">Details</h5>
          </a>
        </li>
      </ul>

      <div className="tab-content py-4" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home">asdfgh</div>
        <div className="tab-pane fade" id="nav-profile">asdfghj</div>
        <div className="tab-pane fade" id="nav-contact">asdfghjk</div>
      </div>
    </div>
  );
};

export default Dashboard;
