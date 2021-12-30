import React, { Component } from "react";

const initData = {
  pre_heading: "Explore",
  heading: "Exclusive Digital Assets",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  btnText: "Load More",
};

const data = [
  {
    id: "1",
    img: "/img/auction_1.jpg",
    title: "Walking On Air",
    owner: "Richard",
    price: "1.5 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "2",
    img: "/img/auction_2.jpg",
    title: "Domain Names",
    owner: "John Deo",
    price: "2.7 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "3",
    img: "/img/auction_3.jpg",
    title: "Trading Cards",
    owner: "Arham",
    price: "2.3 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "4",
    img: "/img/auction_4.jpg",
    title: "Industrial Revolution",
    owner: "Yasmin",
    price: "1.8 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "5",
    img: "/img/auction_5.jpg",
    title: "Utility",
    owner: "Junaid",
    price: "1.7 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "6",
    img: "/img/auction_6.jpg",
    title: "Sports",
    owner: "ArtNox",
    price: "1.9 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "7",
    img: "/img/auction_7.jpg",
    title: "Cartoon Heroes",
    owner: "Junaid",
    price: "3.2 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "8",
    img: "/img/auction_8.jpg",
    title: "Gaming Chair",
    owner: "Johnson",
    price: "0.69 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "9",
    img: "/img/auction_9.jpg",
    title: "Photography",
    owner: "Sara",
    price: "2.3 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "10",
    img: "/img/auction_10.jpg",
    title: "Zed Run",
    owner: "SpaceMan",
    price: "3.7 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "11",
    img: "/img/auction_11.jpg",
    title: "Rare Tyres",
    owner: "Monas",
    price: "2.2 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
  {
    id: "12",
    img: "/img/auction_12.jpg",
    title: "World of Women",
    owner: "Victor",
    price: "4.3 ETH",
    count: "1 of 1",
    btnText: "Place a Bid",
  },
];

class ExploreFour extends Component {
  state = {
    initData: {},
    data: [],
  };
  componentDidMount() {
    this.setState({
      initData: initData,
      data: data,
    });
  }
  render() {
    return (
      <section className="explore-area load-more">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>{this.state.initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                <p>{this.state.initData.content}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-sm-6 text-right order-sm-last">
              <div class="form-group filter-select position-relative m-0">
                <select class="form-control ">
                  <option>Recently Listed</option>
                  <option>Ending Soon</option>
                  <option>Price Low - High</option>
                  <option>Price High - Low</option>
                  <option>Most Favourite</option>
                </select>
              </div>
            </div>
            <div className="col-sm-6 col-xl-9">
              <button
                className="btn px-5 my-sm-0 my-3"
                type="button"
                data-toggle="collapse"
                data-target="#collapseFilter"
                aria-expanded="false"
                aria-controls="collapseFilter"
              >
                Filter
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="collapse" id="collapseFilter">
                <div className="sales-type d-flex align-items-sm-center my-3">
                  <h6 className="mr-5">Sale Types</h6>
                  <div className="d-sm-flex">
                    <span className="mr-4">Fixed Price</span>
                    <span className="mr-4">Live Auction</span>
                  </div>
                </div>
                <div className="currency-form d-flex align-items-lg-center my-3">
                  <h6 className="mr-5">Currencies</h6>
                  <form className="d-lg-flex align-items-center justify-content-between">
                    <div className="d-lg-flex">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="bnb"
                          value="option1"
                        />
                        <label class="form-check-label" for="bnb">
                          Binance (BNB)
                        </label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="usd"
                          value="option1"
                        />
                        <label class="form-check-label" for="usd">
                          Dollar (USD)
                        </label>
                      </div>
                      <div className="d-sm-flex my-3 my-lg-0 justify-content-between">
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Min"
                        />
                        <span> - </span>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Max"
                        />
                        <button
                          type="submit"
                          className="btn btn-bordered-white ml-sm-3 mt-3 mt-sm-0"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="reset-filter">Reset</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            {this.state.data.map((item, idx) => {
              return (
                <div
                  key={`exf_${idx}`}
                  className="col-12 col-sm-6 col-lg-3 item"
                >
                  <div className="card">
                    <div className="image-over">
                      <a href="/item-details">
                        <img className="card-img-top" src={item.img} alt="" />
                      </a>
                    </div>
                    {/* Card Caption */}
                    <div className="card-caption col-12 p-0">
                      {/* Card Body */}
                      <div className="card-body">
                        <a href="/item-details">
                          <h5 className="mb-0">{item.title}</h5>
                        </a>
                        <div className="seller d-flex align-items-center my-3">
                          <span>Owned By</span>
                          <a href="/author">
                            <h6 className="ml-2 mb-0">{item.owner}</h6>
                          </a>
                        </div>
                        <div className="card-bottom d-flex justify-content-between">
                          <span>{item.price}</span>
                          <span>{item.count}</span>
                        </div>
                        <a
                          className="btn btn-bordered-white btn-smaller mt-3"
                          href="/login"
                        >
                          <i className="icon-handbag mr-2" />
                          {item.btnText}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <a id="load-btn" className="btn btn-bordered-white mt-5" href="#">
                {this.state.initData.btnText}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ExploreFour;
