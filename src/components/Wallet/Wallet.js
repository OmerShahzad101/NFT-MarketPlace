import React, { Component } from "react";
import axios from "axios";
import $ from "jquery"
const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json-1/wallet";

class Activity extends Component {
  state = {
    data: {},
    walletData: [],
    loader: false,
  };
  componentDidMount() {
    this.setState({ loader: true });
    $("html,body").animate({ scrollTop: 0 }, "slow");
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        this.setState({
          data: res.data,
          walletData: res.data.walletData,
          loader: false,
        });
        // console.log(this.state.data)
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <>
        {this.state.loader ? (
          <div className="fullpage-loader-holder height">
            <div className="fullpage-loader">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="shadow"></div>
              <div class="shadow"></div>
              <div class="shadow"></div>
            </div>
            <body></body>
          </div>
        ) : (
          <section className="wallet-connect-area">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-7">
                  {/* Intro */}
                  <div className="intro text-center">
                    {/* <span>{this.state.data.preHeading}</span> */}
                    <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                    <p>{this.state.data.content}</p>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center items">
                {this.state.walletData.map((item, idx) => {
                  return (
                    <div
                      key={`wd_${idx}`}
                      className="col-12 col-md-6 col-lg-4 item"
                    >
                      {/* Single Wallet */}
                      <div className="card single-wallet">
                        <a className="d-block text-center" href="/login">
                          <img className="avatar-lg" src={item.img} alt="" />
                          <h4 className="mb-0">{item.title}</h4>
                          <p>{item.content}</p>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
}
export default Activity;
