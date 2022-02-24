import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../env";
import Collection from "../../services/collections.service";
import $ from "jquery";
const CollectionDetail = () => {
  const [collectionData, setcollectionData] = useState([]);
  const [loader, setLoader] = useState(false);
  const arr = window.location.href.split("?");
  const id = arr[1];

  useEffect(() => {
    setLoader(true)
    $("html,body").animate({ scrollTop: 0 }, "slow");
    const fetchData = async () => {
      const res = await Collection.collection(
        `${ENV.API_URL}api/specific_collection/${id}/`
      );
      setcollectionData(res.data.data);
      setLoader(false)
    };
    fetchData();
  }, []);

  return (
    <>
      {loader ? (
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
                    <img
                      src="/img/auction_2.jpg"
                      className="avatar-md rounded-circle"
                      alt=""
                    />
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
                    <img
                      src="/img/auction_2.jpg"
                      className="avatar-md rounded-circle"
                      alt=""
                    />
                  </div>
                  <div>
                    <h6 className="mt-0 mb-3">{collectionData.user}</h6>
                    <p className="m-0">Creator</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="card d-flex flex-row justify-content-between">
                  <div>
                    <img
                      src="/img/auction_2.jpg"
                      className="avatar-md rounded-circle"
                      alt="user profile"
                    />
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
                    <img
                      src="/img/auction_2.jpg"
                      className="avatar-md rounded-circle"
                      alt="user profile"
                    />
                  </div>
                  <div>
                    <Link to={`/author?${collectionData.user_id}`}>
                      <h6 className="mt-0 mb-3">{collectionData.user}</h6>
                    </Link>
                    <p className="m-0">Owners</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-5">
              {collectionData.nft_collection &&
              collectionData.nft_collection.length > 0 ? (
                collectionData.nft_collection.map((item, id) => {
                  return (
                    <div className="col-lg-3 col-md-6 p-3">
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
                            <Link to={`/nft-details?${item.id}`}>
                              <h5 className="mb-0">{item.name}</h5>
                            </Link>
                            <div className="seller d-flex align-items-center my-3">
                              <span>Owned By</span>
                              <Link to={`/author?${item.user_id}`}>
                                <h6 className="ml-2 mb-0">
                                  {"@" + item.owner}
                                </h6>
                              </Link>
                            </div>
                            <div className="card-bottom d-flex justify-content-between">
                              <span>{"$" + item.price}</span>
                              <span>{item.size}</span>
                            </div>
                            <Link
                              className="btn btn-bordered-white btn-smaller mt-3"
                              to="/wallet-connect"
                            >
                              <i className="icon-handbag mr-2" />
                              Place a bid
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no_data">
                  <span>No item to Explore</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CollectionDetail;
