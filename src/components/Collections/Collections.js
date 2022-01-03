import React, { Component } from "react";
import Collection from "../../services/collections.service";
import { ENV } from "../../env";
const initData = {
  heading: "Collections ",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  filter_1: "All",
  filter_2: "Art",
  filter_3: "Music",
  filter_4: "Collectibles",
  filter_5: "Sports",
};

class Collections extends Component {
  state = {
    initData: initData,
    data: {},
    collectionData: [],
  };
  componentDidMount = async () => {
    const res = await Collection.collection(
      `${ENV.API_URL}api/collection_list/`
    );
    console.log(res);
    this.setState({ collectionData: res.data });
  };
  render() {
    return (
      <>
        <section className="explore-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-7">
                {/* Intro */}
                <div className="intro text-center mb-4">
                  <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                  <p>{this.state.initData.content}</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-12">
                {/* Explore Menu */}
                <div
                  className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4"
                  data-toggle="buttons"
                >
                  <label className="btn active d-table text-uppercase p-2">
                    <input
                      type="radio"
                      defaultValue="all"
                      defaultChecked
                      className="explore-btn"
                    />
                    <span>{this.state.initData.filter_1}</span>
                  </label>
                  <label className="btn d-table text-uppercase p-2">
                    <input
                      type="radio"
                      defaultValue="art"
                      className="explore-btn"
                    />
                    <span>{this.state.initData.filter_2}</span>
                  </label>
                  <label className="btn d-table text-uppercase p-2">
                    <input
                      type="radio"
                      defaultValue="music"
                      className="explore-btn"
                    />
                    <span>{this.state.initData.filter_3}</span>
                  </label>
                  <label className="btn d-table text-uppercase p-2">
                    <input
                      type="radio"
                      defaultValue="collectibles"
                      className="explore-btn"
                    />
                    <span>{this.state.initData.filter_4}</span>
                  </label>
                  <label className="btn d-table text-uppercase p-2">
                    <input
                      type="radio"
                      defaultValue="sports"
                      className="explore-btn"
                    />
                    <span>{this.state.initData.filter_5}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="popular-collections-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {/* Intro */}
                  <div className="intro d-flex justify-content-between align-items-end m-0">
                    <div className="intro-content">
                      <span>{this.state.data.preHeading}</span>
                      <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                    </div>
                    <div className="intro-btn">
                      <a
                        className="btn content-btn text-left"
                        href="collection"
                      >
                        {this.state.data.btnText}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row items">
                {this.state.collectionData
                  ? this.state.collectionData.map((item, idx) => {
                      return (
                        <div
                          key={`cd_${idx}`}
                          className="col-12 col-sm-6 col-lg-3 item"
                        >
                          <div className="card no-hover text-center">
                            <div className="image-over">
                              <a href={`/item-details?${item.id}`}>
                                <img
                                  className="card-img-top"
                                  src={
                                    "https://images.unsplash.com/photo-1638913976381-5b8ed66c36d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                  }
                                  // src={item.banner_image}
                                  alt=""
                                />
                              </a>
                              {/* Seller */}
                              <a className="seller" href={`/item-details?${item.id}`}>
                                <div className="seller-thumb avatar-lg">
                                  <img
                                    className="rounded-circle"
                                    // src={item.logo_image}

                                    src={
                                      "https://images.unsplash.com/photo-1638913976381-5b8ed66c36d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                    }
                                    alt=""
                                  />
                                </div>
                              </a>
                            </div>
                            {/* Card Caption */}
                            <div className="card-caption col-12 p-0">
                              {/* Card Body */}
                              <div className="card-body mt-4">
                                <a href={`/item-details?${item.id}`}>
                                  <h5 className="mb-2">{item.name}</h5>
                                </a>
                                <span>{item.description}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Collections;
