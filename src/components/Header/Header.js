import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Header = () => {
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };
  const token = JSON.parse(localStorage.getItem("access"));
  let id = null;
  let decoded = null;

  return (
    <header id="header">
      <nav
        data-aos="zoom-out"
        data-aos-delay={800}
        className="navbar navbar-expand"
      >
        <div className="container header">
          <a className="navbar-brand" href="/">
            <img
              className="navbar-brand-sticky"
              src="img/logo.png"
              alt="sticky brand-logo"
            />
          </a>
          <div className="ml-auto" />
          {/* Navbar */}
          <ul className="navbar-nav items ">
            <li className="nav-item">
              <Link to="/marketplace" className="nav-link">
                Marketplace
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/collection" className="nav-link">
                Collection
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/liveAuction" className="nav-link">
                live Auction
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/ranking" className="nav-link">
                Ranking
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/activity" className="nav-link">
                Activity
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link className="nav-link" to="#">
                <i class="far fa-user-circle "></i>
              </Link>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    Contact
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/help-center" className="nav-link">
                    Help Center
                  </Link>
                </li>
             
                {/* <li className="nav-item">
                  <Link to="/favourite-nft" className="nav-link">
                    Favourite Nft
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link to="/authors" className="nav-link">
                    Authors
                  </Link>
                </li>
     
                <li className="nav-item">
                  {token ? (
                    <Link to="/" className="nav-link" onClick={logout}>
                      Logout
                    </Link>
                  ) : (
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  )}
                </li>

                <li className="nav-item">
                  {token
                    ? ((decoded = jwt_decode(token)),
                      (id = decoded.user_id),
                      (
                        <Link to={`/updateprofile?${id}`} className="nav-link">
                          My Profile
                        </Link>
                      ))
                    : ""}
                </li>
                <li className="nav-item">
                  {token
                    ? ((decoded = jwt_decode(token)),
                      (id = decoded.user_id),
                      (
                        <Link to={`/mycollections?${id}`} className="nav-link">
                          My Collections
                        </Link>
                      ))
                    : ""}
                </li>
                <li className="nav-item">
                  {token
                    ? ((decoded = jwt_decode(token)),
                      (id = decoded.user_id),
                      (
                        <Link to={`/dashboard?${id}`} className="nav-link">
                          Dashboard
                        </Link>
                      ))
                    : ""}
                </li>
              </ul>
            </li>
          </ul>
          {/* Navbar Icons */}
          {/* <ul className="navbar-nav icons">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#search"
              >
                <i className="fas fa-search" />
              </a>
            </li>
          </ul> */}
          {/* Navbar Toggler */}
          <ul className="navbar-nav toggle">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#menu"
              >
                <i className="fas fa-bars toggle-icon m-0" />
              </a>
            </li>
          </ul> 
          {/* <ul className="navbar-nav action">
            <li className="nav-item ml-3">
              <a
                href="/wallet-connect"
                className="btn ml-lg-auto btn-bordered-white"
              >
                <i className="icon-wallet mr-md-2" />
                Wallet Connect
              </a>
            </li>
          </ul> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
