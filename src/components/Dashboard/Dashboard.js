import React, { useEffect, useState } from "react";
import { ENV } from "../../env";
import MyCollections from "../Collections/MyCollections";
import authors from "../../services/authors.service";
import { Link } from "react-router-dom";
import $ from "jquery";
let limit = 4;
const Dashboard = () => {
  const initialData = {
    heading: "Dashboard",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  };
  const [initData] = useState(initialData);
  const [authorNft, setAuthorNft] = useState([]);
  const [page, setPage] = useState(1);
  const arr = window.location.href.split("?");
  const id = arr[1];
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await authors.authorsList(
      `${ENV.API_URL}api/specific_user_nft_data/${id}?limit=${limit}&page=${page}`
    );

    let newArr = [...authorNft, ...res.data.data.user_data];
    setAuthorNft(newArr);
    if (res.data.data.pagination.total === newArr.length) {
      $("#loadmorebtn").fadeOut("slow");
    }

    setPage(page + 1);
  };

  return (
    <section className="explore-area">
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
      </div>
      <div className="container item-details-area">
        <ul className="netstorm-tab nav nav-tabs my-dashboard" id="nav-tab">
          <li>
            <a
              className="active"
              id="nav-home-tab"
              data-toggle="pill"
              href="#nav-home"
            >
              <h5 className="m-0">Collections</h5>
            </a>
          </li>
          <li>
            <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
              <h5 className="m-0">NFT's</h5>
            </a>
          </li>
          {/* <li>
            <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
              <h5 className="m-0">Details</h5>
            </a>
          </li> */}
        </ul>

        <div className="tab-content py-4" id="nav-tabContent">
          <div
            className="tab-pane fade show active my-dashboard-collection"
            id="nav-home"
          >
            <MyCollections />
          </div>
          <div className="tab-pane fade" id="nav-profile">
            <div class="intro-btn text-right mr-4">
              <a class="btn content-btn" href="/create">
                Add NFT
              </a>
            </div>
            {authorNft ? (
              <div className="row items">
                {authorNft.map((item, idx) => {
                  return item.nft_name !== null ? (
                    <div
                      key={`eds_${idx}`}
                      className="col-12 col-sm-6 col-lg-3 item explore-item"
                    >
                      <div className="card no-hover text-center">
                        <div className="image-over">
                          <Link to={`/nft-details?${item.nft_id}`}>
                            <img
                              className="card-img-top image-container-nft"
                              src={`${ENV.API_URL_image_media}${item.nft_image}`}
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="card-caption col-12 p-0">
                          <div className="card-body mb-4">
                            <Link to={`/nft-details?${item.nft_id}`}>
                              <h5 className="mb-2">{item.nft_name}</h5>
                            </Link>
                            <span>{item.nft_description}</span>
                          </div>
                          <div className="card-bottom d-flex justify-content-between">
                            <span>{"$" + item.nft_price}</span>
                            <span>{item.nft_size}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="no_data mt-3">
                      <span>No item to explore</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no_data mt-3">
                <span>No item to explore</span>
              </div>
            )}
            <div className="row">
              <div className="col-12 text-center">
                <button
                  onClick={() => fetchData()}
                  className="btn btn-bordered-white mt-5"
                  id="loadmorebtn"
                >
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
