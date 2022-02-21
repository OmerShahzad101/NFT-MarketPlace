import { ENV } from "../../env";
import { Link } from "react-router-dom";
import NFT from "../../services/nft.service";
import React, { useEffect, useState } from "react";
let page = 1;
let limit = 4;
const HomeNft = () => {
  const initialData = {
    pre_heading: "EXCLUSIVE ASSETS",
    heading: "Explore",
    btnText: "View All",
  };

  const [initData] = useState(initialData);
  const [nftData, setNftData] = useState();

  useEffect(() => {
    const FetchData = async () => {
      const res = await NFT.nftget(
        `${ENV.API_URL}api/nft_list/?page=${page}&limit=${limit}`
      );
      setNftData(res.data.data.results);
    };
    FetchData();
  }, []);

  return (
    <section className="explore-area ">
      {/* a;lsdk */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span>{initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{initData.heading}</h3>
              </div>
              <div className="intro-btn">
                <Link className="btn content-btn" to="/marketplace">
                  {initData.btnText}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row items ">
          {nftData ? (
            nftData.map((item, id) => {
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
                        </div>
                        <div className="seller d-flex align-items-center my-3">
                          <span>Owned By</span>
                          <Link to={`/author?${item.user_id}`}>
                            <h6 className="ml-2 mb-0">{"@" + item.owner}</h6>
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
    </section>
  );
};

export default HomeNft;
