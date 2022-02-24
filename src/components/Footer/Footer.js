import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../env";
import footer from "../../services/footer.service";

const Footer = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);
  // Fetch Data on component load
  const fetchData = async () => {
    const res = await footer.footerlink(`${ENV.API_URL}api/settings/social/`);
    setData(res.data);
  };
  return (
    <footer className="footer-area">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-3 res-margin">
              <div className="footer-items">
                <a className="navbar-brand" href="/">
                  <img src="/img/logo.png" alt="" />
                </a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
                  non, fugit totam vel laboriosam vitae.
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 res-margin">
              <div className="footer-items">
                <h4 className="footer-title">Useful Links</h4>
                <ul>
                  <li>
                    <Link to="/marketplace">Marketplace</Link>
                  </li>
                  <li>
                    <Link to="/liveAuction">Live Auction</Link>
                  </li>
                  <li>
                    <Link to="collection">Collections</Link>
                  </li>
                  <li>
                    <Link to="/activity">Activity</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 res-margin">
              <div className="footer-items">
                <h4 className="footer-title">Community</h4>
                <ul>
                  <li>
                    <Link to="/help-center">Help Center</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="footer-items">
                <h4 className="footer-title">Get In Touch</h4>
                <div className="social-icons d-flex">
                  {data ? (
                    data.facebook ? (
                      <a href={data.facebook}>
                        <i className={data.facebook_icon} />
                        <i className={data.facebook_icon} />
                      </a>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {data ? (
                    data.twitter ? (
                      <a href={`${data.twitter}`}>
                        <i className={data.twitter_icon} />
                        <i className={data.twitter_icon} />
                      </a>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {data ? (
                    data.vine ? (
                      <a href={data.vine}>
                        <i className={data.vine_icon} />
                        <i className={data.vine_icon} />
                      </a>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {data ? (
                    data.google ? (
                      <a href={data.google}>
                        <i className={data.google_plus_icon} />
                        <i className={data.google_plus_icon} />
                      </a>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                <div className="copyright-left">
                  ©2022 ArhamSoft, All Rights Reserved.
                </div>

                <div className="copyright-right">
                  Made with <i className="fas fa-heart" /> By{" "}
                  <a href="#">Team MERN</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
