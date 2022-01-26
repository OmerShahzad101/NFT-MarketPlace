import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { ENV } from "../../env";
import Collection from "../../services/collections.service";
import NFT from "../../services/nft.service";

const CollectionDetail = () => {
  const arr = window.location.href.split("?");
  const id = arr[1];

  const [collectionData, setcollectionData] = useState([]);
  const [order, setOrder] = useState("ASC");

  useEffect(async () => {
    const res = await Collection.collection(
      `${ENV.API_URL}api/specific_collection/${id}/`
    );
    console.log(res.data);
    setcollectionData(res.data.data);
  }, []);

  const sort = (col) => {
    console.log(col);
    if (order === "ASC") {
      const sorted = [...collectionData.nft_collection].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setcollectionData(sorted);
      console.log(order);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...collectionData.nft_collection].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setcollectionData(sorted);
      console.log(order);
      setOrder("ASC");
    }
  };

  return (
    <>
      <section
        className="breadcrumb-area overlay-dark d-flex align-items-center"
        style={{
          backgroundImage: `url(${ENV.API_URL_image}${collectionData.banner_image})`,
        }}
      ></section>
      <div className="container">
        <div className="collection-detail-logo text-center mt-n5 position-relative mb-5">
          <div className="collection-logo avatar-lg">
            <img
              className="rounded-circle collection-logo"
              src={`${ENV.API_URL_image}${collectionData.logo_image}`}
              alt="Collection Logo"
            />
          </div>
          <div className="collection-description">
            <h3>{collectionData.name}</h3>
            <p>{collectionData.description}</p>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-lg-3 col-md-6">
            <div className="card d-flex flex-row justify-content-between">
              <div>
                <img src="hello.jpg" />
              </div>
              <div>
                <h6 className="mt-0 mb-3">{collectionData.category}</h6>
                <p className="m-0">Category</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card d-flex flex-row justify-content-between">
              <div>
                <img src="hello.jpg" />
              </div>
              <div>
                <h6 className="mt-0 mb-3">{collectionData.user}</h6>
                <p className="m-0">Creater</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card d-flex flex-row justify-content-between">
              <div>
                <img src="hello.jpg" />
              </div>
              <div>
                <h6 className="mt-0 mb-3">
                  {collectionData.nft_collection
                    ? collectionData.nft_collection.length
                    : ""}
                </h6>
                <p className="m-0">Items</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="card d-flex flex-row justify-content-between">
              <div>
                <img src="hello.jpg" />
              </div>
              <div>
                <a href={`/authors`}>
                  <h6 className="mt-0 mb-3">Name</h6>
                </a>

                <p className="m-0">Owners</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-xl-3 col-sm-6 text-right order-sm-last">
            <div class="form-group filter-select position-relative m-0">
              <select class="form-control " onChange={(e) => sort("price")}>
                <option disabled selected hidden>
                  Select price
                </option>
                <option>Price Low - High</option>
                <option>Price High - Low</option>
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

        <div className="row my-5">
          {collectionData.nft_collection
            ? collectionData.nft_collection.map((item, id) => {
                return (
                  <div className="col-lg-3 col-md-6 p-3">
                    <div className="card">
                      <div className="image-over">
                        <a href={`/nft-details?${item.id}`}>
                          <img
                            className="card-img-top"
                            src={item.image}
                            alt=""
                          />
                        </a>
                      </div>

                      <div className="card-caption col-12 p-0">
                        <div className="card-body">
                          <a href={`/nft-details?${item.id}`}>
                            <h5 className="mb-0">{item.name}</h5>
                          </a>
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
                            href="#"
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
            : ""}
        </div>
      </div>
    </>
  );
};

export default CollectionDetail;
