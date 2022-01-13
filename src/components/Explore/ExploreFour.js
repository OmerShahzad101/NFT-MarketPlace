import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../env";
import NFT from "../../services/nft.service";

const ExploreFour = () => {
  const initialData = {
    heading: "Exclusive Digital Assets",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    btnText: "Load More",
  };

  const [initData, setInitData] = useState(initialData);
  const [nftData, setNftData] = useState();
  const [togglePassword, setTogglePassword] = useState(true);
  const [order, setOrder] = useState("ASC");

  const onToggle = (e) => {
    setTogglePassword(!togglePassword);
  };

  const sort = (col) => {
    console.log(col);
    if (order === "ASC") {
      const sorted = [...nftData].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setNftData(sorted);
      console.log(order);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...nftData].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setNftData(sorted);
      console.log(order);
      setOrder("ASC");
    }
  };

  useEffect(async () => {
    const res = await NFT.nftget(`${ENV.API_URL}api/nft_list/`);
    setNftData(res.data);
  }, []);
  return (
    <section className="explore-area">
    {/* <section className="explore-area load-more"> */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {/* Intro */}
            <div className="intro text-center">
              <h3 className="mt-3 mb-0">{initData.heading}</h3>
              <p>{initData.content}</p>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-xl-3 col-sm-6 text-right order-sm-last">
            <div class="form-group filter-select position-relative m-0">
              <select class="form-control " onChange={(e) => sort("price")}>
                <option disabled selected hidden>Select price</option>
                <option>Price Low - High</option>
                <option>Price High - Low</option>
                {/* <option>Recently Listed</option> */}
                {/* <option>Ending Soon</option> */}
                {/* <option>Most Favourite</option> */}
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
          {nftData
            ? nftData.map((item, id) => {
                return (
                  <div
                    key={`exf_${id}`}
                    className="col-12 col-sm-6 col-lg-3 item"
                  >
                    <div className="card">
                      <div className="image-over">
                        <Link to={`/nft-details?${item.id}`}>
                          <img
                            className="card-img-top image-container-nft"
                            src={`${ENV.API_URL_image}${item.image}`}
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="card-caption col-12 p-0">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <Link to={`/nft-details?${item.id}`}>
                              <h5 className="mb-0">{item.name}</h5>
                            </Link>
                            <i class="far fa-heart"></i>
                          </div>
                          <div className="seller d-flex align-items-center my-3">
                            <span>Owned By</span>
                            <a href="/author">
                              <h6 className="ml-2 mb-0">{"@" + item.owner}</h6>
                            </a>
                          </div>
                          <div className="card-bottom d-flex justify-content-between">
                            <span>{"$" + item.price}</span>
                            <span>{item.size}</span>
                          </div>
                          <a
                            className="btn btn-bordered-white btn-smaller mt-3"
                            href="/login"
                          >
                            <i className="icon-handbag mr-2" />
                            place a bid
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : " "}
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <a id="load-btn" className="btn btn-bordered-white mt-5" href="">
              Load More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreFour;
